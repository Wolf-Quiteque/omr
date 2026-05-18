'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type UIState = {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
};

const UIContext = createContext<UIState | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <UIContext.Provider
      value={{
        mobileMenuOpen,
        setMobileMenuOpen,
        toggleMobileMenu: () => setMobileMenuOpen((v) => !v),
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used inside UIProvider');
  return ctx;
}
