/**
 * 统计数据状态管理
 * 管理番茄记录和统计计算
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PomodoroRecord, TodayStats, TrendData, TimerMode } from '../types';
import { getTodayString, getRecentDays, calculateStreak } from '../utils/time';

interface StatsState {
  records: PomodoroRecord[]; // 番茄记录列表

  // Actions
  recordPomodoro: (type: TimerMode, duration: number, taskId?: string) => void;
  getTodayStats: () => TodayStats;
  getStreakDays: () => number;
  getWeekTrend: () => TrendData[];
  clearRecords: () => void;
}

export const useStatsStore = create<StatsState>()(
  persist(
    (set, get) => ({
      // 初始记录为空
      records: [],

      // 记录一个番茄
      recordPomodoro: (type, duration, taskId) =>
        set((state) => ({
          records: [
            ...state.records,
            {
              id: crypto.randomUUID(),
              type,
              duration,
              completedAt: new Date().toISOString(),
              taskId,
            },
          ],
        })),

      // 获取今日统计
      getTodayStats: () => {
        const today = getTodayString();
        const todayRecords = get().records.filter(
          (r) => r.completedAt.startsWith(today) && r.type === 'focus'
        );

        return {
          completedPomodoros: todayRecords.length,
          totalFocusTime: Math.round(
            todayRecords.reduce((sum, r) => sum + r.duration, 0) / 60
          ),
          completedTasks: 0, // 需要从 taskStore 同步，这里简化处理
        };
      },

      // 获取连续专注天数
      getStreakDays: () => {
        const focusRecords = get().records.filter((r) => r.type === 'focus');
        return calculateStreak(focusRecords);
      },

      // 获取7天趋势数据
      getWeekTrend: () => {
        const days = getRecentDays(7);
        const records = get().records;

        return days.map((date) => {
          const dayRecords = records.filter(
            (r) => r.completedAt.startsWith(date) && r.type === 'focus'
          );

          return {
            date,
            pomodoros: dayRecords.length,
            minutes: Math.round(dayRecords.reduce((sum, r) => sum + r.duration, 0) / 60),
          };
        });
      },

      // 清除所有记录
      clearRecords: () => set({ records: [] }),
    }),
    {
      name: 'focusflow-stats',
    }
  )
);
