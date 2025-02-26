'use client';

import { useState } from 'react';
import {
  Card,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
  Badge,
} from '@tremor/react';
import { motion } from 'framer-motion';
import {
  ChatBubbleLeftRightIcon,
  CommandLineIcon,
  FaceSmileIcon,
  ClockIcon,
  TagIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  agentName: string;
  platform: string;
  category: string;
}

const sampleMessages: Message[] = [
  {
    id: '1',
    content: 'How do I stake my tokens?',
    sender: 'user',
    timestamp: '2 mins ago',
    sentiment: 'neutral',
    agentName: 'Support Agent',
    platform: 'Discord',
    category: 'Technical Support',
  },
  {
    id: '2',
    content:
      "I'll guide you through the staking process. First, make sure you have your tokens in a compatible wallet...",
    sender: 'agent',
    timestamp: '2 mins ago',
    sentiment: 'positive',
    agentName: 'Support Agent',
    platform: 'Discord',
    category: 'Technical Support',
  },
  {
    id: '3',
    content: 'When is the next community call?',
    sender: 'user',
    timestamp: '5 mins ago',
    sentiment: 'neutral',
    agentName: 'Community Manager',
    platform: 'Telegram',
    category: 'Community',
  },
  {
    id: '4',
    content:
      "Our next community call is scheduled for this Friday at 2 PM UTC. I'll share the agenda shortly.",
    sender: 'agent',
    timestamp: '5 mins ago',
    sentiment: 'positive',
    agentName: 'Community Manager',
    platform: 'Telegram',
    category: 'Community',
  },
];

const categories = ['All', 'Technical Support', 'Community', 'General', 'Moderation'];
const platforms = ['All Platforms', 'Discord', 'Telegram', 'X (Twitter)'];

export default function ConversationsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All Platforms');

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gradient">Conversations</h1>
          <p className="text-white/70 mt-1">Monitor and analyze community interactions</p>
        </div>
        <div className="flex space-x-4">
          <select
            className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none"
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none"
            value={selectedPlatform}
            onChange={e => setSelectedPlatform(e.target.value)}
          >
            {platforms.map(platform => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Active Conversations',
            value: '24',
            icon: ChatBubbleLeftRightIcon,
            change: '+3',
            positive: true,
          },
          {
            title: 'Response Time',
            value: '45s',
            icon: ClockIcon,
            change: '-5s',
            positive: true,
          },
          {
            title: 'Sentiment Score',
            value: '8.5',
            icon: FaceSmileIcon,
            change: '+0.3',
            positive: true,
          },
          {
            title: 'Resolution Rate',
            value: '94%',
            icon: TagIcon,
            change: '+2%',
            positive: true,
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card hover-accent">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-lg bg-[#87fafd]/10 flex items-center justify-center mr-4">
                    <stat.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <Text className="text-white/70">{stat.title}</Text>
                    <Title className="text-white text-2xl">{stat.value}</Title>
                  </div>
                </div>
                <div
                  className={`px-2 py-1 rounded-full text-xs ${
                    stat.positive ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'
                  }`}
                >
                  {stat.change}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="glass-card">
        <Title className="text-white mb-4">Recent Conversations</Title>
        <div className="space-y-4">
          {sampleMessages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-8 h-8 rounded-lg ${
                      message.sender === 'agent' ? 'bg-[#87fafd]/10' : 'bg-white/10'
                    } flex items-center justify-center`}
                  >
                    {message.sender === 'agent' ? (
                      <CommandLineIcon className="w-4 h-4 text-accent" />
                    ) : (
                      <ChatBubbleLeftRightIcon className="w-4 h-4 text-white/70" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <Text className="text-white font-medium">
                        {message.sender === 'agent' ? message.agentName : 'User'}
                      </Text>
                      <Badge className="bg-[#87fafd]/10 text-accent">{message.platform}</Badge>
                      <Badge className="bg-white/5 text-white/70">{message.category}</Badge>
                    </div>
                    <Text className="text-white/70 mt-1">{message.content}</Text>
                  </div>
                </div>
                <Text className="text-white/50 text-sm">{message.timestamp}</Text>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card">
          <Title className="text-white mb-4">Response Templates</Title>
          <div className="space-y-4">
            {['Greeting', 'Technical Support', 'Community Guidelines'].map((template, index) => (
              <motion.div
                key={template}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-4 hover-accent cursor-pointer"
              >
                <Text className="text-white font-medium">{template}</Text>
                <Text className="text-white/70 text-sm mt-1">Click to view and edit template</Text>
              </motion.div>
            ))}
          </div>
        </Card>

        <Card className="glass-card">
          <Title className="text-white mb-4">Quick Actions</Title>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'Export Logs', icon: ChatBubbleLeftRightIcon },
              { name: 'Update Templates', icon: TagIcon },
              { name: 'View Analytics', icon: ChartBarIcon },
              { name: 'Agent Settings', icon: CommandLineIcon },
            ].map((action, index) => (
              <motion.button
                key={action.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-4 hover-accent flex items-center space-x-2"
              >
                <action.icon className="w-5 h-5 text-accent" />
                <Text className="text-white">{action.name}</Text>
              </motion.button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
