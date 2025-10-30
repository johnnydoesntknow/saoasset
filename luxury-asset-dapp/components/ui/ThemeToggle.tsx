// components/ui/ThemeToggle.tsx
'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useUIStore } from '@/lib/store/useStore';
import { cn } from '@/lib/utils';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useUIStore();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative p-2.5 rounded-xl',
        'bg-white/10 dark:bg-white/5',
        'hover:bg-iopn-primary/10 dark:hover:bg-iopn-secondary/10',
        'transition-all duration-300',
        'group'
      )}
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <Sun className={cn(
          'absolute inset-0 w-5 h-5 text-amber-500 transition-all duration-300',
          theme === 'dark' ? 'opacity-0 scale-50 rotate-180' : 'opacity-100 scale-100 rotate-0'
        )} />
        <Moon className={cn(
          'absolute inset-0 w-5 h-5 text-iopn-secondary-light transition-all duration-300',
          theme === 'dark' ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-180'
        )} />
      </div>
      
      {/* Tooltip */}
      <span className={cn(
        'absolute -bottom-10 left-1/2 -translate-x-1/2',
        'px-2 py-1 text-xs font-medium',
        'bg-iopn-primary-dark text-white rounded-lg',
        'opacity-0 group-hover:opacity-100',
        'transition-opacity duration-200',
        'pointer-events-none whitespace-nowrap',
        'shadow-lg'
      )}>
        {theme === 'dark' ? 'Light mode' : 'Dark mode'}
      </span>
    </button>
  );
};