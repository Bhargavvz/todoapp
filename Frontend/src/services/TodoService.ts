import axios from 'axios';

const API_URL = 'http://localhost:8080/api/todos';

export enum Priority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH'
}

export interface Todo {
    id?: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    dueDate?: Date;
    priority?: Priority;
    tags?: string[];
    category?: string;
    reminder?: boolean;
    notes?: string;
}

export const TodoService = {
    getAllTodos: async () => {
        const response = await axios.get<Todo[]>(API_URL);
        return response.data;
    },

    createTodo: async (todo: Todo) => {
        const response = await axios.post<Todo>(API_URL, todo);
        return response.data;
    },

    updateTodo: async (id: string, todo: Todo) => {
        const response = await axios.put<Todo>(`${API_URL}/${id}`, todo);
        return response.data;
    },

    deleteTodo: async (id: string) => {
        await axios.delete(`${API_URL}/${id}`);
    },

    getByCategory: async (category: string) => {
        const response = await axios.get<Todo[]>(`${API_URL}/category/${category}`);
        return response.data;
    },

    getByPriority: async (priority: Priority) => {
        const response = await axios.get<Todo[]>(`${API_URL}/priority/${priority}`);
        return response.data;
    }
}; 