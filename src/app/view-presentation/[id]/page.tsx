
// src/app/view-presentation/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import type { Presentation } from '@/types';
import { Header } from '@/components/Header';
import Image from 'next/image';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';

export default function ViewPresentationPage() {
  const params = useParams();
  const id = params?.id as string;
  const [presentation, setPresentation] = useState<Presentation | null | undefined>(undefined);
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
      setCurrentYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    if (id) {
      const storedPresentations = localStorage.getItem('courseDeckPresentations');
      if (storedPresentations) {
        try {
          const presentationsArray: Presentation[] = JSON.parse(storedPresentations);
          const found = presentationsArray.find(p => p.id === id);
          setPresentation(found || null);
        } catch (e) {
          console.error("Failed to parse presentations from localStorage", e);
          setPresentation(null);
        }
      } else {
        setPresentation(null); 
      }
    } else {
      setPresentation(null); // No ID in params
    }
  }, [id]);

  if (presentation === undefined) { // Loading state
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 flex justify-center items-center">
          <LoadingSpinner size={48} />
        </main>
        <footer className="py-6 text-center text-sm text-muted-foreground border-t">
          © {currentYear || 'Creator Class AI'}. All rights reserved.
        </footer>
      </div>
    );
  }

  if (!presentation) { // Not found state
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center py-10">
            <h1 className="font-headline text-3xl font-bold text-destructive mb-4">Presentation Not Found</h1>
            <p className="text-muted-foreground">
              The presentation you are looking for (ID: {id}) could not be found or is no longer available.
            </p>
            <Button onClick={() => window.close()} variant="outline" className="mt-6">Close Tab</Button>
          </div>
        </main>
         <footer className="py-6 text-center text-sm text-muted-foreground border-t">
            © {currentYear || 'Creator Class AI'}. All rights reserved.
        </footer>
      </div>
    );
  }

  // This page is specifically for 'generated-pdf' types that need their content rendered.
  // PDFs/PPTs with fileUrls should be opened directly by the card logic.
  if (presentation.fileType !== 'generated-pdf') {
     return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center py-10">
            <h1 className="font-headline text-3xl font-bold text-destructive mb-4">Cannot Display Presentation</h1>
            <p className="text-muted-foreground">
              This presentation type ('{presentation.fileType}') is not meant to be displayed on this page.
            </p>
            {presentation.fileUrl && (
              <p className="text-muted-foreground mt-2">
                It should be opened directly from its link. Try: {' '}
                <a href={presentation.fileUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Open File
                </a>
              </p>
            )}
            <Button onClick={() => window.close()} variant="outline" className="mt-6">Close Tab</Button>
          </div>
        </main>
         <footer className="py-6 text-center text-sm text-muted-foreground border-t">
            © {currentYear || 'Creator Class AI'}. All rights reserved.
        </footer>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto bg-card p-6 md:p-8 rounded-lg shadow-xl">
          <header className="mb-8 pb-4 border-b">
            <h1 className="font-headline text-3xl md:text-4xl font-bold text-foreground mb-2">{presentation.title}</h1>
            <p className="text-sm text-muted-foreground">
              {presentation.subject} &gt; {presentation.topic} {presentation.subtopic && `> ${presentation.subtopic}`}
            </p>
          </header>

          <div className="space-y-8">
            {presentation.generatedTextContent && (
              <section>
                <h2 className="font-headline text-xl md:text-2xl font-semibold mb-4 text-primary">Presentation Content</h2>
                <div className="prose prose-base lg:prose-lg max-w-none dark:prose-invert bg-muted/30 p-4 rounded-md whitespace-pre-wrap">
                  {presentation.generatedTextContent}
                </div>
              </section>
            )}

            {presentation.generatedImages && presentation.generatedImages.length > 0 && (
              <section>
                <h2 className="font-headline text-xl md:text-2xl font-semibold mb-4 text-primary">Extracted Images</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {presentation.generatedImages.map((imgDataUri, index) => (
                    <div key={index} className="relative aspect-video rounded-md overflow-hidden border bg-muted/20">
                      <Image src={imgDataUri} alt={`Extracted image ${index + 1}`} layout="fill" objectFit="contain" data-ai-hint="diagram illustration" />
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {(!presentation.generatedTextContent && (!presentation.generatedImages || presentation.generatedImages.length === 0)) && (
                 <p className="text-muted-foreground text-lg text-center py-10">No generated content or images available for this presentation.</p>
            )}
          </div>
        </article>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        © {currentYear || 'Creator Class AI'}. All rights reserved.
      </footer>
    </div>
  );
}

