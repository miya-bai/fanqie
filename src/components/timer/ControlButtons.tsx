/**
 * 控制按钮组件
 * 开始/暂停/继续/重置/跳过
 */

import { Play, Pause, RotateCcw, SkipForward, Undo2 } from 'lucide-react';
import { TimerStatus, TimerMode } from '../../types';
import { Button } from '../common';
import { MODE_COLORS } from '../../utils/constants';

interface ControlButtonsProps {
  status: TimerStatus;
  mode: TimerMode;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  onSkip: () => void;
}

export function ControlButtons({
  status,
  mode,
  onStart,
  onPause,
  onResume,
  onReset,
  onSkip,
}: ControlButtonsProps) {
  const modeColor = MODE_COLORS[mode];

  // 根据状态渲染不同的按钮组合
  const renderButtons = () => {
    switch (status) {
      case 'idle':
        // 空闲状态：显示开始按钮
        return (
          <Button
            onClick={onStart}
            size="lg"
            className="min-w-[160px] shadow-lg hover:shadow-xl transition-all duration-300"
            style={{
              backgroundColor: modeColor,
              borderRadius: 'var(--radius-xl)',
            }}
          >
            <Play size={20} className="mr-2" />
            开始专注
          </Button>
        );

      case 'running':
        // 运行中：显示暂停 + 重置 + 跳过
        return (
          <div className="flex items-center gap-3">
            <Button
              onClick={onPause}
              variant="secondary"
              size="md"
              className="px-5"
              style={{ borderRadius: 'var(--radius-lg)' }}
            >
              <Pause size={18} className="mr-1.5" />
              暂停
            </Button>
            <Button
              onClick={onReset}
              variant="ghost"
              size="md"
              className="w-10 h-10 rounded-full"
            >
              <RotateCcw size={18} />
            </Button>
            <Button
              onClick={onSkip}
              variant="ghost"
              size="md"
              className="w-10 h-10 rounded-full"
            >
              <SkipForward size={18} />
            </Button>
          </div>
        );

      case 'paused':
        // 暂停状态：显示继续 + 重置 + 跳过
        return (
          <div className="flex items-center gap-3">
            <Button
              onClick={onResume}
              size="lg"
              className="min-w-[140px] shadow-lg hover:shadow-xl transition-all duration-300"
              style={{
                backgroundColor: modeColor,
                borderRadius: 'var(--radius-xl)',
              }}
            >
              <Play size={20} className="mr-2" />
              继续
            </Button>
            <Button
              onClick={onReset}
              variant="ghost"
              size="md"
              className="w-10 h-10 rounded-full"
            >
              <Undo2 size={18} />
            </Button>
            <Button
              onClick={onSkip}
              variant="ghost"
              size="md"
              className="w-10 h-10 rounded-full"
            >
              <SkipForward size={18} />
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="flex items-center justify-center">
      {renderButtons()}
    </div>
  );
}
