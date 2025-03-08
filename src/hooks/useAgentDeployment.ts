import { useState, useCallback } from 'react';
import { useWallets } from '@privy-io/react-auth';
import { createPublicClient, http, parseEther, encodeFunctionData } from 'viem';
import { mantleSepoliaTestnet } from 'viem/chains';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_AGENT_DEPLOYMENT_CONTRACT || '';

export const agentDeploymentABI = [
  {
    inputs: [],
    name: 'payDeploymentFee',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'checkPaymentStatus',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'deploymentFee',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export function useAgentDeployment() {
  const { wallets } = useWallets();
  const [isPaid, setIsPaid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkPaymentStatus = useCallback(async () => {
    if (!wallets?.[0]?.address) return false;

    const publicClient = createPublicClient({
      chain: mantleSepoliaTestnet,
      transport: http(),
    });

    try {
      const status = await publicClient.readContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: agentDeploymentABI,
        functionName: 'checkPaymentStatus',
        args: [wallets[0].address as `0x${string}`],
      });
      setIsPaid(status);
      return status;
    } catch (error) {
      console.error('Error checking payment status:', error);
      return false;
    }
  }, [wallets]);

  const payDeploymentFee = useCallback(async () => {
    if (!wallets?.[0]) throw new Error('No wallet connected');
    setIsLoading(true);

    try {
      const wallet = wallets[0];
      await wallet.switchChain(5003);

      const publicClient = createPublicClient({
        chain: mantleSepoliaTestnet,
        transport: http(),
      });

      // Get the deployment fee
      const fee = await publicClient.readContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: agentDeploymentABI,
        functionName: 'deploymentFee',
      });

      // Create the transaction data
      const data = encodeFunctionData({
        abi: agentDeploymentABI,
        functionName: 'payDeploymentFee',
      });

      // Get the provider
      const provider = await wallet.getEthereumProvider();

      // Send the transaction
      const tx = await provider.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: wallet.address,
            to: CONTRACT_ADDRESS,
            value: `0x${fee.toString(16)}`, // Convert to hex
            data,
          },
        ],
      });

      console.log('Transaction hash:', tx);
      setIsPaid(true);
    } catch (error) {
      console.error('Error paying deployment fee:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [wallets]);

  return {
    isPaid,
    isLoading,
    payDeploymentFee,
    checkPaymentStatus,
  };
}
