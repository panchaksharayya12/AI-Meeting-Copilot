import React, { useState, useEffect } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number; // ms
  duration?: number; // ms
  direction?: 'up' | 'none' | 'down';
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 600,
  direction = 'none',
  className = '',
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setVisible(true);
      return;
    }

    const timer = setTimeout(() => {
      setVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  let transformStyle = 'translate3d(0, 0, 0)';
  if (!visible) {
    if (direction === 'up') transformStyle = 'translate3d(0, 16px, 0)';
    if (direction === 'down') transformStyle = 'translate3d(0, -16px, 0)';
  }

  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: transformStyle,
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};
