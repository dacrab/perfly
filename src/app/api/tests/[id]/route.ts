import { NextResponse } from 'next/server';
import { tests } from '@/db/schema';
import db from '@/db';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: testId } = await params;

    if (!testId) {
      return NextResponse.json(
        { message: 'Test ID is required' },
        { status: 400 }
      );
    }

    // Fetch the test from the database
    const test = await db.query.tests.findFirst({
      where: eq(tests.id, testId),
    });

    if (!test) {
      return NextResponse.json({ message: 'Test not found' }, { status: 404 });
    }

    return NextResponse.json({
      id: test.id,
      url: test.url,
      status: test.status,
      results: test.results ? JSON.parse(test.results) : null,
      createdAt: test.createdAt,
    });
  } catch (error) {
    console.error('Test fetch error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch test' },
      { status: 500 }
    );
  }
}
