/**
 * 模式切换标签组件
 * 用于切换 专注/短休息/长休息
 */

import { TimerMode } from '../../types';
import { MODE_LABELS, MODE_COLORS } from '../../utils/constants';

interface ModeTabsProps {
  currentMode: TimerMode;
  onModeChange: (mode: TimerMode) => void;
}

const modes: TimerMode[] = ['focus', 'shortBreak', 'longBreak'];

export function ModeTabs({ currentMode, onModeChange }: ModeTabsProps) {
  return (
    <div
      className="flex items-center justify-center gap-1 p-1.5 rounded-2xl"
      style={{
        backgroundColor: 'var(--color-bg-card)',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.04)',
      }}
    >
      {modes.map((mode) => {
        const isActive = currentMode === mode;
        const color = MODE_COLORS[mode];

        return (
          <button
            key={mode}
            onClick={() => onModeChange(mode)}
            className={`
              px-5 py-2.5 text-sm font-medium rounded-xl
              transition-all duration-300 ease-out
              ${isActive
                ? 'text-white shadow-lg'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-elevated)]'
              }
            `}
            style={isActive ? {
              backgroundColor: color,
              boxShadow: `0 4px 12px ${color}40`,
            } : undefined}
          >
            {MODE_LABELS[mode]}
          </button>
        );
      })}
    </div>
  );
}
