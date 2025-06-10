import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

// Define the expected structure of a single slide from the AI
const slideSchema = z.object({
  title: z.string().describe('The title of the slide'),
  content: z.array(z.string()).describe('An array of bullet points for the slide content.'),
  diagram_prompt: z.string().optional().describe('A detailed prompt for an AI image model to generate a relevant diagram for this slide. Leave blank if no diagram is needed.'),
});

// Define the overall presentation structure that the AI should return
const presentationSchema = z.object({
  slides: z.array(slideSchema).describe('An array of all the slides for the presentation.'),
});

// Define the input schema for our flow
const CreatePresentationPdfInputSchema = z.object({
  combinedText: z.string().describe('The combined text from all reference documents.'),
  slideCount: z.number().describe('The number of slides the user wants.'),
});

// Define the prompt that will instruct the AI
const createPresentationPdfPrompt = ai.definePrompt({
  name: 'createPresentationPdfPrompt',
  input: { schema: CreatePresentationPdfInputSchema },
  output: { schema: presentationSchema },
  prompt: `Based on the following text, create a presentation with exactly {{slideCount}} slides. The presentation should be structured, informative, and easy to follow. For each slide, provide a title, a list of bullet points, and an optional prompt for generating a diagram if it would enhance the content.

  Reference Text:
  ---
  {{combinedText}}
  ---`,
});


// Define the main flow
export const createPresentationPdfFlow = ai.defineFlow(
  {
    name: 'createPresentationPdfFlow',
    inputSchema: CreatePresentationPdfInputSchema,
    outputSchema: z.string().describe('The generated PDF file as a Base64 encoded string.'),
  },
  async ({ combinedText, slideCount }) => {

    // 1. Execute the prompt to get the structured slide data
    const { output } = await createPresentationPdfPrompt({ combinedText, slideCount });

    if (!output) {
      throw new Error("Failed to generate structured content from AI.");
    }

    // 2. Create a new PDF Document
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const { slides } = output;

    // 3. Add a page for each slide and draw the content
    for (const slide of slides) {
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();
      const titleFontSize = 24;
      const fontSize = 12;

      // Draw Title
      page.drawText(slide.title, {
        x: 50,
        y: height - 4 * titleFontSize,
        font: helveticaBoldFont,
        size: titleFontSize,
        color: rgb(0.1, 0.1, 0.4),
      });

      // Draw Bullet Points
      let yPosition = height - 120;
      for (const point of slide.content) {
        if (yPosition < 80) break;
        page.drawText(`• ${point}`, {
          x: 60,
          y: yPosition,
          font: timesRomanFont,
          size: fontSize,
          color: rgb(0, 0, 0),
          maxWidth: width - 120,
          lineHeight: 18,
        });
        yPosition -= 40;
      }

      // Placeholder for a diagram
      if (slide.diagram_prompt) {
        page.drawRectangle({
          x: 100,
          y: 100,
          width: width - 200,
          height: 150,
          borderColor: rgb(0.8, 0.8, 0.8),
          borderWidth: 1,
        });
        page.drawText(`[Diagram Placeholder: ${slide.diagram_prompt.substring(0, 50)}...]`, {
          x: 110,
          y: 170,
          font: timesRomanFont,
          size: 10,
          color: rgb(0.5, 0.5, 0.5),
        });
      }
    }

    // 4. Serialize the PDFDocument to a Base64 string and return it
    const pdfBytes = await pdfDoc.saveAsBase64();
    return pdfBytes;
  }
);