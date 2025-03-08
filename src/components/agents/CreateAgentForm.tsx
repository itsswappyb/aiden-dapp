'use client';

import { useState } from 'react';
import { TwitterLogoIcon } from '@radix-ui/react-icons';
import { RocketLaunchIcon } from '@heroicons/react/24/outline';

interface CreateAgentFormProps {
  onFormSubmit: (formData: { runDuration: number }) => Promise<void>;
  isLoading: boolean;
}

export function CreateAgentForm({ onFormSubmit, isLoading }: CreateAgentFormProps) {
  const [runDuration, setRunDuration] = useState(60);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onFormSubmit({ runDuration });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <TwitterLogoIcon className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-medium text-white">Deploy Twitter Agent</h3>
        </div>
        <p className="text-gray-400 text-sm">
          Deploy an AI agent that can interact with Twitter on your behalf.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="runDuration" className="block text-sm font-medium text-gray-200 mb-1">
            Run Duration (seconds)
          </label>
          <input
            type="number"
            id="runDuration"
            value={runDuration}
            onChange={e => setRunDuration(Number(e.target.value))}
            min={1}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-1 text-sm text-gray-400">
            How long should the agent run before stopping? (Default: 60 seconds)
          </p>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="submit"
          disabled={isLoading}
          className="button-primary flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Deploying...
            </>
          ) : (
            <>
              <RocketLaunchIcon className="w-5 h-5 mr-2" />
              Deploy Agent
            </>
          )}
        </button>
      </div>
    </form>
  );
}
