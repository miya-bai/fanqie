/**
 * FocusFlow 主应用组件
 * 整合所有功能模块的主页面
 */

import { useState, useEffect } from 'react';
import { MainLayout, Header } from './components/layout';
import { TimerDisplay, ModeTabs, ControlButtons, CurrentTask, TodayStats } from './components/timer';
import { TaskInput, TaskList } from './components/task';
import { StatCards, TrendChart } from './components/stats';
import { Card } from './components/common';
import { useTimer } from './hooks/useTimer';
import { useTheme } from './hooks/useTheme';
import { useSettingsStore, useTimerStore, useTaskStore, useStatsStore } from './stores';
import { requestNotificationPermission } from './services/notification';
import { View } from './types';

// 设置页面组件
function SettingsView() {
  const settings = useSettingsStore();
  const { toggleTheme, isDark } = useTheme();
  const statsStore = useStatsStore();
  const taskStore = useTaskStore();

  const handleClearData = () => {
    if (confirm('确定要清除所有数据吗？此操作不可恢复。')) {
      statsStore.clearRecords();
      taskStore.clearCompletedTasks();
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">设置</h2>

      {/* 计时设置 */}
      <Card className="p-4 space-y-4">
        <h3 className="text-sm font-medium text-[var(--color-text-secondary)]">计时设置</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--color-text)]">专注时长</span>
            <select
              value={settings.focusDuration}
              onChange={(e) => settings.updateSetting('focusDuration', Number(e.target.value))}
              className="px-3 py-1.5 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg text-sm"
            >
              {[15, 20, 25, 30, 45, 60].map((v) => (
                <option key={v} value={v}>{v} 分钟</option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--color-text)]">短休息</span>
            <select
              value={settings.shortBreakDuration}
              onChange={(e) => settings.updateSetting('shortBreakDuration', Number(e.target.value))}
              className="px-3 py-1.5 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg text-sm"
            >
              {[3, 5, 10].map((v) => (
                <option key={v} value={v}>{v} 分钟</option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--color-text)]">长休息</span>
            <select
              value={settings.longBreakDuration}
              onChange={(e) => settings.updateSetting('longBreakDuration', Number(e.target.value))}
              className="px-3 py-1.5 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg text-sm"
            >
              {[10, 15, 20, 30].map((v) => (
                <option key={v} value={v}>{v} 分钟</option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--color-text)]">长休息间隔</span>
            <select
              value={settings.longBreakInterval}
              onChange={(e) => settings.updateSetting('longBreakInterval', Number(e.target.value))}
              className="px-3 py-1.5 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg text-sm"
            >
              {[2, 3, 4, 5, 6].map((v) => (
                <option key={v} value={v}>{v} 个番茄</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* 通知设置 */}
      <Card className="p-4 space-y-4">
        <h3 className="text-sm font-medium text-[var(--color-text-secondary)]">通知设置</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[var(--color-text)]">提示音</span>
          <button
            onClick={() => settings.updateSetting('soundEnabled', !settings.soundEnabled)}
            className={`
              relative w-11 h-6 rounded-full transition-colors
              ${settings.soundEnabled ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border)]'}
            `}
          >
            <span
              className={`
                absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform
                ${settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'}
              `}
            />
          </button>
        </div>
      </Card>

      {/* 主题设置 */}
      <Card className="p-4 space-y-4">
        <h3 className="text-sm font-medium text-[var(--color-text-secondary)]">外观</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[var(--color-text)]">深色模式</span>
          <button
            onClick={toggleTheme}
            className={`
              relative w-11 h-6 rounded-full transition-colors
              ${isDark ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border)]'}
            `}
          >
            <span
              className={`
                absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform
                ${isDark ? 'translate-x-6' : 'translate-x-1'}
              `}
            />
          </button>
        </div>
      </Card>

      {/* 数据管理 */}
      <Card className="p-4 space-y-4">
        <h3 className="text-sm font-medium text-[var(--color-text-secondary)]">数据</h3>
        <button
          onClick={handleClearData}
          className="w-full py-2 text-sm text-[var(--color-error)] border border-[var(--color-error)] rounded-lg hover:bg-[var(--color-error)]/10 transition-colors"
        >
          清除所有数据
        </button>
      </Card>
    </div>
  );
}

// 统计页面组件
function StatsView() {
  const statsStore = useStatsStore();
  const taskStore = useTaskStore();

  const todayStats = statsStore.getTodayStats();
  const streakDays = statsStore.getStreakDays();
  const weekTrend = statsStore.getWeekTrend();
  const completedTasks = taskStore.tasks.filter((t) => t.completed).length;

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">统计</h2>
      <StatCards
        todayPomodoros={todayStats.completedPomodoros}
        todayMinutes={todayStats.totalFocusTime}
        streakDays={streakDays}
        completedTasks={completedTasks}
      />
      <TrendChart data={weekTrend} />
    </div>
  );
}

// 主页面组件
function HomeView() {
  const { mode, status, timeRemaining, completedPomodoros,
    start, pause, resume, reset, skip, switchMode, selectTask } = useTimer();

  const { tasks, addTask, deleteTask, toggleComplete } = useTaskStore();
  const { currentTaskId: storeTaskId, setCurrentTask } = useTimerStore();
  const settings = useSettingsStore();

  // 计算总时间
  const getTotalTime = () => {
    switch (mode) {
      case 'focus': return settings.focusDuration * 60;
      case 'shortBreak': return settings.shortBreakDuration * 60;
      case 'longBreak': return settings.longBreakDuration * 60;
    }
  };

  // 当前选中的任务
  const currentTask = tasks.find((t) => t.id === storeTaskId) || null;

  return (
    <div className="p-4 space-y-4">
      {/* 计时器区域 */}
      <div className="flex flex-col items-center">
        <ModeTabs currentMode={mode} onModeChange={switchMode} />
        <TimerDisplay
          timeRemaining={timeRemaining}
          totalTime={getTotalTime()}
          mode={mode}
          status={status}
          task={currentTask}
          onClearTask={() => setCurrentTask(null)}
        />
        <ControlButtons
          status={status}
          mode={mode}
          onStart={start}
          onPause={pause}
          onResume={resume}
          onReset={reset}
          onSkip={skip}
        />
        <TodayStats completedPomodoros={completedPomodoros} />
      </div>

      {/* 任务列表 */}
      <Card className="p-4">
        <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">
          今日任务
        </h3>
        <TaskInput onAdd={addTask} />
        <TaskList
          tasks={tasks}
          selectedTaskId={storeTaskId}
          onToggleComplete={toggleComplete}
          onDelete={deleteTask}
          onSelect={selectTask}
          onAddClick={() => {}}
        />
      </Card>
    </div>
  );
}

// 主 App 组件
export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const { isDark } = useTheme();

  // 初始化通知权限
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  // 初始化主题
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // 渲染当前视图
  const renderView = () => {
    switch (currentView) {
      case 'settings':
        return <SettingsView />;
      case 'stats':
        return <StatsView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <MainLayout>
      <Header onSettingsClick={() => setCurrentView(currentView === 'settings' ? 'home' : 'settings')} />
      {renderView()}
      {/* 底部导航 */}
      <nav className="flex items-center justify-around h-14 border-t border-[var(--color-border)] bg-[var(--color-bg-card)]">
        <button
          onClick={() => setCurrentView('home')}
          className={`flex flex-col items-center gap-1 px-4 py-2 text-xs ${currentView === 'home' ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'}`}
        >
          <span className="text-lg">⏱️</span>
          计时
        </button>
        <button
          onClick={() => setCurrentView('stats')}
          className={`flex flex-col items-center gap-1 px-4 py-2 text-xs ${currentView === 'stats' ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'}`}
        >
          <span className="text-lg">📊</span>
          统计
        </button>
        <button
          onClick={() => setCurrentView('settings')}
          className={`flex flex-col items-center gap-1 px-4 py-2 text-xs ${currentView === 'settings' ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'}`}
        >
          <span className="text-lg">⚙️</span>
          设置
        </button>
      </nav>
    </MainLayout>
  );
}
