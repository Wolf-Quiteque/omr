'use client';

import { useEffect, useState } from 'react';

export default function Loader() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // Hide loader after fixed delay (don't wait on window.load — videos may stall it forever)
    const hideTimer = setTimeout(() => setHidden(true), 1800);
    return () => clearTimeout(hideTimer);
  }, []);

  useEffect(() => {
    if (!hidden) return;
    const removeTimer = setTimeout(() => setRemoved(true), 700);
    return () => clearTimeout(removeTimer);
  }, [hidden]);

  if (removed) return null;

  return (
    <div className={`loader${hidden ? ' loader--hidden' : ''}`}>
      <span className="loader__logo">OMR</span>
      <div className="loader__line"></div>
    </div>
  );
}
