'use client';

import type { Presentation } from '@/types';
import GeneratePdfForm from './GeneratePdfForm';
import { UploadPresentationForm } from './UploadPresentationForm';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { LoadingSpinner } from '../LoadingSpinner';


interface ContentCreatorTabProps {
  addPresentation: (presentation: Presentation) => void;
}

export function ContentCreatorTab({ addPresentation }: ContentCreatorTabProps) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);


  const handleGenerateAIContent = async (
    files: File[],
    subject: string,
    slideCount: number,
    topic?: string,
    subtopic?: string
  ) => {
    setIsGenerating(true);
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    formData.append('subject', subject);
    formData.append('slideCount', slideCount.toString()); // Add slideCount to form data
    if (topic) formData.append('topic', topic);
    if (subtopic) formData.append('subtopic', subtopic);

    try {
      const response = await fetch('/api/generate-presentation', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to generate presentation: ${errorText}`);
      }

      // The API now returns a PDF file, so we handle it as a blob
      const blob = await response.blob();
      const fileUrl = URL.createObjectURL(blob);
      const fileName = `ai-generated-${subject.replace(/\s+/g, '-')}.pdf`;

      const newPresentation: Presentation = {
        id: uuidv4(),
        title: `${subject} - AI Generated`,
        subject,
        topic: topic || '',
        subtopic: subtopic || '',
        fileType: 'pdf',
        fileName: fileName,
        fileUrl: fileUrl,
        createdAt: Date.now(),
      };

      addPresentation(newPresentation);

      toast({
        title: '✅ Generation successful!',
        description: `${fileName} has been created and added to your classroom.`,
      });

      // Optional: Open the new PDF in a new tab for immediate viewing
      window.open(fileUrl, '_blank');

    } catch (err) {
      console.error('AI generation failed:', err);
      toast({
        title: '❌ Generation Failed',
        description: 'Could not generate the presentation. Please check the console and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
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
          <span className="text-primary">✨</span> Generate with AI
        </h2>
        <p className="text-muted-foreground mb-6">
          Provide reference materials and AI will generate a PDF presentation.
        </p>
        {isGenerating ? (
            <div className="flex flex-col items-center justify-center h-48">
                <LoadingSpinner size={48} />
                <p className="mt-4 text-lg text-muted-foreground animate-pulse">
                    Generating your presentation...
                </p>
            </div>
        ) : (
            <GeneratePdfForm onGenerate={handleGenerateAIContent} />
        )}
      </div>
    </div>
  );
}