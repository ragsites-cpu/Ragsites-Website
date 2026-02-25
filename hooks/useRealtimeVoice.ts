'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

const MAX_DURATION_SECONDS = 120; // 2 minutes

export type CallStatus = 'idle' | 'connecting' | 'active' | 'ended';

export interface TranscriptMessage {
  role: 'user' | 'assistant';
  text: string;
}

export interface StartCallOptions {
  token?: string;
  greeting?: string;
}

export interface UseRealtimeVoiceReturn {
  callStatus: CallStatus;
  volumeLevel: number;
  isSpeaking: boolean;
  transcript: TranscriptMessage[];
  elapsedSeconds: number;
  error: string | null;
  startCall: (options?: StartCallOptions) => Promise<void>;
  endCall: () => void;
  reset: () => void;
}

export function useRealtimeVoice(): UseRealtimeVoiceReturn {
  const [callStatus, setCallStatus] = useState<CallStatus>('idle');
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const maxDurationRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const endCallTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const greetingSendTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const rafRef = useRef<number | null>(null);
  const assistantTextRef = useRef('');
  const hasSentGreetingRef = useRef(false);
  const isAssistantSpeakingRef = useRef(false);
  const pendingAssistantResponseRef = useRef(false);
  const turnAwaitingResponseRef = useRef(false);
  const lastUserTranscriptRef = useRef('');
  const dataChannelOpenRef = useRef(false);
  const remoteAudioReadyRef = useRef(false);
  const readyForUserInputRef = useRef(false);
  const ignoreUserTranscriptsUntilRef = useRef(0);

  const cleanup = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    if (maxDurationRef.current) clearTimeout(maxDurationRef.current);
    if (endCallTimerRef.current) clearTimeout(endCallTimerRef.current);
    if (greetingSendTimerRef.current) clearTimeout(greetingSendTimerRef.current);
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (audioElRef.current) {
      audioElRef.current.pause();
      audioElRef.current.srcObject = null;
      audioElRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    dcRef.current = null;
    analyserRef.current = null;
    rafRef.current = null;
    timerRef.current = null;
    maxDurationRef.current = null;
    endCallTimerRef.current = null;
    greetingSendTimerRef.current = null;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  // Volume analyzer loop
  const startVolumeAnalysis = useCallback((stream: MediaStream) => {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    audioContextRef.current = audioContext;
    analyserRef.current = analyser;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const tick = () => {
      analyser.getByteFrequencyData(dataArray);
      // Average of mid-range frequencies for voice
      let sum = 0;
      const start = 4;
      const end = 32;
      for (let i = start; i < end; i++) sum += dataArray[i];
      const avg = sum / (end - start) / 255;
      setVolumeLevel(avg);
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();
  }, []);

  const setMicrophoneEnabled = useCallback((enabled: boolean) => {
    const stream = streamRef.current;
    if (!stream) return;
    stream.getAudioTracks().forEach(track => {
      track.enabled = enabled;
    });
  }, []);

  const startCall = useCallback(async (options?: StartCallOptions) => {
    setError(null);
    setCallStatus('connecting');
    setTranscript([]);
    setElapsedSeconds(0);
    assistantTextRef.current = '';
    hasSentGreetingRef.current = false;
    isAssistantSpeakingRef.current = false;
    pendingAssistantResponseRef.current = false;
    turnAwaitingResponseRef.current = false;
    lastUserTranscriptRef.current = '';
    dataChannelOpenRef.current = false;
    remoteAudioReadyRef.current = false;
    readyForUserInputRef.current = !Boolean(options?.greeting);
    ignoreUserTranscriptsUntilRef.current = 0;
    greetingSendTimerRef.current = null;

    try {
      const streamPromise = navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      const tokenPromise = options?.token
        ? Promise.resolve(options.token)
        : (async () => {
            const tokenRes = await fetch('/api/realtime-token', { method: 'POST' });
            const tokenData = await tokenRes.json();
            if (!tokenRes.ok || !tokenData.token) {
              throw new Error(tokenData.error || 'Could not get session token.');
            }
            return tokenData.token as string;
          })();

      // 1. Get mic access + token in parallel to reduce call setup latency
      const [stream, token] = await Promise.all([streamPromise, tokenPromise]);
      streamRef.current = stream;
      setMicrophoneEnabled(true);

      // 2. Create RTCPeerConnection
      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      // Add mic track
      stream.getTracks().forEach(track => pc.addTrack(track, stream));

      // Handle remote audio (AI voice)
      const audioEl = document.createElement('audio');
      audioEl.autoplay = true;
      audioElRef.current = audioEl;
      pc.ontrack = (e) => {
        remoteAudioReadyRef.current = true;
        audioEl.srcObject = e.streams[0];
        void audioEl.play().catch(() => {
          // ignore autoplay/playback errors
        });
        // Analyze remote audio for visualizer
        startVolumeAnalysis(e.streams[0]);
        maybeSendGreetingIfReady();
      };

      // 3. Create data channel for events
      const dc = pc.createDataChannel('oai-events');
      dcRef.current = dc;

      const maybeSendGreetingIfReady = () => {
        if (!options?.greeting || hasSentGreetingRef.current) return;
        if (!dataChannelOpenRef.current || !remoteAudioReadyRef.current) return;
        if (greetingSendTimerRef.current) return;

        // Small buffer so remote playback is fully primed before first audio arrives
        greetingSendTimerRef.current = setTimeout(() => {
          greetingSendTimerRef.current = null;
          if (!options?.greeting || hasSentGreetingRef.current || dc.readyState !== 'open') return;
          hasSentGreetingRef.current = true;
          readyForUserInputRef.current = false;
          pendingAssistantResponseRef.current = true;
          dc.send(JSON.stringify({
            type: 'response.create',
            response: {
              modalities: ['text', 'audio'],
              instructions: `Say exactly this greeting and nothing else: "${options.greeting}". Then stop and wait for the caller to respond.`,
            },
          }));
        }, 120);
      };

      dc.onopen = () => {
        dataChannelOpenRef.current = true;
        maybeSendGreetingIfReady();
      };

      dc.onmessage = (e) => {
        try {
          const event = JSON.parse(e.data);

          const requestAssistantResponse = () => {
            if (!readyForUserInputRef.current) return false;
            if (isAssistantSpeakingRef.current) return false;
            if (pendingAssistantResponseRef.current) return false;
            if (dc.readyState !== 'open') return false;
            pendingAssistantResponseRef.current = true;
            turnAwaitingResponseRef.current = false;
            dc.send(JSON.stringify({
              type: 'response.create',
              response: {
                modalities: ['text', 'audio'],
              },
            }));
            return true;
          };

          // Trigger greeting as soon as session is ready
          if (event.type === 'session.created') {
            maybeSendGreetingIfReady();
          }

          if (event.type === 'input_audio_buffer.speech_started') {
            if (readyForUserInputRef.current && Date.now() >= ignoreUserTranscriptsUntilRef.current) {
              turnAwaitingResponseRef.current = true;
            }
          }

          if (event.type === 'input_audio_buffer.speech_stopped' || event.type === 'input_audio_buffer.committed') {
            if (turnAwaitingResponseRef.current) {
              requestAssistantResponse();
            }
          }

          if (event.type === 'response.audio_transcript.delta') {
            assistantTextRef.current += event.delta || '';
          }

          if (event.type === 'conversation.item.input_audio_transcription.completed') {
            const text = (event.transcript || '').trim();
            if (text) {
              if (text !== lastUserTranscriptRef.current) {
                setTranscript(prev => [...prev, { role: 'user', text }]);
                lastUserTranscriptRef.current = text;
              }

              if (!isAssistantSpeakingRef.current && readyForUserInputRef.current && Date.now() >= ignoreUserTranscriptsUntilRef.current) {
                // Fallback for clients/sessions where turn-end events are delayed/missing
                requestAssistantResponse();
              }
            }
          }

          if (event.type === 'response.created') {
            isAssistantSpeakingRef.current = true;
            setMicrophoneEnabled(false);
            assistantTextRef.current = '';
            setIsSpeaking(true);
          }

          if (event.type === 'response.done') {
            isAssistantSpeakingRef.current = false;
            pendingAssistantResponseRef.current = false;
            setTimeout(() => setMicrophoneEnabled(true), 150);
            setIsSpeaking(false);
            const text = assistantTextRef.current.trim();
            if (text) {
              setTranscript(prev => [...prev, { role: 'assistant', text }]);
            }
            assistantTextRef.current = '';

            if (options?.greeting && hasSentGreetingRef.current && !readyForUserInputRef.current) {
              readyForUserInputRef.current = true;
              // Ignore immediate tail bleed from the speaker right after greeting audio ends
              ignoreUserTranscriptsUntilRef.current = Date.now() + 700;
            }

            // Check if the AI called the end_call function
            const outputs = event.response?.output || [];
            for (const item of outputs) {
              if (item.type === 'function_call' && item.name === 'end_call') {
                if (!endCallTimerRef.current) {
                  // Give outbound audio extra time to finish playback before teardown.
                  const hangupDelayMs = 1800;
                  endCallTimerRef.current = setTimeout(() => {
                    endCallTimerRef.current = null;
                    endCallInternal();
                  }, hangupDelayMs);
                }
                break;
              }
            }
          }

          if (event.type === 'response.canceled' || event.type === 'response.cancelled' || event.type === 'response.failed') {
            isAssistantSpeakingRef.current = false;
            pendingAssistantResponseRef.current = false;
            setMicrophoneEnabled(true);
            setIsSpeaking(false);
            assistantTextRef.current = '';
            if (options?.greeting && hasSentGreetingRef.current && !readyForUserInputRef.current) {
              readyForUserInputRef.current = true;
            }
          }
        } catch {
          // ignore parse errors
        }
      };

      // 4. SDP handshake
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const sdpRes = await fetch('https://api.openai.com/v1/realtime?model=gpt-realtime-1.5', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/sdp',
        },
        body: offer.sdp,
      });

      if (!sdpRes.ok) {
        throw new Error('Could not establish voice connection.');
      }

      const answerSdp = await sdpRes.text();
      await pc.setRemoteDescription({ type: 'answer', sdp: answerSdp });
      maybeSendGreetingIfReady();

      // 5. Connected — start timers
      setCallStatus('active');

      timerRef.current = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);

      maxDurationRef.current = setTimeout(() => {
        endCallInternal();
      }, MAX_DURATION_SECONDS * 1000);

      pc.onconnectionstatechange = () => {
        if (pc.connectionState === 'disconnected' || pc.connectionState === 'failed') {
          endCallInternal();
        }
      };

    } catch (err) {
      cleanup();
      if (err instanceof DOMException && err.name === 'NotAllowedError') {
        setError('Microphone access was denied. Please allow mic access and try again.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
      setCallStatus('idle');
    }
  }, [cleanup, setMicrophoneEnabled, startVolumeAnalysis]);

  const endCallInternal = useCallback(() => {
    cleanup();
    setCallStatus('ended');
    setVolumeLevel(0);
    setIsSpeaking(false);
  }, [cleanup]);

  const endCall = useCallback(() => {
    endCallInternal();
  }, [endCallInternal]);

  const reset = useCallback(() => {
    cleanup();
    setCallStatus('idle');
    setVolumeLevel(0);
    setIsSpeaking(false);
    setTranscript([]);
    setElapsedSeconds(0);
    setError(null);
    assistantTextRef.current = '';
    hasSentGreetingRef.current = false;
    isAssistantSpeakingRef.current = false;
    pendingAssistantResponseRef.current = false;
    turnAwaitingResponseRef.current = false;
    lastUserTranscriptRef.current = '';
    dataChannelOpenRef.current = false;
    remoteAudioReadyRef.current = false;
    readyForUserInputRef.current = false;
    ignoreUserTranscriptsUntilRef.current = 0;
    greetingSendTimerRef.current = null;
  }, [cleanup]);

  return {
    callStatus,
    volumeLevel,
    isSpeaking,
    transcript,
    elapsedSeconds,
    error,
    startCall,
    endCall,
    reset,
  };
}
