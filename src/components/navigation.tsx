'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { authClient, useSession } from '@/lib/auth-client';
import { LogIn, Menu, Settings, Sparkles, User, X, Zap } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ModeToggle } from './mode-toggle';

export function Navigation() {
  const { data: session } = useSession();
  const user = session?.user;
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard', requiresAuth: true },
    { href: '/about', label: 'About' },
  ];

  return (
    <>
      <header className='glass-card elevation-2 sticky top-0 z-50 w-full border-0'>
        <div className='container mx-auto flex max-w-7xl items-center justify-between px-6 py-5'>
          {/* Logo */}
          <Link href='/' className='group flex items-center gap-3'>
            <div className='relative'>
              <div className='from-primary elevation-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br via-purple-500 to-pink-500 transition-all group-hover:scale-110'>
                <Zap className='animate-pulse-soft h-5 w-5 text-white' />
              </div>
              <div className='from-primary animate-pulse-soft absolute -inset-1 rounded-2xl bg-gradient-to-r via-purple-500 to-pink-500 opacity-20 blur-lg transition-opacity group-hover:opacity-40' />
            </div>
            <span className='text-gradient text-xl font-black tracking-tight'>
              Perfly
            </span>
          </Link>

          {/* Navigation */}
          <nav className='hidden items-center gap-8 md:flex'>
            {navItems.map(item => {
              if (item.requiresAuth && !session) return null;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`glass-card hover:elevation-1 rounded-xl border-0 px-4 py-2 text-sm font-medium transition-all hover:scale-105 ${
                    isActive
                      ? 'text-gradient bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className='flex items-center gap-3'>
            <ModeToggle />
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    className='glass-card hover:elevation-2 h-10 w-10 rounded-2xl border-0 p-0 transition-all hover:scale-105'
                  >
                    <Avatar className='h-8 w-8'>
                      <AvatarImage
                        src={user?.image ?? ''}
                        alt={user?.name ?? ''}
                      />
                      <AvatarFallback className='bg-gradient-to-br from-blue-400 to-purple-500 font-medium text-white'>
                        {user?.name?.charAt(0)?.toUpperCase() || (
                          <User className='h-4 w-4' />
                        )}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align='end'
                  className='glass-card w-72 border-0 p-0'
                >
                  <div className='border-border/20 flex items-center gap-3 border-b p-4'>
                    <Avatar className='h-12 w-12'>
                      <AvatarImage
                        src={user?.image ?? ''}
                        alt={user?.name ?? ''}
                      />
                      <AvatarFallback className='bg-gradient-to-br from-blue-400 to-purple-500 font-medium text-white'>
                        {user?.name?.charAt(0)?.toUpperCase() || (
                          <User className='h-5 w-5' />
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div className='min-w-0 flex-1'>
                      {user?.name && (
                        <p className='truncate font-semibold'>{user.name}</p>
                      )}
                      {user?.email && (
                        <p className='text-muted-foreground truncate text-sm'>
                          {user.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='space-y-1 p-2'>
                    <DropdownMenuItem asChild>
                      <Link
                        href='/dashboard'
                        className='glass-card hover:elevation-1 w-full rounded-xl border-0 px-3 py-2.5 transition-all'
                      >
                        <Settings className='mr-3 h-4 w-4' />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href='/settings'
                        className='glass-card hover:elevation-1 w-full rounded-xl border-0 px-3 py-2.5 transition-all'
                      >
                        <User className='mr-3 h-4 w-4' />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                  </div>
                  <div className='border-border/20 border-t p-2'>
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className='glass-card hover:elevation-1 text-muted-foreground w-full rounded-xl border-0 px-3 py-2.5 transition-all hover:text-orange-500'
                    >
                      <LogIn className='mr-3 h-4 w-4' />
                      Sign Out
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                asChild
                className='group from-primary elevation-2 hover:elevation-3 rounded-2xl bg-gradient-to-r via-purple-500 to-pink-500 px-4 py-2 font-semibold text-white transition-all duration-300 hover:scale-105'
              >
                <Link href='/auth' className='flex items-center gap-2'>
                  <LogIn className='h-4 w-4 transition-transform group-hover:scale-110' />
                  <span>Sign In</span>
                </Link>
              </Button>
            )}
            <Button
              variant='ghost'
              size='icon'
              className='glass-card hover:elevation-2 rounded-2xl border-0 transition-all hover:scale-105 md:hidden'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className='h-5 w-5' />
              ) : (
                <Menu className='h-5 w-5' />
              )}
            </Button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className='fixed inset-0 z-40 md:hidden'>
          <div
            className='fixed inset-0 bg-black/40 backdrop-blur-sm'
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className='glass-card elevation-4 mx-4 mt-20 rounded-3xl border-0 p-6'>
            <div className='mb-4 flex items-center justify-center'>
              <div className='relative'>
                <div className='from-primary elevation-2 flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br via-purple-500 to-pink-500'>
                  <Sparkles className='h-4 w-4 text-white' />
                </div>
                <div className='from-primary animate-pulse-soft absolute -inset-1 rounded-xl bg-gradient-to-r via-purple-500 to-pink-500 opacity-20 blur-lg' />
              </div>
            </div>
            <nav className='space-y-2'>
              {navItems.map(item => {
                if (item.requiresAuth && !session) return null;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`glass-card hover:elevation-2 block rounded-2xl border-0 px-4 py-3 text-center font-medium transition-all hover:scale-105 ${
                      isActive
                        ? 'text-gradient bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
