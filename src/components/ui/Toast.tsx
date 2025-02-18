'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
}

const Toast = ({ message, type = 'info', duration = 3000, onClose }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      default:
        return 'bg-blue-500';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      default:
        return 'ℹ';
    }
  };

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 right-4 z-50"
          role="alert"
        >
          <div
            className={`${getBackgroundColor()} text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-2 min-w-[300px]`}
          >
            <span className="text-lg">{getIcon()}</span>
            <p className="text-sm font-medium">{message}</p>
            <button
              onClick={() => {
                setIsVisible(false);
                onClose?.();
              }}
              className="ml-auto text-white hover:text-gray-200 focus:outline-none"
              aria-label="Close toast"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Toast;
