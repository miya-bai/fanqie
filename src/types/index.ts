/**
 * FocusFlow 类型定义
 * 包含所有核心数据结构的类型声明
 */

// ==================== 计时器相关 ====================

/** 计时模式类型 */
export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

/** 计时状态类型 */
export type TimerStatus = 'idle' | 'running' | 'paused';

/** 番茄记录 */
export interface PomodoroRecord {
  id: string;
  type: TimerMode;
  duration: number; // 实际时长（秒）
  completedAt: string; // ISO 时间字符串
  taskId?: string;
}

// ==================== 任务相关 ====================

/** 任务 */
export interface Task {
  id: string;
  title: string;
  estimatedPomodoros: number; // 预计番茄数
  completedPomodoros: number; // 完成番茄数
  completed: boolean;
  createdAt: string;
  completedAt?: string;
}

// ==================== 设置相关 ====================

/** 应用设置 */
export interface Settings {
  focusDuration: number; // 专注时长（分钟）
  shortBreakDuration: number; // 短休息时长
  longBreakDuration: number; // 长休息时长
  longBreakInterval: number; // 长休息间隔（几个番茄后）
  soundEnabled: boolean; // 提示音开关
  theme: 'light' | 'dark'; // 主题
}

// ==================== 统计相关 ====================

/** 今日统计 */
export interface TodayStats {
  completedPomodoros: number;
  totalFocusTime: number; // 分钟
  completedTasks: number;
}

/** 趋势数据 */
export interface TrendData {
  date: string;
  pomodoros: number;
  minutes: number;
}

// ==================== 视图相关 ====================

/** 当前视图 */
export type View = 'home' | 'stats' | 'settings';
