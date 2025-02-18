'use client';

import { ReactNode } from 'react';
import Navbar from './Navbar';
import { NotificationProvider } from '@/contexts/NotificationContext';
import Notification from '@/components/ui/Notification';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <NotificationProvider>
      <div className="min-h-screen bg-gradient-to-b from-[#011829] via-[#030f1c] to-black">
        <Navbar />
        <main className="pt-16 min-h-screen">{children}</main>
        <footer className="glass-effect border-t border-white/5 py-8">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="text-center text-white/70">
              <p>© 2024 Aiden. All rights reserved.</p>
            </div>
          </div>
        </footer>
        <Notification />
      </div>
    </NotificationProvider>
  );
};

export default Layout;
