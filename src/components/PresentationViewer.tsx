'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Presentation } from '@/types';
import { Button } from './ui/button';
import { Download, BookOpen } from 'lucide-react';
import { getQuestionsByMetadata } from '@/lib/questions';
import { QuestionModal } from './QuestionModal';

interface PresentationViewerProps {
  presentation: Presentation | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PresentationViewer({ presentation, isOpen, onClose }: PresentationViewerProps) {
  const [showQuestions, setShowQuestions] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);

  if (!presentation) return null;

  const { title, subject, topic, subtopic, fileUrl, fileType, generatedTextContent, generatedImages } = presentation;
  const isBase64 = fileUrl?.startsWith('data:');

  const handleGenerateQuestions = () => {
    const generatedQuestions = getQuestionsByMetadata(subject, topic, subtopic);
    setQuestions(generatedQuestions);
    setShowQuestions(true);
  };

  const renderFileViewer = () => {
    // If no file URL, return null
    if (!fileUrl) return null;

    // For different file types
    switch (fileType?.toLowerCase()) {
      case 'pdf':
        return (
          <div className="w-full h-full" style={{ minHeight: '70vh' }}>
            <object
              data={fileUrl}
              type="application/pdf"
              className="w-full h-full"
            >
              <iframe
                src={fileUrl}
                className="w-full h-full"
                title="PDF Preview"
                sandbox="allow-same-origin allow-scripts"
              />
            </object>
          </div>
        );
      case 'ppt':
      case 'pptx':
      case 'doc':
      case 'docx':
      case 'xls':
      case 'xlsx':
        // For Office documents, show a message that preview is not available
        return (
          <div className="flex items-center justify-center h-full p-8 text-center">
            <div>
              <p className="text-lg font-semibold mb-2">Preview not available for {fileType.toUpperCase()} files</p>
              <p className="text-sm text-muted-foreground">Please download the file to view its contents.</p>
            </div>
          </div>
        );
      case 'txt':
      case 'md':
      case 'csv':
        // For text files, create a blob URL and display in iframe
        if (isBase64) {
          const base64Content = fileUrl.split(',')[1];
          const decodedContent = atob(base64Content);
          const blob = new Blob([decodedContent], { type: 'text/plain' });
          const blobUrl = URL.createObjectURL(blob);
          return (
            <iframe
              src={blobUrl}
              className="w-full h-full"
              title="Text Preview"
              style={{ minHeight: '70vh' }}
              onLoad={(e) => {
                // Clean up blob URL after iframe loads
                URL.revokeObjectURL(blobUrl);
              }}
            />
          );
        }
        return (
          <iframe
            src={fileUrl}
            className="w-full h-full"
            title="Text Preview"
            style={{ minHeight: '70vh' }}
          />
        );
      case 'image':
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
        return (
          <div className="flex items-center justify-center h-full">
            <Image
              src={fileUrl}
              alt={title || 'Image preview'}
              layout="contain"
              className="max-h-full w-auto"
              width={800}
              height={600}
            />
          </div>
        );
      case 'video':
      case 'mp4':
      case 'webm':
        return (
          <video
            controls
            className="w-full h-full"
            src={fileUrl}
          >
            Your browser does not support the video tag.
          </video>
        );
      case 'generated-pdf':
        return (
          <div className="space-y-4">
            {generatedTextContent && (
              <>
                <h3 className="font-headline text-lg font-semibold">Generated Text</h3>
                <div className="prose prose-sm max-w-none dark:prose-invert bg-muted/20 p-4 rounded-md whitespace-pre-wrap">
                  {generatedTextContent}
                </div>
              </>
            )}

            {Array.isArray(generatedImages) && generatedImages.length > 0 && (
              <>
                <h3 className="font-headline text-lg font-semibold mt-4">Generated Images</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {generatedImages.map((img, index) => (
                    <div key={index} className="relative aspect-video rounded-md overflow-hidden border">
                      <Image src={img} alt={`Image ${index + 1}`} layout="fill" objectFit="contain" />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        );
      default:
        // For any other file type, show unsupported message
        return (
          <div className="flex items-center justify-center h-full p-8 text-center">
            <div>
              <p className="text-lg font-semibold mb-2">Preview not available</p>
              <p className="text-sm text-muted-foreground">This file type cannot be previewed. Please download to view.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(shouldBeOpen) => {
          if (!shouldBeOpen) onClose();
        }}
      >
        <DialogContent className="max-w-4xl w-full max-h-[90vh] flex flex-col p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="font-headline text-2xl">{title}</DialogTitle>
            <DialogDescription>
              {subject} &gt; {topic}{subtopic ? ` > ${subtopic}` : ''}
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="flex-grow p-6 pt-4">
            <div className="w-full h-[70vh] bg-muted/20 rounded-md overflow-hidden border">
              {renderFileViewer()}
            </div>
          </ScrollArea>

          <div className="p-6 pt-0 border-t flex gap-2 justify-end">
            <Button
              variant="secondary"
              className="flex gap-2"
              onClick={handleGenerateQuestions}
            >
              <BookOpen className="h-4 w-4" />
              Generate Questions
            </Button>
            {fileUrl && (
              <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" className="flex gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </a>
            )}
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>

      <QuestionModal
        isOpen={showQuestions}
        onClose={() => setShowQuestions(false)}
        questions={questions}
      />
    </>
  );
}