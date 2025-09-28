import db from '@/db';
import { tests } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getPageSpeedClient } from './pagespeed';

interface TestJob {
  testId: string;
  url: string;
  options?: {
    location?: string;
    runs?: number;
    connectivity?: string;
    lighthouse?: boolean;
  };
}

class TestJobProcessor {
  private isProcessing = false;
  private readonly pollInterval = 10000; // 10 seconds
  private readonly maxRetries = 3;

  async start() {
    if (this.isProcessing) {
      console.log('Job processor already running');
      return;
    }

    this.isProcessing = true;
    console.log('Starting test job processor...');

    // Process pending tests immediately
    await this.processPendingTests();

    // Set up polling for new tests
    this.schedulePollForPendingTests();
  }

  stop() {
    this.isProcessing = false;
    console.log('Stopping test job processor...');
  }

  private schedulePollForPendingTests() {
    if (!this.isProcessing) return;

    setTimeout(async () => {
      try {
        await this.processPendingTests();
      } catch (error) {
        console.error('Error processing pending tests:', error);
      }
      this.schedulePollForPendingTests();
    }, this.pollInterval);
  }

  private async processPendingTests() {
    try {
      const pendingTests = await db
        .select()
        .from(tests)
        .where(eq(tests.status, 'PENDING'))
        .limit(5); // Process up to 5 tests at once

      for (const test of pendingTests) {
        this.processTest({
          testId: test.id,
          url: test.url,
        }).catch(error => {
          console.error(`Error processing test ${test.id}:`, error);
        });
      }
    } catch (error) {
      console.error('Error fetching pending tests:', error);
    }
  }

  private async processTest(job: TestJob) {
    const { testId, url, options: _options = {} } = job;

    try {
      console.log(`Starting test ${testId} for ${url}`);

      // Update status to RUNNING
      await db
        .update(tests)
        .set({
          status: 'RUNNING',
          updatedAt: new Date(),
        })
        .where(eq(tests.id, testId));

      const client = getPageSpeedClient();
      const results = await client.analyze(url, 'mobile');
      await this.saveTestResults(testId, results);
    } catch (error) {
      console.error(`Failed to start test ${testId}:`, error);
      await this.markTestAsFailed(testId, error);
    }
  }

  private async saveTestResults(testId: string, results: unknown) {
    try {
      await db
        .update(tests)
        .set({
          status: 'COMPLETED',
          results: JSON.stringify(results),
          completedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(tests.id, testId));

      console.log(`Test ${testId} completed successfully`);
    } catch (error) {
      console.error(`Failed to save results for test ${testId}:`, error);
      await this.markTestAsFailed(testId, error);
    }
  }

  private async markTestAsFailed(testId: string, error: unknown) {
    try {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';

      await db
        .update(tests)
        .set({
          status: 'FAILED',
          error: errorMessage,
          updatedAt: new Date(),
        })
        .where(eq(tests.id, testId));

      console.log(`Test ${testId} marked as failed: ${errorMessage}`);
    } catch (dbError) {
      console.error(`Failed to mark test ${testId} as failed:`, dbError);
    }
  }
}

// Singleton instance
let processor: TestJobProcessor | null = null;

export function getTestJobProcessor(): TestJobProcessor {
  if (!processor) {
    processor = new TestJobProcessor();
  }
  return processor;
}

// Auto-start processor in production
if (
  process.env.NODE_ENV === 'production' ||
  process.env['AUTO_START_PROCESSOR'] === 'true'
) {
  console.log('Auto-starting test job processor...');
  getTestJobProcessor().start().catch(console.error);
}

export type { TestJob };
