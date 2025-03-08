'use client';

import { useState } from 'react';
import { useAgentDeployment } from '@/hooks/useAgentDeployment';

export default function TwitterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { isPaid, isLoading: isPaymentLoading, payDeploymentFee } = useAgentDeployment();

  const handleDeploy = async () => {
    if (!isPaid) {
      try {
        await payDeploymentFee();
      } catch (error) {
        console.error('Payment failed:', error);
        return;
      }
    }

    setIsLoading(true);
    try {
      // Existing deployment logic...
    } catch (error) {
      console.error('Deployment failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* ... existing form fields ... */}

      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={handleDeploy}
          disabled={isLoading || isPaymentLoading}
          className="button-primary disabled:opacity-50"
        >
          {isPaymentLoading ? 'Paying Fee...' : isLoading ? 'Deploying...' : 'Deploy Agent'}
        </button>

        <div className="text-sm text-gray-500">
          {!isPaid && (
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">⚠️</span>
              <span>Requires 1 MNT token payment to deploy</span>
            </div>
          )}
          {isPaid && (
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Payment completed</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
