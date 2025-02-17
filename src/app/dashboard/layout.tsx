'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  CommandLineIcon,
  ChatBubbleLeftRightIcon,
  DocumentIcon,
  BeakerIcon,
} from '@heroicons/react/24/outline';
import { Providers } from '@/components/providers';
import { usePrivy, useSolanaWallets } from '@privy-io/react-auth';
import { LoginButton } from '@/components/LoginButton';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: ChartBarIcon },
  { name: 'My Agents', href: '/dashboard/agents', icon: CommandLineIcon },
  { name: 'Knowledge Base', href: '/dashboard/knowledge', icon: DocumentIcon },
  // { name: 'Training Center', href: '/dashboard/training', icon: BeakerIcon },
  // { name: 'Community', href: '/dashboard/community', icon: UserGroupIcon },
  // { name: 'Conversations', href: '/dashboard/conversations', icon: ChatBubbleLeftRightIcon },
  // { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { ready, authenticated, user, login, logout } = usePrivy();
  const { wallets } = useSolanaWallets();
  console.log({ wallets });

  // const renderWalletSection = () => {
  //   if (!ready) {
  //     return null;
  //   }

  //   if (!authenticated) {
  //     return <LoginButton />;
  //   }

  //   return (
  //     <div className="flex items-center">
  //       <div className="w-8 h-8 rounded-full bg-[#87fafd]/20 flex items-center justify-center">
  //         <UserGroupIcon className="w-4 h-4 text-accent" />
  //       </div>
  //       {isSidebarOpen && (
  //         <div className="ml-3">
  //           <p className="text-sm text-white/70">Connected Wallet</p>
  //           <p className="text-xs text-accent truncate">{user?.wallet?.address}</p>
  //           <button onClick={handleLogout} className="text-xs text-red-400 hover:text-red-300 mt-1">
  //             Disconnect
  //           </button>
  //         </div>
  //       )}
  //     </div>
  //   );
  // };

  return (
    <Providers>
      <div className="min-h-screen">
        <div className="flex min-h-screen bg-dark-gradient">
          {/* Sidebar */}
          <motion.aside
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            className={`${
              isSidebarOpen ? 'w-64' : 'w-20'
            } glass-effect border-r border-white/5 p-4 transition-all duration-300 fixed h-screen`}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <Link href="/dashboard" className="text-gradient font-semibold text-xl">
                  Aiden
                </Link>
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-white/70"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        isSidebarOpen
                          ? 'M11 19l-7-7 7-7m8 14l-7-7 7-7'
                          : 'M13 5l7 7-7 7M5 5l7 7-7 7'
                      }
                    />
                  </svg>
                </button>
              </div>

              <nav className="flex-1">
                <ul className="space-y-2">
                  {navigation.map(item => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
                            isActive
                              ? 'bg-[#87fafd]/10 text-accent'
                              : 'text-white/70 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <item.icon className={`w-6 h-6 ${isSidebarOpen ? 'mr-3' : ''}`} />
                          {isSidebarOpen && <span>{item.name}</span>}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mt-auto">
                {/* <div className="glass-card p-4">{renderWalletSection()}</div> */}
                <LoginButton />
              </div>
            </div>
          </motion.aside>

          {/* Main Content */}
          <main
            className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}
          >
            <div className="p-8">{children}</div>
          </main>
        </div>
      </div>
    </Providers>
  );
}
