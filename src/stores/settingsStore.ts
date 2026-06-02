/**
 * 设置状态管理
 * 管理应用配置：主题、计时时长、提醒等
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Settings } from '../types';
import { DEFAULT_SETTINGS } from '../utils/constants';

interface SettingsState extends Settings {
  /** 更新单个设置项 */
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  /** 重置为默认设置 */
  resetSettings: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,

      // 更新单个设置项
      updateSetting: (key, value) =>
        set((state) => ({ ...state, [key]: value })),

      // 重置为默认设置
      resetSettings: () => set(DEFAULT_SETTINGS),
    }),
    {
      name: 'focusflow-settings', // localStorage 键名
    }
  )
);
