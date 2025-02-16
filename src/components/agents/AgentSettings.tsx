'use client';

import { useState, useRef } from 'react';
import { Card, Title, Text } from '@tremor/react';
import { motion } from 'framer-motion';
import { UserCircleIcon, PhotoIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface AgentSettingsProps {
  agentId: string;
  initialName: string;
  initialAvatar?: string;
  onUpdate: (data: { name: string; avatar?: File }) => void;
}

export default function AgentSettings({
  agentId,
  initialName,
  initialAvatar,
  onUpdate,
}: AgentSettingsProps) {
  const [name, setName] = useState(initialName);
  const [avatar, setAvatar] = useState<string | undefined>(initialAvatar);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview URL for the UI
      const previewUrl = URL.createObjectURL(file);
      setAvatar(previewUrl);

      // Trigger update
      onUpdate({ name, avatar: file });
      setIsUploading(true);

      // Simulate upload completion
      setTimeout(() => {
        setIsUploading(false);
      }, 1500);
    }
  };

  const handleNameUpdate = () => {
    onUpdate({ name });
  };

  return (
    <Card className="glass-card">
      <div className="space-y-6">
        {/* Avatar Section */}
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div
              className="w-24 h-24 rounded-full bg-[#87fafd]/10 flex items-center justify-center overflow-hidden cursor-pointer group"
              onClick={() => fileInputRef.current?.click()}
            >
              {avatar ? (
                <img src={avatar} alt={name} className="w-full h-full object-cover" />
              ) : (
                <UserCircleIcon className="w-16 h-16 text-accent" />
              )}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <PhotoIcon className="w-8 h-8 text-white" />
              </div>
            </div>
            {isUploading && (
              <div className="absolute top-0 right-0">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 bg-accent rounded-full flex items-center justify-center"
                >
                  <CheckCircleIcon className="w-4 h-4 text-black" />
                </motion.div>
              </div>
            )}
          </div>
          <div>
            <Title className="text-white">Agent Avatar</Title>
            <Text className="text-white/70">Upload a profile picture for your agent</Text>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </div>
        </div>

        {/* Name Section */}
        <div className="space-y-2">
          <Title className="text-white">Agent Name</Title>
          <div className="flex space-x-2">
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="flex-1 bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none"
              placeholder="Enter agent name"
            />
            <button onClick={handleNameUpdate} className="button-primary">
              Update Name
            </button>
          </div>
        </div>

        {/* Platform Settings */}
        <div className="space-y-2">
          <Title className="text-white">Platform Settings</Title>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-4">
              <Text className="text-white/70">Display Name Format</Text>
              <select className="w-full mt-2 bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none">
                <option value="name">Name Only</option>
                <option value="name-bot">Name (Bot)</option>
                <option value="bot-name">Bot | Name</option>
              </select>
            </div>
            <div className="glass-card p-4">
              <Text className="text-white/70">Status Message</Text>
              <input
                type="text"
                className="w-full mt-2 bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                placeholder="Enter status message"
              />
            </div>
          </div>
        </div>

        {/* Personality Traits */}
        <div className="space-y-2">
          <Title className="text-white">Personality Settings</Title>
          <div className="glass-card p-4">
            <div className="space-y-4">
              <div>
                <Text className="text-white/70">Communication Style</Text>
                <select className="w-full mt-2 bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none">
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                  <option value="friendly">Friendly</option>
                  <option value="technical">Technical</option>
                </select>
              </div>
              <div>
                <Text className="text-white/70">Response Length</Text>
                <select className="w-full mt-2 bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none">
                  <option value="concise">Concise</option>
                  <option value="balanced">Balanced</option>
                  <option value="detailed">Detailed</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
