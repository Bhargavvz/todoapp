import React from 'react';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';

interface AuthFormProps {
  onLogin: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onLogin }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md rounded-xl bg-white/50 p-8 shadow-xl backdrop-blur-lg dark:bg-gray-800/50"
    >
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
        Welcome to Future Tasks
      </h2>

      <button
        onClick={onLogin}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 font-medium text-white transition-colors hover:bg-indigo-600"
      >
        <LogIn className="h-5 w-5" />
        Continue to App
      </button>
    </motion.div>
  );
};