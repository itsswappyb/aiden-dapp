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
  lore: z.array(z.string()),
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
  messageExamples: z.array(z.array(z.any())),
  postExamples: z.array(z.string()),
  topics: z.array(z.string()),
  adjectives: z.array(z.string()),
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
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <textarea
        placeholder="Enter style instructions (one per line)"
        className="w-full min-h-[100px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        value={field.value?.join('\n') || ''}
        onChange={e => {
          const lines = e.target.value
            .split('\n')
            .map(line => line.trim())
            .filter(Boolean);
          field.onChange(lines);
        }}
      />
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
      messageExamples: [],
      postExamples: [],
      topics: [],
      adjectives: [],
      style: {
        all: [],
        chat: [],
        post: [],
      },
    },
  });

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              {...form.register('name')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="Character name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              {...form.register('bio')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              rows={4}
              placeholder="Character biography"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Lore</label>
            <textarea
              {...form.register('lore')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              rows={4}
              placeholder="Character lore and background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">System Prompt</label>
            <textarea
              {...form.register('system')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              rows={4}
              placeholder="System instructions for the character"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">OpenAI API Key</label>
            <input
              type="password"
              {...form.register('settings.secrets.OPENAI_API_KEY')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="sk-..."
            />
          </div>
        </div>
      </div>

      {/* Model Settings */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">Model Provider</label>
          <select
            {...form.register('modelProvider')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="openai">OpenAI</option>
          </select>
        </div>
      </div>

      {/* Secrets */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">API Keys & Secrets</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">OpenAI API Key</label>
            <input
              type="password"
              {...form.register('settings.secrets.OPENAI_API_KEY')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Twitter Username</label>
            <input
              {...form.register('settings.secrets.TWITTER_USERNAME')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Twitter Password</label>
            <input
              type="password"
              {...form.register('settings.secrets.TWITTER_PASSWORD')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Twitter Email</label>
            <input
              {...form.register('settings.secrets.TWITTER_EMAIL')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Style Fields */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Style Configuration</h3>

        <StyleField label="General Style" control={form.control} name="all" />

        <StyleField label="Chat Style" control={form.control} name="chat" />

        <StyleField label="Post Style" control={form.control} name="post" />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Saving...' : 'Create Character'}
      </button>
    </form>
  );
}
