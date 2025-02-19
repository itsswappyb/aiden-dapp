'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  RocketLaunchIcon,
  CommandLineIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import {
  DiscordLogoIcon,
  TwitterLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from '@radix-ui/react-icons';
import { useMutation, useQuery } from '@apollo/client';
import { userIdAtom } from '@/components/LoginButton';
import { useAtom } from 'jotai';
import { useToast } from '@/components/ui/ToastContext';
import { usePrivy } from '@privy-io/react-auth';
import { GET_CHARACTERS } from '@/graphql/queries/characters';
import { INSERT_CHARACTER, START_AGENT } from '@/graphql/mutations/characters';

export default function AgentsPage() {
  const [userId] = useAtom(userIdAtom);
  const { showToast } = useToast();
  const { authenticated } = usePrivy();
  const [activeFilter, setActiveFilter] = useState('all');
  const [activePlatformFilter, setActivePlatformFilter] = useState('all');
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [characterJson, setCharacterJson] = useState<any>(null);
  const [isDeploying, setIsDeploying] = useState(false);

  // Add both mutation hooks
  const [insertCharacter] = useMutation(INSERT_CHARACTER);
  const [startAgent, { loading: startAgentLoading, error: startAgentError, data: startAgentData }] =
    useMutation(START_AGENT);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch characters data
  const {
    data: charactersData,
    loading: charactersLoading,
    error: charactersError,
  } = useQuery(GET_CHARACTERS, {
    variables: { userId },
    skip: !userId, // Skip the query if we don't have a userId
  });

  console.log('userId:', userId);
  console.log('charactersLoading:', charactersLoading);
  console.log('charactersError:', charactersError);
  console.log('charactersData:', charactersData);

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
  const agents =
    charactersData?.characters.map((char: any, index: number) => {
      const characterData = char.character;
      const defaultAgent = defaultAgents[0]; // Use first default as base template

      // Get the first client as platform, fallback to default
      const platform = characterData?.clients?.[0] || defaultAgent.platform;

      // Get the first topic as useCase, fallback to default
      const useCase = characterData?.topics?.[0] || defaultAgent.useCase;

      // Join bio array into a description
      const description = characterData?.bio?.join(' ') || defaultAgent.description;

      return {
        ...defaultAgent,
        id: index + 1, // Use index as id since we don't get it from the API
        name: characterData?.name || defaultAgent.name,
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
    }) || defaultAgents;

  const useCaseFilters = [
    { id: 'all', name: 'All Use Cases', icon: CommandLineIcon },
    { id: 'community', name: 'Community Management', icon: UserGroupIcon },
    { id: 'engagement', name: 'Social Engagement', icon: ChatBubbleLeftRightIcon },
  ];

  const platformFilters = [
    { id: 'all', name: 'All Platforms', icon: GlobeAltIcon },
    { id: 'discord', name: 'Discord', icon: DiscordLogoIcon },
    { id: 'twitter', name: 'Twitter', icon: TwitterLogoIcon },
    { id: 'instagram', name: 'Instagram', icon: InstagramLogoIcon },
    { id: 'linkedin', name: 'LinkedIn', icon: LinkedInLogoIcon },
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

  // Update the handleSaveCharacter function to use id instead of agentId
  const handleSaveCharacter = async () => {
    if (!characterJson || !userId) {
      setError('Missing character JSON or user ID');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // First save the character
      const { data: characterData } = await insertCharacter({
        variables: {
          character: characterJson,
          userId: userId,
          agentId: null,
        },
      });
      console.log('Character saved:', characterData);

      // Then start the agent with the character ID
      // const { data: agentData } = await startAgent({
      //   variables: {
      //     characterId: characterData.insert_characters_one.id,
      //   },
      // });
      // console.log('Agent started:', agentData?.startAgent);

      setShowDeployModal(false);
      return characterData;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error saving character');
      console.error('Error saving character:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartAgent = async (characterId: string) => {
    try {
      const response = await startAgent({
        variables: {
          characterId,
        },
      });
      // Handle success
      console.log('Agent started:', response.data.startAgent);
    } catch (error) {
      // Handle error
      console.error('Error starting agent:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        try {
          const json = JSON.parse(event.target?.result as string);
          setCharacterJson(json);
          console.log('Parsed JSON:', json);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient">My Agents</h1>
          <p className="text-white/70 mt-2">Manage and monitor your AI agents</p>
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
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {useCaseFilters.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex items-center px-4 py-2 rounded-lg border ${
                      activeFilter === filter.id
                        ? 'border-accent text-accent bg-accent/10'
                        : 'border-white/10 text-white/70 hover:border-white/20'
                    }`}
                  >
                    <filter.icon className="w-5 h-5 mr-2" />
                    {filter.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-white/70 mb-2">Platform</label>
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {platformFilters.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setActivePlatformFilter(filter.id)}
                    className={`flex items-center px-4 py-2 rounded-lg border ${
                      activePlatformFilter === filter.id
                        ? 'border-accent text-accent bg-accent/10'
                        : 'border-white/10 text-white/70 hover:border-white/20'
                    }`}
                  >
                    <filter.icon className="w-5 h-5 mr-2" />
                    {filter.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents
              .filter(
                // @ts-expect-error ts is confused
                agent =>
                  (activeFilter === 'all' || agent.useCase === activeFilter) &&
                  (activePlatformFilter === 'all' || agent.platform === activePlatformFilter)
              )
              // @ts-expect-error ts is confused
              .map(agent => (
                <motion.div
                  key={agent.id}
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
                      <p className="text-lg font-medium text-accent">{agent.metrics.engagement}</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-white/5">
                      <p className="text-xs text-white/50">Response</p>
                      <p className="text-lg font-medium text-accent">
                        {agent.metrics.response_time}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button className="button-secondary text-sm">Configure</button>
                    <button className="button-primary text-sm">View Details</button>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>

      {showDeployModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card w-full max-w-2xl max-h-[80vh] overflow-y-auto relative"
          >
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-medium text-white">Deploy New Agent</h2>
                <button
                  onClick={() => setShowDeployModal(false)}
                  className="text-white/50 hover:text-white"
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
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Upload Character File</h3>
                <div className="p-4 rounded-lg border border-white/10">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white mb-2">Character JSON File</label>
                      <input
                        type="file"
                        accept="application/json"
                        onChange={handleFileChange}
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-accent/20 file:text-accent hover:file:bg-accent/30 file:cursor-pointer"
                      />
                      <p className="text-white/50 text-sm mt-2">
                        Upload a JSON file containing the agent&apos;s character configuration
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button onClick={() => setShowDeployModal(false)} className="button-secondary">
                  Cancel
                </button>
                <button
                  onClick={async function () {
                    const data = await handleSaveCharacter();
                    const characterId = data?.insert_characters_one.id;
                    console.log('characterId in deploy button', characterId);
                    // if (data) {
                    //   const startAgentResponse = await handleStartAgent(characterId);
                    //   console.log('startAgentResponse in deploy button', startAgentResponse);
                    // }
                  }}
                  disabled={!characterJson || !userId || isLoading}
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
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
