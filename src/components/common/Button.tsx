/**
 * 通用按钮组件
 */

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 按钮变体 */
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  /** 按钮尺寸 */
  size?: 'sm' | 'md' | 'lg';
  /** 图标 */
  icon?: ReactNode;
  /** 是否加载中 */
  loading?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  loading,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  // 基础样式
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg';

  // 变体样式
  const variantClasses = {
    primary:
      'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] active:scale-[0.98]',
    secondary:
      'bg-transparent border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-bg-card)]',
    ghost:
      'bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)]',
    icon: 'bg-transparent hover:bg-[var(--color-bg-elevated)]',
  };

  // 尺寸样式
  const sizeClasses = {
    sm: 'h-8 px-3 text-sm gap-1.5',
    md: 'h-10 px-4 text-sm gap-2',
    lg: 'h-12 px-6 text-base gap-2',
  };

  // 图标按钮特殊样式
  const isIconOnly = variant === 'icon' || (!children && icon);

  return (
    <button
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${!isIconOnly ? sizeClasses[size] : ''}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        icon
      )}
      {children}
    </button>
  );
}
