
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
    id: 'anat-embryo-001',
    title: 'Principles of Gametogenesis & IVF',
    subject: 'Anatomy',
    topic: 'General Embryology',
    subtopic: 'Gametogenesis and In-Vitro Fertilization',
    fileType: 'generated-pdf',
    fileName: 'gametogenesis_ivf_notes.pdf',
    generatedTextContent: 'This presentation covers the fundamental principles of gamete formation (spermatogenesis and oogenesis), meiosis, and the clinical application of in-vitro fertilization techniques. Includes diagrams of meiotic stages and IVF procedures.',
    generatedImages: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago
  },
  {
    id: 'anat-neuro-001',
    title: 'Comprehensive Guide to Brainstem & Cranial Nerves',
    subject: 'Anatomy',
    topic: 'Neuroanatomy',
    subtopic: 'Brainstem and Cranial Nerves',
    fileType: 'pdf',
    fileName: 'brainstem_cranial_nerves_guide.pdf',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
  },
  {
    id: 'anat-thorax-001',
    title: 'Embryonic Development of the Heart',
    subject: 'Anatomy',
    topic: 'Thorax',
    subtopic: 'Development of Cardiovascular System',
    fileType: 'ppt',
    fileName: 'cardiac_embryology_overview.pptx',
    fileUrl: '#', // Placeholder URL for PPT
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3, // 3 days ago
  },
  {
    id: 'anat-headneck-001',
    title: 'Pharyngeal Arch Derivatives',
    subject: 'Anatomy',
    topic: 'Head and Neck',
    subtopic: 'Pharyngeal Arches',
    fileType: 'generated-pdf',
    fileName: 'pharyngeal_arches_explained.pdf',
    generatedTextContent: 'A detailed review of the six pharyngeal arches, their associated cranial nerves, and the muscular, skeletal, and arterial derivatives. Clinical correlations of common arch anomalies are also discussed.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 4, // 4 days ago
  },
  {
    id: 'anat-histology-001',
    title: 'Introduction to Epithelial Tissues',
    subject: 'Anatomy',
    topic: 'Histology',
    subtopic: 'Epithelial Tissue',
    fileType: 'pdf',
    fileName: 'epithelial_tissue_basics.pdf',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5, // 5 days ago
  }
];


export default function HomePage() {
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    // This code runs only on the client, after initial hydration
    const storedPresentations = localStorage.getItem('courseDeckPresentations');
    if (storedPresentations) {
      try {
        const parsed = JSON.parse(storedPresentations);
        // Basic validation to ensure it's an array
        if (Array.isArray(parsed)) {
            // Further check if items have expected structure (e.g. id and title)
            if (parsed.every(item => typeof item.id === 'string' && typeof item.title === 'string')) {
                 setPresentations(parsed);
            } else {
                // Data is malformed, fallback to initial
                setPresentations(initialPresentationsData);
            }
        } else {
            // Data is not an array, fallback to initial
             setPresentations(initialPresentationsData);
        }
      } catch (e) {
        // Parsing failed, fallback to initial
        console.error("Failed to parse presentations from localStorage", e);
        setPresentations(initialPresentationsData);
      }
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
