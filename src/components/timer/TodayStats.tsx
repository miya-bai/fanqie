/**
 * 今日统计组件
 * 显示今日完成的番茄数
 */

import { Flame } from 'lucide-react';

interface TodayStatsProps {
  completedPomodoros: number;
}

export function TodayStats({ completedPomodoros }: TodayStatsProps) {
  return (
    <div className="flex items-center justify-center gap-2 text-sm text-[var(--color-text-secondary)]">
      <Flame size={16} className="text-[var(--color-primary)]" />
      <span>
        今日完成: <strong className="text-[var(--color-text)]">{completedPomodoros}</strong> 个
        番茄
      </span>
    </div>
  );
}
