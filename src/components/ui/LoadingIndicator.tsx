import { motion } from 'framer-motion';

interface LoadingIndicatorProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LoadingIndicator({
  text,
  size = 'md',
  className = '',
}: LoadingIndicatorProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} border-2 border-accent border-t-transparent rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      {text && <span className="text-white/70">{text}</span>}
    </div>
  );
}
