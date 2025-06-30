import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { v4 as uuidv4 } from 'uuid';

const execAsync = promisify(exec);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Create temporary directory for processing
    const tempDir = os.tmpdir();
    const workDir = path.join(tempDir, uuidv4());
    fs.mkdirSync(workDir);

    // Save the uploaded file
    const buffer = Buffer.from(await file.arrayBuffer());
    const inputPath = path.join(workDir, 'input.pdf');
    fs.writeFileSync(inputPath, buffer);

    // Use pdftotext (from poppler-utils) to extract text
    const outputPath = path.join(workDir, 'output.txt');
    await execAsync(`pdftotext "${inputPath}" "${outputPath}"`);

    // Read the extracted text
    const extractedText = fs.readFileSync(outputPath, 'utf-8');

    // Clean up
    fs.rmSync(workDir, { recursive: true, force: true });

    return NextResponse.json({
      text: extractedText,
      metadata: {
        title: file.name.replace(/\.pdf$/, ''),
        creationDate: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error extracting PDF content:', error);
    return NextResponse.json(
      { error: 'Failed to extract PDF content' },
      { status: 500 }
    );
  }
} 