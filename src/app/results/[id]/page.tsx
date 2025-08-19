'use client';

import { AestheticShell } from '@/components/AestheticShell';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  Brain,
  ExternalLink,
  RefreshCw,
  Target,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type TestStatus = 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';

type TestData = {
  id: string;
  url: string;
  status: TestStatus;
  results: unknown;
  createdAt: string;
};

type Props = {
  params: Promise<{ id: string }>;
};

export default function ResultsPage({ params }: Props) {
  const [testData, setTestData] = useState<TestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [testId, setTestId] = useState<string | null>(null);

  // Extract ID from params
  useEffect(() => {
    params.then(({ id }) => setTestId(id));
  }, [params]);

  const fetchTestData = async () => {
    if (!testId) return;

    try {
      const response = await fetch(`/api/tests/${testId}`);

      if (!response.ok) {
        if (response.status === 404) {
          setError('Test not found');
        } else {
          setError('Failed to load test data');
        }
        return;
      }

      const data = await response.json();
      setTestData(data);
      setError(null);
    } catch {
      setError('Failed to load test data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestData();

    // Poll for updates if test is still running
    const interval = setInterval(() => {
      if (testData?.status === 'PENDING' || testData?.status === 'RUNNING') {
        fetchTestData();
      }
    }, 5000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testId, testData?.status]);

  if (loading) {
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
            <Brain className='text-primary h-7 w-7' />
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
        <div
          className='animate-float-slow absolute top-1/2 right-1/4 opacity-25'
          style={{ animationDelay: '1.5s' }}
        >
          <div className='glass-card flex h-14 w-14 items-center justify-center rounded-xl'>
            <BarChart3 className='h-6 w-6 text-cyan-500' />
          </div>
        </div>

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

        <div className='relative z-10 container mx-auto max-w-7xl'>
          <div className='flex min-h-[80vh] items-center justify-center'>
            <div className='glass-card elevation-4 animate-fade-in-up max-w-2xl rounded-3xl border-0 p-12 text-center'>
              <div className='mb-8 flex justify-center'>
                <div className='animate-float-slow relative'>
                  <div className='from-primary elevation-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br via-purple-500 to-pink-500'>
                    <RefreshCw className='h-10 w-10 animate-spin text-white' />
                  </div>
                  <div className='from-primary animate-pulse-soft absolute -inset-3 rounded-3xl bg-gradient-to-r via-purple-500 to-pink-500 opacity-20 blur-2xl' />
                </div>
              </div>

              <h2 className='text-gradient mb-6 text-4xl font-black'>
                Loading Test Results
              </h2>

              <p className='text-muted-foreground mx-auto mb-8 max-w-md text-xl leading-relaxed opacity-90'>
                Please wait while we fetch your performance data and prepare
                your AI-powered insights...
              </p>

              <div className='flex items-center justify-center gap-2'>
                <div className='h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-blue-400 to-cyan-500' />
                <div
                  className='h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-purple-400 to-pink-500'
                  style={{ animationDelay: '0.2s' }}
                />
                <div
                  className='h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-green-400 to-emerald-500'
                  style={{ animationDelay: '0.4s' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !testData) {
    return (
      <div className='container py-16'>
        <div className='mx-auto max-w-2xl space-y-8'>
          <div className='flex items-center space-x-4'>
            <Link href='/'>
              <Button variant='ghost' size='icon'>
                <ArrowLeft className='h-4 w-4' />
              </Button>
            </Link>
            <h1 className='text-2xl font-semibold'>Test Results</h1>
          </div>
          <Alert variant='destructive'>
            <AlertTriangle className='h-4 w-4' />
            <AlertDescription>{error || 'Test not found'}</AlertDescription>
          </Alert>
          <div className='text-center'>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AestheticShell>
      <div className='container mx-auto max-w-5xl py-16'>
        <div className='mx-auto max-w-4xl space-y-8'>
          {/* Header */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <Link href='/'>
                <Button variant='ghost' size='icon'>
                  <ArrowLeft className='h-4 w-4' />
                </Button>
              </Link>
              <div>
                <div className='flex items-center space-x-2'>
                  <h1 className='text-2xl font-semibold'>{testData.url}</h1>
                  <a
                    href={testData.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-muted-foreground hover:text-foreground'
                  >
                    <ExternalLink className='h-4 w-4' />
                  </a>
                </div>
                <p className='text-muted-foreground text-sm'>
                  {new Date(testData.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Test Status */}
          <TestStatusCard status={testData.status} />

          {/* Results */}
          {testData.status === 'COMPLETED' && testData.results ? (
            <ResultsDisplay results={testData.results} />
          ) : testData.status === 'FAILED' ? (
            <Alert variant='destructive'>
              <AlertTriangle className='h-4 w-4' />
              <AlertDescription>
                The performance test failed. Please try running the test again.
              </AlertDescription>
            </Alert>
          ) : null}
        </div>
      </div>
    </AestheticShell>
  );
}

function TestStatusCard({ status }: { status: TestStatus }) {
  const statusConfig = {
    PENDING: {
      label: 'Test Queued',
      description: 'Your test is waiting to be processed',
      icon: <RefreshCw className='h-4 w-4 animate-spin' />,
      variant: 'default' as const,
    },
    RUNNING: {
      label: 'Test Running',
      description: 'Analyzing your website performance',
      icon: <RefreshCw className='h-4 w-4 animate-spin' />,
      variant: 'default' as const,
    },
    COMPLETED: {
      label: 'Test Completed',
      description: 'Your performance analysis is ready',
      icon: null,
      variant: 'default' as const,
    },
    FAILED: {
      label: 'Test Failed',
      description: 'Something went wrong during the test',
      icon: <AlertTriangle className='h-4 w-4' />,
      variant: 'destructive' as const,
    },
  };

  const config = statusConfig[status];

  return (
    <Alert variant={config.variant}>
      {config.icon}
      <div>
        <div className='font-medium'>{config.label}</div>
        <div className='text-sm'>{config.description}</div>
      </div>
    </Alert>
  );
}

function ResultsDisplay({ results }: { results: unknown }) {
  if (!results || typeof results !== 'object') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Performance Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='bg-muted rounded-lg p-4 text-center'>
            <p className='text-muted-foreground text-sm'>
              No performance data available.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { summary, webVitals, lighthouse } = results as {
    summary?: {
      score?: number;
      grade?: string;
      loadTime?: number;
      firstByteTime?: number;
      requests?: number;
      bytesIn?: number;
    };
    webVitals?: {
      LCP?: number;
      FID?: number;
      CLS?: number;
    };
    lighthouse?: {
      performance?: number;
      accessibility?: number;
      bestPractices?: number;
      seo?: number;
    };
  };

  return (
    <Tabs defaultValue='overview' className='space-y-6'>
      <TabsList className='grid w-full grid-cols-4'>
        <TabsTrigger value='overview'>Overview</TabsTrigger>
        <TabsTrigger value='vitals'>Core Web Vitals</TabsTrigger>
        <TabsTrigger value='lighthouse'>Lighthouse</TabsTrigger>
        <TabsTrigger value='details'>Details</TabsTrigger>
      </TabsList>

      <TabsContent value='overview' className='space-y-6'>
        {/* Performance Score */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center justify-between'>
              Performance Score
              <div className='flex items-center space-x-2'>
                <div
                  className={`text-2xl font-bold ${
                    (summary?.score ?? 0) >= 90
                      ? 'text-green-600'
                      : (summary?.score ?? 0) >= 70
                        ? 'text-yellow-600'
                        : 'text-red-600'
                  }`}
                >
                  {summary?.score || 0}
                </div>
                <div
                  className={`rounded px-2 py-1 text-lg font-semibold ${
                    summary?.grade === 'A'
                      ? 'bg-green-100 text-green-800'
                      : summary?.grade === 'B'
                        ? 'bg-blue-100 text-blue-800'
                        : summary?.grade === 'C'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                  }`}
                >
                  {summary?.grade || 'F'}
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
              <div className='text-center'>
                <div className='text-2xl font-semibold'>
                  {summary?.loadTime || 0}ms
                </div>
                <div className='text-muted-foreground text-sm'>Load Time</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-semibold'>
                  {summary?.firstByteTime || 0}ms
                </div>
                <div className='text-muted-foreground text-sm'>TTFB</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-semibold'>
                  {summary?.requests || 0}
                </div>
                <div className='text-muted-foreground text-sm'>Requests</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-semibold'>
                  {Math.round((summary?.bytesIn || 0) / 1024)}KB
                </div>
                <div className='text-muted-foreground text-sm'>Total Size</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value='vitals' className='space-y-6'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center justify-between'>
                LCP
                <div
                  className={`text-lg font-semibold ${
                    (webVitals?.LCP || 0) <= 2500
                      ? 'text-green-600'
                      : (webVitals?.LCP || 0) <= 4000
                        ? 'text-yellow-600'
                        : 'text-red-600'
                  }`}
                >
                  {((webVitals?.LCP || 0) / 1000).toFixed(1)}s
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground text-sm'>
                Largest Contentful Paint measures loading performance
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center justify-between'>
                FID
                <div
                  className={`text-lg font-semibold ${
                    (webVitals?.FID || 0) <= 100
                      ? 'text-green-600'
                      : (webVitals?.FID || 0) <= 300
                        ? 'text-yellow-600'
                        : 'text-red-600'
                  }`}
                >
                  {webVitals?.FID || 0}ms
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground text-sm'>
                First Input Delay measures interactivity
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center justify-between'>
                CLS
                <div
                  className={`text-lg font-semibold ${
                    (webVitals?.CLS || 0) <= 0.1
                      ? 'text-green-600'
                      : (webVitals?.CLS || 0) <= 0.25
                        ? 'text-yellow-600'
                        : 'text-red-600'
                  }`}
                >
                  {(webVitals?.CLS || 0).toFixed(3)}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground text-sm'>
                Cumulative Layout Shift measures visual stability
              </p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value='lighthouse' className='space-y-6'>
        {lighthouse ? (
          <div className='grid grid-cols-2 gap-6 md:grid-cols-4'>
            <Card>
              <CardHeader>
                <CardTitle className='text-center'>
                  <div
                    className={`text-3xl font-bold ${
                      (lighthouse.performance ?? 0) >= 90
                        ? 'text-green-600'
                        : (lighthouse.performance ?? 0) >= 70
                          ? 'text-yellow-600'
                          : 'text-red-600'
                    }`}
                  >
                    {lighthouse.performance}
                  </div>
                  <div className='text-sm font-normal'>Performance</div>
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className='text-center'>
                  <div
                    className={`text-3xl font-bold ${
                      (lighthouse.accessibility ?? 0) >= 90
                        ? 'text-green-600'
                        : (lighthouse.accessibility ?? 0) >= 70
                          ? 'text-yellow-600'
                          : 'text-red-600'
                    }`}
                  >
                    {lighthouse.accessibility}
                  </div>
                  <div className='text-sm font-normal'>Accessibility</div>
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className='text-center'>
                  <div
                    className={`text-3xl font-bold ${
                      (lighthouse.bestPractices ?? 0) >= 90
                        ? 'text-green-600'
                        : (lighthouse.bestPractices ?? 0) >= 70
                          ? 'text-yellow-600'
                          : 'text-red-600'
                    }`}
                  >
                    {lighthouse.bestPractices}
                  </div>
                  <div className='text-sm font-normal'>Best Practices</div>
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className='text-center'>
                  <div
                    className={`text-3xl font-bold ${
                      (lighthouse.seo ?? 0) >= 90
                        ? 'text-green-600'
                        : (lighthouse.seo ?? 0) >= 70
                          ? 'text-yellow-600'
                          : 'text-red-600'
                    }`}
                  >
                    {lighthouse.seo}
                  </div>
                  <div className='text-sm font-normal'>SEO</div>
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        ) : (
          <Card>
            <CardContent className='py-8 text-center'>
              <p className='text-muted-foreground'>
                Lighthouse data not available for this test
              </p>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value='details' className='space-y-6'>
        <Card>
          <CardHeader>
            <CardTitle>Raw Test Data</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className='bg-muted max-h-96 overflow-auto rounded-lg p-4 text-xs'>
              {JSON.stringify(results, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
