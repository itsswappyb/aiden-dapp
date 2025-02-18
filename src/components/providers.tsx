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
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
      config={{
        appearance: {
          theme: 'dark',
          accentColor: '#87fafd',
          logo: '/Aiden-logo.png',
        },
        // embeddedWallets: {
        //   solana: {
        //     createOnLogin: 'users-without-wallets',
        //   },
        // },
        // loginMethods: ['email', 'wallet'],
      }}
    >
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </PrivyProvider>
  );
}
