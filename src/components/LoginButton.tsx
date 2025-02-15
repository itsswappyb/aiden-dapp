'use client';

import { usePrivy, useSolanaWallets } from '@privy-io/react-auth';
import { UserGroupIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

// Define the GraphQL mutation
const INSERT_USER = gql`
  mutation InsertUser($wallet_address: String!) {
    insert_users_one(object: { wallet_address: $wallet_address }) {
      id
    }
  }
`;

export function LoginButton() {
  const { ready, authenticated, login, logout } = usePrivy();
  const { wallets } = useSolanaWallets();
  const solanaWallet = wallets[0]; // Get the first Solana wallet
  console.log({ solanaWallet });
  const disableLogin = !ready || (ready && authenticated);
  const [solanaWalletReady, setSolanaWalletReady] = useState(false);
  console.log({ solanaWalletReady });

  // Add the mutation hook
  const [insertUser] = useMutation(INSERT_USER);

  // Add saveUser method
  const saveUser = async (walletAddress: string) => {
    try {
      const { data } = await insertUser({
        variables: {
          wallet_address: walletAddress,
        },
      });
      console.log('User saved:', data);
    } catch (error) {
      console.error('Error saving user:', error);
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
