'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot='progress'
      className={cn(
        'glass-card elevation-1 relative h-3 w-full overflow-hidden rounded-full',
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot='progress-indicator'
        className='from-primary h-full w-full flex-1 rounded-full bg-gradient-to-r via-purple-500 to-pink-500 transition-all duration-500 ease-out'
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
      <div className='from-primary/20 animate-pulse-soft absolute inset-0 bg-gradient-to-r via-purple-500/20 to-pink-500/20 opacity-0' />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
