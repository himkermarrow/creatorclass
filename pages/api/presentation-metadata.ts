// pages/api/presentation-metadata.ts

import { promises as fs } from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

const dataFile = path.join(process.cwd(), 'data/presentations.json');

interface PresentationMeta {
  subject: string;
  topic: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = await fs.readFile(dataFile, 'utf8');
  const presentations = JSON.parse(data) as PresentationMeta[];

  const subjectsSet = new Set<string>();
  const topicsBySubject: Record<string, Set<string>> = {};

  presentations.forEach((p: PresentationMeta) => {
    subjectsSet.add(p.subject);
    if (!topicsBySubject[p.subject]) {
      topicsBySubject[p.subject] = new Set();
    }
    topicsBySubject[p.subject].add(p.topic);
  });

  const subjects = Array.from(subjectsSet);
  const topics = Object.fromEntries(
    Object.entries(topicsBySubject).map(([subject, topicsSet]) => [subject, Array.from(topicsSet)])
  );

  res.status(200).json({ subjects, topicsBySubject: topics });
}