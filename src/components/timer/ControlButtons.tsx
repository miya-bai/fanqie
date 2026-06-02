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
            className="min-w-[140px]"
            style={{ backgroundColor: modeColor }}
          >
            <Play size={20} className="mr-2" />
            开始
          </Button>
        );

      case 'running':
        // 运行中：显示暂停 + 重置 + 跳过
        return (
          <div className="flex items-center gap-3">
            <Button onClick={onPause} variant="secondary" size="md">
              <Pause size={18} className="mr-1.5" />
              暂停
            </Button>
            <Button onClick={onReset} variant="ghost" size="md">
              <RotateCcw size={18} />
            </Button>
            <Button onClick={onSkip} variant="ghost" size="md">
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
              className="min-w-[120px]"
              style={{ backgroundColor: modeColor }}
            >
              <Play size={20} className="mr-2" />
              继续
            </Button>
            <Button onClick={onReset} variant="ghost" size="md">
              <Undo2 size={18} />
            </Button>
            <Button onClick={onSkip} variant="ghost" size="md">
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
