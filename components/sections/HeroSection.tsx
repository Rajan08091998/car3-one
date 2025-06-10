// components/sections/HeroSection.tsx
'use client';

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useAuthModal } from '../auth/AuthModelContext';

export function HeroSection() {
  const { isAuthenticated } = useKindeBrowserClient();
  const { openModal } = useAuthModal(); 

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <Badge variant="secondary" className="mb-4">
                Next Generation Platform
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Welcome to the Future of
                <span className="text-blue-600"> Automotive</span>
              </h1>
              <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                Car3.one revolutionizes how you buy, sell, service, and experience automotive.
                One platform, infinite possibilities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {isAuthenticated ? (
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                  <a href="/Whats-your-car-worth">
                    Go to Car Valuation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              ) : (
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={() => openModal('signup')}>
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center space-x-8">
              <div>
                <div className="text-2xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">1M+</div>
                <div className="text-sm text-gray-600">Transactions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-600 rounded-3xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <Image
                src="https://images.pexels.com/photos/3768909/pexels-photo-3768909.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Modern car dashboard"
                width={800}
                height={800}
                className="w-full h-full object-cover rounded-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}