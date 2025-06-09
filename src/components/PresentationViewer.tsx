'use client';

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
import { Download } from 'lucide-react';

interface PresentationViewerProps {
  presentation: Presentation | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PresentationViewer({ presentation, isOpen, onClose }: PresentationViewerProps) {
  if (!presentation) return null;

  const { title, subject, topic, subtopic, fileUrl, fileType, generatedTextContent, generatedImages } = presentation;
  const isPDF = fileType === 'pdf';
  const isBlob = fileUrl?.startsWith('blob:');

  return (
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

        <ScrollArea className="flex-grow p-6 pt-4 space-y-6">
          {/* For AI-Generated PDFs: text + images */}
          {fileType === 'generated-pdf' && (
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
          )}

          {/* For Uploaded PDFs: embed viewer */}
          {fileType === 'pdf' && fileUrl && (
            <div className="w-full h-[70vh] bg-muted/20 rounded-md overflow-hidden border">
              {!isBlob ? (
                <iframe
                  src={fileUrl}
                  className="w-full h-full"
                  title="PDF Preview"
                  frameBorder="0"
                />
              ) : (
                <div className="flex flex-col justify-center items-center h-full text-center p-6">
                  <p className="text-muted-foreground text-sm mb-2">
                    Blob-based file preview is not supported in embedded mode.
                  </p>
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Open in new tab
                  </a>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        <div className="p-6 pt-0 border-t flex gap-2 justify-end">
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
  );
}