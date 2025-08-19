import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='skeleton'
      className={cn(
        'glass-card animate-shimmer relative overflow-hidden rounded-xl',
        className
      )}
      {...props}
    >
      <div className='via-primary/10 animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent to-transparent' />
    </div>
  );
}

export { Skeleton };
