/**
 * 顶部导航栏组件
 */

import { Settings } from 'lucide-react';
import { Button } from '../common';

interface HeaderProps {
  onSettingsClick: () => void;
}

export function Header({ onSettingsClick }: HeaderProps) {
  return (
    <header className="flex items-center justify-between h-14 px-5 border-b border-[var(--color-border)] glass">
      <h1 className="text-lg font-semibold text-[var(--color-text)] tracking-tight">
        FocusFlow
      </h1>
      <Button
        variant="icon"
        onClick={onSettingsClick}
        className="w-10 h-10 rounded-xl hover:scale-105 transition-transform"
      >
        <Settings size={20} />
      </Button>
    </header>
  );
}
