export type Priority = 'low' | 'medium' | 'high';
export type Category = 'work' | 'personal' | 'shopping' | 'health' | 'other';

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  priority: Priority;
  completed: boolean;
  category: Category;
  createdAt: string;
}

export interface TaskFilters {
  search: string;
  priority: Priority | 'all';
  category: Category | 'all';
  status: 'all' | 'completed' | 'active';
}