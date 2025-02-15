'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/lib/apollo-client';
import { useEffect, useState } from 'react';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_API_KEY || ''}
        config={{
          // Customize Privy's appearance in your app
          appearance: {
            theme: 'dark',
            accentColor: '#87fafd',
            logo: '/suitami-logo.png',
          },
          // Create embedded wallets for users who don't have a wallet
          embeddedWallets: {
            // createOnLogin: 'users-without-wallets',
            solana: {
              createOnLogin: 'users-without-wallets', // defaults to 'off'
            },
          },
          loginMethods: ['email', 'wallet'],
        }}
      >
        {children}
      </PrivyProvider>
    </ApolloProvider>
  );
}
