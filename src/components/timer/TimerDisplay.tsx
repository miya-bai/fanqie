/**
 * 计时器显示组件
 * 显示大号倒计时和圆形进度条
 */

import { TimerMode, TimerStatus, Task } from '../../types';
import { formatTime } from '../../utils/time';
import { MODE_COLORS } from '../../utils/constants';
import { X } from 'lucide-react';

interface TimerDisplayProps {
  timeRemaining: number; // 剩余秒数
  totalTime: number; // 总时间（秒）
  mode: TimerMode;
  status: TimerStatus;
  task: Task | null;
  onClearTask: () => void;
}

export function TimerDisplay({
  timeRemaining,
  totalTime,
  mode,
  status,
  task,
  onClearTask,
}: TimerDisplayProps) {
  // 计算进度百分比
  const progress = totalTime > 0 ? (timeRemaining / totalTime) * 100 : 0;

  // 获取当前模式颜色
  const color = MODE_COLORS[mode];

  // 圆形进度条参数 - 增大尺寸
  const size = 220;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // 是否正在运行（显示动画）
  const isRunning = status === 'running';

  return (
    <div className="relative flex items-center justify-center" style={{
      marginTop: '24px',
      marginBottom: '24px',
      minHeight: '240px'
    }}>
      {/* 圆形进度条 SVG */}
      <svg
        width={size}
        height={size}
        className="absolute transform -rotate-90"
      >
        {/* 背景圆 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={strokeWidth}
        />
        {/* 进度圆 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-linear"
          style={{
            filter: isRunning ? `drop-shadow(0 0 8px ${color}40)` : 'none',
          }}
        />
      </svg>

      {/* 倒计时文字和任务提示 - 放在圆圈内 */}
      <div className="flex flex-col items-center justify-center z-10">
        <div
          className={`
            font-timer
            ${isRunning ? 'animate-pulse' : ''}
          `}
          style={{ color }}
        >
          {formatTime(timeRemaining)}
        </div>
        {/* 任务提示 - 放在圆圈内 */}
        {!task && (
          <div className="text-center text-[var(--color-text-muted)] text-sm mt-2">
            选择一个任务来专注
          </div>
        )}
        {task && (
          <div className="flex items-center gap-2 mt-2 px-3 py-1.5 bg-[var(--color-primary-light)] rounded-lg">
            <span className="text-sm text-[var(--color-text)] truncate max-w-[120px]">
              {task.title}
            </span>
            <span className="text-xs text-[var(--color-primary)]">
              {task.completedPomodoros}/{task.estimatedPomodoros}
            </span>
            <button
              onClick={onClearTask}
              className="p-0.5 hover:bg-[var(--color-primary)]/10 rounded transition-colors"
            >
              <X size={12} className="text-[var(--color-primary)]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
