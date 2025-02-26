'use client';

import { motion } from 'framer-motion';
import TrainingCenter from '@/components/training-center/TrainingCenter';

export default function TrainingPage() {
  return (
    <div className="space-y-8">
      <div className="page-header">
        <div>
          <h1 className="page-title">Training Center</h1>
          <p className="page-description">Monitor and manage AI agent training progress</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <TrainingCenter />
      </motion.div>
    </div>
  );
}
