import { cn } from '@/lib/utils';
import React from 'react';

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'light' | 'dark' | 'primary';
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
  glow?: boolean;
  children: React.ReactNode;
}

export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, variant = 'light', blur = 'md', border = true, glow = false, children, ...props }, ref) => {
    const blurClasses = {
      sm: 'backdrop-blur-sm',
      md: 'backdrop-blur-md',
      lg: 'backdrop-blur-lg',
      xl: 'backdrop-blur-xl',
    };

    const variantClasses = {
      light: 'bg-white/10 dark:bg-white/5',
      dark: 'bg-black/10 dark:bg-black/20',
      primary: 'bg-gradient-to-br from-primary-500/10 to-primary-600/10',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-2xl transition-all duration-300',
          blurClasses[blur],
          variantClasses[variant],
          border && 'border border-white/20 dark:border-white/10',
          glow && 'shadow-2xl shadow-primary-500/20 hover:shadow-primary-500/30',
          'before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br',
          'before:from-white/10 before:to-transparent before:opacity-50',
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