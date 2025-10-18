import { cn } from '@/lib/utils';
import React from 'react';
import { GlassPanel } from './GlassPanel';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'light' | 'dark' | 'primary';
  hoverable?: boolean;
  clickable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'light', hoverable = false, clickable = false, children, ...props }, ref) => {
    return (
      <GlassPanel
        ref={ref}
        variant={variant}
        className={cn(
          'p-6',
          hoverable && 'hover:transform hover:scale-105 transition-transform duration-300',
          clickable && 'cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </GlassPanel>
    );
  }
);

Card.displayName = 'Card';