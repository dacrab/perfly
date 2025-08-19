import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw } from 'lucide-react';

export default function Loading() {
  return (
    <div className='container py-16'>
      <div className='mx-auto max-w-2xl space-y-8'>
        {/* Header skeleton */}
        <div className='flex items-center space-x-4'>
          <Skeleton className='h-10 w-10' />
          <Skeleton className='h-8 w-64' />
        </div>

        {/* Loading card */}
        <Card>
          <CardContent className='p-8'>
            <div className='flex flex-col items-center justify-center space-y-4'>
              <RefreshCw className='text-muted-foreground h-8 w-8 animate-spin' />
              <div className='text-center'>
                <p className='font-medium'>Loading test results</p>
                <p className='text-muted-foreground text-sm'>
                  This may take a few moments...
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
