
'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { ContentCreatorTab } from "@/components/content-creator/ContentCreatorTab";
import { ClassroomTab } from "@/components/classroom/ClassroomTab";
import type { Presentation } from "@/types";
import { BookOpen, LayoutGrid } from 'lucide-react';

const initialPresentationsData: Presentation[] = [
  {
    id: '1',
    title: 'Cardiac Cycle and ECG Basics',
    subject: 'Physiology',
    topic: 'Cardiovascular System',
    subtopic: 'ECG Interpretation',
    fileType: 'pdf',
    fileName: 'cardiac_cycle_ecg.pdf',
    thumbnailUrl: 'https://placehold.co/300x200.png',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago
  },
  {
    id: '2',
    title: 'Introduction to Antimicrobial Resistance',
    subject: 'Pharmacology',
    topic: 'Antimicrobial Drugs',
    subtopic: 'Mechanisms of Resistance',
    fileType: 'ppt',
    fileName: 'antimicrobial_resistance_intro.pptx',
    thumbnailUrl: 'https://placehold.co/300x200.png',
    fileUrl: '#', 
    createdAt: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
  },
  {
    id: '3',
    title: 'Brachial Plexus Anatomy',
    subject: 'Anatomy',
    topic: 'Upper Limb',
    subtopic: 'Nerve Plexuses',
    fileType: 'generated-pdf',
    fileName: 'brachial_plexus_notes.pdf',
    generatedTextContent: 'Detailed notes on the formation, branches, and clinical significance of the brachial plexus...',
    generatedImages: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3, // 3 days ago
  }
];

export default function HomePage() {
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    const storedPresentations = localStorage.getItem('courseDeckPresentations');
    if (storedPresentations) {
      setPresentations(JSON.parse(storedPresentations));
    } else {
      setPresentations(initialPresentationsData);
    }
    setCurrentYear(new Date().getFullYear());
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('courseDeckPresentations', JSON.stringify(presentations));
    }
  }, [presentations, isMounted]);

  const addPresentation = (newPresentation: Presentation) => {
    setPresentations(prev => [newPresentation, ...prev]);
  };

  if (!isMounted) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
           <div className="flex justify-center items-center h-64">
             <p className="text-muted-foreground">Loading CourseDeck AI...</p>
           </div>
        </main>
        <footer className="py-6 text-center text-sm text-muted-foreground border-t">
          © CourseDeck AI. All rights reserved.
        </footer>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Tabs defaultValue="classroom" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-1/2 lg:w-1/3 mx-auto mb-8 shadow-sm">
            <TabsTrigger value="classroom" className="font-headline text-base py-2.5">
              <LayoutGrid className="mr-2 h-5 w-5" /> Classroom
            </TabsTrigger>
            <TabsTrigger value="creator" className="font-headline text-base py-2.5">
              <BookOpen className="mr-2 h-5 w-5" /> Content Creator
            </TabsTrigger>
          </TabsList>
          <TabsContent value="classroom">
            <ClassroomTab presentations={presentations} />
          </TabsContent>
          <TabsContent value="creator">
            <ContentCreatorTab addPresentation={addPresentation} />
          </TabsContent>
        </Tabs>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        {currentYear ? `© ${currentYear} CourseDeck AI. All rights reserved.` : '© CourseDeck AI. All rights reserved.'}
      </footer>
    </div>
  );
}
