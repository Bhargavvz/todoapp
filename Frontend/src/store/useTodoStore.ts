import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Todo } from '../types/todo';

interface TodoStore {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  sortBy: 'date' | 'priority' | 'alphabetical';
  searchQuery: string;
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  setSortBy: (sortBy: 'date' | 'priority' | 'alphabetical') => void;
  setSearchQuery: (query: string) => void;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      filter: 'all',
      sortBy: 'date',
      searchQuery: '',
      addTodo: (todo) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              ...todo,
              id: crypto.randomUUID(),
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
              : todo
          ),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      updateTodo: (id, updates) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? { ...todo, ...updates, updatedAt: new Date() }
              : todo
          ),
        })),
      setFilter: (filter) => set({ filter }),
      setSortBy: (sortBy) => set({ sortBy }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
    }),
    {
      name: 'todo-storage',
    }
  )
);