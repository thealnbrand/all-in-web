"use client";

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'left',
  delay = 0,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const domRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const currentDom = domRef.current;
    if (currentDom) {
      observer.observe(currentDom);
    }

    return () => {
      if (currentDom) {
        observer.unobserve(currentDom);
      }
    };
  }, []);

  const getInitialTransform = () => {
    switch (direction) {
      case 'left':
        return '-translate-x-20 sm:-translate-x-28 opacity-0';
      case 'right':
        return 'translate-x-20 sm:translate-x-28 opacity-0';
      case 'up':
        return 'translate-y-20 opacity-0';
      case 'down':
        return '-translate-y-20 opacity-0';
      default:
        return '-translate-x-20 opacity-0';
    }
  };

  return (
    <div
      ref={domRef}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'translate-x-0 translate-y-0 opacity-100' : getInitialTransform()
      } ${className}`}
    >
      {children}
    </div>
  );
};
