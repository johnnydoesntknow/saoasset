import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { Header } from '@/components/layout/Header';
import { AuthGate } from '@/components/AuthGate';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Luxury Asset Platform - Exclusive Access to Premium Assets',
  description: 'Purchase fractionalized luxury vehicles, residency visas, and premium lifestyle products from Mansory, São Tomé and Príncipe, and Tonino Lamborghini.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          <AuthGate>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
              <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
              <Header />
              <main className="relative z-10 pt-20">
                {children}
              </main>
            </div>
          </AuthGate>
        </Providers>
      </body>
    </html>
  );
}
