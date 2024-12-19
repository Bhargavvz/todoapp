import React from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, Tag, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { Todo } from '../types/todo';
import { cn } from '../utils/cn';

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const priorityColors = {
    low: 'bg-blue-500',
    medium: 'bg-yellow-500',
    high: 'bg-red-500',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group relative flex items-center gap-4 rounded-lg bg-white p-4 shadow-lg transition-all dark:bg-gray-800"
    >
      <button
        onClick={onToggle}
        className={cn(
          'flex h-6 w-6 items-center justify-center rounded-full border-2',
          todo.completed
            ? 'border-green-500 bg-green-500'
            : 'border-gray-300 dark:border-gray-600'
        )}
      >
        {todo.completed && <Check className="h-4 w-4 text-white" />}
      </button>

      <div className="flex-1">
        <h3
          className={cn(
            'text-lg font-medium text-gray-900 dark:text-white',
            todo.completed && 'line-through opacity-50'
          )}
        >
          {todo.title}
        </h3>
        {todo.description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {todo.description}
          </p>
        )}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {todo.dueDate && (
            <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <Clock className="h-3 w-3" />
              {format(todo.dueDate, 'PPP')}
            </span>
          )}
          {todo.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300"
            >
              <Tag className="h-3 w-3" />
              {tag}
            </span>
          ))}
          <span
            className={cn(
              'ml-2 h-2 w-2 rounded-full',
              priorityColors[todo.priority]
            )}
          />
        </div>
      </div>

      <button
        onClick={onDelete}
        className="invisible absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-all group-hover:visible group-hover:opacity-100"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </motion.div>
  );
};