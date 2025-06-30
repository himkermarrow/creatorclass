import { NextRequest, NextResponse } from 'next/server';
import { extractPDFContent } from '@/lib/pdf-extractor';
import { savePresentationMetadata } from '@/lib/presentations-store';
import path from 'path';
import { writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const subject = formData.get('subject') as string;
    const topic = formData.get('topic') as string;
    const subtopic = formData.get('subtopic') as string || '';

    if (!file || !title || !subject || !topic) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate a unique filename
    const fileId = uuidv4();
    const fileExtension = path.extname(file.name);
    const filename = `${fileId}${fileExtension}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filePath = path.join(uploadDir, filename);

    // Convert the file to a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save the file
    await writeFile(filePath, buffer);

    // Extract PDF content
    const pdfData = await extractPDFContent(filePath);

    // Add presentation to store
    const presentation = await savePresentationMetadata({
      title,
      subject,
      topic,
      subtopic,
      filePath,
      fileUrl: `/uploads/${filename}`,
      fileType: 'pdf',
      content: pdfData.text,
      metadata: {
        ...pdfData.info,
        numPages: pdfData.numPages
      }
    });

    // Return the presentation with all required fields
    return NextResponse.json({
      presentation: {
        ...presentation,
        subject_id: presentation.subject.toLowerCase().replace(/\s+/g, '-'),
        topic_id: presentation.topic.toLowerCase().replace(/\s+/g, '-'),
        subtopic_id: presentation.subtopic ? presentation.subtopic.toLowerCase().replace(/\s+/g, '-') : undefined,
        fileName: filename,
        fileType: 'pdf'
      }
    });
  } catch (error: any) {
    console.error('Error in upload-presentation:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process upload' },
      { status: 500 }
    );
  }
} 