/**
 * 主布局组件
 */

import { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col">
      <main className="flex-1 overflow-auto pb-4">
        <div className="max-w-md mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
