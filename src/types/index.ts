export type Presentation = {
  id: string;
  title: string;
  subject: string;
  topic: string;
  subtopic?: string;
  thumbnailUrl?: string;
  fileUrl?: string; 
  fileName?: string;
  fileType: 'pdf' | 'ppt' | 'generated-pdf';
  generatedTextContent?: string;
  generatedImages?: string[];
  createdAt: number;
};
