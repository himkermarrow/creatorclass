// src/app/api/generate-presentation/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const files = formData.getAll('files') as File[];
    const subject = formData.get('subject')?.toString() || '';
    const topic = formData.get('topic')?.toString() || '';
    const subtopic = formData.get('subtopic')?.toString() || '';

    if (!subject || files.length === 0) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Step 1: Extract text content from each file (placeholder logic)
    const extractedTextPromises = files.map(async (file) => {
      const buffer = await file.arrayBuffer();
      const text = Buffer.from(buffer).toString('utf-8');
      return text;
    });

    const extractedTexts = await Promise.all(extractedTextPromises);
    const combinedText = extractedTexts.join('\n\n');

    // Step 2: Simulate AI content generation (use OpenAI or similar here)
    const generatedContent = `🔮 AI Summary for "${subject} - ${topic}"\n\n` +
      combinedText
        .split('\n')
        .filter((line) => line.trim())
        .slice(0, 10)
        .map((line, i) => `• ${line.trim()}`)
        .join('\n');

    // Step 3: Simulate returned payload
    const response = {
      title: `${subject} - AI Generated`,
      textContent: generatedContent,
      images: [], // In future: Add logic for diagrams or image generation
      url: '',     // Optional: URL to download as PDF if needed
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('AI Generation Failed:', error);
    return new NextResponse('AI content generation failed', { status: 500 });
  }
}