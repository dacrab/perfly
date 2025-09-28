// Types and interfaces
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
  context?: LogContext | undefined;
  error?: {
    name: string;
    message: string;
    stack?: string | undefined;
  };
}

// Main Logger class
class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private isProduction = process.env.NODE_ENV === 'production';

  // Private utility methods
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

  // Core logging methods
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

  // Performance test logging methods
  testStarted(testId: string, url: string, userId?: string): void {
    const context: LogContext = { testId, url };
    if (userId !== undefined) context.userId = userId;
    this.info('Performance test started', context);
  }

  testCompleted(
    testId: string,
    url: string,
    duration: number,
    userId?: string
  ): void {
    const context: LogContext = { testId, url, duration } as LogContext;
    if (userId !== undefined) (context as any).userId = userId;
    this.info('Performance test completed', context);
  }

  testFailed(testId: string, url: string, error: Error, userId?: string): void {
    const context: LogContext = { testId, url };
    if (userId !== undefined) context.userId = userId;
    this.error('Performance test failed', context, error);
  }

  // API logging methods
  apiRequest(method: string, path: string, userId?: string, ip?: string): void {
    const context: LogContext = { method, path } as LogContext;
    if (userId !== undefined) (context as any).userId = userId;
    if (ip !== undefined) (context as any).ip = ip;
    this.info('API request', context);
  }

  apiError(
    method: string,
    path: string,
    error: Error,
    userId?: string,
    ip?: string
  ): void {
    const context: LogContext = { method, path } as LogContext;
    if (userId !== undefined) (context as any).userId = userId;
    if (ip !== undefined) (context as any).ip = ip;
    this.error('API error', context, error);
  }

  // User authentication logging methods
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

  // Better Auth logging methods
  betterAuthLogin(userId: string, provider?: string): void {
    const context: LogContext = { userId };
    if (provider !== undefined) (context as any).provider = provider;
    this.info('Better Auth login', context);
  }

  betterAuthError(stage: string, error: Error, userId?: string): void {
    const context: LogContext = { stage } as LogContext;
    if (userId !== undefined) (context as any).userId = userId;
    this.error('Better Auth error', context, error);
  }

  // PageSpeed Insights logging methods
  pageSpeedAPICall(endpoint: string, url?: string): void {
    const context: LogContext = { endpoint } as LogContext;
    if (url !== undefined) (context as any).url = url;
    this.debug('PageSpeed Insights API call', context);
  }

  pageSpeedAPIError(endpoint: string, error: Error, url?: string): void {
    const context: LogContext = { endpoint } as LogContext;
    if (url !== undefined) (context as any).url = url;
    this.error('PageSpeed Insights API error', context, error);
  }

  // AI analysis logging methods
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

// Utility functions
export function captureError(error: Error, context?: LogContext): void {
  logger.error('Unhandled error captured', context, error);

  // In production, you might want to send to error tracking service
  if (process.env.NODE_ENV === 'production') {
    // Example: Sentry.captureException(error, { extra: context });
  }
}

export function getRequestContext(request: Request): LogContext {
  const context: LogContext = {};
  const ua = request.headers.get('user-agent');
  if (ua !== null) context.userAgent = ua;
  const ip =
    request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip');
  if (ip !== null) context.ip = ip;
  return context;
}

// Singleton instances and exports
const logger = new Logger();
export const performanceMonitor = new PerformanceMonitor();

export default logger;
export { logger };
