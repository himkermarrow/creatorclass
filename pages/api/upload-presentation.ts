// pages/api/upload-presentation.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Required for formidable
  },
};

const uploadsDir = path.join(process.cwd(), 'public/uploads');
const dataFile = path.join(process.cwd(), 'data/presentations.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new formidable.IncomingForm({
    multiples: false,
    uploadDir: uploadsDir,
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ error: 'Failed to parse form' });
    }

    const fileField = files.presentationFile;
    const file = Array.isArray(fileField) ? fileField[0] : fileField;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const originalFilename = (file as File).originalFilename ?? 'untitled.pdf';
    const fileName = `${Date.now()}-${originalFilename}`;
    const destPath = path.join(uploadsDir, fileName);
    await fs.promises.rename(file.filepath, destPath);

    const metadata = {
      id: crypto.randomUUID(),
      title: fields.title?.toString() || 'Untitled',
      subject: fields.subject?.toString() || '',
      topic: fields.topic?.toString() || '',
      subtopic: fields.subtopic?.toString() || '',
      fileType: 'pdf',
      fileName,
      fileUrl: `/uploads/${fileName}`,
      thumbnailUrl: `https://placehold.co/300x200.png?text=${encodeURIComponent(fields.title?.toString() || 'Presentation')}`,
      createdAt: Date.now(),
    };

    try {
      let existing = [];
      if (fs.existsSync(dataFile)) {
        const raw = await fs.promises.readFile(dataFile, 'utf8');
        existing = JSON.parse(raw);
      }
      existing.push(metadata);
      await fs.promises.writeFile(dataFile, JSON.stringify(existing, null, 2));

      res.status(200).json(metadata);
    } catch (error) {
      console.error('Error saving metadata:', error);
      res.status(500).json({ error: 'Failed to save metadata' });
    }
  });
}