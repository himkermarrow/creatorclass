import { NextResponse } from 'next/server'
import type { Presentation } from '@/types';
import { getAllPresentations } from '@/lib/presentations-store';

export async function POST(request: Request) {
  try {
    const data = await request.json() as Partial<Presentation>;

    // Validate required fields with detailed error messages
    const requiredFields = {
      title: data.title,
      subject: data.subject,
      topic: data.topic,
      fileUrl: data.fileUrl
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([field]) => field);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          error: 'Missing required fields', 
          details: `Missing: ${missingFields.join(', ')}` 
        }, 
        { status: 400 }
      );
    }

    // At this point we know fileUrl exists since we validated it above
    const fileUrl = data.fileUrl as string;

    // Validate fileUrl format
    try {
      new URL(fileUrl);
    } catch {
      // If it's not a valid URL, check if it's a valid relative path
      if (!fileUrl.match(/^\/?([\w-]+\/)*[\w-]+\.(pdf|ppt|pptx)$/)) {
        return NextResponse.json(
          { error: 'Invalid file URL format' },
          { status: 400 }
        );
      }
    }

    // For now, we store the base64 file directly
    const saved: Presentation = {
      ...data as Presentation,
      id: Date.now().toString(),
      subject_id: data.subject!.toLowerCase().replace(/\s+/g, '-'),
      topic_id: data.topic!.toLowerCase().replace(/\s+/g, '-'),
      subtopic_id: data.subtopic ? data.subtopic.toLowerCase().replace(/\s+/g, '-') : undefined,
      createdAt: Date.now(),
    };

    return NextResponse.json({ presentation: saved });
  } catch (error) {
    console.error('API Error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to save presentation', details: message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const presentations = await getAllPresentations();
    
    if (!Array.isArray(presentations)) {
      throw new Error('Invalid presentations data format');
    }

    return NextResponse.json({ 
      presentations,
      count: presentations.length 
    });
  } catch (error) {
    console.error('Error fetching presentations:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { 
        error: 'Failed to fetch presentations', 
        details: message,
        presentations: [] 
      },
      { status: 500 }
    );
  }
}