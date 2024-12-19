import React, { useState } from 'react';
import { Todo, Priority } from '../services/TodoService';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import toast from 'react-hot-toast';

interface TodoFormProps {
    onSubmit: (todo: Todo) => void;
    loading: boolean;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, loading }) => {
    const [todo, setTodo] = useState<Partial<Todo>>({
        title: '',
        description: '',
        dueDate: undefined,
        priority: Priority.MEDIUM,
        tags: [],
        category: '',
        reminder: false,
        notes: ''
    });

    const [tagInput, setTagInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!todo.title?.trim()) {
            toast.error('Title is required');
            return;
        }

        if (todo.dueDate && todo.dueDate < new Date()) {
            toast.error('Due date cannot be in the past');
            return;
        }
        
        const processedTags = tagInput
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);
        
        onSubmit({
            ...todo as Todo,
            tags: [...(todo.tags || []), ...processedTags]
        });
        
        setTodo({
            title: '',
            description: '',
            dueDate: undefined,
            priority: Priority.MEDIUM,
            tags: [],
            category: '',
            reminder: false,
            notes: ''
        });
        setTagInput('');
    };

    const addTag = () => {
        if (tagInput.trim() && !todo.tags?.includes(tagInput.trim())) {
            setTodo(prev => ({
                ...prev,
                tags: [...(prev.tags || []), tagInput.trim()]
            }));
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTodo(prev => ({
            ...prev,
            tags: prev.tags?.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleDateChange = (date: Date | null) => {
        setTodo({ ...todo, dueDate: date || undefined });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                placeholder="Title"
                value={todo.title}
                onChange={(e) => setTodo({ ...todo, title: e.target.value })}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
            />
            
            <textarea
                placeholder="Description"
                value={todo.description}
                onChange={(e) => setTodo({ ...todo, description: e.target.value })}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                rows={3}
            />

            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Due Date
                    </label>
                    <DatePicker
                        selected={todo.dueDate}
                        onChange={handleDateChange}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>

                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Priority
                    </label>
                    <select
                        value={todo.priority}
                        onChange={(e) => setTodo({ ...todo, priority: e.target.value as Priority })}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        {Object.values(Priority).map(priority => (
                            <option key={priority} value={priority}>
                                {priority}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Tags (comma-separated)
                </label>
                <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Enter tags separated by commas"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Category
                </label>
                <input
                    type="text"
                    value={todo.category}
                    onChange={(e) => setTodo({ ...todo, category: e.target.value })}
                    placeholder="Category"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={todo.reminder}
                    onChange={(e) => setTodo({ ...todo, reminder: e.target.checked })}
                    id="reminder"
                    className="w-4 h-4 accent-blue-500"
                />
                <label htmlFor="reminder" className="text-sm text-gray-700 dark:text-gray-300">
                    Set Reminder
                </label>
            </div>

            <textarea
                placeholder="Additional Notes"
                value={todo.notes}
                onChange={(e) => setTodo({ ...todo, notes: e.target.value })}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                rows={2}
            />

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
                {loading ? 'Adding...' : 'Add Todo'}
            </button>
        </form>
    );
}; 