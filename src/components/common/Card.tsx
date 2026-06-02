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
        bg-[var(--color-bg-card)]
        rounded-[var(--radius-xl)]
        shadow-[var(--shadow-sm)]
        ${interactive ? 'transition-shadow duration-200 hover:shadow-[var(--shadow-md)]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
