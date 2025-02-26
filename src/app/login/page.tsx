'use client';

import { usePrivy, useSolanaWallets } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import { gql, useMutation, useQuery } from '@apollo/client';
import { userIdAtom } from '@/components/LoginButton';
import { useAtom } from 'jotai';

// Define the GraphQL mutation
const INSERT_USER = gql`
  mutation InsertUser($wallet_address: String!) {
    insert_users_one(object: { wallet_address: $wallet_address }) {
      id
    }
  }
`;

// Add the query to fetch user by wallet address
const GET_USER = gql`
  query GetUser($wallet_address: String!) {
    users(where: { wallet_address: { _eq: $wallet_address } }) {
      id
    }
  }
`;

export default function LoginPage() {
  const { login, ready, authenticated } = usePrivy();
  const router = useRouter();
  const { wallets } = useSolanaWallets();
  const solanaWallet = wallets[0];
  const [, setUserId] = useAtom(userIdAtom);

  // Add the mutation hook
  const [insertUser] = useMutation(INSERT_USER);

  // Add the query hook
  const { refetch: refetchUser } = useQuery(GET_USER, {
    skip: true,
    notifyOnNetworkStatusChange: true,
  });

  // Handle user authentication and wallet setup
  const saveUser = async (walletAddress: string) => {
    try {
      // First try to fetch existing user
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
      if (solanaWallet?.address) {
        saveUser(solanaWallet.address);
      }
      router.push('/dashboard');
    }
  }, [ready, authenticated, router, solanaWallet?.address]);

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
