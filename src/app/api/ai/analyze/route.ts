import { NextResponse } from 'next/server';
import { model } from '@/ai';

interface PerformanceIssue {
  metric: string;
  current: number;
  target: number;
  severity: 'high' | 'medium' | 'low';
  description: string;
}

interface Recommendation {
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  expectedImpact: string;
  implementation: string;
  metrics: string[];
}

interface AIAnalysis {
  score: number;
  grade: string;
  summary: string;
  issues: PerformanceIssue[];
  recommendations: Recommendation[];
  keyInsights: string[];
}

export async function POST(request: Request) {
  try {
    const { testResults } = await request.json();

    if (!testResults) {
      return NextResponse.json(
        { message: 'Test results are required' },
        { status: 400 }
      );
    }

    // Create a comprehensive prompt for analysis
    const prompt = `
You are a web performance expert. Analyze the following performance test results and provide detailed optimization recommendations.

Test Results:
${JSON.stringify(testResults, null, 2)}

Provide your analysis in the following JSON format (respond with valid JSON only, no markdown):

{
  "score": number (0-100),
  "grade": "A" | "B" | "C" | "D" | "F",
  "summary": "Brief overall performance summary",
  "issues": [
    {
      "metric": "Metric name (e.g., LCP, FID, CLS)",
      "current": number,
      "target": number,
      "severity": "high" | "medium" | "low",
      "description": "What this issue means"
    }
  ],
  "recommendations": [
    {
      "title": "Recommendation title",
      "description": "Detailed description",
      "priority": "High" | "Medium" | "Low",
      "expectedImpact": "Expected improvement",
      "implementation": "How to implement this",
      "metrics": ["List of metrics this affects"]
    }
  ],
  "keyInsights": [
    "Important insights about the website's performance"
  ]
}

Focus on Core Web Vitals (LCP, FID, CLS), loading performance, and user experience. Be specific and actionable in your recommendations.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Clean up the response to ensure it's valid JSON
    text = text.replace(/```json\n?|```\n?/g, '').trim();

    try {
      const analysis: AIAnalysis = JSON.parse(text);

      // Validate the response structure
      if (
        !analysis.score ||
        !analysis.recommendations ||
        !Array.isArray(analysis.recommendations)
      ) {
        throw new Error('Invalid AI response structure');
      }

      return NextResponse.json({ analysis });
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      console.error('Raw AI response:', text);

      // Fallback analysis
      const fallbackAnalysis: AIAnalysis = {
        score: testResults.summary?.score || 70,
        grade: testResults.summary?.grade || 'C',
        summary:
          'Performance analysis completed. Review the detailed metrics below for optimization opportunities.',
        issues: [],
        recommendations: [
          {
            title: 'Optimize Images',
            description: 'Compress and optimize images to reduce load times',
            priority: 'High',
            expectedImpact: 'Improved LCP and overall load time',
            implementation:
              'Use modern image formats (WebP, AVIF) and appropriate sizing',
            metrics: ['LCP', 'Load Time'],
          },
          {
            title: 'Enable Caching',
            description: 'Implement browser and server-side caching strategies',
            priority: 'High',
            expectedImpact: 'Faster repeat visits and reduced server load',
            implementation: 'Configure cache headers and use a CDN',
            metrics: ['TTFB', 'Load Time'],
          },
          {
            title: 'Minify Resources',
            description: 'Minify CSS, JavaScript, and HTML files',
            priority: 'Medium',
            expectedImpact: 'Reduced file sizes and faster downloads',
            implementation: 'Use build tools to automatically minify files',
            metrics: ['Load Time', 'FCP'],
          },
        ],
        keyInsights: [
          'Focus on Core Web Vitals for better user experience',
          'Regular performance monitoring is essential',
          'Mobile performance should be prioritized',
        ],
      };

      return NextResponse.json({ analysis: fallbackAnalysis });
    }
  } catch (error) {
    console.error('AI analysis error:', error);
    return NextResponse.json(
      {
        message: 'Failed to analyze test results',
        error:
          process.env.NODE_ENV === 'development'
            ? (error as Error).message
            : undefined,
      },
      { status: 500 }
    );
  }
}
