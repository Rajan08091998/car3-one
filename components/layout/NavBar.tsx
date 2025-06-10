'use client'; 

import { useState, useCallback } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Button } from '@/components/ui/button';
import { UserMenu } from '@/components/auth/UserMenu';
import { Car, Menu, X } from 'lucide-react'; 
import { AuthModal } from '@/components/auth/AuthModel';


export function AppNavbar() { 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [showAuthModal, setShowAuthModal] = useState(false);

  const openModal = useCallback((mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  }, []);

  const handleMobileNavLinkClick = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const { user, isAuthenticated, isLoading } = useKindeBrowserClient();

  return (
    <>
      <AuthModal
        open={showAuthModal}
        onOpenChange={setShowAuthModal}
        mode={authMode}
      />

      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Car3 ONE</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">How It Works</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>

              {isLoading ? (
                <div className="w-8 h-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
              ) : isAuthenticated && user ? (
                <div className="flex items-center space-x-4">
                  <Button asChild>
                    <a href="/dashboard">Dashboard</a>
                  </Button>
                  <UserMenu user={user} />
                </div>
              ) : (
                <>
                  <Button variant="outline" onClick={() => openModal('signin')}>
                    Sign In
                  </Button>
                  <Button onClick={() => openModal('signup')}>
                    Get Started
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-gray-700 hover:text-blue-600" onClick={handleMobileNavLinkClick}>Features</a>
              <a href="#how-it-works" className="block px-3 py-2 text-gray-700 hover:text-blue-600" onClick={handleMobileNavLinkClick}>How It Works</a>
              <a href="#pricing" className="block px-3 py-2 text-gray-700 hover:text-blue-600" onClick={handleMobileNavLinkClick}>Pricing</a>
              <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600" onClick={handleMobileNavLinkClick}>Contact</a>

              {isAuthenticated && user ? (
                <div className="px-3 py-2">
                  <Button asChild className="w-full">
                    <a href="/dashboard" onClick={handleMobileNavLinkClick}>Dashboard</a>
                  </Button>
                </div>
              ) : (
                <div className="flex space-x-2 px-3 py-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => { openModal('signin'); handleMobileNavLinkClick(); }}>
                    Sign In
                  </Button>
                  <Button size="sm" className="flex-1" onClick={() => { openModal('signup'); handleMobileNavLinkClick(); }}>
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}