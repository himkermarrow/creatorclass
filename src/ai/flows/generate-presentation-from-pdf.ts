// src/ai/flows/generate-presentation-from-pdf.ts
'use server';
/**
 * @fileOverview Generates a presentation from a PDF document by extracting text and images.
 *
 * - generatePresentationFromPdf - A function that generates a presentation from a PDF.
 * - GeneratePresentationFromPdfInput - The input type for the generatePresentationFromPdf function.
 * - GeneratePresentationFromPdfOutput - The return type for the generatePresentationFromPdf function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePresentationFromPdfInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      'The PDF document as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'
    ),
});
export type GeneratePresentationFromPdfInput = z.infer<typeof GeneratePresentationFromPdfInputSchema>;

const GeneratePresentationFromPdfOutputSchema = z.object({
  presentationContent: z.string().describe('The generated presentation content in a suitable format (e.g., Markdown, JSON).'),
  extractedImages: z.array(z.string()).describe('A list of extracted images from the PDF, as data URIs.'),
});
export type GeneratePresentationFromPdfOutput = z.infer<typeof GeneratePresentationFromPdfOutputSchema>;

export async function generatePresentationFromPdf(input: GeneratePresentationFromPdfInput): Promise<GeneratePresentationFromPdfOutput> {
  return generatePresentationFromPdfFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePresentationFromPdfPrompt',
  input: {schema: GeneratePresentationFromPdfInputSchema},
  output: {schema: GeneratePresentationFromPdfOutputSchema},
  prompt: `You are an AI assistant specialized in creating presentations from PDF documents.

  Your task is to generate a presentation based on the content of the provided PDF.
  Extract key information, including text, images, and diagrams, and structure it into a presentation format.

  The presentation content should be well-organized and easy to understand.

  Here is the PDF document:
  {{media url=pdfDataUri}}

  Ensure that the extracted images are included in the output as data URIs.
  `,  
});

const generatePresentationFromPdfFlow = ai.defineFlow(
  {
    name: 'generatePresentationFromPdfFlow',
    inputSchema: GeneratePresentationFromPdfInputSchema,
    outputSchema: GeneratePresentationFromPdfOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
