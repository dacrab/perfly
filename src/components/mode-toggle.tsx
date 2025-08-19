'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='glass hover:elevation-2 group relative rounded-2xl transition-all hover:scale-105'
        >
          <Sun className='h-5 w-5 scale-100 rotate-0 transition-all duration-300 group-hover:rotate-12 dark:scale-0 dark:-rotate-90' />
          <Moon className='absolute h-5 w-5 scale-0 rotate-90 transition-all duration-300 group-hover:-rotate-12 dark:scale-100 dark:rotate-0' />
          <span className='sr-only'>Toggle theme</span>
          <div className='from-primary absolute -inset-0.5 rounded-2xl bg-gradient-to-r via-purple-500 to-pink-500 opacity-0 blur-sm transition-opacity group-hover:opacity-20' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='glass-card elevation-3 border-0'
      >
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className='hover:bg-secondary/50 cursor-pointer rounded-lg transition-all hover:scale-[1.02]'
        >
          <Sun className='mr-2 h-4 w-4' />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className='hover:bg-secondary/50 cursor-pointer rounded-lg transition-all hover:scale-[1.02]'
        >
          <Moon className='mr-2 h-4 w-4' />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className='hover:bg-secondary/50 cursor-pointer rounded-lg transition-all hover:scale-[1.02]'
        >
          <div className='from-primary mr-2 h-4 w-4 rounded-full bg-gradient-to-r to-purple-500' />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
