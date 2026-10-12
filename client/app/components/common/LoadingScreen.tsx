import React from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen: React.FC<{ message?: string }> = ({ message = 'Loading experience...' }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary text-white">
      <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-t-2 border-accent border-r-transparent border-b-transparent border-l-transparent"
        />
        <motion.div
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-4 h-4 bg-accent rounded-full shadow-[0_0_15px_#E63946]"
        />
      </div>
      <p className="font-display uppercase text-xs tracking-widest text-text-secondary animate-pulse">
        {message}
      </p>
    </div>
  );
};

