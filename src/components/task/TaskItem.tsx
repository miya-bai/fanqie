/**
 * 任务项组件
 * 单个任务卡片
 */

import { Check, Trash2, Clock } from 'lucide-react';
import { Task } from '../../types';

interface TaskItemProps {
  task: Task;
  isSelected: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onSelect: () => void;
}

export function TaskItem({
  task,
  isSelected,
  onToggle,
  onDelete,
  onSelect,
}: TaskItemProps) {
  return (
    <div
      className={`
        flex items-center gap-3 p-3 rounded-lg
        transition-all duration-150 cursor-pointer
        ${isSelected
          ? 'bg-[var(--color-primary-light)] border border-[var(--color-primary)]/30'
          : 'bg-[var(--color-bg-card)] border border-transparent hover:border-[var(--color-border)]'
        }
        ${task.completed ? 'opacity-60' : ''}
      `}
      onClick={onSelect}
    >
      {/* 勾选框 */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className={`
          w-6 h-6 rounded-full flex items-center justify-center
          transition-all duration-150
          ${task.completed
            ? 'bg-[var(--color-success)] text-white'
            : 'border-2 border-[var(--color-border)] hover:border-[var(--color-success)]'
          }
        `}
      >
        {task.completed && <Check size={14} />}
      </button>

      {/* 任务信息 */}
      <div className="flex-1 min-w-0">
        <p
          className={`
            text-sm truncate
            ${task.completed ? 'line-through text-[var(--color-text-muted)]' : 'text-[var(--color-text)]'}
          `}
        >
          {task.title}
        </p>
        <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)] mt-0.5">
          <Clock size={12} />
          <span>
            {task.completedPomodoros}/{task.estimatedPomodoros} 番茄
          </span>
        </div>
      </div>

      {/* 删除按钮 */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/10 rounded transition-colors"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
