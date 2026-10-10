import React, { useState, useEffect } from 'react';

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  charDelay?: number; // default 30ms
  initialDelay?: number; // default 200ms
  duration?: number; // default 500ms
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  text,
  className = '',
  charDelay = 30,
  initialDelay = 200,
  duration = 500,
}) => {
  const [started, setStarted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setReducedMotion(true);
      setStarted(true);
      return;
    }

    const timer = setTimeout(() => {
      setStarted(true);
    }, initialDelay);

    return () => clearTimeout(timer);
  }, [initialDelay]);

  // Split by line breaks if present, then characters
  const lines = text.split('\n');

  let globalCharIndex = 0;

  return (
    <h1
      className={`tracking-[-0.04em] font-normal ${className}`}
      style={{ letterSpacing: '-0.04em' }}
    >
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {line.split('').map((char, charIdx) => {
            const thisIndex = globalCharIndex++;
            const isSpace = char === ' ';
            const displayChar = isSpace ? '\u00A0' : char;

            const transitionDelay = `${thisIndex * charDelay}ms`;

            return (
              <span
                key={charIdx}
                className="inline-block"
                style={{
                  opacity: started || reducedMotion ? 1 : 0,
                  transform:
                    started || reducedMotion
                      ? 'translateX(0)'
                      : 'translateX(-18px)',
                  transition: reducedMotion
                    ? 'none'
                    : `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${transitionDelay}, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${transitionDelay}`,
                  willChange: 'opacity, transform',
                }}
              >
                {displayChar}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
};
