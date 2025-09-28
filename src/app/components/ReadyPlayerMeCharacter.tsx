// components/ReadyPlayerMeCharacter.tsx
'use client';
import { useState, useEffect, useRef } from 'react';

interface ReadyPlayerMeCharacterProps {
  currentEmotion?: string;
  currentAction?: string;
  isAnimating?: boolean;
}

export default function ReadyPlayerMeCharacter({ 
  currentEmotion = 'neutral', 
  currentAction = 'idle',
  isAnimating = false 
}: ReadyPlayerMeCharacterProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Standard professional female avatar URL
  const standardAvatarUrl = 'https://models.readyplayer.me/64bfa15f0e72c63d7c3f8a3a.glb';

  useEffect(() => {
    setAvatarUrl(standardAvatarUrl);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    // Send emotion and action changes to iframe
    if (iframeRef.current && isLoaded) {
      const message = {
        type: 'CHARACTER_UPDATE',
        emotion: currentEmotion || 'neutral',
        action: currentAction || 'idle',
        isAnimating: Boolean(isAnimating)
      };
      iframeRef.current.contentWindow?.postMessage(message, '*');
    }
  }, [currentEmotion, currentAction, isAnimating, isLoaded]);

  const getActionOverlay = () => {
    return (
      <div className="absolute inset-0 pointer-events-none">
        {/* Speaking animation */}
        {(currentAction === 'speaking' || isAnimating) && (
          <div className="absolute bottom-20 right-4 flex flex-col space-y-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-blue-400 rounded-full animate-pulse"
                style={{
                  height: `${15 + Math.sin(Date.now() * 0.01 + i) * 8}px`,
                  animationDelay: `${i * 100}ms`,
                  animationDuration: '800ms'
                }}
              ></div>
            ))}
          </div>
        )}

        {/* Listening animation */}
        {currentAction === 'listening' && (
          <div className="absolute top-16 right-4">
            <div className="w-8 h-8 border-2 border-green-400 rounded-full animate-ping"></div>
            <div className="absolute top-2 left-2 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        )}

        {/* Thinking animation */}
        {currentAction === 'thinking' && (
          <div className="absolute top-12 left-4 flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                style={{
                  animationDelay: `${i * 200}ms`,
                  animationDuration: '1s'
                }}
              ></div>
            ))}
          </div>
        )}

        {/* Success/Celebrating animation */}
        {(currentAction === 'success' || currentEmotion === 'celebrating') && (
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute text-yellow-400 text-xl animate-bounce"
                style={{
                  left: `${20 + i * 12}%`,
                  top: `${10 + (i % 2) * 15}%`,
                  animationDelay: `${i * 200}ms`,
                  animationDuration: '1s'
                }}
              >
                ✨
              </div>
            ))}
          </div>
        )}

        {/* Status indicator */}
        <div className="absolute top-4 right-4">
          <div className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-500 ${
            currentAction === 'speaking' || isAnimating ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
            currentAction === 'listening' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
            currentAction === 'thinking' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
            currentAction === 'success' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' :
            'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
          }`}>
            {(currentAction === 'speaking' || isAnimating) && '🗣️ Speaking'}
            {currentAction === 'listening' && '👂 Listening'}
            {currentAction === 'thinking' && '🤔 Analyzing'}
            {currentAction === 'success' && '🎉 Success'}
            {currentAction === 'explaining' && '💡 Explaining'}
            {currentAction === 'questioning' && '❓ Qualifying'}
            {currentAction === 'idle' && '😊 Ready'}
          </div>
        </div>
      </div>
    );
  };

  if (!isLoaded) {
    return (
      <div className="w-full h-80 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-2xl flex items-center justify-center border border-white/20 dark:border-gray-800/50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading Aria...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-2xl overflow-hidden border border-white/20 dark:border-gray-800/50">
      {/* Ready Player Me Avatar Viewer */}
      <iframe
        ref={iframeRef}
        src={`https://demo.readyplayer.me/avatar?frameApi&url=${encodeURIComponent(avatarUrl)}&background=transparent`}
        className={`w-full h-full transition-all duration-500 ${
          isAnimating ? 'scale-105' : 'scale-100'
        }`}
        allow="camera *; microphone *; clipboard-write"
        style={{ border: 'none' }}
        onLoad={() => setIsLoaded(true)}
      />
      
      {/* Action overlays */}
      {getActionOverlay()}
    </div>
  );
}