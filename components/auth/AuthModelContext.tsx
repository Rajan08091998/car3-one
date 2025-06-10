'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { AuthModal } from './AuthModel';

interface AuthModalContextType {
  openModal: (mode: 'signin' | 'signup') => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

interface AuthModalProviderProps {
  children: ReactNode;
}

export function AuthModalProvider({ children }: AuthModalProviderProps) {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [showAuthModal, setShowAuthModal] = useState(false);

  const openModal = useCallback((mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  }, []);

  const value = { openModal };

  return (
    <AuthModalContext.Provider value={value}>
      {children}
      <AuthModal
        open={showAuthModal}
        onOpenChange={setShowAuthModal}
        mode={authMode}
      />
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (context === undefined) {
    throw new Error('useAuthModal must be used within an AuthModalProvider');
  }
  return context;
}