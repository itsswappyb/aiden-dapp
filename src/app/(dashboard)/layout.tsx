'use client';

import { ReactNode } from 'react';
import { Providers } from '@/components/providers';

export default function DashboardRootLayout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <div className="min-h-screen bg-gradient-to-b from-[#011829] via-[#030f1c] to-black">
        {children}
      </div>
    </Providers>
  );
}
