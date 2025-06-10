'use client';

import type { Presentation } from '@/types';
import GeneratePdfForm from './GeneratePdfForm';
import { UploadPresentationForm } from './UploadPresentationForm';
import { v4 as uuidv4 } from 'uuid';

interface ContentCreatorTabProps {
  addPresentation: (presentation: Presentation) => void;
}

export function ContentCreatorTab({ addPresentation }: ContentCreatorTabProps) {
  const handleGenerateAIContent = async (
    files: File[],
    subject: string,
    topic?: string,
    subtopic?: string
  ) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    formData.append('subject', subject);
    if (topic) formData.append('topic', topic);
    if (subtopic) formData.append('subtopic', subtopic);

    try {
      const response = await fetch('/api/generate-presentation', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to generate presentation');

      const generated = await response.json();

      const newPresentation: Presentation = {
        id: uuidv4(),
        title: generated.title || 'AI Generated Slides',
        subject,
        topic: topic || '',
        subtopic: subtopic || '',
        fileType: 'generated-pdf',
        fileName: 'ai-generated-presentation.pdf',
        fileUrl: generated.url,
        createdAt: Date.now(),
        generatedTextContent: generated.textContent || '',
        generatedImages: generated.images || [],
      };

      addPresentation(newPresentation);
    } catch (err) {
      console.error('AI generation failed:', err);
      alert('Failed to generate presentation. Please try again later.');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto px-4 py-8">
      {/* Upload Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
          <span className="text-primary">📤</span> Upload Existing Presentation
        </h2>
        <p className="text-muted-foreground mb-6">Upload your PDF and tag it properly.</p>
        <UploadPresentationForm onUpload={addPresentation} />
      </div>

      {/* AI Generate Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
          <span className="text-primary">✨</span> Generate with AI from Reference Material
        </h2>
        <p className="text-muted-foreground mb-6">
          Provide reference material for AI to generate content.
        </p>
        <GeneratePdfForm onGenerate={handleGenerateAIContent} />
      </div>
    </div>
  );
}