'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';

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
        <div className="text-center space-y-6">
          <div className="relative w-24 h-24 mx-auto">
            <Image
              src="/aiden-logo.png"
              alt="Aiden Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gradient">Welcome to Aiden</h2>
            <p className="mt-2 text-sm text-white/70">Connect your wallet to continue</p>
          </div>
        </div>
        <div className="mt-8">
          <button
            onClick={login}
            disabled={!ready}
            className="button-primary w-full flex justify-center items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Connect Wallet</span>
          </button>
        </div>
      </div>
    </div>
  );
}
