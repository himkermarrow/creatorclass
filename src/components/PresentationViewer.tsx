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
import { ExternalLink, Download } from 'lucide-react';

interface PresentationViewerProps {
  presentation: Presentation | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PresentationViewer({ presentation, isOpen, onClose }: PresentationViewerProps) {
  if (!presentation) return null;

  const isPDF = presentation.fileType === 'pdf';
  const isPPT = presentation.fileType === 'ppt';

  const isBlob = presentation.fileUrl?.startsWith('blob:');

  const googleViewerUrl = !isBlob && presentation.fileUrl
  ? `https://docs.google.com/gview?url=${encodeURIComponent(presentation.fileUrl)}&embedded=true`
  : null;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(shouldBeOpen) => {
        if (!shouldBeOpen) onClose();
      }}
    >
      <DialogContent className="max-w-4xl w-full max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="font-headline text-2xl">{presentation.title}</DialogTitle>
          <DialogDescription>
          {presentation.subject} &gt; {presentation.topic}
          {presentation.subtopic ? ` > ${presentation.subtopic}` : ''}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-grow p-6 pt-2">
          {presentation.fileType === 'generated-pdf' && (
            <div className="space-y-4">
              <h3 className="font-headline text-lg font-semibold mt-2">Generated Content:</h3>
              {presentation.generatedTextContent ? (
                <div className="prose prose-sm max-w-none dark:prose-invert bg-muted/30 p-4 rounded-md whitespace-pre-wrap">
                  {presentation.generatedTextContent}
                </div>
              ) : <p className="text-muted-foreground">No text content generated.</p>}

                {Array.isArray(presentation.generatedImages) && presentation.generatedImages.length > 0 && (
                <>
                  <h3 className="font-headline text-lg font-semibold mt-4">Extracted Images:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {presentation.generatedImages.map((imgDataUri, index) => (
                      <div key={index} className="relative aspect-video rounded-md overflow-hidden border">
                        <Image src={imgDataUri} alt={`Extracted image ${index + 1}`} layout="fill" objectFit="contain" />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {(isPDF || isPPT) && (
            <div className="w-full h-[70vh] bg-muted/20 rounded-md overflow-hidden border mt-4">
              {isPDF && !isBlob ? (
                <iframe src={presentation.fileUrl} className="w-full h-full" />
              ) : isPPT && googleViewerUrl ? (
                <iframe src={googleViewerUrl} className="w-full h-full" />
              ) : (
                <div className="flex flex-col justify-center items-center h-full text-center p-6">
                  <p className="text-muted-foreground text-sm mb-4">
                    Preview not available for this file type or source. Please open manually.
                  </p>
                  <a
                    href={presentation.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Open in a new tab
                  </a>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        <div className="p-6 pt-0 border-t">
          <DialogClose asChild>
            <Button variant="outline" className="w-full">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}