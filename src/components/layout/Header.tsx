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
    <header className="flex items-center justify-between h-14 px-4 border-b border-[var(--color-border)]">
      <h1 className="text-lg font-semibold text-[var(--color-text)]">
        FocusFlow
      </h1>
      <Button variant="icon" onClick={onSettingsClick}>
        <Settings size={20} />
      </Button>
    </header>
  );
}
