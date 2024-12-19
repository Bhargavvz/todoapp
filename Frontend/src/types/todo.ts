export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  description?: string;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}