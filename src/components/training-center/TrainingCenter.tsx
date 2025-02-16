'use client';

import { useState } from 'react';
import {
  Card,
  Title,
  Text,
  Badge,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
} from '@tremor/react';
import { motion } from 'framer-motion';
import {
  BeakerIcon,
  CommandLineIcon,
  PlayIcon,
  StopIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import AgentTraining from '@/components/agents/AgentTraining';
import AgentSettings from '@/components/agents/AgentSettings';

interface TrainingAgent {
  id: string;
  name: string;
  type: string;
  platform: string;
  status: 'not_started' | 'in_progress' | 'completed';
  avatar?: string;
}

const initialAgents: TrainingAgent[] = [
  {
    id: '1',
    name: 'Community Manager',
    type: 'Management',
    platform: 'Discord',
    status: 'completed',
  },
  {
    id: '2',
    name: 'Support Agent',
    type: 'Support',
    platform: 'Telegram',
    status: 'in_progress',
  },
  {
    id: '3',
    name: 'Content Curator',
    type: 'Curation',
    platform: 'X (Twitter)',
    status: 'not_started',
  },
];

export default function TrainingCenter() {
  const [agents, setAgents] = useState<TrainingAgent[]>(initialAgents);
  const [selectedAgent, setSelectedAgent] = useState<TrainingAgent | null>(null);
  const [activeTab, setActiveTab] = useState<'training' | 'settings'>('training');

  const startTraining = (agentId: string) => {
    setAgents(prev =>
      prev.map(agent => (agent.id === agentId ? { ...agent, status: 'in_progress' } : agent))
    );
  };

  const stopTraining = (agentId: string) => {
    setAgents(prev =>
      prev.map(agent => (agent.id === agentId ? { ...agent, status: 'completed' } : agent))
    );
  };

  const handleAgentUpdate = (agentId: string, data: { name: string; avatar?: File }) => {
    setAgents(prev =>
      prev.map(agent => {
        if (agent.id === agentId) {
          const updatedAgent = { ...agent, name: data.name };
          if (data.avatar) {
            updatedAgent.avatar = URL.createObjectURL(data.avatar);
          }
          return updatedAgent;
        }
        return agent;
      })
    );
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {agents.map((agent, index) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`glass-card hover-accent cursor-pointer ${
                selectedAgent?.id === agent.id ? 'border-accent' : ''
              }`}
              onClick={() => setSelectedAgent(agent)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[#87fafd]/10 flex items-center justify-center mr-4 overflow-hidden">
                    {agent.avatar ? (
                      <img
                        src={agent.avatar}
                        alt={agent.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <CommandLineIcon className="w-6 h-6 text-accent" />
                    )}
                  </div>
                  <div>
                    <Title className="text-white">{agent.name}</Title>
                    <Text className="text-white/70">{agent.type}</Text>
                  </div>
                </div>
                <Badge
                  className={`${
                    agent.status === 'completed'
                      ? 'bg-green-400/10 text-green-400'
                      : agent.status === 'in_progress'
                        ? 'bg-yellow-400/10 text-yellow-400'
                        : 'bg-white/10 text-white/70'
                  }`}
                >
                  {agent.status
                    .split('_')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <Text className="text-white/70">Platform: {agent.platform}</Text>
                {agent.status === 'not_started' && (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      startTraining(agent.id);
                    }}
                    className="button-primary flex items-center text-sm px-3 py-1"
                  >
                    <PlayIcon className="w-4 h-4 mr-1" />
                    Start Training
                  </button>
                )}
                {agent.status === 'in_progress' && (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      stopTraining(agent.id);
                    }}
                    className="button-primary flex items-center text-sm px-3 py-1 bg-red-500/20 hover:bg-red-500/30 border-red-500/30"
                  >
                    <StopIcon className="w-4 h-4 mr-1" />
                    Stop Training
                  </button>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {selectedAgent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <TabGroup>
            <TabList className="border-b border-white/10">
              <Tab
                className="text-white/70 hover:text-accent"
                onClick={() => setActiveTab('training')}
              >
                <BeakerIcon className="w-5 h-5 mr-2 inline-block" />
                Training Progress
              </Tab>
              <Tab
                className="text-white/70 hover:text-accent"
                onClick={() => setActiveTab('settings')}
              >
                <Cog6ToothIcon className="w-5 h-5 mr-2 inline-block" />
                Agent Settings
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <div className="mt-6">
                  <AgentTraining
                    agentId={selectedAgent.id}
                    agentName={selectedAgent.name}
                    trainingStatus={selectedAgent.status}
                  />
                </div>
              </TabPanel>
              <TabPanel>
                <div className="mt-6">
                  <AgentSettings
                    agentId={selectedAgent.id}
                    initialName={selectedAgent.name}
                    initialAvatar={selectedAgent.avatar}
                    onUpdate={data => handleAgentUpdate(selectedAgent.id, data)}
                  />
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </motion.div>
      )}
    </div>
  );
}
