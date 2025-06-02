
'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { ContentCreatorTab } from "@/components/content-creator/ContentCreatorTab";
import { ClassroomTab } from "@/components/classroom/ClassroomTab";
import type { Presentation } from "@/types";
import { BookOpen, LayoutGrid } from 'lucide-react';

const initialPresentationsData: Presentation[] = [
  // General Embryology
  {
    id: 'anat-gen-embryo-001',
    title: 'Principles of Gametogenesis & IVF',
    subject: 'Anatomy',
    topic: 'General Embryology',
    subtopic: 'Gametogenesis and In-Vitro Fertilization',
    fileType: 'generated-pdf',
    fileName: 'gametogenesis_ivf_notes.pdf',
    generatedTextContent: 'This presentation covers the fundamental principles of gamete formation (spermatogenesis and oogenesis), meiosis, and the clinical application of in-vitro fertilization techniques. Includes diagrams of meiotic stages and IVF procedures.',
    generatedImages: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: 'anat-gen-embryo-002',
    title: 'Placenta Development and Anomalies',
    subject: 'Anatomy',
    topic: 'General Embryology',
    subtopic: 'Placenta Development',
    fileType: 'pdf',
    fileName: 'placenta_development.pdf',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2.5,
  },
  // Histology
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
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
  },
  {
    id: 'anat-histology-002',
    title: 'Connective Tissue Proper',
    subject: 'Anatomy',
    topic: 'Histology',
    subtopic: 'Connective Tissue',
    fileType: 'ppt',
    fileName: 'connective_tissue.pptx',
    fileUrl: '#',
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5.5,
  },
  // Osteology and Arthrology
  {
    id: 'anat-osteo-arthro-001',
    title: 'Overview of Human Osteology',
    subject: 'Anatomy',
    topic: 'Osteology and Arthrology',
    subtopic: 'Osteology',
    fileType: 'ppt',
    fileName: 'human_osteology.pptx',
    fileUrl: '#',
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6,
  },
  // Neuroanatomy
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
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
  },
  {
    id: 'anat-neuro-002',
    title: 'Cerebellum: Structure and Functions',
    subject: 'Anatomy',
    topic: 'Neuroanatomy',
    subtopic: 'Cerebellum',
    fileType: 'generated-pdf',
    fileName: 'cerebellum_overview.pdf',
    generatedTextContent: 'An overview of the cerebellum, its lobes, peduncles, and functional divisions. Discusses clinical correlations of cerebellar lesions.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1.5,
  },
  // Head and Neck
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
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 4,
  },
  // Back Region
  {
    id: 'anat-back-001',
    title: 'Vertebral Column and Spinal Cord Termination',
    subject: 'Anatomy',
    topic: 'Back Region',
    subtopic: 'Spinal Cord Termination',
    fileType: 'pdf',
    fileName: 'vertebral_column_spinal_cord.pdf',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 8,
  },
  // Thorax
  {
    id: 'anat-thorax-001',
    title: 'Embryonic Development of the Heart',
    subject: 'Anatomy',
    topic: 'Thorax',
    subtopic: 'Development of Cardiovascular System',
    fileType: 'ppt',
    fileName: 'cardiac_embryology_overview.pptx',
    fileUrl: '#',
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
  },
  // Upper Limb
  {
    id: 'anat-upperlimb-001',
    title: 'Brachial Plexus Anatomy',
    subject: 'Anatomy',
    topic: 'Upper Limb',
    subtopic: 'Brachial Plexus: Trunks and Cords',
    fileType: 'generated-pdf',
    fileName: 'brachial_plexus.pdf',
    generatedTextContent: 'Detailed explanation of the brachial plexus, including its roots, trunks, divisions, cords, and branches. Clinical significance of injuries discussed.',
    generatedImages: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
  },
  // Abdomen
  {
    id: 'anat-abdomen-001',
    title: 'Gut Rotation and Mesentery Development',
    subject: 'Anatomy',
    topic: 'Abdomen',
    subtopic: 'Gut Rotation',
    fileType: 'pdf',
    fileName: 'gut_rotation.pdf',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 9,
  },
  // Pelvis and Perineum
  {
    id: 'anat-pelvis-001',
    title: 'Pelvic Diaphragm and Perineal Pouches',
    subject: 'Anatomy',
    topic: 'Pelvis and Perineum',
    subtopic: 'Pelvic Diaphragm',
    fileType: 'generated-pdf',
    fileName: 'pelvic_diaphragm.pdf',
    generatedTextContent: 'Anatomical overview of the pelvic diaphragm muscles (levator ani and coccygeus) and the structure of perineal pouches.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
  },
  // Lower Limb
  {
    id: 'anat-lowerlimb-001',
    title: 'Nerve Supply to Thigh Muscles',
    subject: 'Anatomy',
    topic: 'Lower Limb',
    subtopic: 'Nerve Supply to Thigh Muscles',
    fileType: 'ppt',
    fileName: 'thigh_nerve_supply.pptx',
    fileUrl: '#',
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 11,
  },
  // Example of a different subject (placeholder)
  {
    id: 'physio-resp-001',
    title: 'Physiology of Respiration',
    subject: 'Physiology',
    topic: 'Respiratory System',
    subtopic: 'Lung Volumes and Capacities',
    fileType: 'pdf',
    fileName: 'resp_physiology.pdf',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 12,
  }
];


export default function HomePage() {
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    // This code runs only on the client, after initial hydration
    // For now, always load initialPresentationsData to ensure medical content is shown
    setPresentations(initialPresentationsData);
    
    // The localStorage loading logic can be re-introduced or refined later if needed
    // const storedPresentations = localStorage.getItem('courseDeckPresentations');
    // if (storedPresentations) {
    //   try {
    //     const parsed = JSON.parse(storedPresentations);
    //     if (Array.isArray(parsed) && parsed.every(item => typeof item.id === 'string' && typeof item.title === 'string')) {
    //          setPresentations(parsed);
    //     } else {
    //         // Fallback to initialData if localStorage is invalid
    //         localStorage.setItem('courseDeckPresentations', JSON.stringify(initialPresentationsData));
    //         setPresentations(initialPresentationsData);
    //     }
    //   } catch (e) {
    //     console.error("Failed to parse presentations from localStorage", e);
    //     // Fallback to initialData on error
    //     localStorage.setItem('courseDeckPresentations', JSON.stringify(initialPresentationsData));
    //     setPresentations(initialPresentationsData);
    //   }
    // } else {
    //   // No data in localStorage, use initialData and store it
    //   localStorage.setItem('courseDeckPresentations', JSON.stringify(initialPresentationsData));
    //   setPresentations(initialPresentationsData);
    // }
    setCurrentYear(new Date().getFullYear());
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && presentations.length > 0) { // Only save if presentations is not empty
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
