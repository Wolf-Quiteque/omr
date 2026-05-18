'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let frame = 0;

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      frame = requestAnimationFrame(animate);
    };

    const handleEnter = () => {
      dot.classList.add('cursor-dot--hover');
      ring.classList.add('cursor-ring--hover');
    };
    const handleLeave = () => {
      dot.classList.remove('cursor-dot--hover');
      ring.classList.remove('cursor-ring--hover');
    };

    document.addEventListener('mousemove', handleMove);
    frame = requestAnimationFrame(animate);

    const attachHover = () => {
      document
        .querySelectorAll('a, button, .product-card, .size-option, input')
        .forEach((el) => {
          el.addEventListener('mouseenter', handleEnter);
          el.addEventListener('mouseleave', handleLeave);
        });
    };
    attachHover();
    const reattach = setTimeout(attachHover, 1500);

    document.documentElement.style.cursor = 'none';

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(reattach);
      document.removeEventListener('mousemove', handleMove);
      document
        .querySelectorAll('a, button, .product-card, .size-option, input')
        .forEach((el) => {
          el.removeEventListener('mouseenter', handleEnter);
          el.removeEventListener('mouseleave', handleLeave);
        });
      document.documentElement.style.cursor = '';
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef}></div>
      <div className="cursor-ring" ref={ringRef}></div>
    </>
  );
}
