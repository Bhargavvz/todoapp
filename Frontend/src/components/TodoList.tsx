import React, { useState, useEffect } from 'react';
import { TodoService, Todo, Priority } from '../services/TodoService';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Search, Calendar, Tag, Clock, Filter, Trash2 } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { TodoForm } from './TodoForm';
import toast, { Toaster } from 'react-hot-toast';
import { format } from 'date-fns';

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState({ title: '', description: '' });
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const { theme, setTheme } = useTheme();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadTodos();
    }, []);

    const loadTodos = async () => {
        try {
            setLoading(true);
            const data = await TodoService.getAllTodos();
            setTodos(data);
            toast.success('Todos loaded successfully');
        } catch (error) {
            console.error('Error loading todos:', error);
            toast.error('Failed to load todos');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTodo = async (todo: Todo) => {
        try {
            setLoading(true);
            await TodoService.createTodo(todo);
            toast.success('Todo created successfully');
            loadTodos();
        } catch (error) {
            console.error('Error creating todo:', error);
            toast.error('Failed to create todo');
        } finally {
            setLoading(false);
        }
    };

    const toggleComplete = async (todo: Todo) => {
        try {
            setLoading(true);
            await TodoService.updateTodo(todo.id!, {
                ...todo,
                completed: !todo.completed
            });
            toast.success(`Todo marked as ${!todo.completed ? 'completed' : 'incomplete'}`);
            loadTodos();
        } catch (error) {
            console.error('Error updating todo:', error);
            toast.error('Failed to update todo');
        } finally {
            setLoading(false);
        }
    };

    const deleteTodo = async (id: string) => {
        try {
            setLoading(true);
            await TodoService.deleteTodo(id);
            toast.success('Todo deleted successfully');
            loadTodos();
        } catch (error) {
            console.error('Error deleting todo:', error);
            toast.error('Failed to delete todo');
        } finally {
            setLoading(false);
        }
    };

    const filteredTodos = todos
        .filter(todo => {
            if (filter === 'active') return !todo.completed;
            if (filter === 'completed') return todo.completed;
            return true;
        })
        .filter(todo => 
            todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            todo.description.toLowerCase().includes(searchQuery.toLowerCase())
        );

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <Toaster position="top-right" />
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold dark:text-white">Todo List</h1>
                <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                    {theme === 'dark' ? (
                        <Sun className="w-6 h-6 text-yellow-400" />
                    ) : (
                        <Moon className="w-6 h-6 text-gray-600" />
                    )}
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 space-y-6">
                <TodoForm onSubmit={handleCreateTodo} loading={loading} />

                <div className="flex gap-4 flex-wrap">
                    <div className="flex-1 min-w-[200px]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search todos..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded ${
                                filter === 'all'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                            }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter('active')}
                            className={`px-4 py-2 rounded ${
                                filter === 'active'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                            }`}
                        >
                            Active
                        </button>
                        <button
                            onClick={() => setFilter('completed')}
                            className={`px-4 py-2 rounded ${
                                filter === 'completed'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                            }`}
                        >
                            Completed
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    <div className="space-y-4">
                        {filteredTodos.map((todo) => (
                            <motion.div
                                key={todo.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="flex items-center justify-between p-4 border rounded dark:border-gray-700 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center space-x-4 flex-1">
                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => toggleComplete(todo)}
                                        className="w-5 h-5 accent-blue-500"
                                    />
                                    <div className="flex-1">
                                        <h3 className={`font-semibold dark:text-white ${
                                            todo.completed ? 'line-through text-gray-500' : ''
                                        }`}>
                                            {todo.title}
                                        </h3>
                                        {todo.description && (
                                            <p className="text-gray-600 dark:text-gray-400">
                                                {todo.description}
                                            </p>
                                        )}
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {todo.dueDate && (
                                                <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                                    <Calendar className="w-4 h-4" />
                                                    {format(new Date(todo.dueDate), 'MMM d, yyyy')}
                                                </span>
                                            )}
                                            {todo.dueDate && (
                                                <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                                    <Clock className="w-4 h-4" />
                                                    {format(new Date(todo.dueDate), 'h:mm a')}
                                                </span>
                                            )}
                                            {todo.tags && todo.tags.length > 0 && (
                                                <div className="flex items-center gap-1">
                                                    <Tag className="w-4 h-4 text-gray-500" />
                                                    <div className="flex gap-1">
                                                        {todo.tags.map((tag, index) => (
                                                            <span
                                                                key={index}
                                                                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded-full text-xs"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {todo.priority && (
                                                <span className={`px-2 py-1 rounded-full text-xs ${
                                                    todo.priority === Priority.HIGH 
                                                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                        : todo.priority === Priority.MEDIUM
                                                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                }`}>
                                                    {todo.priority}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => todo.id && deleteTodo(todo.id)}
                                    className="p-2 text-red-500 hover:bg-red-100 rounded-full dark:hover:bg-red-900/30"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TodoList;