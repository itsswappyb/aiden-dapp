'use client';

import { useState } from 'react';
import {
  Card,
  Title,
  Text,
  Metric,
  AreaChart,
  BarChart,
  DonutChart,
  LineChart,
  Grid,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Badge,
  Flex,
  ProgressBar,
  Legend,
  Select,
  SelectItem,
} from '@tremor/react';
import { motion } from 'framer-motion';
import {
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  HeartIcon,
  ArrowUpRightIcon,
  ArrowDownRightIcon,
  CalendarIcon,
  GlobeAltIcon,
  ClockIcon,
  BellIcon,
} from '@heroicons/react/24/outline';

// At the top of your file, add this color palette
const CHART_COLORS = {
  primary: '#87fafd', // App accent color
  secondary: '#64c4ff', // Secondary blue
  tertiary: '#a389fa', // Purple variant
  positive: '#34d399', // Emerald for positive metrics
  neutral: '#fbbf24', // Amber for neutral metrics
  negative: '#fb7185', // Rose for negative metrics
  background: '#011829', // Dark background for tooltips
  muted: 'rgba(255, 255, 255, 0.6)', // Muted text
};

// Mock data
const memberGrowthData = [
  {
    date: 'Jan',
    'Total Members': 2500,
    'New Members': 1200,
  },
  {
    date: 'Feb',
    'Total Members': 3000,
    'New Members': 1800,
  },
  {
    date: 'Mar',
    'Total Members': 4000,
    'New Members': 1600,
  },
  {
    date: 'Apr',
    'Total Members': 6800,
    'New Members': 2300,
  },
  {
    date: 'May',
    'Total Members': 9800,
    'New Members': 2900,
  },
  {
    date: 'Jun',
    'Total Members': 14000,
    'New Members': 3500,
  },
  {
    date: 'Jul',
    'Total Members': 19000,
    'New Members': 5000,
  },
];

const retentionData = [
  { date: 'Jan', Weekly: 89, Monthly: 78, Quarterly: 65 },
  { date: 'Feb', Weekly: 91, Monthly: 82, Quarterly: 68 },
  { date: 'Mar', Weekly: 88, Monthly: 79, Quarterly: 67 },
];

const platformData = [
  { platform: 'Telegram', messages: 3580, activeUsers: 890, engagement: 80, growth: '+12%' },
  { platform: 'Discord', messages: 2860, activeUsers: 720, engagement: 75, growth: '+8%' },
  { platform: 'Twitter', messages: 1450, activeUsers: 520, engagement: 65, growth: '+15%' },
];

// Add this type definition near the top with other types/interfaces
type WeekdayActivity = {
  day: string;
  [hour: string]: string | number;
};

// Update the weekdayActivity declaration
const weekdayActivity: WeekdayActivity[] = [
  {
    day: 'Mon',
    '00': 120,
    '02': 80,
    '04': 40,
    '06': 30,
    '08': 150,
    '10': 320,
    '12': 350,
    '14': 410,
    '16': 470,
    '18': 520,
    '20': 390,
    '22': 230,
  },
  {
    day: 'Tue',
    '00': 100,
    '02': 60,
    '04': 30,
    '06': 40,
    '08': 170,
    '10': 350,
    '12': 380,
    '14': 430,
    '16': 490,
    '18': 540,
    '20': 410,
    '22': 210,
  },
  {
    day: 'Wed',
    '00': 110,
    '02': 70,
    '04': 35,
    '06': 35,
    '08': 160,
    '10': 340,
    '12': 370,
    '14': 425,
    '16': 485,
    '18': 535,
    '20': 405,
    '22': 220,
  },
  {
    day: 'Thu',
    '00': 115,
    '02': 75,
    '04': 38,
    '06': 32,
    '08': 155,
    '10': 330,
    '12': 360,
    '14': 415,
    '16': 475,
    '18': 525,
    '20': 395,
    '22': 225,
  },
  {
    day: 'Fri',
    '00': 130,
    '02': 85,
    '04': 45,
    '06': 25,
    '08': 145,
    '10': 310,
    '12': 340,
    '14': 400,
    '16': 460,
    '18': 510,
    '20': 380,
    '22': 235,
  },
  {
    day: 'Sat',
    '00': 180,
    '02': 140,
    '04': 90,
    '06': 50,
    '08': 120,
    '10': 280,
    '12': 320,
    '14': 380,
    '16': 440,
    '18': 490,
    '20': 410,
    '22': 290,
  },
  {
    day: 'Sun',
    '00': 160,
    '02': 120,
    '04': 80,
    '06': 45,
    '08': 130,
    '10': 290,
    '12': 330,
    '14': 390,
    '16': 450,
    '18': 500,
    '20': 420,
    '22': 270,
  },
];

const sentimentData = [
  { name: 'Positive', value: 68 },
  { name: 'Neutral', value: 22 },
  { name: 'Negative', value: 10 },
];

const topTopics = [
  { topic: 'Platform Updates', mentions: 342, sentiment: 'Positive', change: '+18%' },
  { topic: 'Technical Support', mentions: 271, sentiment: 'Neutral', change: '+5%' },
  { topic: 'Feature Requests', mentions: 195, sentiment: 'Positive', change: '+22%' },
  { topic: 'Bug Reports', mentions: 168, sentiment: 'Negative', change: '-12%' },
  { topic: 'Partnership Discussions', mentions: 132, sentiment: 'Positive', change: '+9%' },
];

const quickStats = [
  {
    title: 'Total Members',
    value: '3.05k',
    icon: UserGroupIcon,
    change: '+12%',
    positive: true,
    metric: '210 new this month',
  },
  {
    title: 'Active Members',
    value: '2.24k',
    icon: HeartIcon,
    change: '+8%',
    positive: true,
    metric: '73% engagement',
  },
  {
    title: 'Messages (24h)',
    value: '7.2k',
    icon: ChatBubbleLeftRightIcon,
    change: '+15%',
    positive: true,
    metric: '325 avg. per hour',
  },
  {
    title: 'Retention Rate',
    value: '82%',
    icon: ChartBarIcon,
    change: '+3%',
    positive: true,
    metric: 'Monthly cohort',
  },
];

// Time periods for the dropdown filter
const timePeriods = [
  { name: 'Last 7 days', value: '7d' },
  { name: 'Last 30 days', value: '30d' },
  { name: 'Last 90 days', value: '90d' },
];

// Near the top of your file - Add annotations for context
const growthTrend = {
  current: '+12%',
  target: '+15%',
  status: 'warning', // 'success', 'warning', 'danger'
};

// Main component
export default function CommunityAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Page Header with Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-[#87fafd]">
            Community Analytics
          </h1>
          <p className="text-white/70 mt-1">
            Monitor growth, engagement, and sentiment across platforms
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-[#011829]/60 p-1 rounded-lg">
          {timePeriods.map(period => (
            <button
              key={period.value}
              onClick={() => setSelectedPeriod(period.value)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                selectedPeriod === period.value
                  ? 'bg-[#87fafd]/20 text-[#87fafd]'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {period.name}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <Grid numItemsMd={2} numItemsLg={4} className="gap-6">
        {quickStats.map(stat => (
          <motion.div
            key={stat.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: quickStats.indexOf(stat) * 0.1 }}
            className="h-full"
          >
            <Card className="glass-card border border-white/5 hover:border-[#87fafd]/20 transition-all duration-300 h-full">
              <div className="flex flex-col h-full">
                {/* Card Header - Title and Change Badge */}
                <div className="flex justify-between items-center mb-2">
                  <Text className="text-white/70 font-medium">{stat.title}</Text>
                  <Badge
                    className={`${
                      stat.positive
                        ? 'bg-emerald-400/10 text-emerald-400'
                        : 'bg-rose-400/10 text-rose-400'
                    }`}
                  >
                    {stat.change}
                  </Badge>
                </div>

                {/* Main Metric - Emphasized */}
                <Metric className="text-white text-3xl font-bold tracking-tight mb-2">
                  {stat.value}
                </Metric>

                {/* Subtext - Additional Context */}
                <div className="flex justify-between items-center mt-auto">
                  <Text className="text-white/50 text-xs">{stat.metric}</Text>
                  <div className="p-2 rounded-lg bg-[#87fafd]/10 text-[#87fafd]">
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </Grid>

      {/* Member Growth Section */}
      <Card className="glass-card border border-white/5">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Title className="text-white">Community Growth</Title>
            <Text className="text-white/60">Total and new members over time</Text>
          </div>
          <div className="flex items-center space-x-3">
            <Badge color="indigo" className="bg-[#1E294E] text-indigo-300 rounded-md py-1.5 px-2">
              <CalendarIcon className="h-3.5 w-3.5 mr-1" />
              30d
            </Badge>
            <Select defaultValue="weekly" className="w-32">
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </Select>
          </div>
        </div>

        <TabGroup>
          <TabList className="mb-6">
            <Tab className="text-white focus:ring-indigo-400 px-4 py-2 hover:bg-white/5 transition-colors">
              Growth
            </Tab>
            <Tab className="text-white focus:ring-indigo-400 px-4 py-2 hover:bg-white/5 transition-colors">
              Retention
            </Tab>
            <Tab className="text-white focus:ring-indigo-400 px-4 py-2 hover:bg-white/5 transition-colors">
              New Members
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              {/* Enhanced Area Chart for Growth */}
              <div className="relative h-72">
                {/* Growth trend context - top left */}
                <div className="absolute top-3 left-14 z-10 flex items-center mb-4">
                  <span className="text-xs text-white/70 mr-2">Growth trend:</span>
                  <span className="text-amber-400 font-medium text-sm">{growthTrend.current}</span>
                  <span className="text-white/50 text-xs ml-1">(Target: {growthTrend.target})</span>
                </div>

                {/* Y-axis value labels */}
                <div className="absolute left-3 top-0 h-full flex flex-col justify-between text-xs text-white/50 pr-2 z-10">
                  <span>20k</span>
                  <span className="my-auto">10k</span>
                  <span>0</span>
                </div>

                {/* Main chart area */}
                <div className="absolute top-0 left-14 right-0 bottom-6 bg-transparent">
                  {/* Horizontal grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    <div className="border-b border-white/10"></div>
                    <div className="border-b border-white/10"></div>
                    <div className="border-b border-white/10"></div>
                    <div className="border-b border-white/10"></div>
                    <div className="border-b border-white/10"></div>
                  </div>

                  {/* Chart SVG */}
                  <svg width="100%" height="100%" viewBox="0 0 700 250" preserveAspectRatio="none">
                    {/* Total Members Area */}
                    <path
                      d="M0,250 L0,100 L100,90 L200,80 L300,55 L400,30 L500,12 L600,5 L700,0 L700,250 Z"
                      fill="url(#totalMembersGradient)"
                      strokeWidth="1"
                      stroke={`${CHART_COLORS.primary}40`}
                    />

                    {/* New Members Area */}
                    <path
                      d="M0,250 L0,170 L100,150 L200,155 L300,140 L400,125 L500,110 L600,95 L700,80 L700,250 Z"
                      fill="url(#newMembersGradient)"
                      strokeWidth="1"
                      stroke={`${CHART_COLORS.tertiary}40`}
                    />

                    {/* Define gradients */}
                    <defs>
                      <linearGradient id="totalMembersGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={CHART_COLORS.primary} stopOpacity="0.5" />
                        <stop offset="100%" stopColor={CHART_COLORS.primary} stopOpacity="0.05" />
                      </linearGradient>

                      <linearGradient id="newMembersGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={CHART_COLORS.tertiary} stopOpacity="0.5" />
                        <stop offset="100%" stopColor={CHART_COLORS.tertiary} stopOpacity="0.05" />
                      </linearGradient>
                    </defs>

                    {/* Data point indicators - more subtle */}
                    <circle cx="700" cy="0" r="3" fill={`${CHART_COLORS.primary}80`} />
                    <circle cx="700" cy="80" r="3" fill={`${CHART_COLORS.tertiary}80`} />
                  </svg>
                </div>

                {/* X-axis month labels */}
                <div className="absolute bottom-0 left-14 right-0 flex justify-between text-xs text-white/50">
                  {memberGrowthData.map((item, i) => (
                    <span key={i}>{item.date}</span>
                  ))}
                </div>

                {/* Legend - bottom right */}
                <div className="absolute bottom-0 right-3 bg-black/30 backdrop-blur-sm rounded-md px-3 py-1 flex items-center gap-4 border border-white/10">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: `${CHART_COLORS.primary}80` }}
                    ></div>
                    <span className="text-xs text-white">Total Members</span>
                  </div>
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: `${CHART_COLORS.tertiary}80` }}
                    ></div>
                    <span className="text-xs text-white">New Members</span>
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              {/* Enhanced Line Chart for Retention */}
              <div className="relative h-72">
                {/* Retention context - top left */}
                <div className="absolute top-3 left-14 z-10 flex items-center mb-4">
                  <span className="text-xs text-white/70 mr-2">Avg retention:</span>
                  <span className="text-emerald-400 font-medium text-sm">86%</span>
                  <span className="text-white/50 text-xs ml-1">(Industry avg: 72%)</span>
                </div>

                {/* Y-axis value labels */}
                <div className="absolute left-3 top-0 h-full flex flex-col justify-between text-xs text-white/50 pr-2 z-10">
                  <span>100%</span>
                  <span className="my-auto">50%</span>
                  <span>0%</span>
                </div>

                {/* Main chart area */}
                <div className="absolute top-0 left-14 right-0 bottom-6 bg-transparent">
                  {/* Horizontal grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    <div className="border-b border-white/10"></div>
                    <div className="border-b border-white/10"></div>
                    <div className="border-b border-white/10"></div>
                    <div className="border-b border-white/10"></div>
                    <div className="border-b border-white/10"></div>
                  </div>

                  {/* Chart SVG */}
                  <svg width="100%" height="100%" viewBox="0 0 700 250" preserveAspectRatio="none">
                    {/* Retention Line */}
                    <path
                      d="M0,50 L350,60 L700,45"
                      fill="none"
                      stroke={CHART_COLORS.positive}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Data points */}
                    <circle cx="0" cy="50" r="4" fill={CHART_COLORS.positive} />
                    <circle cx="350" cy="60" r="4" fill={CHART_COLORS.positive} />
                    <circle cx="700" cy="45" r="4" fill={CHART_COLORS.positive} />

                    {/* Reference line for target retention */}
                    <path
                      d="M0,70 L700,70"
                      stroke="rgba(255, 255, 255, 0.2)"
                      strokeWidth="1"
                      strokeDasharray="5,5"
                    />
                    <text x="680" y="67" fill="rgba(255, 255, 255, 0.4)" fontSize="10">
                      Target
                    </text>

                    {/* Industry average reference line */}
                    <path
                      d="M0,140 L700,140"
                      stroke="rgba(255, 255, 255, 0.15)"
                      strokeWidth="1"
                      strokeDasharray="3,3"
                    />
                    <text x="600" y="137" fill="rgba(255, 255, 255, 0.4)" fontSize="10">
                      Industry avg (72%)
                    </text>
                  </svg>
                </div>

                {/* X-axis month labels */}
                <div className="absolute bottom-0 left-14 right-0 flex justify-between text-xs text-white/50">
                  {retentionData.map((item, i) => (
                    <span key={i}>{item.date}</span>
                  ))}
                </div>

                {/* Legend - bottom right */}
                <div className="absolute bottom-0 right-3 bg-black/30 backdrop-blur-sm rounded-md px-3 py-1 flex items-center border border-white/10">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: CHART_COLORS.positive }}
                    ></div>
                    <span className="text-xs text-white">Retention</span>
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              {/* Enhanced Bar Chart for New Members */}
              <div className="relative h-72">
                {/* Context - top left */}
                <div className="absolute top-3 left-14 z-10 flex items-center mb-4">
                  <span className="text-xs text-white/70 mr-2">Peak month:</span>
                  <span className="text-white font-medium text-sm">Jul (5,000)</span>
                </div>

                {/* Y-axis value labels */}
                <div className="absolute left-3 top-0 h-full flex flex-col justify-between text-xs text-white/50 pr-2 z-10">
                  <span>5k</span>
                  <span className="my-auto">2.5k</span>
                  <span>0</span>
                </div>

                {/* Main chart area */}
                <div className="absolute top-0 left-14 right-0 bottom-6 bg-transparent">
                  {/* Horizontal grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    <div className="border-b border-white/10"></div>
                    <div className="border-b border-white/10"></div>
                    <div className="border-b border-white/10"></div>
                    <div className="border-b border-white/10"></div>
                    <div className="border-b border-white/10"></div>
                  </div>

                  {/* Bar Chart */}
                  <div className="flex h-full items-end space-x-2 pr-4">
                    {memberGrowthData.map((item, i) => {
                      // Calculate percentage height
                      const maxMembers = Math.max(...memberGrowthData.map(d => d['New Members']));
                      const percentage = (item['New Members'] / maxMembers) * 100;

                      return (
                        <div key={i} className="flex-1 flex flex-col items-center group">
                          <div className="w-full relative">
                            <div
                              style={{
                                height: `${percentage}%`,
                                minHeight: '8px',
                                backgroundColor: CHART_COLORS.secondary,
                                opacity: 0.7 + 0.3 * (percentage / 100),
                              }}
                              className="w-full hover:opacity-90 rounded-t transition-all duration-300"
                            ></div>

                            {/* Enhanced tooltip */}
                            <div className="absolute opacity-0 group-hover:opacity-100 bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-[#011829] p-2 rounded border border-white/10 text-white text-xs whitespace-nowrap z-10 pointer-events-none transition-opacity duration-200">
                              <p className="font-medium">{item.date}</p>
                              <p className="text-white/80">
                                {new Intl.NumberFormat('us').format(item['New Members'])} new
                                members
                              </p>
                              {i > 0 && (
                                <p
                                  className={`text-xs ${
                                    item['New Members'] > memberGrowthData[i - 1]['New Members']
                                      ? 'text-emerald-400'
                                      : 'text-rose-400'
                                  }`}
                                >
                                  {item['New Members'] > memberGrowthData[i - 1]['New Members']
                                    ? '↑ '
                                    : '↓ '}
                                  {Math.abs(
                                    Math.round(
                                      ((item['New Members'] -
                                        memberGrowthData[i - 1]['New Members']) /
                                        memberGrowthData[i - 1]['New Members']) *
                                        100
                                    )
                                  )}
                                  % from {memberGrowthData[i - 1].date}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* X-axis month labels */}
                <div className="absolute bottom-0 left-14 right-0 flex justify-between text-xs text-white/50">
                  {memberGrowthData.map((item, i) => (
                    <span key={i}>{item.date}</span>
                  ))}
                </div>

                {/* Legend - bottom right */}
                <div className="absolute bottom-0 right-3 bg-black/30 backdrop-blur-sm rounded-md px-3 py-1 flex items-center border border-white/10">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: CHART_COLORS.secondary }}
                    ></div>
                    <span className="text-xs text-white">New members</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-start mt-1 text-xs text-white/60">
                <div>
                  Monthly data for{' '}
                  {selectedPeriod === '30d'
                    ? 'last 30 days'
                    : selectedPeriod === '7d'
                      ? 'last 7 days'
                      : 'last 90 days'}
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Card>

      {/* Platform Performance and Sentiment */}
      <Grid numItemsMd={1} numItemsLg={2} className="gap-6">
        <Card className="glass-card border border-white/5">
          <Title className="text-white">Platform Performance</Title>
          <Text className="text-white/60 mb-5">Engagement across different platforms</Text>

          <div className="space-y-5">
            {platformData.map(platform => (
              <div
                key={platform.platform}
                className="p-3 rounded-lg bg-black/20 hover:bg-black/30 transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full`}
                      style={{
                        backgroundColor:
                          platform.platform === 'Telegram'
                            ? CHART_COLORS.primary
                            : platform.platform === 'Discord'
                              ? CHART_COLORS.tertiary
                              : CHART_COLORS.secondary,
                      }}
                    />
                    <Text className="text-white font-medium">{platform.platform}</Text>
                  </div>
                  <Badge
                    className={`${
                      platform.platform === 'Telegram'
                        ? 'bg-blue-500/20 text-blue-400'
                        : platform.platform === 'Discord'
                          ? 'bg-violet-500/20 text-violet-400'
                          : 'bg-pink-500/20 text-pink-400'
                    }`}
                  >
                    {platform.growth}
                  </Badge>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <Text className="text-white/60 text-xs">
                    {platform.activeUsers} active / {platform.messages} msgs
                  </Text>
                  <Text className="text-white/60 text-xs">{platform.engagement}% engagement</Text>
                </div>
                {/* Add visual target marker for context */}
                <div className="relative">
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full`}
                      style={{
                        width: `${platform.engagement}%`,
                        backgroundColor:
                          platform.platform === 'Telegram'
                            ? CHART_COLORS.primary
                            : platform.platform === 'Discord'
                              ? CHART_COLORS.tertiary
                              : CHART_COLORS.secondary,
                      }}
                    ></div>
                  </div>
                  {/* Target marker at 70% */}
                  <div className="absolute top-0 bottom-0 left-[70%] w-0.5 bg-white/30 rounded"></div>
                  <div className="absolute -top-1 -mt-4 left-[70%] transform -translate-x-1/2 text-[10px] text-white/40">
                    Target
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="glass-card border border-white/5">
          <Title className="text-white">Community Sentiment</Title>
          <Text className="text-white/60 mb-6">Overall sentiment across all platforms</Text>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-center">
              {/* Improved Custom Pie Chart */}
              <svg width="160" height="160" viewBox="0 0 100 100">
                {/* SVG Donut Chart */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#111" strokeWidth="1" />

                {/* Positive Slice - 68% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke={CHART_COLORS.positive}
                  strokeWidth="20"
                  strokeDasharray="251.2 0"
                  strokeDashoffset="0"
                  transform="rotate(-90, 50, 50)"
                />

                {/* Neutral Slice - 22% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke={CHART_COLORS.neutral}
                  strokeWidth="20"
                  strokeDasharray="81.4 169.9"
                  strokeDashoffset="0"
                  transform="rotate(-90, 50, 50)"
                />

                {/* Negative Slice - 10% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke={CHART_COLORS.negative}
                  strokeWidth="20"
                  strokeDasharray="37 214.2"
                  strokeDashoffset="-81.4"
                  transform="rotate(-90, 50, 50)"
                />

                {/* Center circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="20"
                  fill={CHART_COLORS.background}
                  stroke="#111"
                  strokeWidth="1"
                />

                {/* Add sentiment score in center */}
                <text
                  x="50"
                  y="53"
                  fill={CHART_COLORS.primary}
                  fontSize="10"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  7.2/10
                </text>
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <div className="space-y-3 mb-4">
                {sentimentData.map(item => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={`w-4 h-4 rounded-full mr-2`}
                        style={{
                          backgroundColor:
                            item.name === 'Positive'
                              ? CHART_COLORS.positive
                              : item.name === 'Neutral'
                                ? CHART_COLORS.neutral
                                : CHART_COLORS.negative,
                        }}
                      />
                      <Text className="text-white font-medium">{item.name}</Text>
                    </div>
                    <Text className="text-white font-medium text-lg">{item.value}%</Text>
                  </div>
                ))}
              </div>
              <div className="mt-2 pt-2 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <Text className="text-white/60 text-xs">Total sentiment score</Text>
                  <Text className="text-accent font-medium">7.2/10</Text>
                </div>
                {/* Add historical context */}
                <div className="flex items-center mt-1">
                  <div className="w-full bg-white/10 h-1 rounded-full">
                    <div className="bg-accent h-full rounded-full" style={{ width: '72%' }}></div>
                  </div>
                  <span className="text-white/40 text-xs ml-2">+0.5 from last month</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Grid>

      {/* Activity Heatmap and Topics */}
      <Grid numItemsMd={1} numItemsLg={2} className="gap-6">
        <Card className="glass-card border border-white/5">
          <Title className="text-white">Hourly Activity</Title>
          <Text className="text-white/60 mb-5">Message volume by hour across all platforms</Text>

          {/* Heatmap for hourly activity */}
          <div className="relative h-64 mt-4">
            {/* Peak period annotation */}
            <div className="absolute top-2 right-2 bg-[#011829]/80 rounded-md px-2 py-1 z-10">
              <span className="text-xs text-white/80">Peak hours: 16:00-20:00</span>
            </div>

            {/* Days of week labels - Y axis */}
            <div className="absolute left-0 top-10 bottom-6 flex flex-col justify-between text-xs text-white/70">
              {weekdayActivity.map(day => (
                <span key={day.day} className="h-6 flex items-center">
                  {day.day}
                </span>
              ))}
            </div>

            {/* Hours labels - X axis */}
            <div className="absolute left-10 right-0 bottom-0 flex justify-between text-xs text-white/70">
              {['00', '02', '04', '06', '08', '10', '12', '14', '16', '18', '20', '22'].map(
                hour => (
                  <div key={hour} className="flex-1 text-center">
                    {hour}
                  </div>
                )
              )}
            </div>

            {/* Heatmap grid */}
            <div className="absolute left-10 right-0 top-10 bottom-6 grid grid-rows-7 gap-1">
              {weekdayActivity.map((day, dayIndex) => (
                <div key={day.day} className="flex justify-between gap-1">
                  {['00', '02', '04', '06', '08', '10', '12', '14', '16', '18', '20', '22'].map(
                    hour => {
                      // Calculate color intensity based on message volume
                      const value = day[hour] as number;
                      const maxValue = 550; // Approximate max value in the dataset
                      const intensity = Math.min(value / maxValue, 1);

                      // Calculate color (cyan to blue gradient based on intensity)
                      // For high values (peak hours) - more cyan
                      // For low values - darker blue
                      const colorR = Math.round(135 * intensity);
                      const colorG = Math.round(250 * intensity);
                      const colorB = Math.round(253);

                      return (
                        <div
                          key={`${day.day}-${hour}`}
                          className="flex-1 rounded group relative"
                          style={{
                            backgroundColor: `rgba(${colorR}, ${colorG}, ${colorB}, ${0.1 + intensity * 0.7})`,
                            height: '100%',
                          }}
                        >
                          {/* Enhanced tooltip */}
                          <div className="absolute opacity-0 group-hover:opacity-100 bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-[#011829] p-2 rounded border border-white/10 text-white text-xs whitespace-nowrap z-10 pointer-events-none transition-opacity duration-200">
                            <p className="font-medium">
                              {day.day} {hour}:00
                            </p>
                            <p className="text-white/80">{value} messages</p>
                            {value > 400 && (
                              <p className="text-xs text-emerald-400">Peak activity</p>
                            )}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              ))}
            </div>

            {/* Color scale legend */}
            <div className="absolute right-3 top-3 bg-black/30 backdrop-blur-sm rounded-md px-3 py-1 flex items-center gap-2 border border-white/10">
              <span className="text-xs text-white/70">Volume:</span>
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: 'rgba(135, 250, 253, 0.1)' }}
                ></div>
                <span className="mx-1 text-xs text-white/70">Low</span>
              </div>
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: 'rgba(135, 250, 253, 0.4)' }}
                ></div>
                <span className="mx-1 text-xs text-white/70">Medium</span>
              </div>
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: 'rgba(135, 250, 253, 0.8)' }}
                ></div>
                <span className="mx-1 text-xs text-white/70">High</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="glass-card border border-white/5">
          <Title className="text-white">Trending Topics</Title>
          <Text className="text-white/60 mb-5">Most discussed subjects in the last period</Text>

          <div className="space-y-3">
            {topTopics.map(topic => (
              <div
                key={topic.topic}
                className="p-3 rounded-lg bg-black/20 hover:bg-black/30 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`${
                        topic.sentiment === 'Positive'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : topic.sentiment === 'Neutral'
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-rose-500/20 text-rose-400'
                      }`}
                    >
                      {topic.sentiment}
                    </Badge>
                    <Text className="text-white font-medium">{topic.topic}</Text>
                  </div>
                  <div className="flex flex-col items-end">
                    <Text className="text-white/60 text-xs">{topic.mentions} mentions</Text>
                    <Text
                      className={`text-xs ${topic.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}
                    >
                      {topic.change} vs last period
                    </Text>
                  </div>
                </div>
                {/* Enhanced progress bar with context */}
                <div className="relative">
                  <ProgressBar
                    value={topic.mentions / 5} // Normalize to a percentage
                    className="h-1.5"
                    color={
                      topic.sentiment === 'Positive'
                        ? 'emerald'
                        : topic.sentiment === 'Neutral'
                          ? 'amber'
                          : 'rose'
                    }
                    tooltip={`${topic.mentions} mentions in the last period`}
                  />
                  {/* Add previous value marker */}
                  {topic.change && (
                    <div
                      className="absolute top-0 bottom-0 h-3 w-0.5 bg-white/30"
                      style={{
                        left: `${
                          topic.mentions / 5 -
                          (topic.change.startsWith('+')
                            ? parseFloat(topic.change)
                            : parseFloat(topic.change) * -1)
                        }%`,
                        transform: 'translateY(-25%)',
                      }}
                    ></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Grid>

      {/* Recent Activity Feed - Could be expanded to a real-time feed */}
      <Card className="glass-card border border-white/5">
        <div className="flex justify-between items-center mb-5">
          <div>
            <Title className="text-white">Recent Activity</Title>
            <Text className="text-white/60">Latest interactions across platforms</Text>
          </div>
          <Badge color="blue" icon={BellIcon}>
            Live Updates
          </Badge>
        </div>

        <div className="space-y-4">
          {/* This could be connected to real-time data */}
          {[
            {
              platform: 'Telegram',
              time: '5m ago',
              action: 'New member joined',
              details: 'User0x123 joined the Telegram group',
            },
            {
              platform: 'Discord',
              time: '12m ago',
              action: 'Question asked',
              details: 'New question in #support about wallet connection',
            },
            {
              platform: 'Twitter',
              time: '34m ago',
              action: 'Mention',
              details: '@AidenAI mentioned in a tweet about AI assistants',
            },
            {
              platform: 'Discord',
              time: '1h ago',
              action: 'Announcement',
              details: 'New platform update announced in #announcements',
            },
          ].map((activity, idx) => (
            <div key={idx} className="flex items-start gap-3 border-b border-white/5 pb-3">
              <div
                className={`p-2 rounded-full ${
                  activity.platform === 'Telegram'
                    ? 'bg-blue-400/10 text-blue-400'
                    : activity.platform === 'Discord'
                      ? 'bg-indigo-400/10 text-indigo-400'
                      : 'bg-cyan-400/10 text-cyan-400'
                }`}
              >
                <GlobeAltIcon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <Text className="text-white font-medium">{activity.action}</Text>
                  <Text className="text-white/40 text-xs">{activity.time}</Text>
                </div>
                <Text className="text-white/70 text-sm">{activity.details}</Text>
                <div className="mt-1">
                  <Badge
                    size="xs"
                    className={
                      activity.platform === 'Telegram'
                        ? 'bg-blue-400/10 text-blue-400'
                        : activity.platform === 'Discord'
                          ? 'bg-indigo-400/10 text-indigo-400'
                          : 'bg-cyan-400/10 text-cyan-400'
                    }
                  >
                    {activity.platform}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <button className="text-accent hover:text-white/80 text-sm font-medium transition-colors">
            View all activity →
          </button>
        </div>
      </Card>
    </motion.div>
  );
}
