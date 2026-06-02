/**
 * 任务输入组件
 * 新增任务的输入框
 */

import { useState, KeyboardEvent } from 'react';
import { Plus } from 'lucide-react';
import { Input } from '../common';

interface TaskInputProps {
  onAdd: (title: string, estimatedPomodoros: number) => void;
}

export function TaskInput({ onAdd }: TaskInputProps) {
  const [title, setTitle] = useState('');
  const [pomodoros, setPomodoros] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd(title.trim(), pomodoros);
    setTitle('');
    setPomodoros(1);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-3">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="添加新任务..."
        className="flex-1"
      />
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => setPomodoros(Math.max(1, pomodoros - 1))}
          className="w-8 h-11 flex items-center justify-center rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)]"
        >
          -
        </button>
        <span className="w-8 text-center text-sm">{pomodoros}</span>
        <button
          type="button"
          onClick={() => setPomodoros(Math.min(10, pomodoros + 1))}
          className="w-8 h-11 flex items-center justify-center rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)]"
        >
          +
        </button>
      </div>
      <button
        type="submit"
        disabled={!title.trim()}
        className="h-11 px-4 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Plus size={20} />
      </button>
    </form>
  );
}
