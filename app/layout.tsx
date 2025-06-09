import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Car3 ONE - Revolutionary Automotive Platform',
  description: 'The next generation automotive platform connecting drivers, dealers, and services in one unified ecosystem.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
        <body className={inter.className}>{children}</body>
    </html>
  );
}