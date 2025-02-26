'use client';

import { motion } from 'framer-motion';
import KnowledgeBase from '@/components/knowledge-base/KnowledgeBase';

export default function KnowledgePage() {
  return (
    <div className="space-y-8">
      <div className="page-header">
        <div>
          <h1 className="page-title">Knowledge Base</h1>
          <p className="page-description">Manage and organize training data for your AI agents</p>
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
