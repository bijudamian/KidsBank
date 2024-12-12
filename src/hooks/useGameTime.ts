import { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { getGameTime } from '../utils/timeUtils';

export function useGameTime() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { gameTime, speedMultiplier } = useGameStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return getGameTime(gameTime, currentTime, speedMultiplier);
}