/**
 * 当前任务显示组件
 * 显示当前正在计时的任务
 */

import { Task } from '../../types';
import { X } from 'lucide-react';

interface CurrentTaskProps {
  task: Task | null;
  onClear: () => void;
}

export function CurrentTask({ task, onClear }: CurrentTaskProps) {
  if (!task) {
    return (
      <div className="text-center text-[var(--color-text-muted)] text-sm">
        选择一个任务来专注
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-primary-light)] rounded-lg">
      <span className="text-sm text-[var(--color-text)] truncate max-w-[200px]">
        {task.title}
      </span>
      <span className="text-xs text-[var(--color-primary)]">
        {task.completedPomodoros}/{task.estimatedPomodoros}
      </span>
      <button
        onClick={onClear}
        className="p-1 hover:bg-[var(--color-primary)]/10 rounded transition-colors"
      >
        <X size={14} className="text-[var(--color-primary)]" />
      </button>
    </div>
  );
}
