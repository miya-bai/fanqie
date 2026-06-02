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
    <div className="flex items-center justify-center gap-1 p-1 bg-[var(--color-bg-card)] rounded-lg">
      {modes.map((mode) => {
        const isActive = currentMode === mode;
        const color = MODE_COLORS[mode];

        return (
          <button
            key={mode}
            onClick={() => onModeChange(mode)}
            className={`
              px-4 py-2 text-sm font-medium rounded-md
              transition-all duration-200
              ${isActive
                ? 'text-white shadow-sm'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
              }
            `}
            style={isActive ? { backgroundColor: color } : undefined}
          >
            {MODE_LABELS[mode]}
          </button>
        );
      })}
    </div>
  );
}
