interface WebPageTestConfig {
  apiKey: string;
  baseUrl?: string;
}

interface TestOptions {
  url: string;
  location?: string;
  runs?: number;
  firstViewOnly?: boolean;
  connectivity?: string;
  video?: boolean;
  timeline?: boolean;
  lighthouse?: boolean;
}

interface WebPageTestResponse {
  statusCode: number;
  statusText: string;
  data?: {
    testId: string;
    jsonUrl: string;
    xmlUrl: string;
    userUrl: string;
    summaryCSV: string;
    detailCSV: string;
  };
}

interface TestStatus {
  statusCode: number;
  statusText: string;
  data?: {
    statusCode: number;
    statusText: string;
    testId: string;
    runs: number;
    fvonly: number;
    remote: boolean;
    testsExpected: number;
    location: string;
    startTime: string;
    elapsed: number;
    completeTime?: string;
    testUrl: string;
    jsonUrl: string;
    xmlUrl: string;
    userUrl: string;
    summaryCSV: string;
    detailCSV: string;
  };
}

interface WebVitalsData {
  LCP: number;
  FID: number;
  CLS: number;
  TTFB: number;
  FCP: number;
  SI: number;
}

interface TestResults {
  testId: string;
  url: string;
  summary: {
    score: number;
    grade: string;
    loadTime: number;
    firstByteTime: number;
    startRender: number;
    visualComplete: number;
    speedIndex: number;
    requestsDoc: number;
    bytesInDoc: number;
    requests: number;
    bytesIn: number;
  };
  webVitals: WebVitalsData;
  lighthouse?: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
  runs: Array<{
    firstView: {
      loadTime: number;
      TTFB: number;
      render: number;
      visualComplete: number;
      speedIndex: number;
      bytesIn: number;
      requests: number;
    };
  }>;
}

export class WebPageTestClient {
  private config: WebPageTestConfig;
  private baseUrl: string;

  constructor(config: WebPageTestConfig) {
    this.config = config;
    this.baseUrl = config.baseUrl || 'https://www.webpagetest.org';
  }

  async runTest(options: TestOptions): Promise<WebPageTestResponse> {
    const params = new URLSearchParams({
      k: this.config.apiKey,
      url: options.url,
      f: 'json',
      location: options.location || 'Dulles:Chrome',
      runs: (options.runs || 1).toString(),
      fvonly: options.firstViewOnly ? '1' : '0',
      connectivity: options.connectivity || 'Cable',
      video: options.video ? '1' : '0',
      timeline: options.timeline ? '1' : '0',
      lighthouse: options.lighthouse ? '1' : '0',
    });

    const response = await fetch(
      `${this.baseUrl}/runtest.php?${params.toString()}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`WebPageTest API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getTestStatus(testId: string): Promise<TestStatus> {
    const params = new URLSearchParams({
      k: this.config.apiKey,
      test: testId,
      f: 'json',
    });

    const response = await fetch(
      `${this.baseUrl}/testStatus.php?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(`WebPageTest API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getTestResults(testId: string): Promise<TestResults> {
    const params = new URLSearchParams({
      k: this.config.apiKey,
      test: testId,
      f: 'json',
    });

    const response = await fetch(
      `${this.baseUrl}/jsonResult.php?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(`WebPageTest API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.statusCode !== 200) {
      throw new Error(`Test not complete or failed: ${data.statusText}`);
    }

    // Transform the WebPageTest response to our format
    const result = data.data;
    const firstView = result.runs[1]?.firstView;

    if (!firstView) {
      throw new Error('No test data available');
    }

    // Calculate Web Vitals from available metrics
    const webVitals: WebVitalsData = {
      LCP: firstView.chromeUserTiming?.LargestContentfulPaint || 0,
      FID: firstView.chromeUserTiming?.FirstInputDelay || 0,
      CLS: firstView.chromeUserTiming?.CumulativeLayoutShift || 0,
      TTFB: firstView.TTFB || 0,
      FCP: firstView.firstContentfulPaint || 0,
      SI: firstView.SpeedIndex || 0,
    };

    // Calculate overall score (similar to PageSpeed Insights)
    const score = this.calculatePerformanceScore(webVitals, firstView);

    return {
      testId,
      url: result.url,
      summary: {
        score,
        grade: this.getGrade(score),
        loadTime: firstView.loadTime,
        firstByteTime: firstView.TTFB,
        startRender: firstView.render,
        visualComplete: firstView.visualComplete,
        speedIndex: firstView.SpeedIndex,
        requestsDoc: firstView.requestsDoc,
        bytesInDoc: firstView.bytesInDoc,
        requests: firstView.requests,
        bytesIn: firstView.bytesIn,
      },
      webVitals,
      lighthouse: result.lighthouse
        ? {
            performance: result.lighthouse.Performance,
            accessibility: result.lighthouse.Accessibility,
            bestPractices: result.lighthouse['Best Practices'],
            seo: result.lighthouse.SEO,
          }
        : undefined,
      runs: Object.values(result.runs).map((run: unknown) => {
        const runData = run as {
          firstView: {
            loadTime: number;
            TTFB: number;
            render: number;
            visualComplete: number;
            SpeedIndex: number;
            bytesIn: number;
            requests: number;
          };
        };
        return {
          firstView: {
            loadTime: runData.firstView.loadTime,
            TTFB: runData.firstView.TTFB,
            render: runData.firstView.render,
            visualComplete: runData.firstView.visualComplete,
            speedIndex: runData.firstView.SpeedIndex,
            bytesIn: runData.firstView.bytesIn,
            requests: runData.firstView.requests,
          },
        };
      }),
    };
  }

  private calculatePerformanceScore(
    webVitals: WebVitalsData,
    _metrics: unknown
  ): number {
    // Simplified scoring algorithm based on Core Web Vitals
    let score = 100;

    // LCP scoring (target: < 2.5s)
    if (webVitals.LCP > 4000) score -= 25;
    else if (webVitals.LCP > 2500) score -= 10;

    // FID scoring (target: < 100ms)
    if (webVitals.FID > 300) score -= 20;
    else if (webVitals.FID > 100) score -= 8;

    // CLS scoring (target: < 0.1)
    if (webVitals.CLS > 0.25) score -= 20;
    else if (webVitals.CLS > 0.1) score -= 8;

    // Speed Index scoring (target: < 3.4s)
    if (webVitals.SI > 5800) score -= 15;
    else if (webVitals.SI > 3400) score -= 6;

    // TTFB scoring (target: < 800ms)
    if (webVitals.TTFB > 1800) score -= 10;
    else if (webVitals.TTFB > 800) score -= 4;

    // FCP scoring (target: < 1.8s)
    if (webVitals.FCP > 3000) score -= 10;
    else if (webVitals.FCP > 1800) score -= 4;

    return Math.max(0, Math.round(score));
  }

  private getGrade(score: number): string {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  }
}

// Singleton instance
let client: WebPageTestClient | null = null;

export function getWebPageTestClient(): WebPageTestClient {
  if (!client) {
    const apiKey = process.env.WEBPAGETEST_API_KEY;
    if (!apiKey) {
      throw new Error('WEBPAGETEST_API_KEY environment variable is required');
    }
    client = new WebPageTestClient({ apiKey });
  }
  return client;
}
