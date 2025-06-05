import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // In a real app, you'd save to a database here.
    // For now, we just return it back with a generated ID.
    const saved = {
      id: Date.now().toString(),
      ...data,
      createdAt: Date.now(),
    };

    return NextResponse.json(saved);
  } catch (error) {
    console.error('API Error:', error);
    return new NextResponse('Failed to save presentation', { status: 500 });
  }
}