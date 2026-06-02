/**
 * 通用输入框组件
 */

import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** 错误状态 */
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`
          w-full h-11 px-4
          bg-[var(--color-bg-card)]
          border rounded-lg
          text-[var(--color-text)]
          text-sm
          placeholder:text-[var(--color-text-muted)]
          outline-none
          transition-all duration-150
          ${error
            ? 'border-[var(--color-error)] focus:shadow-[0_0_0_3px_rgba(255,69,58,0.25)]'
            : 'border-[var(--color-border)] focus:border-[var(--color-primary)] focus:shadow-[var(--shadow-focus)]'
          }
          ${className}
        `}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
