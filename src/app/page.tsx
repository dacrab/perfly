'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSession } from '@/lib/auth-client';
import {
  BarChart3,
  Brain,
  Globe,
  Loader,
  Rocket,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';

function validateUrl(url: string): boolean {
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
}

export default function HomePage() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  useSession();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const runTest = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim() || !validateUrl(url)) {
      toast.error('Please enter a valid URL.');
      return;
    }

    setIsLoading(true);
    const testUrl = url.startsWith('http') ? url : `https://${url}`;

    try {
      const response = await fetch('/api/tests/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: testUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to start the test.');
      }

      toast.success('Test started successfully!');
      router.push(`/results/${data.testId}`);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'An unexpected error occurred.'
      );
      setIsLoading(false);
    }
  };

  const examples = useMemo(() => ['google.com', 'github.com', 'warp.dev'], []);

  return (
    <div className='relative overflow-hidden px-6 py-12'>
      {/* Floating Background Elements */}
      <div className='bg-primary/5 animate-pulse-slow absolute top-20 left-10 h-64 w-64 rounded-full blur-3xl' />
      <div
        className='animate-pulse-slow absolute top-1/2 right-10 h-80 w-80 rounded-full bg-purple-500/5 blur-3xl'
        style={{ animationDelay: '2s' }}
      />
      <div
        className='animate-float-slow absolute top-1/3 left-1/4 h-40 w-40 rounded-full bg-pink-500/5 blur-2xl'
        style={{ animationDelay: '1s' }}
      />

      {/* Floating Icons */}
      <div className='animate-float-slow absolute top-24 right-12 hidden opacity-30 lg:block'>
        <div className='glass-card flex h-16 w-16 items-center justify-center rounded-2xl'>
          <Brain className='text-primary h-7 w-7' />
        </div>
      </div>
      <div
        className='animate-float-slow absolute top-2/3 left-12 hidden opacity-20 lg:block'
        style={{ animationDelay: '3s' }}
      >
        <div className='glass-card flex h-12 w-12 items-center justify-center rounded-xl'>
          <Target className='h-5 w-5 text-purple-500' />
        </div>
      </div>
      <div
        className='animate-float-slow absolute top-1/2 right-1/4 hidden opacity-25 lg:block'
        style={{ animationDelay: '1.5s' }}
      >
        <div className='glass-card flex h-14 w-14 items-center justify-center rounded-xl'>
          <BarChart3 className='h-6 w-6 text-cyan-500' />
        </div>
      </div>

      <div className='relative z-10 container mx-auto max-w-7xl'>
        {/* Hero Section */}
        <div className='flex flex-col items-center justify-center space-y-8 text-center'>
          <div className='flex justify-center'>
            <div className='animate-float-slow relative'>
              <div className='from-primary elevation-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br via-purple-500 to-pink-500'>
                <Zap className='animate-pulse-soft h-10 w-10 text-white' />
              </div>
              <div className='from-primary animate-pulse-soft absolute -inset-3 rounded-3xl bg-gradient-to-r via-purple-500 to-pink-500 opacity-20 blur-2xl' />
            </div>
          </div>

          <Badge className='glass-card animate-pulse-soft border-0 px-6 py-3 text-lg font-medium'>
            <Sparkles className='animate-spin-slow mr-2 h-4 w-4' />
            AI-powered performance testing
          </Badge>

          <h1 className='text-gradient text-6xl leading-none font-black tracking-tight md:text-7xl lg:text-8xl'>
            Perfly
          </h1>

          <p className='text-muted-foreground mx-auto max-w-4xl text-2xl leading-relaxed opacity-90'>
            Enter a URL and get actionable insights powered by AI.
            <br className='hidden md:block' />
            No fluff, just the metrics that matter.
          </p>

          {/* Search Form */}
          <form
            onSubmit={runTest}
            className='glass-card elevation-3 animate-fade-in-up w-full max-w-3xl rounded-3xl border-0 p-6'
          >
            <div
              className={`flex items-center gap-4 transition-all ${isFocused ? 'scale-[1.02]' : ''}`}
            >
              <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400/20 to-purple-500/20'>
                <Globe className='text-primary h-7 w-7' />
              </div>
              <Input
                ref={inputRef}
                type='url'
                placeholder='https://example.com'
                value={url}
                onChange={e => setUrl(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className='glass-input text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/30 h-14 flex-1 border-0 bg-transparent text-lg transition-all focus-visible:ring-2 focus-visible:ring-offset-0'
                style={{
                  backgroundColor: 'transparent !important',
                  color: 'inherit',
                }}
                disabled={isLoading}
              />
              <Button
                type='submit'
                size='lg'
                className='from-primary elevation-2 hover:elevation-3 h-14 rounded-2xl bg-gradient-to-r via-purple-500 to-pink-500 px-8 text-lg font-semibold text-white transition-all duration-300 hover:scale-105'
                disabled={isLoading || !url.trim()}
              >
                {isLoading ? (
                  <>
                    <Loader className='mr-3 h-5 w-5 animate-spin' />
                    Analyzing
                  </>
                ) : (
                  <>
                    <Rocket className='mr-3 h-5 w-5' />
                    Analyze
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Examples */}
          <div
            className='animate-fade-in-up flex flex-wrap items-center justify-center gap-3 text-lg font-medium'
            style={{ animationDelay: '0.2s' }}
          >
            <span className='text-muted-foreground'>Try:</span>
            {examples.map((ex, index) => (
              <button
                key={ex}
                type='button'
                onClick={() => setUrl(ex)}
                className='glass-card hover:elevation-2 animate-fade-in-up rounded-xl border-0 px-4 py-2 font-medium transition-all hover:scale-105'
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
