'use client';

import { useState, useEffect } from 'react';
import { Card, Title, Text, AreaChart, Metric, Badge } from '@tremor/react';
import { motion } from 'framer-motion';
import { CommandLineIcon, BoltIcon, ClockIcon, SignalIcon } from '@heroicons/react/24/outline';

interface AgentMetrics {
  responseTime: number[];
  accuracy: number[];
  uptime: number;
  status: 'online' | 'offline' | 'training';
  messagesHandled: number;
  timestamps: string[];
}

interface AgentMonitorProps {
  agentId: string;
  agentName: string;
  platform: string;
}

export default function AgentMonitor({ agentId, agentName, platform }: AgentMonitorProps) {
  // In a real app, this would be fetched from an API
  const [metrics, setMetrics] = useState<AgentMetrics>({
    responseTime: [250, 245, 290, 280, 260, 245, 255],
    accuracy: [92, 94, 91, 95, 93, 94, 96],
    uptime: 99.9,
    status: 'online',
    messagesHandled: 1234,
    timestamps: ['12:00', '12:10', '12:20', '12:30', '12:40', '12:50', '13:00'],
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        responseTime: [...prev.responseTime.slice(1), Math.random() * 50 + 230],
        accuracy: [...prev.accuracy.slice(1), Math.random() * 6 + 90],
        messagesHandled: prev.messagesHandled + Math.floor(Math.random() * 5),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const performanceData = metrics.timestamps.map((timestamp, index) => ({
    timestamp,
    'Response Time (ms)': metrics.responseTime[index],
    'Accuracy (%)': metrics.accuracy[index],
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-lg bg-[#87fafd]/10 flex items-center justify-center mr-4">
            <CommandLineIcon className="w-6 h-6 text-accent" />
          </div>
          <div>
            <Title className="text-white">{agentName}</Title>
            <Text className="text-white/70">{platform}</Text>
          </div>
        </div>
        <Badge
          className={`${
            metrics.status === 'online'
              ? 'bg-green-400/10 text-green-400'
              : metrics.status === 'training'
                ? 'bg-yellow-400/10 text-yellow-400'
                : 'bg-red-400/10 text-red-400'
          }`}
        >
          {metrics.status.toUpperCase()}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card">
          <div className="flex items-center space-x-2">
            <BoltIcon className="w-4 h-4 text-accent" />
            <Text className="text-white/70">Response Time</Text>
          </div>
          <Metric className="text-white mt-2">
            {metrics.responseTime[metrics.responseTime.length - 1].toFixed(0)} ms
          </Metric>
        </Card>

        <Card className="glass-card">
          <div className="flex items-center space-x-2">
            <SignalIcon className="w-4 h-4 text-accent" />
            <Text className="text-white/70">Accuracy</Text>
          </div>
          <Metric className="text-white mt-2">
            {metrics.accuracy[metrics.accuracy.length - 1].toFixed(1)}%
          </Metric>
        </Card>

        <Card className="glass-card">
          <div className="flex items-center space-x-2">
            <ClockIcon className="w-4 h-4 text-accent" />
            <Text className="text-white/70">Uptime</Text>
          </div>
          <Metric className="text-white mt-2">{metrics.uptime}%</Metric>
        </Card>
      </div>

      <Card className="glass-card">
        <Title className="text-white mb-4">Performance Metrics</Title>
        <AreaChart
          className="h-64"
          data={performanceData}
          index="timestamp"
          categories={['Response Time (ms)', 'Accuracy (%)']}
          colors={['cyan', 'indigo']}
          showAnimation={true}
          showLegend={true}
        />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="glass-card">
          <Title className="text-white mb-4">Recent Activity</Title>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-3 glass-card"
              >
                <div>
                  <Text className="text-white">Message Processed</Text>
                  <Text className="text-white/70 text-sm">
                    Response time: {Math.floor(Math.random() * 50 + 230)}ms
                  </Text>
                </div>
                <Text className="text-white/70">Just now</Text>
              </motion.div>
            ))}
          </div>
        </Card>

        <Card className="glass-card">
          <Title className="text-white mb-4">Health Metrics</Title>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Text className="text-white/70">Memory Usage</Text>
              <Text className="text-white">128MB</Text>
            </div>
            <div className="flex justify-between items-center">
              <Text className="text-white/70">CPU Usage</Text>
              <Text className="text-white">12%</Text>
            </div>
            <div className="flex justify-between items-center">
              <Text className="text-white/70">Messages Handled</Text>
              <Text className="text-white">{metrics.messagesHandled}</Text>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
