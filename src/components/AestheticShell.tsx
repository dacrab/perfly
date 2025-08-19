'use client';

import React from 'react';

export function AestheticShell({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative min-h-screen overflow-hidden px-6 py-8'>
      {/* Ambient background floaters, consistent with About */}
      <div className='bg-primary/5 animate-pulse-slow absolute top-20 left-20 h-72 w-72 rounded-full blur-3xl' />
      <div
        className='animate-pulse-slow absolute right-20 bottom-20 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl'
        style={{ animationDelay: '2s' }}
      />
      <div
        className='animate-float-slow absolute top-1/2 left-1/4 h-48 w-48 rounded-full bg-pink-500/5 blur-2xl'
        style={{ animationDelay: '1s' }}
      />

      <div className='relative z-10'>{children}</div>
    </div>
  );
}
