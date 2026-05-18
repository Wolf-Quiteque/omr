'use client';

import { useEffect, useRef, useState, ReactNode, ElementType, CSSProperties } from 'react';

type FadeInProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
  id?: string;
};

export function FadeIn({
  as: Tag = 'div',
  className = '',
  children,
  style,
  id,
}: FadeInProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      id={id}
      style={style}
      className={`fade-in${visible ? ' fade-in--visible' : ''} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
