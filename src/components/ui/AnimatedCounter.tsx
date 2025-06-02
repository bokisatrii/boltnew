import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  end, 
  duration = 2000,
  className = ''
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(countRef, { once: true, margin: "0px 0px -50px 0px" });
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  useEffect(() => {
    if (!isInView) return;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const progress = timestamp - startTimeRef.current;
      const percentage = Math.min(progress / duration, 1);
      
      // Use easeOutQuart for smoother animation near the end
      const easing = 1 - Math.pow(1 - percentage, 4);
      const currentCount = Math.floor(easing * end);
      
      setCount(currentCount);

      if (percentage < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isInView, end, duration]);

  return (
    <span ref={countRef} className={className}>
      {formatNumber(count)}
    </span>
  );
};

export default AnimatedCounter;