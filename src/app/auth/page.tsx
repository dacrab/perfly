'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import {
  ArrowLeft,
  BarChart3,
  Brain,
  Github,
  Globe,
  Loader,
  Mail,
  Rocket,
  Shield,
  Sparkles,
  Target,
  Users,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { toast } from 'sonner';

function AuthContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [authMethod, setAuthMethod] = useState<'github' | 'email' | null>(null);
  const [email, setEmail] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      toast.error(decodeURIComponent(error));
    }
  }, [searchParams]);

  const handleSignInWithGithub = async () => {
    try {
      setIsLoading(true);
      setAuthMethod('github');
      await authClient.signIn.social({ provider: 'github' });
    } catch (error) {
      toast.error('Error signing in with Github', {
        description: String(error),
      });
      setIsLoading(false);
    }
  };

  const handleSignInWithEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    try {
      setIsLoading(true);
      setAuthMethod('email');
      await authClient.signIn.magicLink({ email });
      toast.success('Magic link sent!', {
        description: 'Check your email for the sign-in link.',
      });
    } catch (error) {
      toast.error('Error signing in with email', {
        description: String(error),
      });
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-background relative flex h-screen w-full overflow-hidden'>
      {/* Back button */}
      <div className='absolute top-8 left-8 z-20'>
        <Link
          href='/'
          className='group glass-card hover:elevation-2 flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-medium transition-all hover:scale-105'
        >
          <ArrowLeft className='h-4 w-4 transition-transform group-hover:-translate-x-1' />
          Back to Home
        </Link>
      </div>

      {/* Split Screen Layout */}
      <div className='flex w-full'>
        {/* Left Side - Branding & Features */}
        <div className='from-primary/5 relative hidden items-center justify-center overflow-hidden bg-gradient-to-br via-purple-500/5 to-pink-500/5 lg:flex lg:w-1/2'>
          {/* Enhanced Animated Background Elements */}
          <div className='bg-primary/10 animate-pulse-slow absolute top-20 left-20 h-72 w-72 rounded-full blur-3xl' />
          <div
            className='animate-pulse-slow absolute right-20 bottom-20 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl'
            style={{ animationDelay: '2s' }}
          />
          <div
            className='animate-float-slow absolute top-1/2 left-1/4 h-48 w-48 rounded-full bg-pink-500/10 blur-2xl'
            style={{ animationDelay: '1s' }}
          />
          <div
            className='animate-pulse-slow absolute top-40 right-1/3 h-32 w-32 rounded-full bg-cyan-500/8 blur-3xl'
            style={{ animationDelay: '4s' }}
          />

          {/* Enhanced Floating Icons */}
          <div className='animate-float-slow absolute top-32 right-40 opacity-50'>
            <div className='glass-card elevation-2 flex h-16 w-16 items-center justify-center rounded-2xl'>
              <Rocket className='text-primary h-7 w-7' />
            </div>
          </div>
          <div
            className='animate-float-slow absolute bottom-40 left-32 opacity-30'
            style={{ animationDelay: '3s' }}
          >
            <div className='glass-card elevation-1 flex h-12 w-12 items-center justify-center rounded-xl'>
              <BarChart3 className='h-5 w-5 text-purple-500' />
            </div>
          </div>
          <div
            className='animate-float-slow absolute top-1/2 right-20 opacity-40'
            style={{ animationDelay: '1.5s' }}
          >
            <div className='glass-card elevation-2 flex h-14 w-14 items-center justify-center rounded-xl'>
              <Brain className='h-6 w-6 text-cyan-500' />
            </div>
          </div>
          <div
            className='animate-float-slow absolute bottom-1/3 left-1/4 opacity-35'
            style={{ animationDelay: '2.5s' }}
          >
            <div className='glass-card elevation-1 flex h-10 w-10 items-center justify-center rounded-lg'>
              <Target className='h-4 w-4 text-pink-500' />
            </div>
          </div>

          <div className='relative z-10 max-w-lg px-12 text-center'>
            {/* Logo */}
            <div className='mb-8 flex justify-center'>
              <div className='animate-float-slow relative'>
                <div className='from-primary elevation-3 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br via-purple-500 to-pink-500'>
                  <Sparkles className='animate-pulse-soft h-8 w-8 text-white' />
                </div>
                <div className='from-primary animate-pulse-soft absolute -inset-2 rounded-3xl bg-gradient-to-r via-purple-500 to-pink-500 opacity-20 blur-xl' />
              </div>
            </div>

            <h1 className='text-gradient mb-6 text-4xl leading-tight font-black md:text-5xl'>
              Welcome to the Future
            </h1>

            <p className='text-muted-foreground mb-8 text-xl leading-relaxed opacity-90'>
              Join thousands of developers who trust Perfly for lightning-fast
              performance testing and AI-powered insights.
            </p>

            {/* Feature Highlights */}
            <div className='space-y-4'>
              {[
                { icon: Zap, text: 'Lightning-fast performance testing' },
                { icon: Shield, text: 'Enterprise-grade security' },
                { icon: Users, text: 'Trusted by 50K+ developers' },
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className='glass-card animate-fade-in-up flex items-center gap-4 rounded-xl px-4 py-3'
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className='from-primary/20 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br to-purple-500/20'>
                      <Icon className='text-primary h-5 w-5' />
                    </div>
                    <span className='text-muted-foreground font-medium'>
                      {feature.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className='relative flex w-full items-center justify-center px-6 py-12 lg:w-1/2'>
          {/* Enhanced Mobile Background (only visible on small screens) */}
          <div className='absolute inset-0 -z-10 lg:hidden'>
            <div className='from-primary/5 absolute inset-0 bg-gradient-to-br via-purple-500/5 to-pink-500/5' />
            <div className='bg-primary/10 animate-pulse-slow absolute top-20 left-20 h-48 w-48 rounded-full blur-3xl' />
            <div className='animate-pulse-slow absolute right-20 bottom-32 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl' />
            <div className='animate-float-slow absolute top-1/2 left-1/4 h-32 w-32 rounded-full bg-pink-500/8 blur-2xl' />
            <div className='animate-float-slow absolute top-32 right-8 opacity-20'>
              <div className='glass-card elevation-1 flex h-12 w-12 items-center justify-center rounded-xl'>
                <Globe className='text-primary h-5 w-5' />
              </div>
            </div>
            <div
              className='animate-float-slow absolute bottom-40 left-8 opacity-15'
              style={{ animationDelay: '2s' }}
            >
              <div className='glass-card elevation-1 flex h-10 w-10 items-center justify-center rounded-lg'>
                <Zap className='h-4 w-4 text-yellow-500' />
              </div>
            </div>
          </div>

          <div className='relative z-10 w-full max-w-md'>
            {/* Mobile Header (only visible on small screens) */}
            <div className='mb-8 text-center lg:hidden'>
              <div className='mb-6 flex justify-center'>
                <div className='from-primary elevation-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br via-purple-500 to-pink-500'>
                  <Sparkles className='h-6 w-6 text-white' />
                </div>
              </div>
              <h1 className='text-gradient mb-2 text-3xl font-bold'>
                Welcome to Perfly
              </h1>
              <p className='text-muted-foreground'>
                Sign in to access your performance dashboard
              </p>
            </div>

            {/* Auth Card */}
            <div className='glass-card elevation-3 rounded-3xl p-8'>
              <div className='mb-8 hidden text-center lg:block'>
                <Badge className='glass-card mb-4 border-0 px-4 py-2 text-sm font-medium'>
                  <Sparkles className='mr-2 h-3 w-3' />
                  Get Started Today
                </Badge>
                <h2 className='mb-2 text-2xl font-bold'>
                  Sign in to your account
                </h2>
                <p className='text-muted-foreground text-sm'>
                  Access your performance dashboard and AI insights
                </p>
              </div>

              <div className='space-y-6'>
                {/* GitHub Sign In */}
                <Button
                  onClick={handleSignInWithGithub}
                  disabled={isLoading}
                  className='group glass-card hover:elevation-2 relative w-full rounded-2xl border-0 px-6 py-4 font-medium transition-all hover:scale-[1.02] disabled:scale-100'
                  variant='outline'
                >
                  <div className='relative flex items-center justify-center gap-3'>
                    {isLoading && authMethod === 'github' ? (
                      <>
                        <Loader className='h-5 w-5 animate-spin' />
                        <span>Connecting...</span>
                      </>
                    ) : (
                      <>
                        <Github className='h-5 w-5 transition-transform group-hover:scale-110' />
                        <span>Continue with GitHub</span>
                      </>
                    )}
                  </div>
                </Button>

                {/* Divider */}
                <div className='relative'>
                  <div className='absolute inset-0 flex items-center'>
                    <div className='border-border/20 w-full border-t' />
                  </div>
                  <div className='relative flex justify-center text-sm'>
                    <span className='bg-background text-muted-foreground px-4 font-medium'>
                      Or continue with email
                    </span>
                  </div>
                </div>

                {/* Email Sign In */}
                <form onSubmit={handleSignInWithEmail} className='space-y-4'>
                  <div className='space-y-2'>
                    <label
                      htmlFor='email'
                      className='text-foreground text-sm font-semibold'
                    >
                      Email address
                    </label>
                    <Input
                      type='email'
                      id='email'
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder='Enter your email address...'
                      className='glass-card text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/20 h-12 rounded-2xl border-0 px-4 transition-all focus-visible:ring-2 focus-visible:ring-offset-0'
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <Button
                    type='submit'
                    disabled={isLoading || !email}
                    className='from-primary elevation-2 hover:elevation-3 h-12 w-full rounded-2xl bg-gradient-to-r via-purple-500 to-pink-500 font-semibold text-white transition-all duration-300 hover:scale-[1.02] disabled:scale-100 disabled:opacity-70'
                  >
                    {isLoading && authMethod === 'email' ? (
                      <>
                        <Loader className='mr-2 h-5 w-5 animate-spin' />
                        Sending magic link...
                      </>
                    ) : (
                      <>
                        <Mail className='mr-2 h-5 w-5' />
                        Send magic link
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Footer */}
            <div className='mt-8 text-center'>
              <p className='text-muted-foreground text-xs leading-relaxed'>
                By signing in, you agree to our{' '}
                <Link
                  className='hover:text-primary font-medium underline decoration-2 underline-offset-4 transition-colors'
                  href='#'
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  className='hover:text-primary font-medium underline decoration-2 underline-offset-4 transition-colors'
                  href='#'
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className='flex min-h-[calc(100vh-4rem)] items-center justify-center'>
          <div className='border-primary/20 border-t-primary h-8 w-8 animate-spin rounded-full border-4' />
        </div>
      }
    >
      <AuthContent />
    </Suspense>
  );
}
