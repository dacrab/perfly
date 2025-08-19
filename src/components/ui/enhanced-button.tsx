'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ReactNode, useState } from 'react';

interface EnhancedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'glass' | 'gradient' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  hoverEffect?: boolean;
  glowEffect?: boolean;
}

export function EnhancedButton({
  children,
  onClick,
  variant = 'default',
  size = 'md',
  className,
  disabled = false,
  loading = false,
  icon,
  hoverEffect = true,
  glowEffect = false,
  ...props
}: EnhancedButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-12 py-5 text-xl',
  };

  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    glass: 'glass-card border-0 hover:elevation-2',
    gradient:
      'bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-white hover:shadow-lg',
    outline:
      'border-2 border-primary bg-transparent hover:bg-primary hover:text-primary-foreground',
  };

  const handleMouseEnter = () => {
    if (hoverEffect) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (hoverEffect) setIsHovered(false);
  };

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        'group relative overflow-hidden rounded-2xl font-semibold transition-all duration-300',
        sizeClasses[size],
        variantClasses[variant],
        hoverEffect && 'hover:scale-105 active:scale-95',
        glowEffect && 'hover:shadow-2xl',
        isPressed && 'scale-95',
        loading && 'cursor-wait',
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...props}
    >
      {/* Glow Effect */}
      {glowEffect && (
        <div className='from-primary absolute -inset-1 rounded-2xl bg-gradient-to-r via-purple-500 to-pink-500 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-30' />
      )}

      {/* Shimmer Effect */}
      {hoverEffect && (
        <div
          className={cn(
            'absolute inset-0 -skew-x-12 transform bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700',
            isHovered ? 'translate-x-full' : '-translate-x-full'
          )}
        />
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent' />
        </div>
      )}

      {/* Content */}
      <div
        className={cn(
          'relative z-10 flex items-center gap-2',
          loading && 'opacity-0'
        )}
      >
        {icon && (
          <span className='transition-transform duration-300 group-hover:scale-110'>
            {icon}
          </span>
        )}
        {children}
      </div>

      {/* Ripple Effect */}
      <div className='absolute inset-0 rounded-2xl bg-white opacity-0 transition-opacity duration-200 group-active:opacity-20' />
    </Button>
  );
}
