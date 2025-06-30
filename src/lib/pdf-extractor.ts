import fs from 'fs/promises';
import { PDFDocument } from 'pdf-lib';
import pdfParse from 'pdf-parse-fork';

interface ExtractedPDFData {
  text: string;
  numPages: number;
  info?: any;
}

export async function extractPDFContent(filePath: string): Promise<ExtractedPDFData> {
  try {
    // Read the PDF file
    const pdfBytes = await fs.readFile(filePath);
    
    // Load the PDF document for metadata
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    // Get the number of pages
    const numPages = pdfDoc.getPageCount();

    // Get document info
    const title = pdfDoc.getTitle();
    const author = pdfDoc.getAuthor();
    const subject = pdfDoc.getSubject();
    const keywords = pdfDoc.getKeywords();
    const creator = pdfDoc.getCreator();
    const producer = pdfDoc.getProducer();
    const creationDate = pdfDoc.getCreationDate();
    const modificationDate = pdfDoc.getModificationDate();

    // Extract text content
    const textData = await pdfParse(pdfBytes);

    return {
      text: textData.text,
      numPages,
      info: {
        title,
        author,
        subject,
        keywords,
        creator,
        producer,
        creationDate,
        modificationDate
      }
    };
  } catch (error: any) {
    console.error('Error extracting PDF content:', error);
    throw new Error(`Failed to extract PDF content: ${error.message || 'Unknown error'}`);
  }
} 