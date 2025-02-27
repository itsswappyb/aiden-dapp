'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LinkIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Source } from './types';
import KnowledgeBaseItem from './KnowledgeBaseItem';
import KnowledgeBaseForm from './KnowledgeBaseForm';
import LoadingIndicator from '../ui/LoadingIndicator';
import { useNotification } from '@/contexts/NotificationContext';
import { Card, Title, Text } from '@tremor/react';

interface KnowledgeBaseURLsPanelProps {
  sources: Source[];
  onAdd: (title: string, url: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function KnowledgeBaseURLsPanel({
  sources,
  onAdd,
  onDelete,
}: KnowledgeBaseURLsPanelProps) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { addNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && url) {
      setIsAdding(true);
      try {
        await onAdd(title, url);
        setTitle('');
        setUrl('');
      } catch (error) {
        // Error notification is handled by parent
      } finally {
        setIsAdding(false);
      }
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await onDelete(id);
    } catch (error) {
      // Error notification is handled by parent
    } finally {
      setDeletingId(null);
    }
  };

  const processedSources = sources.map(source => ({
    ...source,
    subtitle: `${source.url} • Added on ${source.addedAt}`,
  }));

  return (
    <div className="space-y-4">
      <Title>URLs</Title>

      <Card className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-white/70">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
              placeholder="Enter a title for the URL"
              required
              disabled={isAdding}
            />
          </div>
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-white/70">
              URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
              className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
              placeholder="https://example.com"
              required
              disabled={isAdding}
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-accent hover:bg-accent/80 text-black px-4 py-2 rounded-lg transition-opacity ${
              isAdding ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isAdding}
          >
            {isAdding ? (
              <div className="flex items-center justify-center space-x-2">
                <LoadingIndicator size="sm" />
                <span>Adding URL...</span>
              </div>
            ) : (
              'Add URL'
            )}
          </button>
        </form>
      </Card>

      {sources.length === 0 ? (
        <Card className="mt-4">
          <div className="flex flex-col items-center justify-center py-12">
            <LinkIcon className="w-12 h-12 text-white/50" />
            <Text className="mt-2 text-white/50">No URLs added yet</Text>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4">
          {sources.map(source => (
            <Card key={source.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <LinkIcon className="w-8 h-8 text-white/70" />
                  <div>
                    <Text className="font-medium">{source.title}</Text>
                    <Text className="text-sm text-white/70">{source.subtitle}</Text>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {source.status === 'processing' && (
                    <div className="flex items-center space-x-2 text-yellow-500">
                      <LoadingIndicator size="sm" />
                      <span className="text-sm">Processing...</span>
                    </div>
                  )}
                  {source.status === 'indexed' && (
                    <span className="text-sm text-green-500">Indexed</span>
                  )}
                  {source.status === 'failed' && (
                    <span className="text-sm text-red-500">Failed</span>
                  )}
                  <button
                    onClick={() => handleDelete(source.id)}
                    className={`p-2 hover:bg-white/10 rounded-lg transition-opacity ${
                      deletingId === source.id ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={deletingId === source.id}
                  >
                    {deletingId === source.id ? (
                      <LoadingIndicator size="sm" />
                    ) : (
                      <TrashIcon className="w-5 h-5 text-white/70" />
                    )}
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
