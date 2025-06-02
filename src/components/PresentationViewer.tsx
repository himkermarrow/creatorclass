'use client';

import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
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

  const handleOpenFile = () => {
    if (presentation.fileUrl) {
      window.open(presentation.fileUrl, '_blank');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-full max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="font-headline text-2xl">{presentation.title}</DialogTitle>
          <DialogDescription>
            {presentation.subject} &gt; {presentation.topic} {presentation.subtopic && `> ${presentation.subtopic}`}
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
              
              {presentation.generatedImages && presentation.generatedImages.length > 0 && (
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

          {(presentation.fileType === 'pdf' || presentation.fileType === 'ppt') && (
            <div className="space-y-4 text-center py-10">
              <p className="text-lg">File: <span className="font-semibold">{presentation.fileName}</span></p>
              {presentation.fileUrl && (
                <Button onClick={handleOpenFile}>
                  {presentation.fileType === 'pdf' ? <ExternalLink className="mr-2 h-4 w-4" /> : <Download className="mr-2 h-4 w-4" /> }
                  {presentation.fileType === 'pdf' ? 'Open PDF in New Tab' : 'Download PPT'}
                </Button>
              )}
              <p className="text-sm text-muted-foreground mt-4">
                {presentation.fileType === 'ppt' ? 
                "PPT viewing is typically handled by local software. Click to download." : 
                "Click to open the PDF in a new tab."}
              </p>
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
