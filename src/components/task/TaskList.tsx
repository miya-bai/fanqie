/**
 * 任务列表组件
 */

import { List, Plus } from 'lucide-react';
import { Task } from '../../types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  selectedTaskId: string | null;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
  onAddClick: () => void;
}

export function TaskList({
  tasks,
  selectedTaskId,
  onToggleComplete,
  onDelete,
  onSelect,
  onAddClick,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <List size={40} className="text-[var(--color-text-muted)] mb-3" />
        <p className="text-[var(--color-text-secondary)] text-sm mb-3">
          暂无任务
        </p>
        <button
          onClick={onAddClick}
          className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] rounded-lg transition-colors"
        >
          <Plus size={16} />
          添加第一个任务
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isSelected={selectedTaskId === task.id}
          onToggle={() => onToggleComplete(task.id)}
          onDelete={() => onDelete(task.id)}
          onSelect={() => onSelect(task.id)}
        />
      ))}
    </div>
  );
}
