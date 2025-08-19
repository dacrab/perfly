interface LogContext {
  userId?: string;
  testId?: string;
  url?: string;
  userAgent?: string;
  ip?: string;
  [key: string]: unknown;
}

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: LogContext;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private isProduction = process.env.NODE_ENV === 'production';

  private formatTimestamp(): string {
    return new Date().toISOString();
  }

  private createLogEntry(
    level: LogLevel,
    message: string,
    context?: LogContext,
    error?: Error
  ): LogEntry {
    const entry: LogEntry = {
      timestamp: this.formatTimestamp(),
      level,
      message,
    };

    if (context) {
      entry.context = context;
    }

    if (error) {
      entry.error = {
        name: error.name,
        message: error.message,
        stack: this.isDevelopment ? error.stack : undefined,
      };
    }

    return entry;
  }

  private writeLog(entry: LogEntry): void {
    if (this.isDevelopment) {
      // In development, use console with colors
      const color = {
        debug: '\x1b[36m', // cyan
        info: '\x1b[32m', // green
        warn: '\x1b[33m', // yellow
        error: '\x1b[31m', // red
      }[entry.level];

      const reset = '\x1b[0m';
      console.log(
        `${color}[${entry.level.toUpperCase()}] ${entry.timestamp}${reset} ${entry.message}`,
        entry.context ? entry.context : '',
        entry.error ? entry.error : ''
      );
    } else {
      // In production, use structured JSON logging
      console.log(JSON.stringify(entry));
    }

    // In production, you might want to send logs to an external service
    if (this.isProduction) {
      this.sendToExternalLogger(entry).catch(error => {
        console.error('Failed to send log to external service:', error);
      });
    }
  }

  private async sendToExternalLogger(_entry: LogEntry): Promise<void> {
    // Implement external logging service integration here
    // Examples: Datadog, New Relic, Sentry, LogRocket, etc.
    // Example for a hypothetical logging service:
    /*
    try {
      await fetch(process.env.LOG_ENDPOINT!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.LOG_API_KEY}`,
        },
        body: JSON.stringify(entry),
      });
    } catch (error) {
      // Don't throw here to avoid infinite loops
    }
    */
  }

  debug(message: string, context?: LogContext): void {
    this.writeLog(this.createLogEntry('debug', message, context));
  }

  info(message: string, context?: LogContext): void {
    this.writeLog(this.createLogEntry('info', message, context));
  }

  warn(message: string, context?: LogContext, error?: Error): void {
    this.writeLog(this.createLogEntry('warn', message, context, error));
  }

  error(message: string, context?: LogContext, error?: Error): void {
    this.writeLog(this.createLogEntry('error', message, context, error));
  }

  // Specific domain methods
  testStarted(testId: string, url: string, userId?: string): void {
    this.info('Performance test started', {
      testId,
      url,
      userId,
    });
  }

  testCompleted(
    testId: string,
    url: string,
    duration: number,
    userId?: string
  ): void {
    this.info('Performance test completed', {
      testId,
      url,
      userId,
      duration,
    });
  }

  testFailed(testId: string, url: string, error: Error, userId?: string): void {
    this.error(
      'Performance test failed',
      {
        testId,
        url,
        userId,
      },
      error
    );
  }

  apiRequest(method: string, path: string, userId?: string, ip?: string): void {
    this.info('API request', {
      method,
      path,
      userId,
      ip,
    });
  }

  apiError(
    method: string,
    path: string,
    error: Error,
    userId?: string,
    ip?: string
  ): void {
    this.error(
      'API error',
      {
        method,
        path,
        userId,
        ip,
      },
      error
    );
  }

  userAuthenticated(userId: string, method: string): void {
    this.info('User authenticated', {
      userId,
      authMethod: method,
    });
  }

  userRegistered(userId: string, email: string): void {
    this.info('User registered', {
      userId,
      email,
    });
  }

  webPageTestAPICall(endpoint: string, testId?: string): void {
    this.debug('WebPageTest API call', {
      endpoint,
      testId,
    });
  }

  webPageTestAPIError(endpoint: string, error: Error, testId?: string): void {
    this.error(
      'WebPageTest API error',
      {
        endpoint,
        testId,
      },
      error
    );
  }

  aiAnalysisStarted(testId: string): void {
    this.info('AI analysis started', {
      testId,
    });
  }

  aiAnalysisCompleted(testId: string, tokensUsed?: number): void {
    this.info('AI analysis completed', {
      testId,
      tokensUsed,
    });
  }

  aiAnalysisError(testId: string, error: Error): void {
    this.error(
      'AI analysis failed',
      {
        testId,
      },
      error
    );
  }
}

// Create singleton instance
const logger = new Logger();

export default logger;

// Performance monitoring utilities
export class PerformanceMonitor {
  private startTimes = new Map<string, number>();

  start(operationId: string): void {
    this.startTimes.set(operationId, Date.now());
  }

  end(operationId: string, context?: LogContext): number {
    const startTime = this.startTimes.get(operationId);
    if (!startTime) {
      logger.warn(
        `Performance monitoring: No start time found for operation ${operationId}`
      );
      return 0;
    }

    const duration = Date.now() - startTime;
    this.startTimes.delete(operationId);

    logger.info(`Operation completed: ${operationId}`, {
      ...context,
      duration,
      operationId,
    });

    return duration;
  }

  measure<T>(
    operationId: string,
    operation: () => Promise<T>,
    context?: LogContext
  ): Promise<T> {
    return new Promise(async (resolve, reject) => {
      this.start(operationId);

      try {
        const result = await operation();
        this.end(operationId, context);
        resolve(result);
      } catch (error) {
        this.end(operationId, context);
        logger.error(
          `Operation failed: ${operationId}`,
          context,
          error as Error
        );
        reject(error);
      }
    });
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Error tracking utilities
export function captureError(error: Error, context?: LogContext): void {
  logger.error('Unhandled error captured', context, error);

  // In production, you might want to send to error tracking service
  if (process.env.NODE_ENV === 'production') {
    // Example: Sentry.captureException(error, { extra: context });
  }
}

// Request context utilities
export function getRequestContext(request: Request): LogContext {
  return {
    userAgent: request.headers.get('user-agent') || undefined,
    ip:
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      undefined,
  };
}

export { logger };
