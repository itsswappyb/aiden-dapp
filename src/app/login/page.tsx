'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { login, ready, authenticated } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && authenticated) {
      router.push('/dashboard');
    }
  }, [ready, authenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#011829] via-[#030f1c] to-black">
      <div className="max-w-md w-full p-6 space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-white">Welcome to Aiden</h2>
          <p className="mt-2 text-sm text-gray-400">Connect your wallet to continue</p>
        </div>
        <div className="mt-8">
          <button
            onClick={login}
            disabled={!ready}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
}
