'use client';

import { useEffect, useRef, useState } from 'react';
import type { TrackReference } from '@livekit/components-react';
import type { ConnectionState } from 'livekit-client';

interface WaveformVisualizerProps {
  trackRef?: TrackReference;
  state?: ConnectionState;
  className?: string;
}

export function WaveformVisualizer({ trackRef, state, className }: WaveformVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const audioContextRef = useRef<AudioContext | undefined>(undefined);
  const analyserRef = useRef<AnalyserNode | undefined>(undefined);
  const dataArrayRef = useRef<Uint8Array<ArrayBuffer> | undefined>(undefined);
  const [audioLevels, setAudioLevels] = useState<number[]>([0, 0, 0]);

  // Set up real audio analysis from the track
  useEffect(() => {
    if (!trackRef?.publication.track) {
      setAudioLevels([0, 0, 0]);
      return;
    }

    const mediaStreamTrack = trackRef.publication.track.mediaStreamTrack;
    const stream = new MediaStream([mediaStreamTrack]);

    // Create Web Audio API context
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    source.connect(analyser);

    audioContextRef.current = audioContext;
    analyserRef.current = analyser;
    dataArrayRef.current = dataArray;

    // Analyze audio frequencies and update levels
    const updateAudioLevels = () => {
      if (!analyserRef.current || !dataArrayRef.current) return;

      analyserRef.current.getByteFrequencyData(dataArrayRef.current);

      // Split frequency data into low, mid, high ranges
      const dataLength = dataArrayRef.current.length;
      const lowEnd = Math.floor(dataLength * 0.33);
      const midEnd = Math.floor(dataLength * 0.66);

      // Calculate average amplitude for each frequency range
      let lowSum = 0, midSum = 0, highSum = 0;

      for (let i = 0; i < lowEnd; i++) {
        lowSum += dataArrayRef.current[i];
      }
      for (let i = lowEnd; i < midEnd; i++) {
        midSum += dataArrayRef.current[i];
      }
      for (let i = midEnd; i < dataLength; i++) {
        highSum += dataArrayRef.current[i];
      }

      // Normalize to 0-1 range (255 is max byte value)
      const lowLevel = (lowSum / lowEnd) / 255;
      const midLevel = (midSum / (midEnd - lowEnd)) / 255;
      const highLevel = (highSum / (dataLength - midEnd)) / 255;

      setAudioLevels([lowLevel, midLevel, highLevel]);
    };

    const interval = setInterval(updateAudioLevels, 50);

    return () => {
      clearInterval(interval);
      audioContext.close();
    };
  }, [trackRef]);

  // Draw waveforms
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;

    let phase1 = 0;
    let phase2 = 0;
    let phase3 = 0;

    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Get theme-aware colors from CSS variables
      const isDark = document.documentElement.classList.contains('dark');

      // Draw 3 overlapping sine waves - same frequency, different amplitudes
      // Each wave tracks different audio frequency range (lows, mids, highs)
      const waves = [
        {
          // Low frequencies - warm peachy/purple tones
          color: isDark ? 'oklch(0.60 0.15 280)' : 'oklch(0.50 0.12 85)', // Purple-blue / Warm peach
          opacity: 0.65,
          amplitude: 5 + audioLevels[0] * 28, // Base 5px + up to 28px when speaking
          frequency: 0.045, // Moderate wave frequency
          phase: phase1,
          lineWidth: 2.5
        },
        {
          // Mid frequencies (speech) - sage green/royal blue
          color: isDark ? 'oklch(0.55 0.18 255)' : 'oklch(0.45 0.12 110)', // Royal blue / Sage green
          opacity: 0.75,
          amplitude: 5 + audioLevels[1] * 32, // Base 5px + up to 32px (highest)
          frequency: 0.045, // Same visual rhythm
          phase: phase2,
          lineWidth: 2.5
        },
        {
          // High frequencies - cyan/earthy green
          color: isDark ? 'oklch(0.65 0.12 200)' : 'oklch(0.55 0.10 120)', // Cyan / Earthy green
          opacity: 0.65,
          amplitude: 5 + audioLevels[2] * 25, // Base 5px + up to 25px
          frequency: 0.045, // Same visual rhythm
          phase: phase3,
          lineWidth: 2.5
        },
      ];

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.globalAlpha = wave.opacity;
        ctx.lineWidth = wave.lineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        for (let x = 0; x < width; x += 2) { // Draw every 2px for smoothness
          const y = centerY + Math.sin(x * wave.frequency + wave.phase) * wave.amplitude;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      });

      ctx.globalAlpha = 1;

      // Move waves based on audio levels (only animate when there's sound)
      const avgLevel = (audioLevels[0] + audioLevels[1] + audioLevels[2]) / 3;
      phase1 += avgLevel * 0.15; // Slow movement
      phase2 += avgLevel * 0.2;  // Medium movement
      phase3 += avgLevel * 0.1;  // Slowest movement

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [audioLevels]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={90}
      className={className}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
