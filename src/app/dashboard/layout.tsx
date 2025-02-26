'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChartBarIcon, CommandLineIcon, DocumentIcon } from '@heroicons/react/24/outline';
import AuthWrapper from '@/components/auth/AuthWrapper';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: ChartBarIcon },
  { name: 'My Agents', href: '/dashboard/agents', icon: CommandLineIcon },
  { name: 'Knowledge Base', href: '/dashboard/knowledge', icon: DocumentIcon },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <AuthWrapper>
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
                    d={
                      isSidebarOpen ? 'M11 19l-7-7 7-7m8 14l-7-7 7-7' : 'M13 5l7 7-7 7M5 5l7 7-7 7'
                    }
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
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <div className="py-6 px-4 sm:px-6 lg:px-8">{children}</div>
        </div>
      </div>
    </AuthWrapper>
  );
}
