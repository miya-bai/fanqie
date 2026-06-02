/**
 * 任务状态管理
 * 管理任务列表的增删改查
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task } from '../types';

interface TaskState {
  tasks: Task[]; // 任务列表

  // Actions
  addTask: (title: string, estimatedPomodoros: number) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
  incrementPomodoro: (id: string) => void;
  clearCompletedTasks: () => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      // 初始任务列表为空
      tasks: [],

      // 添加新任务
      addTask: (title, estimatedPomodoros) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: crypto.randomUUID(),
              title,
              estimatedPomodoros,
              completedPomodoros: 0,
              completed: false,
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      // 删除任务
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

      // 切换任务完成状态
      toggleComplete: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id
              ? {
                  ...t,
                  completed: !t.completed,
                  completedAt: !t.completed ? new Date().toISOString() : undefined,
                }
              : t
          ),
        })),

      // 增加任务的完成番茄数
      incrementPomodoro: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id
              ? { ...t, completedPomodoros: t.completedPomodoros + 1 }
              : t
          ),
        })),

      // 清除所有已完成任务
      clearCompletedTasks: () =>
        set((state) => ({
          tasks: state.tasks.filter((t) => !t.completed),
        })),
    }),
    {
      name: 'focusflow-tasks',
    }
  )
);
