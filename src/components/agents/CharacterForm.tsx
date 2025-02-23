'use client';

import { useState } from 'react';
import { useForm, Control, useController } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

// Character schema definition
export const characterSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  bio: z.string().min(1, 'Bio is required'),
  // one of 'twitter' or 'telegram'
  clients: z.array(z.enum(['twitter', 'telegram'])),
  lore: z.string(),
  system: z.string(),
  modelProvider: z.string().default('openai'),
  settings: z.object({
    secrets: z.object({
      OPENAI_API_KEY: z.string(),
      TWITTER_USERNAME: z.string().optional(),
      TWITTER_PASSWORD: z.string().optional(),
      TWITTER_EMAIL: z.string().email().optional(),
    }),
    voice: z.object({
      model: z.string().default('en_US-hfc_female-medium'),
    }),
    embeddingModel: z.string().default('text-embedding-3-small'),
  }),
  knowledge: z.array(z.string()).optional(),
  plugins: z.array(z.any()).optional(),
  style: z.object({
    all: z.array(z.string()).default([]),
    chat: z.array(z.string()).default([]),
    post: z.array(z.string()).default([]),
  }),
});

type CharacterFormData = z.infer<typeof characterSchema>;

interface StyleFieldProps {
  label: string;
  control: Control<CharacterFormData>;
  name: keyof CharacterFormData['style'];
}

const StyleField = ({ label, control, name }: StyleFieldProps) => {
  const { field } = useController({
    name: `style.${name}`,
    control,
    defaultValue: [],
  });

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white/80">{label}</label>
      <textarea
        placeholder="Enter style instructions (one per line)"
        className="w-full min-h-[100px] rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent"
        value={field.value?.join('\n') || ''}
        onChange={e => {
          const lines = e.target.value
            .split('\n')
            .map(line => line.trim())
            .filter(Boolean);
          field.onChange(lines);
        }}
      />
      <p className="text-sm text-white/50">Enter each style instruction on a new line</p>
    </div>
  );
};

export function CharacterForm({
  onFormSubmit,
  initialData,
}: {
  onFormSubmit: (data: CharacterFormData) => Promise<void>;
  initialData?: Partial<CharacterFormData>;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: CharacterFormData) => {
    try {
      setIsSubmitting(true);
      await onFormSubmit(data);
      toast.success('Character saved successfully');
    } catch (error) {
      console.error('Error saving character:', error);
      toast.error('Failed to save character');
    } finally {
      setIsSubmitting(false);
    }
  };

  const form = useForm<CharacterFormData>({
    resolver: zodResolver(characterSchema),
    defaultValues: initialData || {
      clients: ['twitter'],
      modelProvider: 'openai',
      settings: {
        secrets: {
          OPENAI_API_KEY: '',
        },
        voice: {
          model: 'en_US-hfc_female-medium',
        },
        embeddingModel: 'text-embedding-3-small',
      },
      knowledge: [''],
      plugins: [],
      style: {
        all: [],
        chat: [],
        post: [],
      },
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="space-y-8 p-6 rounded-xl bg-gradient-to-b from-[#011829] via-[#030f1c] to-black/50 border border-white/5"
    >
      <div className="space-y-8">
        {/* Basic Information */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white/80">Name</label>
            <input
              {...form.register('name')}
              className="mt-2 block w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent"
              placeholder="Enter character name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80">Bio</label>
            <textarea
              {...form.register('bio')}
              className="mt-2 block w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent min-h-[100px]"
              placeholder="Describe your character's personality and role"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80">Lore</label>
            <textarea
              {...form.register('lore')}
              className="mt-2 block w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent min-h-[100px]"
              placeholder="Add background story and context"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80">System Prompt</label>
            <textarea
              {...form.register('system')}
              className="mt-2 block w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent min-h-[100px]"
              placeholder="Define core behavior and rules"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80">OpenAI API Key</label>
            <input
              type="password"
              {...form.register('settings.secrets.OPENAI_API_KEY')}
              className="mt-2 block w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent"
              placeholder="sk-..."
            />
            <p className="mt-1 text-sm text-white/50">Your API key will be encrypted</p>
          </div>
        </div>
      </div>

      {/* Model Settings */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-white">Model Configuration</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-white/80">Model Provider</label>
            <select
              {...form.register('modelProvider')}
              className="mt-2 block w-full rounded-lg bg-white/5 border border-white/10 text-white focus:border-accent focus:ring-accent"
            >
              <option value="openai">OpenAI</option>
            </select>
          </div>
        </div>
      </div>

      {/* Secrets */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-white">API Keys & Secrets</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-white/80">OpenAI API Key</label>
            <input
              type="password"
              {...form.register('settings.secrets.OPENAI_API_KEY')}
              className="mt-2 block w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80">Twitter Username</label>
            <input
              {...form.register('settings.secrets.TWITTER_USERNAME')}
              className="mt-2 block w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent"
              placeholder="@username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80">Twitter Password</label>
            <input
              type="password"
              {...form.register('settings.secrets.TWITTER_PASSWORD')}
              className="mt-2 block w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80">Twitter Email</label>
            <input
              {...form.register('settings.secrets.TWITTER_EMAIL')}
              className="mt-2 block w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent"
              placeholder="email@example.com"
            />
          </div>
        </div>
      </div>

      {/* Style Fields */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-white">Style Configuration</h3>

        <StyleField label="General Style" control={form.control} name="all" />

        <StyleField label="Chat Style" control={form.control} name="chat" />

        <StyleField label="Post Style" control={form.control} name="post" />
      </div>

      <button type="submit" disabled={isSubmitting} className="button-primary w-full">
        {isSubmitting ? 'Creating Character...' : 'Create Character'}
      </button>
    </form>
  );
}
