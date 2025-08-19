import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className='relative flex min-h-[calc(100vh-4rem)] items-center justify-center'>
      {/* Gradient background */}
      <div className='absolute inset-0 -z-10 overflow-hidden'>
        <div className='from-muted/30 via-muted/5 to-background absolute top-0 left-1/2 h-[30rem] w-[80%] -translate-x-1/2 rounded-full bg-gradient-to-br opacity-20 blur-3xl' />
      </div>

      <div className='space-y-8 px-4 text-center'>
        <div className='relative mx-auto mb-6 h-24 w-24'>
          <div className='bg-muted/20 animation-delay-200 absolute inset-0 animate-ping rounded-full' />
          <div className='bg-muted/40 animation-delay-500 absolute inset-2 animate-ping rounded-full' />
          <div className='bg-background border-muted absolute inset-0 flex items-center justify-center rounded-full border-2'>
            <Search className='text-muted-foreground h-10 w-10' />
          </div>
        </div>

        <div className='space-y-2'>
          <h1 className='text-foreground text-6xl font-bold'>404</h1>
          <h2 className='text-foreground text-2xl font-medium'>
            Page Not Found
          </h2>
          <p className='text-muted-foreground mx-auto mt-4 max-w-md'>
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
        </div>

        <div>
          <Link href='/'>
            <Button className='group relative h-auto overflow-hidden rounded-full px-6 py-2 font-medium transition-all hover:-translate-y-0.5 hover:shadow-md'>
              <span className='relative z-10 flex items-center gap-2'>
                <ArrowLeft className='mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1' />
                Back to Home
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
