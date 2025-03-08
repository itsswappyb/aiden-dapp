import { useEffect, useState } from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER, INSERT_USER } from '@/graphql/queries/user';
import { useAtom } from 'jotai';
import { userIdAtom } from '@/store/atoms';

export function useUser() {
  const { user, authenticated, login, logout } = usePrivy();
  const { wallets } = useWallets();
  const [userId, setUserId] = useAtom(userIdAtom);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const { refetch: refetchUser, loading: userLoading } = useQuery(GET_USER, {
    skip: true,
    notifyOnNetworkStatusChange: true,
  });

  const [insertUser, { loading: insertLoading }] = useMutation(INSERT_USER);

  useEffect(() => {
    const setupWallet = async () => {
      if (!wallets || wallets.length === 0) {
        setWalletAddress(null);
        return;
      }
      const wallet = wallets[0];
      try {
        await wallet.switchChain(5003);
        console.log('walletAddress', wallet.address);
        setWalletAddress(wallet.address);
      } catch (error) {
        console.error('Error switching chain:', error);
        setWalletAddress(null);
      }
    };

    setupWallet();
  }, [wallets]);

  useEffect(() => {
    const initializeUser = async () => {
      if (authenticated && walletAddress) {
        try {
          // Try to fetch existing user
          const { data: existingUser } = await refetchUser({
            wallet_address: walletAddress,
          });

          if (existingUser?.users?.length > 0) {
            setUserId(existingUser.users[0].id);
            return;
          }

          // If no user exists, create a new one
          const { data: newUser } = await insertUser({
            variables: {
              wallet_address: walletAddress,
            },
          });

          if (newUser?.insert_users_one?.id) {
            setUserId(newUser.insert_users_one.id);
          }
        } catch (error) {
          console.error('Error initializing user:', error);
        }
      }
    };

    initializeUser();
  }, [authenticated, walletAddress]);

  return {
    user,
    authenticated,
    login,
    logout,
    walletAddress,
    userId,
    loading: userLoading || insertLoading,
  };
}
