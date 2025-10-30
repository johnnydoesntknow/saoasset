import { cn } from '@/lib/utils';
import React from 'react';

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'solid' | 'dark';
  blur?: 'none' | 'sm' | 'md';
  hoverable?: boolean;
  children: React.ReactNode;
}

export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ 
    className, 
    variant = 'default', 
    blur = 'sm', 
    hoverable = false,
    children, 
    ...props 
  }, ref) => {
    const blurClasses = {
      none: '',
      sm: 'backdrop-blur-sm',
      md: 'backdrop-blur-md',
    };

    const variantClasses = {
      default: cn(
        'bg-white/90 dark:bg-gray-900/80',
        'border border-gray-200/50 dark:border-gray-700/50',
        'shadow-sm'
      ),
      solid: cn(
        'bg-white dark:bg-gray-900',
        'border border-gray-200 dark:border-gray-800',
        'shadow-sm'
      ),
      dark: cn(
        'bg-gray-900/90 dark:bg-black/90',
        'border border-gray-700/50',
        'text-white',
        'shadow-md'
      ),
    };

    const hoverClasses = hoverable ? 'hover:shadow-md transition-shadow duration-300' : '';

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl',
          blurClasses[blur],
          variantClasses[variant],
          hoverClasses,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassPanel.displayName = 'GlassPanel';