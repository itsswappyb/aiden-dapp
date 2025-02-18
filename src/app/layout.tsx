import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/components/ui/ToastContext';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Aiden - AI Agents for Web3 Communities',
  description: 'Deploy autonomous AI agents to manage and grow your Web3 community',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark h-full">
      <body
        className={`${inter.className} dark h-full bg-gradient-to-b from-[#011829] via-[#030f1c] to-black text-white antialiased`}
      >
        <Providers>
          <ToastProvider>{children}</ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
