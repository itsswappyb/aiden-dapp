'use client';

import { Card, Title, Text, Tab, TabList, TabGroup, TabPanel, TabPanels } from '@tremor/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  ChatBubbleLeftRightIcon,
  CommandLineIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

const platforms = [
  {
    name: 'Telegram',
    status: 'Active',
    agents: 2,
    messages: '1.2k',
    engagement: '85%',
  },
  {
    name: 'Discord',
    status: 'Active',
    agents: 3,
    messages: '3.5k',
    engagement: '92%',
  },
  {
    name: 'X (Twitter)',
    status: 'Inactive',
    agents: 0,
    messages: '0',
    engagement: '0%',
  },
];

const agents = [
  {
    id: 1,
    name: 'Community Manager',
    platform: 'Discord',
    status: 'Active',
    uptime: '99.9%',
    messages: '2.3k',
  },
  {
    id: 2,
    name: 'Support Agent',
    platform: 'Telegram',
    status: 'Active',
    uptime: '98.5%',
    messages: '856',
  },
  {
    id: 3,
    name: 'Content Moderator',
    platform: 'Discord',
    status: 'Active',
    uptime: '99.7%',
    messages: '1.1k',
  },
];

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gradient">Dashboard Overview</h1>
          <p className="text-white/70 mt-1">Monitor your AI agents and community engagement</p>
        </div>
        <button className="button-primary" onClick={() => router.push('/dashboard/agents')}>
          <CommandLineIcon className="w-5 h-5 mr-2 inline-block" />
          Deploy New Agent
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-card hover-accent">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-lg bg-[#87fafd]/10 flex items-center justify-center mr-4">
                <CommandLineIcon className="w-6 h-6 text-accent" />
              </div>
              <div>
                <Text className="text-white/70">Active Agents</Text>
                <Title className="text-white text-2xl">5</Title>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card hover-accent">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-lg bg-[#87fafd]/10 flex items-center justify-center mr-4">
                <ChatBubbleLeftRightIcon className="w-6 h-6 text-accent" />
              </div>
              <div>
                <Text className="text-white/70">Total Messages</Text>
                <Title className="text-white text-2xl">4.7k</Title>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-card hover-accent">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-lg bg-[#87fafd]/10 flex items-center justify-center mr-4">
                <UserGroupIcon className="w-6 h-6 text-accent" />
              </div>
              <div>
                <Text className="text-white/70">Community Members</Text>
                <Title className="text-white text-2xl">2.3k</Title>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Platform Overview */}
      <Card className="glass-card">
        <Title className="text-white mb-4">Platform Overview</Title>
        <TabGroup>
          <TabList className="border-b border-white/10">
            {platforms.map(platform => (
              <Tab key={platform.name} className="text-white/70 hover:text-accent">
                {platform.name}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {platforms.map(platform => (
              <TabPanel key={platform.name}>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="glass-card p-4">
                    <Text className="text-white/70">Status</Text>
                    <div className="flex items-center mt-1">
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${
                          platform.status === 'Active' ? 'bg-green-400' : 'bg-red-400'
                        }`}
                      />
                      <span className="text-white">{platform.status}</span>
                    </div>
                  </div>
                  <div className="glass-card p-4">
                    <Text className="text-white/70">Active Agents</Text>
                    <Title className="text-white">{platform.agents}</Title>
                  </div>
                  <div className="glass-card p-4">
                    <Text className="text-white/70">Messages (24h)</Text>
                    <Title className="text-white">{platform.messages}</Title>
                  </div>
                  <div className="glass-card p-4">
                    <Text className="text-white/70">Engagement Rate</Text>
                    <Title className="text-white">{platform.engagement}</Title>
                  </div>
                </div>
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </Card>

      {/* Active Agents */}
      <Card className="glass-card">
        <Title className="text-white mb-4">Active Agents</Title>
        <div className="space-y-4">
          {agents.map(agent => (
            <div
              key={agent.id}
              className="glass-card hover-accent p-4 flex items-center justify-between"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-[#87fafd]/10 flex items-center justify-center mr-4">
                  <CommandLineIcon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <Text className="text-white font-medium">{agent.name}</Text>
                  <Text className="text-white/70 text-sm">
                    {agent.platform} • Uptime: {agent.uptime}
                  </Text>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <Text className="text-white/70 text-sm">Messages (24h)</Text>
                  <Text className="text-white">{agent.messages}</Text>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm ${
                    agent.status === 'Active'
                      ? 'bg-green-400/10 text-green-400'
                      : 'bg-red-400/10 text-red-400'
                  }`}
                >
                  {agent.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
