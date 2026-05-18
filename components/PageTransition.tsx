'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransition() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
    const t = setTimeout(() => setActive(false), 800);
    return () => clearTimeout(t);
  }, [pathname]);

  return <div className={`page-transition${active ? ' page-transition--active' : ''}`}></div>;
}
