// src/app/api/generate-presentation/route.ts
import { NextResponse } from 'next/server';
import { createPresentationPdfFlow } from '@/ai/flows/createPresentationPdf';
import pdf from 'pdf-parse';

async function extractTextFromFile(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  if (file.type === 'application/pdf') {
    const data = await pdf(buffer);
    return data.text;
  }
  // In a real-world scenario, you would add more parsers here
  // for DOCX, PPTX, etc., using libraries like 'mammoth' or 'pptx-js'.
  return buffer.toString('utf-8');
}


export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const files = formData.getAll('files') as File[];
    const subject = formData.get('subject')?.toString() || '';
    const slideCount = parseInt(formData.get('slideCount')?.toString() || '10', 10);

    if (!subject || files.length === 0) {
      return new NextResponse('Missing subject or files', { status: 400 });
    }

    // 1. Extract text from all uploaded files
    const extractedTextPromises = files.map(extractTextFromFile);
    const extractedTexts = await Promise.all(extractedTextPromises);
    const combinedText = extractedTexts.join('\n\n---\n\n');

    // 2. Call the flow directly, without the runFlow wrapper
    const pdfBase64 = await createPresentationPdfFlow({ combinedText, slideCount });

    // 3. Convert Base64 to a Buffer and send it back as a PDF
    const pdfBuffer = Buffer.from(pdfBase64, 'base64');

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="ai-generated-${subject.replace(/\s+/g, '-')}.pdf"`,
      },
    });

  } catch (error) {
    console.error('PDF Generation Failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error', details: errorMessage }), { status: 500 });
  }
}