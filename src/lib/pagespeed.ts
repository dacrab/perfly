interface PageSpeedConfig {
  apiKey: string;
  apiBaseUrl?: string;
}

export type PageSpeedStrategy = 'mobile' | 'desktop';

interface LighthouseCategoryScores {
  performance: number | null;
  accessibility: number | null;
  bestPractices: number | null;
  seo: number | null;
}

interface WebVitalsData {
  LCP: number;
  FID: number;
  CLS: number;
  TTFB: number;
  FCP: number;
  SI: number;
}

export interface PageSpeedResults {
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
  lighthouse?: LighthouseCategoryScores;
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

export class PageSpeedClient {
  private readonly config: PageSpeedConfig;
  private readonly apiBaseUrl: string;

  constructor(config: PageSpeedConfig) {
    this.config = config;
    this.apiBaseUrl =
      config.apiBaseUrl || 'https://www.googleapis.com/pagespeedonline/v5';
  }

  async analyze(
    url: string,
    strategy: PageSpeedStrategy = 'mobile'
  ): Promise<PageSpeedResults> {
    const params = new URLSearchParams({
      url,
      strategy,
      key: this.config.apiKey,
    });
    // Append multiple categories
    ['performance', 'accessibility', 'best-practices', 'seo'].forEach(cat => {
      params.append('category', cat);
    });

    const response = await fetch(
      `${this.apiBaseUrl}/runPagespeed?${params.toString()}`
    );
    if (!response.ok) {
      throw new Error(`PageSpeed Insights API error: ${response.statusText}`);
    }

    const data = await response.json();

    const lighthouseResult = data.lighthouseResult;
    const audits = lighthouseResult?.audits || {};
    const categories = lighthouseResult?.categories || {};
    const loadingExperience = data.loadingExperience || {};

    const networkRequests: Array<{ transferSize?: number } | unknown> =
      audits['network-requests']?.details?.items || [];

    const requests = Array.isArray(networkRequests)
      ? networkRequests.length
      : 0;
    const bytesIn = Array.isArray(networkRequests)
      ? (networkRequests as Array<{ transferSize?: number }>).reduce(
        (sum, item) => sum + (item.transferSize || 0),
        0
      )
      : 0;

    const performanceScore =
      categories.performance?.score != null
        ? Math.round((categories.performance.score as number) * 100)
        : 0;

    const lcp = audits['largest-contentful-paint']?.numericValue ?? 0;
    const fcp = audits['first-contentful-paint']?.numericValue ?? 0;
    const si = audits['speed-index']?.numericValue ?? 0;
    const tbt = audits['total-blocking-time']?.numericValue ?? 0;
    const cls = audits['cumulative-layout-shift']?.numericValue ?? 0;
    const ttfb = audits['server-response-time']?.numericValue ?? 0;
    const interactive = audits['interactive']?.numericValue ?? 0;

    // Field data for FID when available
    const fieldFID =
      loadingExperience?.metrics?.FIRST_INPUT_DELAY_MS?.percentile;
    const fid = typeof fieldFID === 'number' ? fieldFID : tbt;

    const webVitals: WebVitalsData = {
      LCP: lcp,
      FID: fid,
      CLS: cls,
      TTFB: ttfb,
      FCP: fcp,
      SI: si,
    };

    return {
      testId: lighthouseResult?.fetchTime || `${Date.now()}`,
      url: data.id || url,
      summary: {
        score: performanceScore,
        grade: this.getGrade(performanceScore),
        loadTime: interactive,
        firstByteTime: ttfb,
        startRender: fcp,
        visualComplete: si,
        speedIndex: si,
        requestsDoc: requests,
        bytesInDoc: bytesIn,
        requests,
        bytesIn,
      },
      webVitals,
      lighthouse: {
        performance:
          categories.performance?.score != null
            ? Math.round(categories.performance.score * 100)
            : null,
        accessibility:
          categories.accessibility?.score != null
            ? Math.round(categories.accessibility.score * 100)
            : null,
        bestPractices:
          categories['best-practices']?.score != null
            ? Math.round(categories['best-practices'].score * 100)
            : null,
        seo:
          categories.seo?.score != null
            ? Math.round(categories.seo.score * 100)
            : null,
      },
      runs: [
        {
          firstView: {
            loadTime: interactive,
            TTFB: ttfb,
            render: fcp,
            visualComplete: si,
            speedIndex: si,
            bytesIn,
            requests,
          },
        },
      ],
    };
  }

  private getGrade(score: number): string {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  }
}

let singleton: PageSpeedClient | null = null;

export function getPageSpeedClient(): PageSpeedClient {
  if (!singleton) {
    const apiKey =
      process.env["PAGESPEED_API_KEY"] || process.env["GOOGLE_PAGESPEED_API_KEY"];
    if (!apiKey) {
      throw new Error('PAGESPEED_API_KEY environment variable is required');
    }
    singleton = new PageSpeedClient({ apiKey });
  }
  return singleton;
}
