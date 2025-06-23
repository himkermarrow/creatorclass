// /home/user/studio/src/app/api/generate-presentation/route.ts

import { NextResponse } from 'next/server';

/**
 * POST handler to accept multiple reference files and send them to the CrewAI API
 * to generate a PDF presentation based on extracted insights.
 */
export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const files = formData.getAll('files') as File[];
    const subject = formData.get('subject')?.toString() || '';
    const topic = formData.get('topic')?.toString() || '';
    const subtopic = formData.get('subtopic')?.toString() || '';
    const slideCount = formData.get('slideCount')?.toString() || '10';

    if (!subject || files.length === 0) {
      return new NextResponse('Missing subject or files', { status: 400 });
    }

    // Construct form data to forward to CrewAI
    const forwardForm = new FormData();
    forwardForm.set('subject', subject);
    forwardForm.set('topic', topic);
    forwardForm.set('subtopic', subtopic);
    forwardForm.set('slideCount', slideCount);

    files.forEach((file) => {
      forwardForm.append('files', file, file.name);
    });

    // Send to CrewAI endpoint
    const crewRes = await fetch(
      'https://multimodal-ai-agent-for-educational-content-70232601.crewai.com',
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 84cef340623c',
          'User-Authorization': 'Bearer 1cd66c5e26ff',
        },
        body: forwardForm,
      }
    );

    if (!crewRes.ok) {
      const errText = await crewRes.text();
      console.error('CrewAI Error:', errText);
      return new NextResponse('Failed to generate PDF from CrewAI', { status: 500 });
    }

    const pdfBuffer = await crewRes.arrayBuffer();

    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="ai-generated-${subject.replace(/\s+/g, '-')}.pdf"`,
      },
    });
  } catch (error) {
    console.error('PDF Generation Failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error', details: errorMessage }), {
      status: 500,
    });
  }
}