'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  CpuChipIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

// This would normally come from a central store or API
const agentsData = {
  1: {
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
      accuracy: '95%',
      uptime: '99.9%',
    },
    recentActivity: [
      {
        id: 1,
        type: 'message',
        content: 'Responded to user inquiry about pricing',
        timestamp: '2 minutes ago',
      },
      {
        id: 2,
        type: 'moderation',
        content: 'Removed spam message in #general',
        timestamp: '15 minutes ago',
      },
      {
        id: 3,
        type: 'engagement',
        content: 'Welcomed 5 new members to the community',
        timestamp: '1 hour ago',
      },
    ],
  },
  2: {
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
      accuracy: '93%',
      uptime: '98.5%',
    },
    recentActivity: [
      {
        id: 1,
        type: 'message',
        content: 'Scheduled new promotional tweet',
        timestamp: '5 minutes ago',
      },
      {
        id: 2,
        type: 'engagement',
        content: 'Responded to customer feedback',
        timestamp: '20 minutes ago',
      },
      {
        id: 3,
        type: 'message',
        content: 'Updated social media calendar',
        timestamp: '1 hour ago',
      },
    ],
  },
  3: {
    id: 3,
    name: 'Telegram Support Bot',
    description: 'Provides customer support and handles inquiries',
    platform: 'telegram',
    useCase: 'community',
    status: 'active',
    metrics: {
      messages: 567,
      engagement: '85%',
      response_time: '25s',
      accuracy: '91%',
      uptime: '99.2%',
    },
    recentActivity: [
      {
        id: 1,
        type: 'message',
        content: 'Resolved technical support ticket',
        timestamp: '10 minutes ago',
      },
      {
        id: 2,
        type: 'message',
        content: 'Updated FAQ responses',
        timestamp: '30 minutes ago',
      },
      {
        id: 3,
        type: 'engagement',
        content: 'Initiated customer satisfaction survey',
        timestamp: '2 hours ago',
      },
    ],
  },
};

export default function AgentDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const agentId = params?.id ? parseInt(params.id as string) : null;

  // Get the agent data or redirect if not found
  const agent = agentId && agentsData[agentId as keyof typeof agentsData];
  if (!agent) {
    router.push('/dashboard/agents');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <button
        onClick={() => router.back()}
        className="flex items-center text-white/70 hover:text-white mb-6 group"
      >
        <ArrowLeftIcon className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
        Back to Agents
      </button>

      <div className="page-header">
        <div>
          <h1 className="page-title">{agent.name}</h1>
          <p className="page-description">{agent.description}</p>
        </div>
        <span
          className={`px-3 py-1.5 rounded-full text-sm font-medium ${
            agent.status === 'active'
              ? 'bg-green-500/10 text-green-500'
              : 'bg-yellow-500/10 text-yellow-500'
          }`}
        >
          {agent.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-xl font-medium text-white mb-4">Performance Metrics</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-white/5">
                <div className="flex items-center space-x-3 mb-2">
                  <ChatBubbleLeftRightIcon className="w-5 h-5 text-accent" />
                  <h3 className="text-sm font-medium text-white">Messages</h3>
                </div>
                <p className="text-2xl font-bold text-accent">{agent.metrics.messages}</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <div className="flex items-center space-x-3 mb-2">
                  <ChartBarIcon className="w-5 h-5 text-accent" />
                  <h3 className="text-sm font-medium text-white">Engagement</h3>
                </div>
                <p className="text-2xl font-bold text-accent">{agent.metrics.engagement}</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <div className="flex items-center space-x-3 mb-2">
                  <ClockIcon className="w-5 h-5 text-accent" />
                  <h3 className="text-sm font-medium text-white">Response Time</h3>
                </div>
                <p className="text-2xl font-bold text-accent">{agent.metrics.response_time}</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h2 className="text-xl font-medium text-white mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {agent.recentActivity.map(activity => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 p-4 rounded-lg bg-white/5"
                >
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <CpuChipIcon className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white">{activity.content}</p>
                    <p className="text-white/50 text-sm">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-xl font-medium text-white mb-4">Configuration</h2>
            <div className="space-y-4">
              <button className="button-primary w-full">Edit Settings</button>
              <button className="button-secondary w-full">View Logs</button>
              <button className="button-secondary w-full">Manage Access</button>
            </div>
          </div>

          <div className="glass-card p-6">
            <h2 className="text-xl font-medium text-white mb-4">Advanced Metrics</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Accuracy</span>
                <span className="text-accent font-medium">{agent.metrics.accuracy}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Uptime</span>
                <span className="text-accent font-medium">{agent.metrics.uptime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
