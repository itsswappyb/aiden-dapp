'use client';

import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';

import { useMutation, useQuery } from '@apollo/client';
import { userIdAtom } from '@/store/atoms';
import { useAtom } from 'jotai';
import { GET_USER, INSERT_USER } from '@/graphql/queries/user';

export default function LoginPage() {
  const { login, ready, authenticated } = usePrivy();
  const router = useRouter();
  const { wallets } = useWallets();
  const [, setUserId] = useAtom(userIdAtom);

  // Add the mutation hook
  const [insertUser] = useMutation(INSERT_USER);

  // Add the query hook
  const { refetch: refetchUser } = useQuery(GET_USER, {
    skip: true,
    notifyOnNetworkStatusChange: true,
  });

  // Handle user authentication and wallet setup
  const saveUser = async () => {
    try {
      if (!wallets || wallets.length === 0) return;
      const wallet = wallets[0];

      // First get the wallet address
      const walletAddress = wallet.address;
      console.log('walletAddress', walletAddress);
      if (!walletAddress) return;

      // Then try to switch chain
      try {
        await wallet.switchChain(5003);
      } catch (error) {
        console.error('Error switching chain:', error);
        return;
      }

      // Try to fetch existing user
      const { data: existingUser } = await refetchUser({
        wallet_address: walletAddress,
      });

      if (existingUser?.users?.length > 0) {
        // User exists, set their ID
        setUserId(existingUser.users[0].id);
        return;
      }

      // User doesn't exist, create new user
      const { data: newUser } = await insertUser({
        variables: {
          wallet_address: walletAddress,
        },
      });

      if (newUser?.insert_users_one?.id) {
        setUserId(newUser.insert_users_one.id);
      }
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  useEffect(() => {
    if (ready && authenticated) {
      saveUser();
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
