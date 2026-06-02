/**
 * 计时器逻辑 Hook
 * 封装番茄钟的所有计时逻辑
 */

import { useEffect, useCallback, useRef } from 'react';
import { useTimerStore } from '../stores/timerStore';
import { useSettingsStore } from '../stores/settingsStore';
import { useTaskStore } from '../stores/taskStore';
import { useStatsStore } from '../stores/statsStore';
import { TimerMode } from '../types';
import { showNotification, playSound } from '../services/notification';

export function useTimer() {
  // 状态管理
  const {
    mode,
    status,
    timeRemaining,
    completedPomodoros,
    currentTaskId,
    setMode,
    setStatus,
    setTimeRemaining,
    decrementTime,
    incrementCompletedPomodoros,
    setCurrentTask,
    reset,
  } = useTimerStore();

  // 设置
  const settings = useSettingsStore();

  // 任务
  const { incrementPomodoro } = useTaskStore();

  // 统计
  const { recordPomodoro } = useStatsStore();

  // 计时器引用
  const intervalRef = useRef<number | null>(null);

  // 获取当前模式对应的时长（秒）
  const getDuration = useCallback(
    (timerMode: TimerMode): number => {
      switch (timerMode) {
        case 'focus':
          return settings.focusDuration * 60;
        case 'shortBreak':
          return settings.shortBreakDuration * 60;
        case 'longBreak':
          return settings.longBreakDuration * 60;
      }
    },
    [settings]
  );

  // 计时完成处理
  const handleComplete = useCallback(() => {
    // 停止计时器
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // 根据模式处理完成逻辑
    if (mode === 'focus') {
      // 专注模式完成
      incrementCompletedPomodoros();
      recordPomodoro(
        mode,
        settings.focusDuration * 60,
        currentTaskId || undefined
      );

      // 如果有关联任务，增加任务番茄数
      if (currentTaskId) {
        incrementPomodoro(currentTaskId);
      }

      // 播放提示音和显示通知
      if (settings.soundEnabled) {
        playSound();
      }
      showNotification('专注完成！🎉', '太棒了，休息一下吧~');

      // 决定下一个模式
      const nextPomodoros = completedPomodoros + 1;
      const shouldLongBreak =
        nextPomodoros % settings.longBreakInterval === 0;
      const nextMode: TimerMode = shouldLongBreak ? 'longBreak' : 'shortBreak';

      setMode(nextMode);
      setTimeRemaining(getDuration(nextMode));
    } else {
      // 休息模式完成
      if (settings.soundEnabled) {
        playSound();
      }
      showNotification('休息结束！☕', '继续专注吧~');

      // 回到专注模式
      setMode('focus');
      setTimeRemaining(getDuration('focus'));
    }

    setStatus('idle');
  }, [
    mode,
    completedPomodoros,
    settings,
    currentTaskId,
    getDuration,
    recordPomodoro,
    incrementCompletedPomodoros,
    incrementPomodoro,
    setMode,
    setTimeRemaining,
    setStatus,
  ]);

  // 计时器循环
  useEffect(() => {
    if (status === 'running') {
      intervalRef.current = window.setInterval(() => {
        decrementTime();
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [status, decrementTime]);

  // 检查计时是否完成
  useEffect(() => {
    if (timeRemaining === 0 && status === 'running') {
      handleComplete();
    }
  }, [timeRemaining, status, handleComplete]);

  // 开始计时
  const start = useCallback(() => {
    setStatus('running');
  }, [setStatus]);

  // 暂停计时
  const pause = useCallback(() => {
    setStatus('paused');
  }, [setStatus]);

  // 继续计时
  const resume = useCallback(() => {
    setStatus('running');
  }, [setStatus]);

  // 重置计时器
  const resetTimer = useCallback(() => {
    setTimeRemaining(getDuration(mode));
    setStatus('idle');
    reset();
  }, [mode, getDuration, setTimeRemaining, setStatus, reset]);

  // 跳过当前阶段
  const skip = useCallback(() => {
    handleComplete();
  }, [handleComplete]);

  // 切换模式
  const switchMode = useCallback(
    (newMode: TimerMode) => {
      setMode(newMode);
      setTimeRemaining(getDuration(newMode));
      setStatus('idle');
    },
    [getDuration, setMode, setTimeRemaining, setStatus]
  );

  // 选择当前任务
  const selectTask = useCallback(
    (taskId: string | null) => {
      setCurrentTask(taskId);
    },
    [setCurrentTask]
  );

  return {
    // 状态
    mode,
    status,
    timeRemaining,
    completedPomodoros,
    currentTaskId,
    // Actions
    start,
    pause,
    resume,
    reset: resetTimer,
    skip,
    switchMode,
    selectTask,
  };
}
