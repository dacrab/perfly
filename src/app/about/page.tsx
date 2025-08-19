import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowLeft,
  Brain,
  Code,
  GitBranch,
  Globe,
  Heart,
  Rocket,
  Shield,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
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
        {/* Header */}
        <div className='mb-16 text-center'>
          <div className='mb-8 flex justify-center'>
            <div className='animate-float-slow relative'>
              <div className='from-primary elevation-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br via-purple-500 to-pink-500'>
                <Heart className='animate-pulse-soft h-10 w-10 text-white' />
              </div>
              <div className='from-primary animate-pulse-soft absolute -inset-3 rounded-3xl bg-gradient-to-r via-purple-500 to-pink-500 opacity-20 blur-2xl' />
            </div>
          </div>

          <Badge className='glass-card animate-pulse-soft mb-6 border-0 px-6 py-3 text-lg font-medium'>
            <Sparkles className='animate-spin-slow mr-2 h-4 w-4' />
            Open Source & Beautiful
          </Badge>

          <h1 className='text-gradient mb-8 text-6xl leading-none font-black tracking-tight md:text-7xl lg:text-8xl'>
            About Perfly
          </h1>

          <p className='text-muted-foreground mx-auto mb-12 max-w-4xl text-2xl leading-relaxed opacity-90'>
            We&apos;re building the future of web performance testing with
            <br className='hidden md:block' />
            AI-powered insights and beautiful user experiences.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className='mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {/* Mission Statement - Large Card */}
          <Card className='glass-card elevation-2 hover:elevation-4 animate-fade-in-up border-0 p-8 transition-all duration-300 lg:col-span-2 lg:row-span-2'>
            <CardContent className='flex h-full flex-col p-0'>
              <div className='mb-6'>
                <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-400 to-cyan-500'>
                  <Globe className='h-8 w-8 text-white' />
                </div>
                <h2 className='text-gradient mb-4 text-3xl font-bold'>
                  Our Mission
                </h2>
              </div>

              <div className='flex-1 space-y-4'>
                <p className='text-muted-foreground text-lg leading-relaxed'>
                  To democratize web performance testing and make it accessible
                  to developers and teams worldwide through beautiful, intuitive
                  tools powered by cutting-edge AI.
                </p>

                <p className='text-muted-foreground leading-relaxed'>
                  We believe that every website deserves to be fast, and every
                  developer deserves tools that are both powerful and delightful
                  to use.
                </p>
              </div>

              <div className='mt-6 flex items-center gap-4'>
                <div className='flex items-center gap-2'>
                  <Star className='h-5 w-5 text-yellow-500' />
                  <span className='font-semibold'>Open Source</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Users className='h-5 w-5 text-green-500' />
                  <span className='font-semibold'>Community Driven</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics Cards */}
          <Card
            className='glass-card elevation-1 hover:elevation-3 animate-fade-in-up border-0 p-6 transition-all duration-300'
            style={{ animationDelay: '0.1s' }}
          >
            <CardContent className='p-0 text-center'>
              <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500'>
                <Trophy className='h-6 w-6 text-white' />
              </div>
              <h3 className='text-gradient mb-2 text-3xl font-black'>50K+</h3>
              <p className='text-muted-foreground font-medium'>
                Tests Completed
              </p>
            </CardContent>
          </Card>

          <Card
            className='glass-card elevation-1 hover:elevation-3 animate-fade-in-up border-0 p-6 transition-all duration-300'
            style={{ animationDelay: '0.2s' }}
          >
            <CardContent className='p-0 text-center'>
              <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500'>
                <Users className='h-6 w-6 text-white' />
              </div>
              <h3 className='text-gradient mb-2 text-3xl font-black'>10K+</h3>
              <p className='text-muted-foreground font-medium'>Developers</p>
            </CardContent>
          </Card>

          {/* Technology Showcase */}
          <Card
            className='glass-card elevation-1 hover:elevation-3 animate-fade-in-up border-0 p-6 transition-all duration-300 lg:col-span-2'
            style={{ animationDelay: '0.3s' }}
          >
            <CardContent className='p-0'>
              <div className='mb-6 flex items-center gap-4'>
                <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500'>
                  <Code className='h-6 w-6 text-white' />
                </div>
                <h3 className='text-gradient text-2xl font-bold'>
                  Built with Modern Tech
                </h3>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                {[
                  { name: 'Next.js 15', desc: 'React Framework' },
                  { name: 'TypeScript', desc: 'Type Safety' },
                  { name: 'Tailwind CSS', desc: 'Styling' },
                  { name: 'shadcn/ui', desc: 'Components' },
                  { name: 'Gemini AI', desc: 'Smart Insights' },
                  { name: 'PostgreSQL', desc: 'Database' },
                ].map(tech => (
                  <div key={tech.name} className='glass-card rounded-xl p-3'>
                    <div className='text-sm font-semibold'>{tech.name}</div>
                    <div className='text-muted-foreground text-xs'>
                      {tech.desc}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Feature Highlights */}
          {[
            {
              icon: Brain,
              title: 'AI-Powered',
              description: 'Smart recommendations using Google Gemini',
              color: 'from-blue-400 to-cyan-500',
            },
            {
              icon: Zap,
              title: 'Lightning Fast',
              description: 'Instant performance analysis',
              color: 'from-yellow-400 to-orange-500',
            },
            {
              icon: Shield,
              title: 'Privacy First',
              description: 'Your data stays secure',
              color: 'from-green-400 to-emerald-500',
            },
            {
              icon: GitBranch,
              title: 'Open Source',
              description: 'MIT licensed, community driven',
              color: 'from-purple-400 to-pink-500',
            },
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className='glass-card elevation-1 hover:elevation-3 group animate-fade-in-up border-0 p-6 transition-all duration-300'
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <CardContent className='p-0'>
                  <div
                    className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${feature.color} mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className='h-6 w-6 text-white' />
                  </div>
                  <h3 className='group-hover:text-gradient mb-2 text-lg font-bold transition-all'>
                    {feature.title}
                  </h3>
                  <p className='text-muted-foreground text-sm leading-relaxed'>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}

          {/* Team Card */}
          <Card
            className='glass-card elevation-1 hover:elevation-3 animate-fade-in-up border-0 p-8 transition-all duration-300 lg:col-span-2'
            style={{ animationDelay: '0.8s' }}
          >
            <CardContent className='p-0'>
              <div className='mb-6 flex items-center gap-4'>
                <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500'>
                  <Heart className='h-6 w-6 text-white' />
                </div>
                <h3 className='text-gradient text-2xl font-bold'>
                  Built with Love
                </h3>
              </div>

              <p className='text-muted-foreground mb-6 leading-relaxed'>
                Perfly is crafted by a passionate team of developers who believe
                in the power of open source and beautiful user experiences.
                We&apos;re committed to making web performance testing
                accessible to everyone.
              </p>

              <div className='flex flex-wrap gap-3'>
                {[
                  'Performance',
                  'Design',
                  'Developer Experience',
                  'Open Source',
                ].map(tag => (
                  <Badge
                    key={tag}
                    className='glass-card border-0 px-3 py-1 text-sm font-medium'
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div
          className='animate-fade-in-up text-center'
          style={{ animationDelay: '1s' }}
        >
          <Card className='glass-card elevation-3 mx-auto max-w-2xl border-0 p-12'>
            <CardContent className='p-0'>
              <div className='mb-8 flex justify-center'>
                <div className='relative'>
                  <div className='from-primary elevation-2 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br via-purple-500 to-pink-500'>
                    <Rocket className='h-8 w-8 text-white' />
                  </div>
                  <div className='from-primary animate-pulse-soft absolute -inset-2 rounded-3xl bg-gradient-to-r via-purple-500 to-pink-500 opacity-20 blur-xl' />
                </div>
              </div>

              <h2 className='text-gradient mb-6 text-4xl font-black'>
                Ready to Experience Perfly?
              </h2>

              <p className='text-muted-foreground mb-8 text-xl leading-relaxed opacity-90'>
                Join thousands of developers who are already optimizing their
                websites with our beautiful, AI-powered performance testing
                platform.
              </p>

              <div className='flex flex-col justify-center gap-4 sm:flex-row'>
                <Button
                  asChild
                  size='lg'
                  className='group from-primary elevation-2 hover:elevation-3 rounded-2xl bg-gradient-to-r via-purple-500 to-pink-500 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105'
                >
                  <Link href='/' className='flex items-center gap-3'>
                    <Zap className='h-5 w-5 transition-transform group-hover:rotate-12' />
                    Start Testing Now
                    <Sparkles className='h-5 w-5 transition-transform group-hover:scale-110' />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant='ghost'
                  size='lg'
                  className='group glass-card hover:elevation-2 rounded-2xl border-0 px-8 py-4 text-lg font-medium transition-all'
                >
                  <Link
                    href='https://github.com/perfly'
                    className='flex items-center gap-3'
                  >
                    <GitBranch className='h-5 w-5 transition-transform group-hover:scale-110' />
                    View on GitHub
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
