'use client';

import { Card, Title, Text, AreaChart, BarChart, DonutChart } from '@tremor/react';
import { motion } from 'framer-motion';
import {
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';

const memberGrowthData = [
  { date: 'Jan 1', 'Total Members': 1420, 'Active Members': 820 },
  { date: 'Jan 8', 'Total Members': 1620, 'Active Members': 920 },
  { date: 'Jan 15', 'Total Members': 1870, 'Active Members': 1100 },
  { date: 'Jan 22', 'Total Members': 2140, 'Active Members': 1300 },
  { date: 'Jan 29', 'Total Members': 2300, 'Active Members': 1580 },
];

const engagementData = [
  { platform: 'Discord', messages: 3500, activeUsers: 850, engagement: 75 },
  { platform: 'Telegram', messages: 2800, activeUsers: 620, engagement: 68 },
  { platform: 'X (Twitter)', messages: 1200, activeUsers: 450, engagement: 45 },
];

const sentimentData = [
  { name: 'Positive', value: 65 },
  { name: 'Neutral', value: 25 },
  { name: 'Negative', value: 10 },
];

export default function CommunityPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gradient">Community Analytics</h1>
          <p className="text-white/70 mt-1">Monitor your community growth and engagement</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Members',
            value: '2.3k',
            icon: UserGroupIcon,
            change: '+12%',
            positive: true,
          },
          {
            title: 'Active Members',
            value: '1.5k',
            icon: HeartIcon,
            change: '+8%',
            positive: true,
          },
          {
            title: 'Messages (24h)',
            value: '7.5k',
            icon: ChatBubbleLeftRightIcon,
            change: '+15%',
            positive: true,
          },
          {
            title: 'Engagement Rate',
            value: '68%',
            icon: ChartBarIcon,
            change: '-3%',
            positive: false,
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

      {/* Growth Chart */}
      <Card className="glass-card">
        <Title className="text-white mb-4">Member Growth</Title>
        <AreaChart
          className="h-72 mt-4"
          data={memberGrowthData}
          index="date"
          categories={['Total Members', 'Active Members']}
          colors={['cyan', 'indigo']}
          valueFormatter={number => Intl.NumberFormat('us').format(number).toString()}
          showAnimation={true}
        />
      </Card>

      {/* Platform Engagement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card">
          <Title className="text-white mb-4">Platform Activity</Title>
          <BarChart
            className="h-72 mt-4"
            data={engagementData}
            index="platform"
            categories={['messages', 'activeUsers']}
            colors={['cyan', 'indigo']}
            valueFormatter={number => Intl.NumberFormat('us').format(number).toString()}
            showAnimation={true}
          />
        </Card>

        <Card className="glass-card">
          <Title className="text-white mb-4">Community Sentiment</Title>
          <DonutChart
            className="h-72 mt-4"
            data={sentimentData}
            category="value"
            index="name"
            colors={['emerald', 'amber', 'rose']}
            valueFormatter={number => `${number}%`}
            showAnimation={true}
          />
        </Card>
      </div>

      {/* Platform Details */}
      <Card className="glass-card">
        <Title className="text-white mb-4">Platform Engagement Details</Title>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {engagementData.map(platform => (
            <div key={platform.platform} className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <Text className="text-white font-medium">{platform.platform}</Text>
                <div className="px-2 py-1 rounded-full text-xs bg-[#87fafd]/10 text-accent">
                  {platform.engagement}% Engagement
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Text className="text-white/70 text-sm">Daily Messages</Text>
                  <Title className="text-white">{platform.messages}</Title>
                </div>
                <div>
                  <Text className="text-white/70 text-sm">Active Users</Text>
                  <Title className="text-white">{platform.activeUsers}</Title>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
