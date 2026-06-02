/**
 * 计时器状态管理
 * 管理番茄钟的核心状态：模式、状态、剩余时间等
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TimerMode, TimerStatus } from '../types';

interface TimerState {
  // 状态数据
  mode: TimerMode; // 当前模式：专注/短休息/长休息
  status: TimerStatus; // 计时状态：空闲/运行中/已暂停
  timeRemaining: number; // 剩余秒数
  completedPomodoros: number; // 今日完成番茄数
  currentTaskId: string | null; // 当前关联的任务ID

  // Actions
  setMode: (mode: TimerMode) => void;
  setStatus: (status: TimerStatus) => void;
  setTimeRemaining: (time: number) => void;
  decrementTime: () => void;
  incrementCompletedPomodoros: () => void;
  setCurrentTask: (taskId: string | null) => void;
  reset: () => void;
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set) => ({
      // 初始状态
      mode: 'focus',
      status: 'idle',
      timeRemaining: 25 * 60,
      completedPomodoros: 0,
      currentTaskId: null,

      // 设置计时模式
      setMode: (mode) => set({ mode }),

      // 设置计时状态
      setStatus: (status) => set({ status }),

      // 设置剩余时间
      setTimeRemaining: (time) => set({ timeRemaining: time }),

      // 时间递减（每秒调用）
      decrementTime: () =>
        set((state) => ({
          timeRemaining: Math.max(0, state.timeRemaining - 1),
        })),

      // 增加完成的番茄数
      incrementCompletedPomodoros: () =>
        set((state) => ({
          completedPomodoros: state.completedPomodoros + 1,
        })),

      // 设置当前关联的任务
      setCurrentTask: (taskId) => set({ currentTaskId: taskId }),

      // 重置计时器状态
      reset: () => set({ status: 'idle' }),
    }),
    {
      name: 'focusflow-timer',
      partialize: (state) => ({
        // 只持久化番茄计数，其他状态不持久化
        completedPomodoros: state.completedPomodoros,
      }),
    }
  )
);
