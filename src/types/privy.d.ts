import { WalletClient } from 'viem';

declare module '@privy-io/react-auth' {
  interface ConnectedWallet {
    address: string;
    switchChain: (chainId: number) => Promise<void>;
    getEthereumProvider: () => Promise<{
      request: (request: { method: string; params: any[] }) => Promise<string>;
    }>;
  }
}
