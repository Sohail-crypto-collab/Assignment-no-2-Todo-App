'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import {
  CheckCircle2,
  Circle,
  Pencil,
  Trash2,
  AlertCircle,
} from 'lucide-react';
import { Task } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
}

const priorityColors = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const categoryColors = {
  work: 'bg-purple-100 text-purple-800',
  personal: 'bg-green-100 text-green-800',
  shopping: 'bg-pink-100 text-pink-800',
  health: 'bg-teal-100 text-teal-800',
  other: 'bg-gray-100 text-gray-800',
};

export function TaskList({
  tasks,
  onToggleComplete,
  onDelete,
  onEdit,
}: TaskListProps) {
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const handleDelete = () => {
    if (taskToDelete) {
      onDelete(taskToDelete);
      setTaskToDelete(null);
    }
  };

  const handleDeleteClick = (taskId: string) => {
    setTaskToDelete(taskId);
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card
          key={task.id}
          className={cn(
            'transition-all duration-200',
            task.completed && 'opacity-60'
          )}
        >
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle
                  className={cn(
                    'flex items-center gap-2',
                    task.completed && 'line-through'
                  )}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onToggleComplete(task.id)}
                    className="h-6 w-6"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </Button>
                  {task.title}
                </CardTitle>
                {task.description && (
                  <CardDescription className="mt-1">
                    {task.description}
                  </CardDescription>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(task)}
                  className="h-8 w-8"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <AlertDialog open={taskToDelete === task.id}>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteClick(task.id)}
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Task</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this task? This action
                        cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel
                        onClick={() => setTaskToDelete(null)}
                      >
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="secondary"
                className={priorityColors[task.priority]}
              >
                {task.priority}
              </Badge>
              <Badge
                variant="secondary"
                className={categoryColors[task.category]}
              >
                {task.category}
              </Badge>
              <Badge variant="outline" className="ml-auto">
                Due {format(new Date(task.dueDate), 'PP')}
              </Badge>
              {new Date(task.dueDate) < new Date() && !task.completed && (
                <Badge variant="destructive" className="gap-1">
                  <AlertCircle className="h-3 w-3" />
                  Overdue
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
      {tasks.length === 0 && (
        <div className="text-center text-muted-foreground py-8">
          No tasks found
        </div>
      )}
    </div>
  );
}