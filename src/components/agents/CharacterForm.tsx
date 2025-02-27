'use client';

import { useState } from 'react';
import { useForm, Control, useController } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

// Character schema definition
export const characterSchema = z.object({
  // Required fields
  name: z.string().min(1, 'Name is required'),
  bio: z.string().min(1, 'Bio is required'),
  clients: z.array(z.enum(['twitter', 'telegram'])),
  lore: z.array(z.string()).min(1, 'At least one lore entry is required'),
  system: z.string().min(1, 'System prompt is required'),
  modelProvider: z.enum(['openai']).default('openai'),

  // Optional fields
  imageModelProvider: z.enum(['openai']).optional(),
  imageVisionModelProvider: z.enum(['openai']).optional(),
  modelEndpointOverride: z.string().optional(),
  settings: z.object({
    secrets: z.object({
      OPENAI_API_KEY: z.string().min(1, 'OpenAI API Key is required'),
      TWITTER_USERNAME: z.string().optional(),
      TWITTER_PASSWORD: z.string().optional(),
      TWITTER_EMAIL: z.string().email().optional(),
    }),
  }),
  // Required fields from Character type
  messageExamples: z
    .array(
      z.array(
        z.object({
          user: z.string(),
          content: z.object({
            text: z.string(),
          }),
        })
      )
    )
    .default([]),
  postExamples: z.array(z.string()).default([]),
  topics: z.array(z.string()).default([]),
  adjectives: z.array(z.string()).default([]),
  // Optional fields
  knowledge: z
    .array(
      z.union([
        z.string(),
        z.object({
          path: z.string(),
          shared: z.boolean().optional(),
        }),
      ])
    )
    .default([]),
  plugins: z.array(z.any()).default([]),
  style: z
    .object({
      all: z.array(z.string()).default([]),
      chat: z.array(z.string()).default([]),
      post: z.array(z.string()).default([]),
    })
    .default({
      all: [],
      chat: [],
      post: [],
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

  const value = field.value || [];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white/80">{label}</label>
      <textarea
        placeholder="Enter style instructions (one per line)"
        className="w-full min-h-[100px] rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent"
        value={value.join('\n')}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          const lines = e.target.value.split('\n');
          field.onChange(lines);
        }}
        onKeyDown={e => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
          }
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

  const form = useForm<CharacterFormData>({
    resolver: zodResolver(characterSchema),
    defaultValues: initialData || {
      name: '',
      bio: '',
      system: '',
      clients: ['twitter'],
      lore: [],
      messageExamples: [[]], // Initialize as empty array of arrays
      postExamples: [],
      topics: [],
      adjectives: [],
      modelProvider: 'openai',
      settings: {
        secrets: {
          OPENAI_API_KEY: '',
          TWITTER_USERNAME: '',
          TWITTER_PASSWORD: '',
          TWITTER_EMAIL: '',
        },
      },
    },
  });

  const onSubmit = async (data: CharacterFormData) => {
    try {
      setIsSubmitting(true);
      const transformedData = {
        ...data,
        messageExamples: data.messageExamples || [[]],
      };

      await onFormSubmit(transformedData);
      toast.success('Character saved successfully!');
    } catch (error) {
      console.error('Error saving character:', error);
      toast.error('Failed to save character');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
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
            {form.formState.errors.name && (
              <p className="mt-1 text-sm text-red-500">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80">Bio</label>
            <textarea
              {...form.register('bio')}
              className="mt-2 block w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent min-h-[100px]"
              placeholder="Describe your character's personality and role"
            />
            {form.formState.errors.bio && (
              <p className="mt-1 text-sm text-red-500">{form.formState.errors.bio.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80">Lore</label>
            <textarea
              className="mt-2 block w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent min-h-[100px]"
              placeholder="Add background story and context (one per line)"
              value={form.watch('lore')?.join('\n') || ''}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                const lines = e.target.value.split('\n');
                form.setValue('lore', lines);
              }}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                }
              }}
            />
            {form.formState.errors.lore && (
              <p className="mt-1 text-sm text-red-500">{form.formState.errors.lore.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80">System Prompt</label>
            <textarea
              {...form.register('system')}
              className="mt-2 block w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent min-h-[100px]"
              placeholder="Define core behavior and rules"
            />
            {form.formState.errors.system && (
              <p className="mt-1 text-sm text-red-500">{form.formState.errors.system.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80">OpenAI API Key</label>
            <input
              type="password"
              {...form.register('settings.secrets.OPENAI_API_KEY')}
              className="mt-2 block w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent"
              placeholder="sk-..."
            />
            {form.formState.errors.settings?.secrets?.OPENAI_API_KEY && (
              <p className="mt-1 text-sm text-red-500">
                {form.formState.errors.settings.secrets.OPENAI_API_KEY.message}
              </p>
            )}
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
            {form.formState.errors.modelProvider && (
              <p className="mt-1 text-sm text-red-500">
                {form.formState.errors.modelProvider.message}
              </p>
            )}
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
            {form.formState.errors.settings?.secrets?.TWITTER_USERNAME && (
              <p className="mt-1 text-sm text-red-500">
                {form.formState.errors.settings.secrets.TWITTER_USERNAME.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80">Twitter Password</label>
            <input
              type="password"
              {...form.register('settings.secrets.TWITTER_PASSWORD')}
              className="mt-2 block w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent"
            />
            {form.formState.errors.settings?.secrets?.TWITTER_PASSWORD && (
              <p className="mt-1 text-sm text-red-500">
                {form.formState.errors.settings.secrets.TWITTER_PASSWORD.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80">Twitter Email</label>
            <input
              {...form.register('settings.secrets.TWITTER_EMAIL')}
              className="mt-2 block w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent"
              placeholder="email@example.com"
            />
            {form.formState.errors.settings?.secrets?.TWITTER_EMAIL && (
              <p className="mt-1 text-sm text-red-500">
                {form.formState.errors.settings.secrets.TWITTER_EMAIL.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Optional Fields */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-white">Optional Configuration</h3>

        {/* Image Model Provider */}
        <div>
          <label className="block text-sm font-medium text-white/80">Image Model Provider</label>
          <select
            {...form.register('imageModelProvider')}
            className="mt-2 block w-full rounded-lg bg-white/5 border border-white/10 text-white focus:border-accent focus:ring-accent"
          >
            <option value="">None</option>
            <option value="openai">OpenAI</option>
          </select>
          {form.formState.errors.imageModelProvider && (
            <p className="mt-1 text-sm text-red-500">
              {form.formState.errors.imageModelProvider.message}
            </p>
          )}
        </div>

        {/* Image Vision Model Provider */}
        <div>
          <label className="block text-sm font-medium text-white/80">
            Image Vision Model Provider
          </label>
          <select
            {...form.register('imageVisionModelProvider')}
            className="mt-2 block w-full rounded-lg bg-white/5 border border-white/10 text-white focus:border-accent focus:ring-accent"
          >
            <option value="">None</option>
            <option value="openai">OpenAI</option>
          </select>
          {form.formState.errors.imageVisionModelProvider && (
            <p className="mt-1 text-sm text-red-500">
              {form.formState.errors.imageVisionModelProvider.message}
            </p>
          )}
        </div>

        {/* Model Endpoint Override */}
        <div>
          <label className="block text-sm font-medium text-white/80">Model Endpoint Override</label>
          <input
            {...form.register('modelEndpointOverride')}
            className="mt-2 block w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent"
            placeholder="Custom model endpoint URL (optional)"
          />
          {form.formState.errors.modelEndpointOverride && (
            <p className="mt-1 text-sm text-red-500">
              {form.formState.errors.modelEndpointOverride.message}
            </p>
          )}
        </div>

        {/* Knowledge Base */}
        <div>
          <label className="block text-sm font-medium text-white/80">Knowledge Base</label>
          <textarea
            className="mt-2 block w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent min-h-[100px]"
            placeholder="Add knowledge items (one per line)"
            value={form.watch('knowledge')?.join('\n') || ''}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              const lines = e.target.value.split('\n');
              form.setValue('knowledge', lines);
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
              }
            }}
          />
          <p className="mt-1 text-sm text-white/50">Enter each knowledge item on a new line</p>
          {form.formState.errors.knowledge && (
            <p className="mt-1 text-sm text-red-500">{form.formState.errors.knowledge.message}</p>
          )}
        </div>

        {/* Message Examples */}
        <div>
          <label className="block text-sm font-medium text-white/80">Message Examples</label>
          <textarea
            className="mt-2 block w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent min-h-[100px]"
            placeholder="Add example messages (one per line)"
            value={
              form
                .watch('messageExamples')?.[0]
                ?.map(msg => msg.content.text)
                .join('\n') || ''
            }
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              const lines = e.target.value.split('\n');
              const examples = lines.map(text => ({
                user: 'user',
                content: { text },
              }));
              form.setValue('messageExamples', [examples]);
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
              }
            }}
          />
          <p className="mt-1 text-sm text-white/50">Enter each example message on a new line</p>
          {form.formState.errors.messageExamples && (
            <p className="mt-1 text-sm text-red-500">
              {form.formState.errors.messageExamples.message}
            </p>
          )}
        </div>

        {/* Post Examples */}
        <div>
          <label className="block text-sm font-medium text-white/80">Post Examples</label>
          <textarea
            className="mt-2 block w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent min-h-[100px]"
            placeholder="Add example posts (one per line)"
            value={form.watch('postExamples')?.join('\n') || ''}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              const lines = e.target.value.split('\n');
              form.setValue('postExamples', lines);
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
              }
            }}
          />
          <p className="mt-1 text-sm text-white/50">Enter each example post on a new line</p>
          {form.formState.errors.postExamples && (
            <p className="mt-1 text-sm text-red-500">
              {form.formState.errors.postExamples.message}
            </p>
          )}
        </div>

        {/* Topics */}
        <div>
          <label className="block text-sm font-medium text-white/80">Topics</label>
          <textarea
            className="mt-2 block w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent min-h-[100px]"
            placeholder="Add topics (one per line)"
            value={form.watch('topics')?.join('\n') || ''}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              const lines = e.target.value.split('\n');
              form.setValue('topics', lines);
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
              }
            }}
          />
          <p className="mt-1 text-sm text-white/50">Enter each topic on a new line</p>
          {form.formState.errors.topics && (
            <p className="mt-1 text-sm text-red-500">{form.formState.errors.topics.message}</p>
          )}
        </div>

        {/* Adjectives */}
        <div>
          <label className="block text-sm font-medium text-white/80">Adjectives</label>
          <textarea
            className="mt-2 block w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent min-h-[100px]"
            placeholder="Add character adjectives (one per line)"
            value={form.watch('adjectives')?.join('\n') || ''}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              const lines = e.target.value.split('\n');
              form.setValue('adjectives', lines);
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
              }
            }}
          />
          <p className="mt-1 text-sm text-white/50">Enter each adjective on a new line</p>
          {form.formState.errors.adjectives && (
            <p className="mt-1 text-sm text-red-500">{form.formState.errors.adjectives.message}</p>
          )}
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
