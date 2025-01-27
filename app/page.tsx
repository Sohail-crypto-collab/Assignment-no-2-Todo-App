'use client';

import { useEffect, useState } from 'react';
import { CheckSquare, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Task, TaskFilters } from '@/lib/types';
import { loadTasks, saveTasks } from '@/lib/storage';
import { TaskForm } from '@/components/TaskForm';
import { TaskList } from '@/components/TaskList';
import { TaskFilters as TaskFiltersComponent } from '@/components/TaskFilters';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState<TaskFilters>({
    search: '',
    priority: 'all',
    category: 'all',
    status: 'all',
  });
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleAddTask = (taskData: Partial<Task>) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: taskData.title!,
      description: taskData.description,
      dueDate: taskData.dueDate!,
      priority: taskData.priority!,
      category: taskData.category!,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const handleUpdateTask = (taskData: Partial<Task>) => {
    if (!editTask) return;
    setTasks((prev) =>
      prev.map((task) =>
        task.id === editTask.id
          ? { ...task, ...taskData }
          : task
      )
    );
    setEditTask(null);
  };

  const handleToggleComplete = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(filters.search.toLowerCase());
    const matchesPriority =
      filters.priority === 'all' || task.priority === filters.priority;
    const matchesCategory =
      filters.category === 'all' || task.category === filters.category;
    const matchesStatus =
      filters.status === 'all' ||
      (filters.status === 'completed' ? task.completed : !task.completed);

    return matchesSearch && matchesPriority && matchesCategory && matchesStatus;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // Sort by completion status (incomplete first)
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    // Then by due date
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <CheckSquare className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Task Manager</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-[350px,1fr]">
          <div className="space-y-8">
            <div className="bg-card rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
              <TaskForm onSubmit={handleAddTask} />
            </div>
          </div>

          <div className="space-y-8">
            <TaskFiltersComponent
              filters={filters}
              onFilterChange={setFilters}
            />

            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">
                  All ({filteredTasks.length})
                </TabsTrigger>
                <TabsTrigger value="active">
                  Active (
                  {filteredTasks.filter((t) => !t.completed).length})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed (
                  {filteredTasks.filter((t) => t.completed).length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <TaskList
                  tasks={sortedTasks}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDeleteTask}
                  onEdit={setEditTask}
                />
              </TabsContent>

              <TabsContent value="active" className="mt-6">
                <TaskList
                  tasks={sortedTasks.filter((t) => !t.completed)}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDeleteTask}
                  onEdit={setEditTask}
                />
              </TabsContent>

              <TabsContent value="completed" className="mt-6">
                <TaskList
                  tasks={sortedTasks.filter((t) => t.completed)}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDeleteTask}
                  onEdit={setEditTask}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <Dialog open={!!editTask} onOpenChange={() => setEditTask(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            {editTask && (
              <TaskForm
                mode="edit"
                initialData={editTask}
                onSubmit={handleUpdateTask}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}