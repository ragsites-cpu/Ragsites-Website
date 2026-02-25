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
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const maxDurationRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const rafRef = useRef<number | null>(null);
  const assistantTextRef = useRef('');

  const cleanup = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    if (maxDurationRef.current) clearTimeout(maxDurationRef.current);
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
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

  const startCall = useCallback(async (options?: StartCallOptions) => {
    setError(null);
    setCallStatus('connecting');
    setTranscript([]);
    setElapsedSeconds(0);
    assistantTextRef.current = '';

    try {
      // 1. Get mic access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // 2. Get ephemeral token — use provided token or fetch from backend
      let token: string;
      if (options?.token) {
        token = options.token;
      } else {
        const tokenRes = await fetch('/api/realtime-token', { method: 'POST' });
        const tokenData = await tokenRes.json();
        if (!tokenRes.ok || !tokenData.token) {
          throw new Error(tokenData.error || 'Could not get session token.');
        }
        token = tokenData.token;
      }

      // 3. Create RTCPeerConnection
      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      // Add mic track
      stream.getTracks().forEach(track => pc.addTrack(track, stream));

      // Handle remote audio (AI voice)
      const audioEl = document.createElement('audio');
      audioEl.autoplay = true;
      pc.ontrack = (e) => {
        audioEl.srcObject = e.streams[0];
        // Analyze remote audio for visualizer
        startVolumeAnalysis(e.streams[0]);
      };

      // 4. Create data channel for events
      const dc = pc.createDataChannel('oai-events');
      dcRef.current = dc;

      dc.onmessage = (e) => {
        try {
          const event = JSON.parse(e.data);

          // Trigger greeting as soon as session is ready
          if (event.type === 'session.created' && options?.greeting) {
            dc.send(JSON.stringify({
              type: 'response.create',
              response: {
                modalities: ['text', 'audio'],
                instructions: `Greet the caller: "${options.greeting}"`,
              },
            }));
          }

          if (event.type === 'response.audio_transcript.delta') {
            assistantTextRef.current += event.delta || '';
          }

          if (event.type === 'response.audio_transcript.done') {
            const text = assistantTextRef.current.trim();
            if (text) {
              setTranscript(prev => [...prev, { role: 'assistant', text }]);
            }
            assistantTextRef.current = '';
          }

          if (event.type === 'conversation.item.input_audio_transcription.completed') {
            const text = (event.transcript || '').trim();
            if (text) {
              setTranscript(prev => [...prev, { role: 'user', text }]);
            }
          }

          if (event.type === 'response.created') {
            setIsSpeaking(true);
          }

          if (event.type === 'response.done') {
            setIsSpeaking(false);
            // Check if the AI called the end_call function
            const outputs = event.response?.output || [];
            for (const item of outputs) {
              if (item.type === 'function_call' && item.name === 'end_call') {
                setTimeout(() => endCallInternal(), 500);
                break;
              }
            }
          }
        } catch {
          // ignore parse errors
        }
      };

      // 5. SDP handshake
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

      // 6. Connected — start timers
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
  }, [cleanup, startVolumeAnalysis]);

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
