import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useTodoStore } from '../store/useTodoStore';
import { StatsCard } from '../components/dashboard/StatsCard';
import { PriorityChart } from '../components/dashboard/PriorityChart';
import { RecentTasks } from '../components/dashboard/RecentTasks';

export const Dashboard: React.FC = () => {
  const todos = useTodoStore((state) => state.todos);

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    pending: todos.filter(t => !t.completed).length,
    urgent: todos.filter(t => t.priority === 'high' && !t.completed).length
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Tasks"
          value={stats.total}
          icon={BarChart2}
          color="blue"
        />
        <StatsCard
          title="Completed"
          value={stats.completed}
          icon={CheckCircle}
          color="green"
        />
        <StatsCard
          title="Pending"
          value={stats.pending}
          icon={Clock}
          color="yellow"
        />
        <StatsCard
          title="Urgent"
          value={stats.urgent}
          icon={AlertCircle}
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <PriorityChart todos={todos} />
        <RecentTasks todos={todos} />
      </div>
    </motion.div>
  );
};