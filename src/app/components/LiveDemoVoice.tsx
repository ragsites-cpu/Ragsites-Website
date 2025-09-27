'use client';
import { useState, useRef, useEffect } from 'react';

export default function LiveDemoVoice() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const recognitionRef = useRef<any>(null);
  const animationRef = useRef<number>(1222222222);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis not supported in this browser.');
      return;
    }
    
    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;
    
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    
    // Simulate audio levels while speaking
    const animateAudio = () => {
      if (window.speechSynthesis.speaking) {
        setAudioLevel(Math.random() * 100);
        animationRef.current = requestAnimationFrame(animateAudio);
      } else {
        setAudioLevel(0);
      }
    };
    animateAudio();
  };

  const startRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in this browser. Please use Chrome or Safari.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = false;
    
    recognition.onstart = () => {
      setListening(true);
      setTranscript('');
    };
    
    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        setTranscript(finalTranscript);
        // Respond with AI voice
        setTimeout(() => {
          speak(`Thank you for saying: ${finalTranscript}. This is Ragsites AI voice agent. How can I help you today? Would you like to schedule an appointment or learn about our services?`);
        }, 500);
      }
    };
    
    recognition.onend = () => {
      setListening(false);
    };
    
    recognition.onerror = (event: any) => {
      setListening(false);
      console.error('Speech recognition error:', event.error);
    };
    
    recognition.start();
  };

  const stopRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setListening(false);
  };

  return (
    <div className="w-full max-w-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-800/50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-800/50 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${
              listening || isPlaying ? 'bg-red-400 animate-pulse' : 'bg-emerald-400'
            } border-2 border-white dark:border-gray-900 rounded-full`}></div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">AI Voice Agent</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {listening ? 'Listening...' : isPlaying ? 'Speaking...' : 'Ready to talk'}
            </p>
          </div>
        </div>
        <div className="text-xs text-gray-400 dark:text-gray-500 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
          Live Demo
        </div>
      </div>

      {/* Voice Visualizer */}
      <div className="p-8 flex flex-col items-center space-y-6">
        <div className="relative w-32 h-32">
          {/* Outer ring */}
          <div className={`absolute inset-0 rounded-full border-4 ${
            listening ? 'border-red-400 animate-pulse' : 
            isPlaying ? 'border-purple-400 animate-pulse' : 
            'border-gray-300 dark:border-gray-600'
          } transition-colors duration-300`}></div>
          
          {/* Audio level visualization */}
          {(listening || isPlaying) && (
            <div className="absolute inset-2 rounded-full overflow-hidden">
              <div 
                className={`w-full bg-gradient-to-t ${
                  listening ? 'from-red-400 to-red-500' : 'from-purple-400 to-purple-500'
                } transition-all duration-150 ease-out`}
                style={{ 
                  height: `${Math.max(20, listening ? Math.random() * 100 : audioLevel)}%`,
                  transformOrigin: 'bottom'
                }}
              ></div>
            </div>
          )}
          
          {/* Center icon */}
          <div className={`absolute inset-4 rounded-full bg-gradient-to-r ${
            listening ? 'from-red-500 to-red-600' :
            isPlaying ? 'from-purple-500 to-pink-500' :
            'from-gray-400 to-gray-500 dark:from-gray-600 dark:to-gray-700'
          } flex items-center justify-center transition-all duration-300 hover:scale-110 transform`}>
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
        </div>

        <div className="text-center space-y-2">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            {listening ? 'Listening to your voice...' :
             isPlaying ? 'AI is responding...' :
             'Ready for voice interaction'}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
            {listening ? 'Speak clearly and the AI will process your request' :
             isPlaying ? 'The AI agent is providing a response' :
             'Click the microphone to start a conversation or play a sample response'}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="p-6 space-y-4 bg-gray-50/50 dark:bg-gray-800/20">
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => speak('Hello! This is your Ragsites AI voice agent. I can help answer questions, book appointments, and provide information about our services. How may I assist you today?')}
            disabled={listening || isPlaying}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 dark:disabled:from-gray-600 dark:disabled:to-gray-700 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105 transform disabled:scale-100 disabled:cursor-not-allowed shadow-lg flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M9 9a3 3 0 116 0v6a3 3 0 11-6 0V9z" />
            </svg>
            <span>Play Sample Response</span>
          </button>

          {!listening ? (
            <button
              onClick={startRecognition}
              disabled={isPlaying}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-300 disabled:to-gray-400 dark:disabled:from-gray-600 dark:disabled:to-gray-700 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105 transform disabled:scale-100 disabled:cursor-not-allowed shadow-lg flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              <span>Start Speaking</span>
            </button>
          ) : (
            <button
              onClick={stopRecognition}
              className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105 transform shadow-lg flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10h6v4H9z" />
              </svg>
              <span>Stop Listening</span>
            </button>
          )}
        </div>

        {/* Transcript Display */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Speech:</div>
          <div className="text-gray-900 dark:text-white min-h-[2rem] flex items-center">
            {transcript || (
              <span className="text-gray-400 dark:text-gray-500 italic">
                No speech detected yet. Click "Start Speaking" to begin.
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Try saying "I'd like to book an appointment" or "Tell me about pricing"</span>
          <span className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span>Voice AI Demo</span>
          </span>
        </div>
      </div>
    </div>
  );
}