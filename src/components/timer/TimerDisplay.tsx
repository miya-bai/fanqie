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
      minHeight: '260px'
    }}>
      {/* 外圈光晕效果 */}
      <div
        className="absolute rounded-full transition-all duration-1000"
        style={{
          width: size + 40,
          height: size + 40,
          background: isRunning
            ? `radial-gradient(circle, ${color}15 0%, transparent 70%)`
            : 'transparent',
          animation: isRunning ? 'breathe 3s ease-in-out infinite' : 'none',
        }}
      />

      {/* 圆形进度条 SVG */}
      <svg
        width={size}
        height={size}
        className="absolute transform -rotate-90"
      >
        {/* 背景圆 - 使用渐变 */}
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={strokeWidth}
          opacity={0.5}
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
            filter: isRunning
              ? `drop-shadow(0 0 12px ${color}60) drop-shadow(0 0 24px ${color}30)`
              : `drop-shadow(0 0 6px ${color}30)`,
          }}
        />
      </svg>

      {/* 倒计时文字和任务提示 - 放在圆圈内 */}
      <div className="flex flex-col items-center justify-center z-10">
        <div
          className={`
            font-timer
            ${isRunning ? 'animate-breathe' : ''}
          `}
          style={{
            color,
            textShadow: isRunning ? `0 0 30px ${color}40` : 'none',
          }}
        >
          {formatTime(timeRemaining)}
        </div>
        {/* 任务提示 - 放在圆圈内 */}
        {!task && (
          <div className="text-center text-[var(--color-text-muted)] text-sm mt-3 px-4">
            选择一个任务开始专注
          </div>
        )}
        {task && (
          <div
            className="flex items-center gap-2 mt-3 px-4 py-2 rounded-xl border"
            style={{
              backgroundColor: 'var(--color-primary-light)',
              borderColor: 'var(--color-primary)',
              opacity: 0.8,
            }}
          >
            <span className="text-sm text-[var(--color-text)] truncate max-w-[100px]">
              {task.title}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'white',
              }}
            >
              {task.completedPomodoros}/{task.estimatedPomodoros}
            </span>
            <button
              onClick={onClearTask}
              className="p-1 rounded-lg hover:bg-[var(--color-primary)]/20 transition-all"
            >
              <X size={14} style={{ color: 'var(--color-primary)' }} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
