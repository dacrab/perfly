import { NextResponse } from 'next/server';
import { tests } from '@/db/schema';
import db from '@/db';
import { nanoid } from 'nanoid';
import { auth } from '@/lib/auth';
import { getTestJobProcessor } from '@/lib/queue';
import logger, { getRequestContext, performanceMonitor } from '@/lib/logger';

export async function POST(request: Request) {
  const requestContext = getRequestContext(request);

  return performanceMonitor.measure(
    'test-creation',
    async () => {
      try {
        logger.apiRequest(
          'POST',
          '/api/tests/run',
          undefined,
          requestContext.ip
        );

        const { url } = await request.json();

        if (!url) {
          logger.warn('Test creation failed: URL is required', requestContext);
          return NextResponse.json(
            { message: 'URL is required' },
            { status: 400 }
          );
        }

        // Validate URL format
        let normalizedUrl: string;
        try {
          const urlObj = new URL(
            url.startsWith('http') ? url : `https://${url}`
          );
          normalizedUrl = urlObj.toString();
        } catch {
          logger.warn('Test creation failed: Invalid URL format', {
            ...requestContext,
            url,
          });
          return NextResponse.json(
            { message: 'Invalid URL format' },
            { status: 400 }
          );
        }

        // Get user session (optional for anonymous tests)
        const session = await auth.api.getSession({ headers: request.headers });
        const userId = session?.user?.id || null;

        // Generate a unique test ID
        const testId = nanoid();

        logger.info('Creating new performance test', {
          ...requestContext,
          testId,
          url: normalizedUrl,
          userId: userId || undefined,
          isAuthenticated: !!userId,
        });

        // Create a new test in the database
        await db.insert(tests).values({
          id: testId,
          userId,
          url: normalizedUrl,
          status: 'PENDING',
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        logger.testStarted(testId, normalizedUrl, userId || undefined);

        // Start the background job processor if not already running
        try {
          const processor = getTestJobProcessor();
          await processor.start();
          logger.debug('Background job processor started', { testId });
        } catch (processorError) {
          logger.warn(
            'Failed to start job processor',
            { testId },
            processorError as Error
          );
          // Continue anyway - the test will be picked up by the next processor cycle
        }

        logger.info('Test successfully queued', {
          ...requestContext,
          testId,
          url: normalizedUrl,
          userId: userId || undefined,
        });

        return NextResponse.json({
          testId,
          message: 'Test queued successfully',
          estimatedTime: '2-5 minutes',
        });
      } catch (error) {
        logger.apiError(
          'POST',
          '/api/tests/run',
          error as Error,
          undefined,
          requestContext.ip
        );
        return NextResponse.json(
          {
            message: 'Failed to start test',
            error:
              process.env.NODE_ENV === 'development'
                ? (error as Error).message
                : undefined,
          },
          { status: 500 }
        );
      }
    },
    requestContext
  );
}
