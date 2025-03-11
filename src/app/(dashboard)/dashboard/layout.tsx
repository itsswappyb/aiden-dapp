'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  ChartBarIcon,
  CommandLineIcon,
  DocumentIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

import { usePrivy, useWallets } from '@privy-io/react-auth';
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
  const { wallets } = useWallets();
  const { userId, loading: userLoading } = useUser();
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    const setupWallet = async () => {
      if (!wallets || wallets.length === 0) {
        setWalletAddress('');
        return;
      }
      const wallet = wallets[0];
      try {
        await wallet.switchChain(5003);
        setWalletAddress(wallet.address || '');
      } catch (error) {
        console.error('Error switching chain:', error);
        setWalletAddress('');
      }
    };

    setupWallet();
  }, [wallets]);

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
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} flex-shrink-0 border-r border-white/5 transition-all duration-300 ease-in-out relative`}
      >
        <div className="h-full flex flex-col py-4">
          <div className="flex items-center px-4 mb-8 relative">
            <Link href="/dashboard" className="flex items-center relative">
              <Image
                src={
                  process.env.NODE_ENV === 'production'
                    ? 'https://raw.githubusercontent.com/itsswappyb/aiden-dapp/main/public/aiden-fox.png'
                    : '/aiden-fox.png'
                }
                alt="Aiden Fox Logo"
                width={28}
                height={28}
                className="w-7 h-7 flex-shrink-0 z-10"
              />
              <span
                className={`ml-10 absolute whitespace-nowrap text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-[#87fafd] transition-all duration-300 ${
                  isSidebarOpen
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-4 pointer-events-none'
                }`}
              >
                Aiden
              </span>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-white/5 absolute right-2 top-0"
              aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
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
              const isActive =
                item.href === '/dashboard'
                  ? pathname === '/dashboard'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200 ease-in-out ${
                    isActive
                      ? 'bg-gradient-to-r from-white/10 to-[#87fafd]/20 font-medium border-l-2 border-[#87fafd]'
                      : 'border-l-2 border-transparent text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <item.icon
                    className={`h-5 w-5 shrink-0 transition-colors ${
                      isActive ? 'text-[#87fafd]' : 'text-gray-400 group-hover:text-white'
                    }`}
                    aria-hidden="true"
                  />
                  <span
                    className={`whitespace-nowrap overflow-hidden transition-all duration-200 ${
                      isActive ? 'font-bold text-white' : ''
                    } ${isSidebarOpen ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0'}`}
                  >
                    {item.name}
                  </span>
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
                      {formatWalletAddress(walletAddress)}
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
