import * as React from "react";
import { cn } from "./utils";
import { ChevronRight } from "lucide-react";

/**
 * Unified Quiz Button Component
 * 
 * DESIGN SYSTEM RULES:
 * - Fixed width: 280px for all buttons
 * - Fixed height: 56px
 * - Border radius: 16px
 * - Padding: 0 32px
 * - Font size: 16px
 * - Font weight: 600 (SemiBold)
 * - Center aligned horizontally
 * - Primary color: #AE54FF (purple)
 * - Consistent across all screens
 * - Right arrow icon with 12px spacing
 * - Shadow: Soft purple glow
 */

interface QuizButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
  hideArrow?: boolean; // Option to hide arrow for special cases
}

export function QuizButton({ 
  variant = 'primary', 
  className, 
  disabled,
  children,
  hideArrow = false,
  ...props 
}: QuizButtonProps) {
  
  const baseStyles = `
    inline-flex items-center justify-center gap-3
    font-semibold
    rounded-2xl
    transition-all duration-200
    outline-none disabled:cursor-not-allowed
    group
  `;

  const sizeStyles = `
    w-[280px] h-[56px] px-8
    text-[16px]
  `;

  const variantStyles = {
    primary: `
      text-white
      disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none
    `,
    secondary: `
      bg-transparent border text-gray-700
      disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200
      hover:bg-gray-50
    `,
    ghost: `
      bg-transparent text-gray-600
      hover:text-gray-900 hover:bg-gray-100
      disabled:text-gray-400
    `
  };

  return (
    <button
      className={cn(baseStyles, sizeStyles, variantStyles[variant], className)}
      disabled={disabled}
      style={
        variant === 'primary' && !disabled
          ? { 
              backgroundColor: '#AE54FF',
              color: '#FFFFFF',
              borderRadius: '16px',
              boxShadow: '0 4px 16px rgba(174, 84, 255, 0.24), 0 2px 8px rgba(174, 84, 255, 0.16)'
            }
          : variant === 'primary' && disabled
          ? {
              borderRadius: '16px',
              backgroundColor: '#E5E7EB',
              color: '#9CA3AF'
            }
          : variant === 'secondary' && !disabled
          ? {
              borderColor: '#AE54FF',
              color: '#AE54FF',
              borderRadius: '16px',
              borderWidth: '1px'
            }
          : { borderRadius: '16px' }
      }
      onMouseEnter={(e) => {
        if (variant === 'primary' && !disabled) {
          e.currentTarget.style.backgroundColor = '#9333EA';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(174, 84, 255, 0.32), 0 3px 12px rgba(174, 84, 255, 0.24)';
        } else if (variant === 'secondary' && !disabled) {
          e.currentTarget.style.borderColor = '#AE54FF';
          e.currentTarget.style.color = '#AE54FF';
          e.currentTarget.style.backgroundColor = '#F9F5FF';
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'primary' && !disabled) {
          e.currentTarget.style.backgroundColor = '#AE54FF';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(174, 84, 255, 0.24), 0 2px 8px rgba(174, 84, 255, 0.16)';
        } else if (variant === 'secondary' && !disabled) {
          e.currentTarget.style.borderColor = '#AE54FF';
          e.currentTarget.style.color = '#AE54FF';
          e.currentTarget.style.backgroundColor = 'transparent';
        }
      }}
      onFocus={(e) => {
        if (!disabled) {
          e.currentTarget.style.outline = '2px solid #AE54FF';
          e.currentTarget.style.outlineOffset = '2px';
        }
      }}
      onBlur={(e) => {
        e.currentTarget.style.outline = 'none';
      }}
      {...props}
    >
      <span className="flex items-center justify-center gap-3">
        {children}
        {!hideArrow && variant === 'primary' && (
          <ChevronRight 
            className="w-5 h-5 transition-transform duration-150 ease-out group-hover:translate-x-0.5" 
            style={{ color: '#FFFFFF', opacity: 1 }}
          />
        )}
      </span>
    </button>
  );
}