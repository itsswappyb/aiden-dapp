'use client';

import { usePrivy, useSolanaWallets } from '@privy-io/react-auth';
import { UserGroupIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { atom, useAtom } from 'jotai';

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

// Create a global atom to store the user ID
export const userIdAtom = atom<string | null>(null);

export function LoginButton() {
  const { ready, authenticated, login, logout } = usePrivy();
  const { wallets } = useSolanaWallets();
  const solanaWallet = wallets[0]; // Get the first Solana wallet
  const [, setUserId] = useAtom(userIdAtom);
  console.log({ solanaWallet });
  const disableLogin = !ready || (ready && authenticated);
  const [solanaWalletReady, setSolanaWalletReady] = useState(false);
  console.log({ solanaWalletReady });

  // Add the mutation hook
  const [insertUser] = useMutation(INSERT_USER);

  // Add the query hook
  const { refetch: refetchUser } = useQuery(GET_USER, {
    skip: true, // Don't run query automatically
    notifyOnNetworkStatusChange: true,
  });

  // Update saveUser method to first check if user exists
  const saveUser = async (walletAddress: string) => {
    try {
      // First try to fetch existing user
      const { data: existingUser } = await refetchUser({
        wallet_address: walletAddress,
      });
      console.log({ existingUser });

      if (existingUser.users.length > 0) {
        // User exists, set their ID
        setUserId(existingUser.users[0].id);
        console.log('Existing user found:', existingUser.users[0].id);
        return;
      }

      // User doesn't exist, create new user
      const { data: newUser } = await insertUser({
        variables: {
          wallet_address: walletAddress,
        },
      });
      console.log('New user saved:', newUser);
      setUserId(newUser.insert_users_one.id);
    } catch (error) {
      console.error('Error saving/fetching user:', error);
    }
  };

  useEffect(() => {
    if (solanaWallet?.address) {
      setSolanaWalletReady(true);
      // Save user when wallet is connected
      saveUser(solanaWallet.address);
    }
  }, [solanaWallet?.address]);

  if (!ready) {
    return null;
  }

  if (!authenticated) {
    return (
      <div className="glass-card p-4">
        <button
          disabled={disableLogin}
          onClick={login}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-accent/20 hover:bg-accent/30 rounded-lg transition-colors"
        >
          <UserGroupIcon className="w-4 h-4 flex-shrink-0" />
          <span className="whitespace-nowrap">Connect Wallet</span>
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card p-4">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-[#87fafd]/20 flex items-center justify-center">
          <UserGroupIcon className="w-4 h-4 text-accent" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-white/70">Connected Wallet</p>
          <p className="text-xs text-accent truncate">
            {solanaWallet?.address.slice(0, 4)}...{solanaWallet?.address.slice(-4)}
          </p>
          <button
            onClick={e => {
              e.preventDefault();
              logout();
            }}
            className="text-xs text-red-400 hover:text-red-300 mt-1"
          >
            Disconnect
          </button>
        </div>
      </div>
    </div>
  );
}
