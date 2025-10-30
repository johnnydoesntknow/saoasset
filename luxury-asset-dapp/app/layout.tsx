import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { Sidebar } from '@/components/layout/Sidebar';
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
          <AuthGate>
            <div className="min-h-screen relative">
              {/* Professional gradient mesh background */}
              <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-iopn-neutral-light via-white to-secondary-50 dark:from-iopn-primary-dark dark:via-iopn-primary-mid dark:to-gray-900" />
                <div className="absolute inset-0 noise-texture" />
              </div>
              <Sidebar />
              <main className="relative z-10 transition-all duration-300 pl-0 md:pl-64">
                <div className="p-6">
                  {children}
                </div>
              </main>
            </div>
          </AuthGate>
        </Providers>
      </body>
    </html>
  );
}