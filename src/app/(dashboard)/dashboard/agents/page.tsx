'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { CreateAgentForm } from '@/components/agents/CreateAgentForm';
import {
  PlusIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  RocketLaunchIcon,
  CommandLineIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import {
  // DiscordLogoIcon,
  TwitterLogoIcon,
  // InstagramLogoIcon,
  // LinkedInLogoIcon,
} from '@radix-ui/react-icons';
import { useMutation, useQuery } from '@apollo/client';
import { userIdAtom } from '@/store/atoms';
import { useAtom } from 'jotai';
import { useToast } from '@/components/ui/ToastContext';
import { usePrivy } from '@privy-io/react-auth';
import { GET_CHARACTERS } from '@/graphql/queries/characters';
import { INSERT_CHARACTER, START_AGENT, STOP_AGENT } from '@/graphql/mutations/characters';

// Custom icons for platforms without built-in icons
const TelegramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm5.82 8.307l-1.97 9.274c-.146.658-.537.818-1.084.51l-3-2.21-1.446 1.394c-.16.16-.295.295-.607.295-.39 0-.326-.15-.46-.53l-1.033-3.394-3.014-1.008c-.65-.216-.66-.65.136-.968l11.74-4.522c.533-.198 1.05.126.737 1.16z" />
  </svg>
);

const FarcasterIcon = ({ className }: { className?: string }) => (
  <div className={`flex items-center justify-center border border-current rounded-sm ${className}`}>
    <span className="text-xs font-semibold">F</span>
  </div>
);

export default function AgentsPage() {
  const [userId] = useAtom(userIdAtom);
  const { showToast } = useToast();
  const { authenticated } = usePrivy();
  const [activeFilter, setActiveFilter] = useState('all');
  const [activePlatformFilter, setActivePlatformFilter] = useState('all');
  const [showDeployModal, setShowDeployModal] = useState(false);

  const [isDeploying, setIsDeploying] = useState(false);

  // Add both mutation hooks
  const [insertCharacter] = useMutation(INSERT_CHARACTER);
  const [startAgent, { loading: startAgentLoading, error: startAgentError, data: startAgentData }] =
    useMutation(START_AGENT);
  const [stopAgent] = useMutation(STOP_AGENT);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch characters data
  const {
    data: charactersData,
    loading: charactersLoading,
    error: charactersError,
    refetch: refetchCharacters,
  } = useQuery(GET_CHARACTERS, {
    variables: { userId },
    skip: !userId, // Skip the query if we don't have a userId
    notifyOnNetworkStatusChange: true, // This ensures loading state updates on refetch
  });

  // Determine if we're in a loading state
  const isLoadingCharacters = charactersLoading || (!charactersData && !charactersError);

  console.log('Loading State Debug:', {
    userId,
    charactersLoading,
    hasData: !!charactersData,
    hasError: !!charactersError,
    isLoadingCharacters,
    skip: !userId,
  });

  // Default agent templates
  const defaultAgents = [
    {
      id: 1,
      name: 'Community Manager AI',
      description: 'Manages community engagement and moderates discussions',
      platform: 'discord',
      useCase: 'community',
      status: 'active',
      metrics: {
        messages: 1234,
        engagement: '87%',
        response_time: '30s',
      },
    },
    {
      id: 2,
      name: 'Social Media Assistant',
      description: 'Handles social media interactions and content scheduling',
      platform: 'twitter',
      useCase: 'engagement',
      status: 'active',
      metrics: {
        messages: 856,
        engagement: '92%',
        response_time: '45s',
      },
    },
  ];

  // Merge character data with default agents
  const agents = charactersData?.characters?.map((char: any, index: number) => {
    const characterData = char.character;
    const defaultAgent = defaultAgents[0]; // Use first default as base template

    // Get the first client as platform, fallback to default
    const platform = characterData?.clients?.[0] || defaultAgent.platform;

    // Get the first topic as useCase, fallback to default
    const useCase = characterData?.topics?.[0] || defaultAgent.useCase;

    // Handle bio which could be string or array
    const description = Array.isArray(characterData?.bio)
      ? characterData.bio.join(' ')
      : characterData?.bio || defaultAgent.description;

    return {
      // ...defaultAgent,
      characterId: char.id, // Use the actual character ID from the database
      name: characterData?.name || 'No Name',
      description,
      platform,
      useCase,
      status: char.isActive ? 'active' : 'inactive',
      isPublished: char.isPublished,
      metrics: defaultAgent.metrics, // Keep default metrics since not provided in character data
      // Additional character-specific data
      style: characterData?.style,
      knowledge: characterData?.knowledge,
      modelProvider: characterData?.modelProvider,
      settings: characterData?.settings,
    };
  });

  const useCaseFilters = [
    { id: 'all', name: 'All', icon: CommandLineIcon },
    { id: 'community', name: 'Community', icon: UserGroupIcon },
    { id: 'engagement', name: 'Engagement', icon: ChatBubbleLeftRightIcon },
  ];

  // Added missing icons
  const platformFilters = [
    { id: 'all', name: 'All', icon: GlobeAltIcon },
    { id: 'twitter', name: 'Twitter', icon: TwitterLogoIcon },
    { id: 'telegram', name: 'Telegram', icon: TelegramIcon },
    { id: 'farcaster', name: 'Farcaster', icon: FarcasterIcon },
  ];

  const deploymentTemplates = [
    {
      id: 'community-manager',
      name: 'Community Manager',
      description: 'AI agent specialized in community management and moderation',
      platforms: ['discord', 'twitter'],
      useCase: 'community',
    },
    {
      id: 'engagement-specialist',
      name: 'Engagement Specialist',
      description: 'Focused on increasing social media engagement and interaction',
      platforms: ['twitter', 'instagram', 'linkedin'],
      useCase: 'engagement',
    },
  ];

  const handleStartAgent = async (characterId: string) => {
    try {
      setIsDeploying(true);
      const response = await startAgent({
        variables: {
          characterId,
        },
      });
      showToast('Agent started successfully', 'success');
      console.log('Agent started:', response.data.startAgent);
      await refetchCharacters();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error starting agent';
      showToast(errorMessage, 'error');
      console.error('Error starting agent:', err);
    } finally {
      setIsDeploying(false);
    }
  };

  const handleStopAgent = async (characterId: string) => {
    try {
      setIsDeploying(true);
      const { data } = await stopAgent({
        variables: {
          characterId,
        },
      });

      if (!data?.stopAgent?.id) {
        throw new Error('Failed to stop agent');
      }

      showToast('Agent stopped successfully', 'success');
      await refetchCharacters();
    } catch (error) {
      console.error('Error stopping agent:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to stop agent';
      showToast(errorMessage, 'error');
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gradient">My Agents</h1>
          <p className="text-white/70 mt-1">Manage and monitor your AI agents</p>
        </div>
        <button
          onClick={() => {
            if (!authenticated) {
              showToast('Please connect your wallet first', 'warning');
              return;
            }
            setShowDeployModal(true);
          }}
          className="button-primary flex items-center"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Deploy New Agent
        </button>
      </div>

      <div className="glass-card">
        <div className="p-6 border-b border-white/10">
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-white/70 mb-2">Use Case</label>
              <div className="flex flex-wrap gap-2">
                {useCaseFilters.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex items-center px-3 py-2 rounded-lg border text-sm whitespace-nowrap ${
                      activeFilter === filter.id
                        ? 'border-accent text-accent bg-accent/10'
                        : 'border-white/10 text-white/70 hover:border-white/20'
                    }`}
                  >
                    <filter.icon className="w-4 h-4 mr-1.5" />
                    {filter.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-white/70 mb-2">Platform</label>
              <div className="flex flex-wrap gap-2">
                {platformFilters.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setActivePlatformFilter(filter.id)}
                    className={`flex items-center px-3 py-2 rounded-lg border text-sm whitespace-nowrap ${
                      activePlatformFilter === filter.id
                        ? 'border-accent text-accent bg-accent/10'
                        : 'border-white/10 text-white/70 hover:border-white/20'
                    }`}
                  >
                    {filter.icon && <filter.icon className="w-4 h-4 mr-1.5" />}
                    {filter.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoadingCharacters ? (
              // Skeleton loading state
              <>
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-2">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-48" />
                      </div>
                      <Skeleton className="h-6 w-16" />
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {[1, 2, 3].map(j => (
                        <div key={j} className="text-center p-2 rounded-lg bg-white/5">
                          <Skeleton className="h-3 w-12 mx-auto mb-1" />
                          <Skeleton className="h-6 w-8 mx-auto" />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end space-x-3">
                      <Skeleton className="h-8 w-20" />
                      <Skeleton className="h-8 w-24" />
                    </div>
                  </div>
                ))}
              </>
            ) : (
              (agents || [])
                .filter(
                  // @ts-expect-error y r u ghey
                  agent =>
                    (activeFilter === 'all' || agent.useCase === activeFilter) &&
                    (activePlatformFilter === 'all' || agent.platform === activePlatformFilter)
                )
                // @ts-expect-error y r u ghey
                .map(agent => (
                  <motion.div
                    key={agent.characterId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-white">{agent.name}</h3>
                        <p className="text-white/50 text-sm mt-1">{agent.description}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          agent.status === 'active'
                            ? 'bg-green-500/10 text-green-500'
                            : 'bg-yellow-500/10 text-yellow-500'
                        }`}
                      >
                        {agent.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-2 rounded-lg bg-white/5">
                        <p className="text-xs text-white/50">Messages</p>
                        <p className="text-lg font-medium text-accent">{agent.metrics.messages}</p>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-white/5">
                        <p className="text-xs text-white/50">Engagement</p>
                        <p className="text-lg font-medium text-accent">
                          {agent.metrics.engagement}
                        </p>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-white/5">
                        <p className="text-xs text-white/50">Response</p>
                        <p className="text-lg font-medium text-accent">
                          {agent.metrics.response_time}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3">
                      {agent.status === 'active' ? (
                        <button
                          className="px-4 py-2 text-sm font-medium rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                          onClick={() => {
                            handleStopAgent(agent.characterId);
                          }}
                        >
                          Stop
                        </button>
                      ) : (
                        <button
                          className="px-4 py-2 text-sm font-medium rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors"
                          onClick={() => {
                            handleStartAgent(agent.characterId);
                          }}
                        >
                          Start
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))
            )}
          </div>
        </div>
      </div>

      {showDeployModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl max-h-[80vh] overflow-y-auto relative rounded-xl bg-gradient-to-b from-[#011829] via-[#030f1c] to-black/50 border border-white/5"
          >
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-medium text-white">Deploy New Agent</h2>
                <button
                  onClick={() => setShowDeployModal(false)}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
                  {error}
                </div>
              )}
              <div className="rounded-lg">
                <CreateAgentForm
                  isLoading={isLoading}
                  onFormSubmit={async formData => {
                    try {
                      setIsLoading(true);
                      setError(null);

                      // Debug log
                      console.log('Form data being sent:', {
                        runDuration: formData.runDuration,
                        twitterApiKey: formData.twitterApiKey,
                        twitterApiSecret: formData.twitterApiSecret,
                        twitterAccessToken: formData.twitterAccessToken,
                        twitterAccessSecret: formData.twitterAccessSecret,
                      });

                      const response = await fetch('/api/twitter', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          runDuration: formData.runDuration,
                          twitterApiKey: formData.twitterApiKey,
                          twitterApiSecret: formData.twitterApiSecret,
                          twitterAccessToken: formData.twitterAccessToken,
                          twitterAccessSecret: formData.twitterAccessSecret,
                        }),
                      });

                      const data = await response.json();
                      console.log('API Response:', { status: response.status, data });

                      if (!response.ok) {
                        throw new Error(data.error || 'Failed to deploy Twitter agent');
                      }

                      showToast('Twitter agent deployed successfully!', 'success');
                      setShowDeployModal(false);
                    } catch (error) {
                      const errorMessage =
                        error instanceof Error ? error.message : 'Failed to deploy Twitter agent';
                      console.error('Error deploying Twitter agent:', error);
                      setError(errorMessage);
                      showToast(errorMessage, 'error');
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                />
              </div>
              {/* <div className="flex justify-end space-x-3">
                <button onClick={() => setShowDeployModal(false)} className="button-secondary">
                  Cancel
                </button>
                <button
                  onClick={() => setShowDeployModal(false)}
                  disabled={isLoading}
                  className="button-primary flex items-center"
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
              </div> */}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
