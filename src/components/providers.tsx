'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/lib/apollo-client';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { ToastProvider } from '@/components/ui/ToastContext';
import { Provider as JotaiProvider } from 'jotai';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  // Skip Privy initialization during static build
  if (typeof window === 'undefined' && !process.env.NEXT_PUBLIC_PRIVY_APP_ID) {
    return <>{children}</>;
  }

  return (
    <JotaiProvider>
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
        config={{
          appearance: {
            theme: 'dark',
            accentColor: '#87fafd',
            logo: '/Aiden-logo.png',
          },
          embeddedWallets: {
            solana: {
              createOnLogin: 'all-users',
            },
            ethereum: {
              createOnLogin: 'all-users', // defaults to 'off'
            },
          },
        }}
      >
        <ApolloProvider client={client}>
          <NotificationProvider>
            <ToastProvider>{children}</ToastProvider>
          </NotificationProvider>
        </ApolloProvider>
      </PrivyProvider>
    </JotaiProvider>
  );
}
