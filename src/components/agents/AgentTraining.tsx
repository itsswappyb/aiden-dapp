'use client';

import { useState, useEffect } from 'react';
import { Card, Title, Text, AreaChart, BarChart, Badge, Metric } from '@tremor/react';
import { motion } from 'framer-motion';
import {
  CommandLineIcon,
  BoltIcon,
  ArrowPathIcon,
  BeakerIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

interface TrainingMetrics {
  epoch: number;
  accuracy: number;
  loss: number;
  validationAccuracy: number;
  validationLoss: number;
}

interface AgentTrainingProps {
  agentId: string;
  agentName: string;
  trainingStatus: 'in_progress' | 'completed' | 'not_started';
  currentEpoch?: number;
  totalEpochs?: number;
  metrics?: TrainingMetrics[];
}

export default function AgentTraining({
  agentId,
  agentName,
  trainingStatus,
  currentEpoch = 0,
  totalEpochs = 100,
  metrics = [],
}: AgentTrainingProps) {
  // Simulated training metrics
  const [trainingMetrics, setTrainingMetrics] = useState<TrainingMetrics[]>([]);
  const [isTraining, setIsTraining] = useState(trainingStatus === 'in_progress');

  useEffect(() => {
    if (isTraining) {
      const interval = setInterval(() => {
        setTrainingMetrics(prev => {
          if (prev.length >= totalEpochs) {
            clearInterval(interval);
            setIsTraining(false);
            return prev;
          }

          const newEpoch = prev.length + 1;
          const baseAccuracy = 0.7 + (newEpoch / totalEpochs) * 0.25;
          const baseLoss = 0.5 - (newEpoch / totalEpochs) * 0.4;

          return [
            ...prev,
            {
              epoch: newEpoch,
              accuracy: baseAccuracy + Math.random() * 0.05,
              loss: Math.max(0.1, baseLoss + Math.random() * 0.05),
              validationAccuracy: baseAccuracy - 0.05 + Math.random() * 0.05,
              validationLoss: Math.max(0.1, baseLoss + 0.05 + Math.random() * 0.05),
            },
          ];
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isTraining, totalEpochs]);

  const chartData = trainingMetrics.map(metric => ({
    epoch: `Epoch ${metric.epoch}`,
    'Training Accuracy': Number((metric.accuracy * 100).toFixed(1)),
    'Validation Accuracy': Number((metric.validationAccuracy * 100).toFixed(1)),
    'Training Loss': Number(metric.loss.toFixed(3)),
    'Validation Loss': Number(metric.validationLoss.toFixed(3)),
  }));

  const latestMetrics = trainingMetrics[trainingMetrics.length - 1] || {
    accuracy: 0,
    loss: 0,
    validationAccuracy: 0,
    validationLoss: 0,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-lg bg-[#87fafd]/10 flex items-center justify-center mr-4">
            <BeakerIcon className="w-6 h-6 text-accent" />
          </div>
          <div>
            <Title className="text-white">{agentName} Training</Title>
            <Text className="text-white/70">Model Training and Performance</Text>
          </div>
        </div>
        <Badge
          className={`${
            isTraining
              ? 'bg-yellow-400/10 text-yellow-400'
              : trainingMetrics.length >= totalEpochs
                ? 'bg-green-400/10 text-green-400'
                : 'bg-white/10 text-white/70'
          }`}
        >
          {isTraining
            ? 'Training in Progress'
            : trainingMetrics.length >= totalEpochs
              ? 'Training Complete'
              : 'Not Started'}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <div className="flex items-center space-x-2">
            <BoltIcon className="w-4 h-4 text-accent" />
            <Text className="text-white/70">Training Accuracy</Text>
          </div>
          <Metric className="text-white mt-2">{(latestMetrics.accuracy * 100).toFixed(1)}%</Metric>
        </Card>

        <Card className="glass-card">
          <div className="flex items-center space-x-2">
            <ArrowPathIcon className="w-4 h-4 text-accent" />
            <Text className="text-white/70">Validation Accuracy</Text>
          </div>
          <Metric className="text-white mt-2">
            {(latestMetrics.validationAccuracy * 100).toFixed(1)}%
          </Metric>
        </Card>

        <Card className="glass-card">
          <div className="flex items-center space-x-2">
            <DocumentTextIcon className="w-4 h-4 text-accent" />
            <Text className="text-white/70">Training Loss</Text>
          </div>
          <Metric className="text-white mt-2">{latestMetrics.loss.toFixed(3)}</Metric>
        </Card>

        <Card className="glass-card">
          <div className="flex items-center space-x-2">
            <CommandLineIcon className="w-4 h-4 text-accent" />
            <Text className="text-white/70">Validation Loss</Text>
          </div>
          <Metric className="text-white mt-2">{latestMetrics.validationLoss.toFixed(3)}</Metric>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card">
          <Title className="text-white mb-4">Training Progress</Title>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <Text className="text-white/70">
                Epoch {trainingMetrics.length} of {totalEpochs}
              </Text>
              <Text className="text-white/70">
                {((trainingMetrics.length / totalEpochs) * 100).toFixed(0)}%
              </Text>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: '0%' }}
                animate={{ width: `${(trainingMetrics.length / totalEpochs) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          <AreaChart
            className="h-64"
            data={chartData}
            index="epoch"
            categories={['Training Accuracy', 'Validation Accuracy']}
            colors={['cyan', 'indigo']}
            valueFormatter={number => `${number.toFixed(1)}%`}
            showAnimation={true}
          />
        </Card>

        <Card className="glass-card">
          <Title className="text-white mb-4">Loss Metrics</Title>
          <BarChart
            className="h-64"
            data={chartData}
            index="epoch"
            categories={['Training Loss', 'Validation Loss']}
            colors={['cyan', 'indigo']}
            valueFormatter={number => number.toFixed(3)}
            showAnimation={true}
          />
        </Card>
      </div>

      <Card className="glass-card">
        <Title className="text-white mb-4">Training Configuration</Title>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Learning Rate', value: '0.001' },
            { label: 'Batch Size', value: '32' },
            { label: 'Optimizer', value: 'Adam' },
            { label: 'Loss Function', value: 'CrossEntropy' },
          ].map(config => (
            <div key={config.label} className="glass-card p-4">
              <Text className="text-white/70">{config.label}</Text>
              <Text className="text-white mt-1">{config.value}</Text>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
