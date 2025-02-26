'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UserCircleIcon,
  BellIcon,
  ShieldCheckIcon,
  UsersIcon,
  KeyIcon,
  ArrowLeftOnRectangleIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profile Settings', icon: UserCircleIcon },
    { id: 'team', name: 'Team Management', icon: UsersIcon },
    { id: 'preferences', name: 'Preferences', icon: BellIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
    { id: 'admin', name: 'Admin Controls', icon: KeyIcon },
    { id: 'modlog', name: 'Moderation Log', icon: ClipboardDocumentListIcon },
  ];

  // Mock moderation log data
  const moderationLogs = [
    {
      id: 1,
      action: 'User Role Updated',
      target: 'john.doe@example.com',
      moderator: 'Admin',
      details: 'Changed role from Member to Admin',
      timestamp: '2024-02-14 15:30:45',
    },
    {
      id: 2,
      action: 'API Key Generated',
      target: 'System',
      moderator: 'Admin',
      details: 'New API key generated for production environment',
      timestamp: '2024-02-14 14:22:10',
    },
    {
      id: 3,
      action: 'Document Removed',
      target: 'Knowledge Base',
      moderator: 'Moderator',
      details: 'Removed outdated documentation',
      timestamp: '2024-02-14 12:15:33',
    },
    {
      id: 4,
      action: 'Team Member Added',
      target: 'sarah.smith@example.com',
      moderator: 'Admin',
      details: 'Added new team member with Viewer role',
      timestamp: '2024-02-14 10:05:21',
    },
    {
      id: 5,
      action: 'Security Setting Changed',
      target: 'System',
      moderator: 'Admin',
      details: '2FA requirement enabled for all team members',
      timestamp: '2024-02-14 09:30:00',
    },
  ];

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Settings</h1>
          <p className="text-white/70 mt-2">Manage your account settings and preferences</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />
          Logout
        </button>
      </div>

      <div className="glass-card">
        <div className="border-b border-white/10">
          <nav className="flex space-x-8 px-6 overflow-x-auto" aria-label="Tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center py-4 px-3 border-b-2 font-medium text-sm whitespace-nowrap
                  ${
                    activeTab === tab.id
                      ? 'border-accent text-accent'
                      : 'border-transparent text-white/70 hover:text-white hover:border-white/20'
                  }
                `}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-8">
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-xl font-medium text-white mb-6">Profile Information</h3>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div className="space-y-4">
                    <label htmlFor="username" className="block text-sm font-medium text-white/70">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-accent focus:ring-1 focus:ring-accent"
                      placeholder="Your username"
                    />
                  </div>

                  <div className="space-y-4">
                    <label htmlFor="email" className="block text-sm font-medium text-white/70">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-accent focus:ring-1 focus:ring-accent"
                      placeholder="Your email"
                    />
                  </div>

                  <div className="space-y-4">
                    <label htmlFor="wallet" className="block text-sm font-medium text-white/70">
                      Connected Wallet
                    </label>
                    <input
                      type="text"
                      name="wallet"
                      id="wallet"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white/50"
                      value="0x1234...5678"
                      disabled
                    />
                  </div>

                  <div className="space-y-4">
                    <label htmlFor="role" className="block text-sm font-medium text-white/70">
                      Role
                    </label>
                    <input
                      type="text"
                      name="role"
                      id="role"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white/50"
                      value="Admin"
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="button-primary">Save Changes</button>
              </div>
            </motion.div>
          )}

          {activeTab === 'team' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-medium text-white">Team Members</h3>
                  <button className="button-primary">Add Member</button>
                </div>

                <div className="space-y-4">
                  {[1, 2, 3].map(member => (
                    <div
                      key={member}
                      className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                          <UserCircleIcon className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">Team Member {member}</h4>
                          <p className="text-white/50 text-sm">member{member}@example.com</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <select className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70">
                          <option value="admin">Admin</option>
                          <option value="member">Member</option>
                          <option value="viewer">Viewer</option>
                        </select>
                        <button className="button-secondary text-red-400 hover:text-red-300">
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'preferences' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-xl font-medium text-white mb-6">Notification Preferences</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center space-x-3">
                      <BellIcon className="w-5 h-5 text-white/70" />
                      <div>
                        <h4 className="text-white font-medium">Agent Status Updates</h4>
                        <p className="text-white/50 text-sm">
                          Get notified when your agents complete tasks or require attention
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center space-x-3">
                      <BellIcon className="w-5 h-5 text-white/70" />
                      <div>
                        <h4 className="text-white font-medium">Training Completion</h4>
                        <p className="text-white/50 text-sm">
                          Receive notifications when agent training is complete
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center space-x-3">
                      <BellIcon className="w-5 h-5 text-white/70" />
                      <div>
                        <h4 className="text-white font-medium">Performance Alerts</h4>
                        <p className="text-white/50 text-sm">
                          Get notified about significant changes in agent performance
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center space-x-3">
                      <BellIcon className="w-5 h-5 text-white/70" />
                      <div>
                        <h4 className="text-white font-medium">Knowledge Base Updates</h4>
                        <p className="text-white/50 text-sm">
                          Notifications when new documents are added or updated
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center space-x-3">
                      <BellIcon className="w-5 h-5 text-white/70" />
                      <div>
                        <h4 className="text-white font-medium">Team Activity</h4>
                        <p className="text-white/50 text-sm">
                          Get updates about team member actions and changes
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                    </label>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-medium text-white mb-6">Display Preferences</h3>
                  <div className="space-y-6">
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <h4 className="text-white font-medium mb-4">Default Agent View</h4>
                      <select className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white">
                        <option value="grid">Grid View</option>
                        <option value="list">List View</option>
                        <option value="detailed">Detailed View</option>
                      </select>
                    </div>

                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <h4 className="text-white font-medium mb-4">Conversation History</h4>
                      <select className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white">
                        <option value="30">Last 30 days</option>
                        <option value="60">Last 60 days</option>
                        <option value="90">Last 90 days</option>
                        <option value="all">All Time</option>
                      </select>
                    </div>

                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <h4 className="text-white font-medium mb-4">Performance Metrics</h4>
                      <div className="space-y-4">
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded bg-white/5 border-white/10 text-accent focus:ring-accent"
                            defaultChecked
                          />
                          <span className="text-white">Show response time metrics</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded bg-white/5 border-white/10 text-accent focus:ring-accent"
                            defaultChecked
                          />
                          <span className="text-white">Show accuracy metrics</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded bg-white/5 border-white/10 text-accent focus:ring-accent"
                            defaultChecked
                          />
                          <span className="text-white">Show usage statistics</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button className="button-primary">Save Preferences</button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-xl font-medium text-white mb-6">Security Settings</h3>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div className="space-y-4">
                    <label
                      htmlFor="current-password"
                      className="block text-sm font-medium text-white/70"
                    >
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="current-password"
                      id="current-password"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  <div className="space-y-4">
                    <label
                      htmlFor="new-password"
                      className="block text-sm font-medium text-white/70"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      name="new-password"
                      id="new-password"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                  </div>
                </div>

                <div className="mt-8 p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="text-white font-medium mb-2">Two-Factor Authentication</h4>
                  <p className="text-white/50 text-sm mb-4">
                    Add an extra layer of security to your account
                  </p>
                  <button className="button-primary">Enable 2FA</button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'admin' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-xl font-medium text-white mb-6">Admin Controls</h3>

                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="text-white font-medium mb-2">API Keys</h4>
                    <p className="text-white/50 text-sm mb-4">
                      Manage API keys for your application
                    </p>
                    <div className="flex space-x-4">
                      <input
                        type="text"
                        className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/50"
                        value="sk_live_xxxxx...xxxxx"
                        disabled
                      />
                      <button className="button-primary">Generate New Key</button>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="text-white font-medium mb-2">Webhook Settings</h4>
                    <p className="text-white/50 text-sm mb-4">Configure webhook endpoints</p>
                    <div className="space-y-4">
                      <input
                        type="url"
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30"
                        placeholder="https://your-domain.com/webhook"
                      />
                      <div className="flex justify-end">
                        <button className="button-primary">Save Webhook</button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="text-white font-medium mb-2">Usage Statistics</h4>
                    <p className="text-white/50 text-sm mb-4">Monitor your application usage</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-white/5">
                        <p className="text-white/50 text-sm">API Calls</p>
                        <p className="text-2xl font-bold text-accent">23,451</p>
                      </div>
                      <div className="p-4 rounded-lg bg-white/5">
                        <p className="text-white/50 text-sm">Active Users</p>
                        <p className="text-2xl font-bold text-accent">1,234</p>
                      </div>
                      <div className="p-4 rounded-lg bg-white/5">
                        <p className="text-white/50 text-sm">Storage Used</p>
                        <p className="text-2xl font-bold text-accent">64.2 GB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'modlog' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-medium text-white">Moderation Log</h3>
                  <div className="flex items-center space-x-4">
                    <select className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70">
                      <option value="all">All Actions</option>
                      <option value="user">User Actions</option>
                      <option value="system">System Changes</option>
                      <option value="security">Security Events</option>
                    </select>
                    <button className="button-secondary">Export Log</button>
                  </div>
                </div>

                <div className="space-y-4">
                  {moderationLogs.map(log => (
                    <div
                      key={log.id}
                      className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-accent font-medium">{log.action}</span>
                            <span className="text-white/50">•</span>
                            <span className="text-white/70">{log.target}</span>
                          </div>
                          <p className="text-white/50 text-sm">{log.details}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white/70 text-sm">{log.moderator}</p>
                          <p className="text-white/50 text-xs">{log.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-white/50 text-sm">
                    <span>Showing 5 of 156 entries</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 disabled:opacity-50"
                      disabled
                    >
                      Previous
                    </button>
                    <button className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:bg-white/10">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
