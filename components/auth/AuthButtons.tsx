'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RegisterLink, LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { Mail, Phone, Chrome, ArrowRight } from 'lucide-react';

interface AuthButtonsProps {
  mode?: 'signin' | 'signup';
  title?: string;
  description?: string;
}

export function AuthButtons({
  mode = 'signup',
  title = 'Create Your Account',
  description = 'Choose your preferred authentication method',
}: AuthButtonsProps) {
  const router = useRouter();
  const isSignUp = mode === 'signup';

  const [authMode, setAuthMode] = useState<'email' | 'phone' | null>(null);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent, connectionId: string, type:string='email') => {
    e.preventDefault();

    const baseUrl = `/api/auth/${isSignUp ? 'register' : 'login'}`;
    const loginHint = type === 'phone'? `phone:+91${inputValue}:in` : inputValue
    const query = `?login_hint=${encodeURIComponent(loginHint)}&connection_id=${connectionId}`;

    router.push(baseUrl + query);
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center space-y-1.5">
        <CardTitle className="text-2xl sm:text-3xl">{title}</CardTitle>
        <CardDescription className="text-sm sm:text-base">{description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 sm:space-y-8 px-4 sm:px-6">
        {/* Email Auth */}
        {authMode === 'email' ? (
          <form
            onSubmit={(e) =>
              handleSubmit(e, 'conn_0197343f45ff8756efc7af781169cdaa')
            }
            className="space-y-3"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="border w-full px-3 py-2 rounded text-sm"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button type="submit" className="w-full">
              Continue with Email
            </Button>
          </form>
        ) : (
          <Button
            variant="outline"
            className="w-full h-12 text-left justify-start"
            onClick={() => {
              setAuthMode('email');
              setInputValue('');
            }}
          >
            <Mail className="mr-3 h-5 w-5 text-blue-600" />
            <div className="flex-1 text-left">
              <div className="font-medium">Continue with Email</div>
              <div className="text-sm text-gray-500">
                Sign {isSignUp ? 'up' : 'in'} using your email address
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400" />
          </Button>
        )}

        {/* Phone Auth */}
        {authMode === 'phone' ? (
          <form
            onSubmit={(e) =>
              handleSubmit(e, 'conn_0197343f45fff12621a5fac57d9f52a1','phone')
            }
            className="space-y-3"
          >
            <input
              type="tel"
              required
              placeholder="Enter your phone number"
              className="border w-full px-3 py-2 rounded text-sm"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button type="submit" className="w-full">
              Continue with Phone
            </Button>
          </form>
        ) : (
          <Button
            variant="outline"
            className="w-full h-12 text-left justify-start"
            onClick={() => {
              setAuthMode('phone');
              setInputValue('');
            }}
          >
            <Phone className="mr-3 h-5 w-5 text-green-600" />
            <div className="flex-1 text-left">
              <div className="font-medium">Continue with Phone</div>
              <div className="text-sm text-gray-500">
                Sign {isSignUp ? 'up' : 'in'} using your phone number
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400" />
          </Button>
        )}

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Google Auth */}
        <Button
          variant="outline"
          className="w-full h-12 text-left justify-start"
          onClick={() => {
            const baseUrl = `/api/auth/${isSignUp ? 'register' : 'login'}`;
            const connectionId = 'conn_019739a536aca971d129b31ba2d381ae';
            const query = `?connection_id=${connectionId}`;
            router.push(baseUrl + query);
          }}
        >
          <Chrome className="mr-3 h-5 w-5 text-red-600" />
          <div className="flex-1 text-left">
            <div className="font-medium">Continue with Google</div>
            <div className="text-sm text-gray-500">
              Sign {isSignUp ? 'up' : 'in'} with your Google account
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-gray-400" />
        </Button>

      </CardContent>
    </Card>
  );
}
