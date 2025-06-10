import { NextResponse } from 'next/server';
import { createPresentationPdfFlow } from '@/ai/flows/createPresentationPdf';
//import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import pdf from "pdf-parse-debugging-disabled";
// This is required for Node.js environments.
// It tells pdfjs-dist where to find its necessary font files.
const CMAP_URL = "./node_modules/pdfjs-dist/cmaps/";
const CMAP_PACKED = true;


/**
 * Extracts text content from a PDF file using the pdfjs-dist library.
 */
async function extractTextFromFile(file: File): Promise<string> {
  const fileBuffer = await file.arrayBuffer();
  const pdfData = new Uint8Array(fileBuffer);

  const data = await pdf(pdfData);
  console.log(data);
//   const loadingTask = pdfjsLib.getDocument({
//     data: pdfData,
//     cMapUrl: CMAP_URL,
//     cMapPacked: CMAP_PACKED,
//   });

  try {
//     const pdfDocument = await loadingTask.promise;
//     let fullText = '';

//     for (let i = 1; i <= pdfDocument.numPages; i++) {
//       const page = await pdfDocument.getPage(i);
//       const textContent = await page.getTextContent();
//       const pageText = textContent.items.map(item => ('str' in item ? item.str : '')).join(' ');
//       fullText += pageText + '\n';
//     }

    return data.text;
  } catch (error) {
    console.error('Failed to parse PDF:', error);
    // Return an empty string or re-throw if you want to handle it upstream
    return '';
  }
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

    // 1. Extract text from all uploaded files using the new function
    const extractedTextPromises = files.map(extractTextFromFile);
    const extractedTexts = await Promise.all(extractedTextPromises);
    const combinedText = extractedTexts.join('\n\n---\n\n');

    // 2. Call the flow directly
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