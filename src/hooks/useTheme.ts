/**
 * 主题 Hook
 * 管理深色/浅色主题切换
 */

import { useEffect } from 'react';
import { useSettingsStore } from '../stores/settingsStore';

export function useTheme() {
  const { theme, updateSetting } = useSettingsStore();

  // 初始化主题
  useEffect(() => {
    // 检查系统偏好
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, [theme]);

  // 切换主题
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    updateSetting('theme', newTheme);
  };

  // 设置主题
  const setTheme = (newTheme: 'light' | 'dark') => {
    updateSetting('theme', newTheme);
  };

  return {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
    setTheme,
  };
}
