import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppNavbar } from '@/components/layout/NavBar';
import { AuthModalProvider } from '@/components/auth/AuthModelContext';
import { AppFooter } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Car3 ONE - Future of Automotive',
  description: 'Car3 ONE revolutionizes how you buy, sell, service, and experience automotive. One platform, infinite possibilities.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} scrollbar-hide` }>
          <AuthModalProvider>
            <AppNavbar />
            <main className="min-h-screen scroll-mt-16">
              {children}
            </main>
            <AppFooter />
          </AuthModalProvider>
      </body>
    </html>
  );
}