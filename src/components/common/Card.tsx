/**
 * 卡片组件
 */

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  /** 是否可交互 */
  interactive?: boolean;
}

export function Card({ children, className = '', interactive }: CardProps) {
  return (
    <div
      className={`
        glass
        rounded-[var(--radius-xl)]
        shadow-[var(--shadow-sm)]
        border border-[var(--color-border)]
        ${interactive ? 'transition-all duration-300 hover:shadow-[var(--shadow-md)] hover:translate-y-[-2px] cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
