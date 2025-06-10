'use client'
import { useEffect } from 'react';
import { useKindeAuth } from '@kinde-oss/kinde-auth-nextjs';
import { useRouter } from 'next/navigation';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function Loading() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading, user } = useKindeAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('loading',isLoading,isAuthenticated,user,!isLoading && !isAuthenticated)
    if (!isLoading && !isAuthenticated) {
      router.push('/'); // Redirect to login page if not authenticated
    }
    router.push('/'); // Redirect to login page if not authenticated
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <Loading/>; // Show a loading state while checking auth
  }

  if (!isAuthenticated) {
    return null; // Prevent rendering protected content
  }

  return <>{children}</>;
}