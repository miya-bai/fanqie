/**
 * UI 状态管理
 * 管理应用视图、主题等 UI 相关状态
 */

import { create } from 'zustand';
import { View } from '../types';

interface UIState {
  currentView: View; // 当前视图：home/stats/settings
  isStatsExpanded: boolean; // 统计面板是否展开

  // Actions
  setView: (view: View) => void;
  toggleStatsExpanded: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  // 初始视图为主页
  currentView: 'home',
  isStatsExpanded: false,

  // 设置当前视图
  setView: (view) => set({ currentView: view }),

  // 切换统计面板展开状态
  toggleStatsExpanded: () =>
    set((state) => ({ isStatsExpanded: !state.isStatsExpanded })),
}));
