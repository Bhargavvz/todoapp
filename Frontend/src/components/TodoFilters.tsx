import React from 'react';
import { Filter, SortAsc, Search } from 'lucide-react';
import { useTodoStore } from '../store/useTodoStore';

export const TodoFilters: React.FC = () => {
  const { filter, sortBy, searchQuery, setFilter, setSortBy, setSearchQuery } =
    useTodoStore();

  return (
    <div className="mb-6 space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:border-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="rounded-lg border border-gray-300 px-3 py-1.5 focus:border-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <SortAsc className="h-5 w-5 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="rounded-lg border border-gray-300 px-3 py-1.5 focus:border-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
          >
            <option value="date">Date</option>
            <option value="priority">Priority</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>
    </div>
  );
};