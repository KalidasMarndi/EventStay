import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface HoldCountdownProps {
  expiresAt: number; // timestamp in ms
  onExpire: () => void;
  className?: string;
}

export function HoldCountdown({ expiresAt, onExpire, className = '' }: HoldCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Date.now();
      const diff = Math.max(0, expiresAt - now);
      return Math.floor(diff / 1000); // in seconds
    };

    const initialTime = calculateTimeLeft();
    setTimeLeft(initialTime);

    if (initialTime === 0) {
      onExpire();
      return;
    }

    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);

      if (remaining === 0) {
        clearInterval(timer);
        onExpire();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt, onExpire]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (timeLeft === 0) return null;

  const isWarning = timeLeft < 60; // less than 1 minute

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${isWarning ? 'bg-red-50 text-red-600 border-red-200' : 'bg-amber-50 text-amber-600 border-amber-200'} ${className}`}>
      <Clock className="w-4 h-4" />
      <span className="font-mono">{formatTime(timeLeft)}</span>
    </div>
  );
}
