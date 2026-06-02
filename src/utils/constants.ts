/**
 * FocusFlow 常量定义
 * 包含默认配置、显示名称、存储键等
 */

import { Settings } from '../types';

/** 默认设置 */
export const DEFAULT_SETTINGS: Settings = {
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,
  soundEnabled: true,
  theme: 'light',
};

/** 模式显示名称 */
export const MODE_LABELS: Record<string, string> = {
  focus: '专注',
  shortBreak: '短休息',
  longBreak: '长休息',
};

/** 模式对应的颜色 */
export const MODE_COLORS: Record<string, string> = {
  focus: '#FF5A4F',
  shortBreak: '#4F7CFF',
  longBreak: '#4F7CFF',
};

/** Storage Keys - 本地存储键名 */
export const STORAGE_KEYS = {
  TASKS: 'focusflow_tasks',
  RECORDS: 'focusflow_records',
  SETTINGS: 'focusflow_settings',
  STREAK: 'focusflow_streak',
};

/** 计时器最大值限制 */
export const TIMER_LIMITS = {
  focusDuration: { min: 1, max: 60 },
  shortBreakDuration: { min: 1, max: 30 },
  longBreakDuration: { min: 1, max: 60 },
  longBreakInterval: { min: 1, max: 10 },
};

/** 动画时长 */
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 250,
  slow: 400,
};
