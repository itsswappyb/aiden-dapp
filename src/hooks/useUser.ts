import { useEffect } from 'react';
import { usePrivy, useSolanaWallets } from '@privy-io/react-auth';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER, INSERT_USER } from '@/graphql/queries/user';
import { useAtom } from 'jotai';
import { userIdAtom } from '@/store/atoms';

export function useUser() {
  const { authenticated } = usePrivy();
  const { wallets } = useSolanaWallets();
  const solanaWallet = wallets[0];
  const [userId, setUserId] = useAtom(userIdAtom);

  const { refetch: refetchUser, loading: userLoading } = useQuery(GET_USER, {
    skip: true,
    notifyOnNetworkStatusChange: true,
  });

  const [insertUser, { loading: insertLoading }] = useMutation(INSERT_USER);

  useEffect(() => {
    const initializeUser = async () => {
      if (authenticated && solanaWallet?.address) {
        try {
          // Try to fetch existing user
          const { data: existingUser } = await refetchUser({
            wallet_address: solanaWallet.address,
          });

          if (existingUser?.users?.length > 0) {
            setUserId(existingUser.users[0].id);
            return;
          }

          // If no user exists, create a new one
          const { data: newUser } = await insertUser({
            variables: {
              wallet_address: solanaWallet.address,
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
  }, [authenticated, solanaWallet?.address]);

  return {
    userId,
    loading: userLoading || insertLoading,
  };
}
