'use client';

import { useEffect, useRef, useState, ReactNode, ElementType } from 'react';

type RevealTextProps = {
  as?: ElementType;
  className?: string;
  children: string;
  /** Optional second line, rendered after a <br> */
  lines?: string[];
};

export function RevealText({
  as: Tag = 'span',
  className = '',
  children,
  lines,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const renderWords = (text: string) =>
    text
      .trim()
      .split(/\s+/)
      .map((w, i) => (
        <span className="word" key={i}>
          <span className="word-inner">{w}</span>
        </span>
      ));

  const content = lines
    ? lines.map((line, i) => (
        <span key={i}>
          {renderWords(line)}
          {i < lines.length - 1 && <br />}
        </span>
      ))
    : renderWords(children);

  return (
    <Tag ref={ref as never} className={`reveal-text${revealed ? ' revealed' : ''} ${className}`.trim()}>
      {content}
    </Tag>
  );
}
