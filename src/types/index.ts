export type Presentation = {
  id: string;
  title: string;
  subject: string;
  subject_id: string;
  topic: string;
  topic_id: string;
  subtopic?: string;
  subtopic_id?: string;
  thumbnailUrl?: string;
  fileUrl: string; 
  filePath: string;
  fileName: string;
  fileType: 'pdf' | 'ppt' | 'pptx' | 'doc' | 'docx' | 'xls' | 'xlsx' | 'txt' | 'md' | 'csv' | 'generated-pdf';
  content?: string;
  metadata?: {
    title?: string;
    author?: string;
    keywords?: string[];
    creationDate?: string;
  };
  createdAt: number;
  updatedAt?: number;
};
