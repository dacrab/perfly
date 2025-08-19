'use client';

import { cn } from '@/lib/utils';

interface LoadingDotsProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingDots({ className, size = 'md' }: LoadingDotsProps) {
  const sizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {[0, 1, 2].map(index => (
        <div
          key={index}
          className={cn(
            'from-primary animate-pulse-soft rounded-full bg-gradient-to-r via-purple-500 to-pink-500',
            sizeClasses[size]
          )}
          style={{
            animationDelay: `${index * 0.2}s`,
            animationDuration: '1.4s',
          }}
        />
      ))}
    </div>
  );
}

export function LoadingSpinner({ className, size = 'md' }: LoadingDotsProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className={cn('relative', sizeClasses[size], className)}>
      <div className='border-primary/20 absolute inset-0 rounded-full border-2' />
      <div className='border-t-primary absolute inset-0 animate-spin rounded-full border-2 border-transparent' />
      <div className='from-primary/10 animate-pulse-soft absolute inset-1 rounded-full bg-gradient-to-r via-purple-500/10 to-pink-500/10' />
    </div>
  );
}
