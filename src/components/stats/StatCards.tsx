/**
 * 统计卡片组件
 * 显示今日数据
 */

import { Clock, Flame, CheckCircle } from 'lucide-react';

interface StatCardsProps {
  todayPomodoros: number;
  todayMinutes: number;
  streakDays: number;
  completedTasks: number;
}

export function StatCards({
  todayPomodoros,
  todayMinutes,
  streakDays,
  completedTasks,
}: StatCardsProps) {
  const stats = [
    {
      icon: Clock,
      label: '今日专注',
      value: `${todayMinutes}分钟`,
      color: 'var(--color-primary)',
    },
    {
      icon: Flame,
      label: '连续天数',
      value: `${streakDays}天`,
      color: 'var(--color-warning)',
    },
    {
      icon: CheckCircle,
      label: '完成任务',
      value: `${completedTasks}个`,
      color: 'var(--color-success)',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center p-3 bg-[var(--color-bg-card)] rounded-xl"
        >
          <stat.icon size={20} style={{ color: stat.color }} />
          <span className="text-lg font-semibold text-[var(--color-text)] mt-1">
            {stat.value}
          </span>
          <span className="text-xs text-[var(--color-text-muted)]">
            {stat.label}
          </span>
        </div>
      ))}
      {/* 额外显示今日番茄数 */}
      <div className="flex flex-col items-center p-3 bg-[var(--color-primary-light)] rounded-xl col-span-3">
        <span className="text-2xl font-bold text-[var(--color-primary)]">
          {todayPomodoros}
        </span>
        <span className="text-xs text-[var(--color-primary)]">
          今日番茄数
        </span>
      </div>
    </div>
  );
}
