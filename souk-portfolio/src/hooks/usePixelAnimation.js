import { useState, useEffect, useCallback } from 'react';

/**
 * Hook for managing pixel art sprite animation frames.
 * Cycles through frames at a given interval (stepped, not smooth).
 *
 * @param {number} frameCount - Total number of frames
 * @param {number} interval - Ms between frames (default 500 for pixel feel)
 * @returns {{ frame: number, isPlaying: boolean, toggle: () => void }}
 */
export function usePixelAnimation(frameCount, interval = 500) {
  const [frame, setFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setFrame((prev) => (prev + 1) % frameCount);
    }, interval);
    return () => clearInterval(timer);
  }, [frameCount, interval, isPlaying]);

  const toggle = useCallback(() => setIsPlaying((prev) => !prev), []);

  return { frame, isPlaying, toggle };
}

/**
 * Hook for day/night cycle.
 * Cycles through times of day over a configurable duration.
 *
 * @param {number} cycleDuration - Full cycle in ms (default 120000 = 2 min)
 * @returns {{ timeOfDay: string, progress: number, skyColor: string }}
 */
export function useDayNightCycle(cycleDuration = 120000) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = (Date.now() - startTime) % cycleDuration;
      setProgress(elapsed / cycleDuration);
    }, 1000);
    return () => clearInterval(timer);
  }, [cycleDuration]);

  const getTimeOfDay = () => {
    if (progress < 0.25) return 'morning';
    if (progress < 0.5) return 'day';
    if (progress < 0.75) return 'evening';
    return 'night';
  };

  const getSkyColor = () => {
    if (progress < 0.2) return '#87CEEB'; // morning blue
    if (progress < 0.5) return '#5DADE2'; // day blue
    if (progress < 0.65) return '#E67E22'; // sunset orange
    if (progress < 0.8) return '#1A1A2E'; // dusk
    return '#0D0D1A'; // night
  };

  return {
    timeOfDay: getTimeOfDay(),
    progress,
    skyColor: getSkyColor(),
  };
}
