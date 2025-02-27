'use client';

import { motion } from 'framer-motion';
import KnowledgeBase from '@/components/knowledge-base/KnowledgeBase';

export default function KnowledgePage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Knowledge Base</h1>
          <p className="text-sm text-muted-foreground">
            Manage and organize training data for your AI agents
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <KnowledgeBase />
      </motion.div>
    </div>
  );
}
