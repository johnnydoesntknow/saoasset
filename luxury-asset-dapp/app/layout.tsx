import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { AuthGate } from '@/components/AuthGate';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IOPn Luxury - Exclusive Access to Premium Assets',
  description: 'Purchase fractionalized luxury vehicles, residency visas, and premium lifestyle products from Mansory, São Tomé and Príncipe, and Tonino Lamborghini.',
  icons: {
    icon: '/images/logos/iopn.jpg',
    shortcut: '/images/logos/iopn.jpg',
    apple: '/images/logos/iopn.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <Providers>
          {/* Removed AuthGate */}
          <div className="min-h-screen relative">
            <div className="fixed inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-iopn-neutral-light via-white to-secondary-50 dark:from-iopn-primary-dark dark:via-iopn-primary-mid dark:to-gray-900" />
              <div className="absolute inset-0 noise-texture" />
            </div>
            <main className="relative z-10">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}