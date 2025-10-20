import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import db from '@/db';
import { tests } from '@/db/schema';
import { auth } from '@/lib/auth';
import { desc } from 'drizzle-orm';
import {
    Activity,
    AlertCircle,
    BarChart3,
    CheckCircle,
    Clock,
    ExternalLink,
    Globe,
    Plus,
    Rocket,
    Sparkles,
    Target,
    Users,
    Zap,
} from 'lucide-react';
import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

function getStatusIcon(status: string) {
  switch (status) {
    case 'COMPLETED':
      return <CheckCircle className='h-4 w-4 text-green-500' />;
    case 'PENDING':
      return <Clock className='h-4 w-4 text-yellow-500' />;
    case 'FAILED':
      return <AlertCircle className='h-4 w-4 text-red-500' />;
    default:
      return <Clock className='h-4 w-4 text-gray-500' />;
  }
}

export default async function DashboardPage() {
  // Require authentication: redirect to /auth if no session
  const session = await auth.api.getSession({ headers: headers() as unknown as HeadersInit });
  if (!session) {
    redirect('/auth');
  }
  const userTests = await db
    .select()
    .from(tests)
    .orderBy(desc(tests.createdAt));

  const completedTests = userTests.filter(t => t.status === 'COMPLETED').length;
  const pendingTests = userTests.filter(t => t.status === 'PENDING').length;
  const failedTests = userTests.filter(t => t.status === 'FAILED').length;

  return (
    <div className='relative min-h-screen overflow-hidden px-6 py-8'>
      {/* Floating Background Elements */}
      <div className='bg-primary/5 animate-pulse-slow absolute top-20 left-20 h-72 w-72 rounded-full blur-3xl' />
      <div
        className='animate-pulse-slow absolute right-20 bottom-20 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl'
        style={{ animationDelay: '2s' }}
      />
      <div
        className='animate-float-slow absolute top-1/2 left-1/4 h-48 w-48 rounded-full bg-pink-500/5 blur-2xl'
        style={{ animationDelay: '1s' }}
      />

      {/* Floating Icons */}
      <div className='animate-float-slow absolute top-32 right-40 opacity-30'>
        <div className='glass-card flex h-16 w-16 items-center justify-center rounded-2xl'>
          <Rocket className='text-primary h-7 w-7' />
        </div>
      </div>
      <div
        className='animate-float-slow absolute bottom-40 left-32 opacity-20'
        style={{ animationDelay: '3s' }}
      >
        <div className='glass-card flex h-12 w-12 items-center justify-center rounded-xl'>
          <Target className='h-5 w-5 text-purple-500' />
        </div>
      </div>

      <div className='relative z-10 container mx-auto max-w-7xl'>
        {/* Header */}
        <div className='mb-12 text-center'>
          <div className='mb-6 flex justify-center'>
            <div className='animate-float-slow relative'>
              <div className='from-primary elevation-3 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br via-purple-500 to-pink-500'>
                <Sparkles className='animate-pulse-soft h-8 w-8 text-white' />
              </div>
              <div className='from-primary animate-pulse-soft absolute -inset-2 rounded-3xl bg-gradient-to-r via-purple-500 to-pink-500 opacity-20 blur-xl' />
            </div>
          </div>

          <h1 className='text-gradient mb-6 text-5xl leading-tight font-black md:text-6xl'>
            Performance Dashboard
          </h1>
          <p className='text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed opacity-90'>
            Monitor your website performance with real-time insights and
            AI-powered analytics.
          </p>

          <div className='mt-8'>
            <Button
              asChild
              size='lg'
              className='group from-primary elevation-3 hover:elevation-4 relative rounded-2xl bg-gradient-to-r via-purple-500 to-pink-500 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105'
            >
              <Link href='/' className='flex items-center gap-3'>
                <Rocket className='h-5 w-5 transition-transform group-hover:rotate-12' />
                Run New Test
                <Plus className='h-5 w-5 transition-transform group-hover:scale-110' />
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {[
            {
              title: 'Total Tests',
              value: userTests.length,
              icon: BarChart3,
              color: 'from-blue-400 to-cyan-500',
              change: '+12%',
              changeType: 'positive',
            },
            {
              title: 'Completed',
              value: completedTests,
              icon: CheckCircle,
              color: 'from-green-400 to-emerald-500',
              change: '+8%',
              changeType: 'positive',
            },
            {
              title: 'Pending',
              value: pendingTests,
              icon: Clock,
              color: 'from-yellow-400 to-orange-500',
              change: '-2%',
              changeType: 'negative',
            },
            {
              title: 'Failed',
              value: failedTests,
              icon: AlertCircle,
              color: 'from-red-400 to-pink-500',
              change: '-15%',
              changeType: 'positive',
            },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className='group glass-card elevation-2 hover:elevation-4 animate-fade-in-up cursor-pointer border-0 p-6 transition-all duration-300'
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className='p-0'>
                  <div className='mb-4 flex items-start justify-between'>
                    <div
                      className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className='h-6 w-6 text-white' />
                      <div
                        className={`absolute -inset-1 rounded-2xl bg-gradient-to-br ${stat.color} opacity-20 blur-lg transition-opacity group-hover:opacity-40`}
                      />
                    </div>
                    <div
                      className={`rounded-lg px-2 py-1 text-xs font-medium ${
                        stat.changeType === 'positive'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                      }`}
                    >
                      {stat.change}
                    </div>
                  </div>

                  <h3 className='text-muted-foreground mb-2 text-sm font-medium'>
                    {stat.title}
                  </h3>

                  <p className='text-foreground group-hover:text-gradient text-3xl font-black transition-all'>
                    {stat.value}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className='mb-12 grid gap-6 md:grid-cols-3'>
          {[
            {
              title: 'Quick Test',
              description: 'Run a performance test instantly',
              icon: Zap,
              color: 'from-yellow-400 to-orange-500',
              href: '/',
            },
            {
              title: 'View Analytics',
              description: 'Deep dive into performance metrics',
              icon: BarChart3,
              color: 'from-blue-400 to-cyan-500',
              href: '/analytics',
            },
            {
              title: 'Manage Tests',
              description: 'Organize and schedule tests',
              icon: Users,
              color: 'from-purple-400 to-pink-500',
              href: '/tests',
            },
          ].map((action, index) => {
            const Icon = action.icon;
            return (
              <Link key={index} href={action.href}>
                <Card
                  className='group glass-card elevation-1 hover:elevation-3 animate-fade-in-up h-full cursor-pointer border-0 p-6 transition-all duration-300'
                  style={{ animationDelay: `${index * 0.1 + 0.4}s` }}
                >
                  <CardContent className='flex h-full flex-col p-0'>
                    <div
                      className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${action.color} mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className='h-7 w-7 text-white' />
                    </div>

                    <h3 className='group-hover:text-gradient mb-2 text-xl font-bold transition-all'>
                      {action.title}
                    </h3>

                    <p className='text-muted-foreground flex-1 leading-relaxed'>
                      {action.description}
                    </p>

                    <div className='text-primary mt-4 flex items-center transition-colors group-hover:text-purple-500'>
                      <span className='font-medium'>Get started</span>
                      <Rocket className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Recent Tests */}
        <Card
          className='glass-card elevation-2 animate-fade-in-up border-0'
          style={{ animationDelay: '0.7s' }}
        >
          <CardHeader className='pb-6'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-4'>
                <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500'>
                  <Activity className='h-6 w-6 text-white' />
                </div>
                <div>
                  <CardTitle className='text-gradient text-2xl font-bold'>
                    Recent Tests
                  </CardTitle>
                  <p className='text-muted-foreground'>
                    Monitor your latest performance tests
                  </p>
                </div>
              </div>

              <Button
                asChild
                variant='ghost'
                className='glass-card hover:elevation-2 rounded-xl border-0 transition-all'
              >
                <Link href='/tests'>View All</Link>
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {userTests.length === 0 ? (
              <div className='py-16 text-center'>
                <div className='mb-8 flex justify-center'>
                  <div className='animate-float-slow relative'>
                    <div className='from-primary/20 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br to-purple-500/20'>
                      <Globe className='text-primary h-10 w-10' />
                    </div>
                    <div className='from-primary/10 animate-pulse-soft absolute -inset-2 rounded-3xl bg-gradient-to-r via-purple-500/10 to-pink-500/10 blur-xl' />
                  </div>
                </div>

                <h3 className='text-gradient mb-4 text-2xl font-bold'>
                  No tests yet
                </h3>
                <p className='text-muted-foreground mx-auto mb-8 max-w-md text-lg opacity-90'>
                  Start your performance testing journey by running your first
                  test.
                </p>

                <Button
                  asChild
                  size='lg'
                  className='group from-primary elevation-2 hover:elevation-3 rounded-2xl bg-gradient-to-r via-purple-500 to-pink-500 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105'
                >
                  <Link href='/' className='flex items-center gap-3'>
                    <Rocket className='h-5 w-5 transition-transform group-hover:rotate-12' />
                    Run Your First Test
                    <Sparkles className='h-5 w-5 transition-transform group-hover:scale-110' />
                  </Link>
                </Button>
              </div>
            ) : (
              <div className='space-y-4'>
                {userTests.slice(0, 5).map((test, index) => (
                  <div
                    key={test.id}
                    className='glass-card group hover:elevation-2 animate-fade-in-up rounded-2xl p-4 transition-all duration-300'
                    style={{ animationDelay: `${index * 0.1 + 0.8}s` }}
                  >
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-4'>
                        <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400/20 to-purple-500/20'>
                          <Globe className='text-primary h-5 w-5' />
                        </div>

                        <div className='flex-1'>
                          <div className='mb-1 flex items-center gap-2'>
                            <span className='text-foreground group-hover:text-gradient font-semibold transition-all'>
                              {test.url}
                            </span>
                            <a
                              href={test.url}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='text-muted-foreground hover:text-primary transition-colors'
                            >
                              <ExternalLink className='h-4 w-4' />
                            </a>
                          </div>

                          <div className='text-muted-foreground flex items-center gap-4 text-sm'>
                            <div className='flex items-center gap-1'>
                              {getStatusIcon(test.status)}
                              <span className='font-medium'>{test.status}</span>
                            </div>

                            <span>
                              {new Date(test.createdAt).toLocaleDateString(
                                'en-US',
                                {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                }
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Button
                        asChild
                        variant='ghost'
                        size='sm'
                        className='glass-card hover:elevation-2 rounded-xl border-0 transition-all group-hover:scale-105'
                      >
                        <Link
                          href={`/results/${test.id}`}
                          className='flex items-center gap-2'
                        >
                          <BarChart3 className='h-4 w-4' />
                          View
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}

                {userTests.length > 5 && (
                  <div className='pt-4 text-center'>
                    <Button
                      asChild
                      variant='ghost'
                      className='glass-card hover:elevation-2 rounded-xl border-0 transition-all'
                    >
                      <Link href='/tests'>
                        View All {userTests.length} Tests
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
