// middleware.ts
import { NextRequest } from 'next/server';
import { withAuth } from '@kinde-oss/kinde-auth-nextjs/middleware';

export function middleware(req: NextRequest) {
  return withAuth(req);
}

export const config = {
  matcher: [
    '/dashboard(.*)', // Protect dashboard and its subroutes
  ],
};
