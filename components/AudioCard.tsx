'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

export default function AudioCard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [frequencyData, setFrequencyData] = useState<number[]>(new Array(20).fill(0));
  const audioRef = useRef<HTMLAudioElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Initialize audio context and analyser
  useEffect(() => {
    if (audioRef.current && !audioContextRef.current) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 64; // Creates 32 frequency bins

      const source = audioContext.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
    }
  }, []);

  // Visualizer animation loop
  useEffect(() => {
    if (isPlaying && analyserRef.current) {
      const updateFrequency = () => {
        const dataArray = new Uint8Array(analyserRef.current!.frequencyBinCount);
        analyserRef.current!.getByteFrequencyData(dataArray);

        // Sample 10 bars from mid-range frequencies (better for voice)
        const bars = 10;
        const startBin = 2; // Skip very low frequencies
        const endBin = Math.min(dataArray.length - 2, 15); // Focus on mid-range
        const sampledData = [];
        const step = Math.floor((endBin - startBin) / bars);

        for (let i = 0; i < bars; i++) {
          const index = startBin + (i * step);
          sampledData.push(dataArray[index] || 0);
        }

        // Reverse so higher energy frequencies are at the end
        sampledData.reverse();

        // Create symmetric visualization - mirror the data for centered effect
        const symmetricData = [...sampledData, ...sampledData.slice().reverse()];

        setFrequencyData(symmetricData);
        animationFrameRef.current = requestAnimationFrame(updateFrequency);
      };

      updateFrequency();
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      // Reset to zero when not playing
      setFrequencyData(new Array(20).fill(0));
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = async () => {
    if (audioRef.current) {
      // Resume audio context if suspended (required by browsers)
      if (audioContextRef.current?.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      audioRef.current.currentTime = percentage * duration;
    }
  };

  return (
    <div className="glass-card p-6 hover:bg-white/10 transition-all duration-300 cyber-glow">
      <h3 className="text-2xl font-bold mb-2 gradient-text">
        The Receptionist That Never Sleeps
      </h3>
      <p className="text-gray-400 mb-6 text-sm">
        Listen to our AI handle a booking in real-time.
      </p>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="/audio/sample.mp3"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* Custom Player UI */}
      <div className="space-y-4">
        {/* Play/Pause Button */}
        <div className="flex items-center justify-center">
          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-purple flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-lg"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-black fill-black" />
            ) : (
              <Play className="w-8 h-8 text-black fill-black ml-1" />
            )}
          </button>
        </div>

        {/* Progress Bar */}
        <div
          className="w-full h-2 bg-white/10 rounded-full cursor-pointer overflow-hidden"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-purple transition-all duration-100"
            style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
          />
        </div>

        {/* Time Display */}
        <div className="flex justify-between text-xs text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Visualizer Bars */}
        <div className="flex items-end justify-center gap-1 h-16">
          {frequencyData.map((value, i) => {
            // Convert frequency data (0-255) to height percentage (20-100%)
            const height = Math.max(20, (value / 255) * 100);
            return (
              <div
                key={i}
                className="w-1 bg-gradient-to-t from-cyber-cyan to-cyber-purple rounded-full transition-all duration-75"
                style={{
                  height: `${height}%`,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
