'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ChartBarIcon,
  CommandLineIcon,
  DocumentIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

import { usePrivy, useSolanaWallets } from '@privy-io/react-auth';
import { useUser } from '@/hooks/useUser';

const formatWalletAddress = (address: string | undefined) => {
  if (!address) return '';
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: ChartBarIcon },
  { name: 'My Agents', href: '/dashboard/agents', icon: CommandLineIcon },
  { name: 'Knowledge Base', href: '/dashboard/knowledge', icon: DocumentIcon },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, logout, ready, authenticated } = usePrivy();
  const { wallets } = useSolanaWallets();
  const solanaWallet = wallets[0]; // Get the first Solana wallet
  const { userId, loading: userLoading } = useUser();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/login');
    }
  }, [ready, authenticated, router]);

  if (!ready || userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#011829] via-[#030f1c] to-black">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-b from-[#011829] via-[#030f1c] to-black">
      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} flex-shrink-0 border-r border-white/5 transition-all duration-300 ease-in-out`}
      >
        <div className="h-full flex flex-col py-4">
          <div className="flex items-center justify-between px-4 mb-8">
            <Link href="/dashboard" className="flex items-center">
              <span className={`text-xl font-bold text-white ${!isSidebarOpen && 'hidden'}`}>
                Aiden
              </span>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-white/5"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isSidebarOpen ? 'M11 19l-7-7 7-7m8 14l-7-7 7-7' : 'M13 5l7 7-7 7M5 5l7 7-7 7'}
                />
              </svg>
            </button>
          </div>

          <nav className="flex-1 space-y-1 px-2">
            {navigation.map(item => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'} flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out`}
                >
                  <item.icon className="mr-3 flex-shrink-0 h-6 w-6" />
                  {isSidebarOpen && <span>{item.name}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Wallet Section */}
          <div className="px-2 py-4 border-t border-white/5">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#87fafd]/20 flex items-center justify-center flex-shrink-0">
                <UserGroupIcon className="w-4 h-4 text-[#87fafd]" />
              </div>
              {isSidebarOpen && (
                <div className="flex-1 min-w-0 space-y-2">
                  <div>
                    <p className="text-sm text-white/70">Connected Wallet</p>
                    <p className="text-sm font-medium text-[#87fafd]">
                      {formatWalletAddress(solanaWallet?.address)}
                    </p>
                  </div>
                  <button
                    onClick={logout}
                    className="button-primary w-full bg-gradient-to-r from-red-500/20 to-red-500/10 
                               border-red-500/30 hover:border-red-500/50 hover:bg-red-500/20
                               focus:ring-red-500/50 text-sm py-1.5"
                  >
                    Disconnect
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="py-6 px-4 sm:px-6 lg:px-8">{children}</div>
      </div>
    </div>
  );
}
