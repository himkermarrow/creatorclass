import type { Presentation } from '@/types';

export const initialPresentationsData: Presentation[] = [
  {
    id: 'anat-general-embryology-developmental-timeline-0',
    title: 'Developmental Timeline',
    subject: 'Anatomy',
    topic: 'General Embryology',
    subtopic: 'Developmental Timeline',
    fileType: 'generated-pdf',
    fileName: 'developmental_timeline_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Developmental Timeline within General Embryology.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 15,
    dataAiHint: "embryo development"
  },
  {
    id: 'anat-upper-limb-muscles-1',
    title: 'Muscles of Upper Limb',
    subject: 'Anatomy',
    topic: 'Upper Limb',
    subtopic: 'Muscles',
    fileType: 'pdf',
    fileName: 'upper_limb_muscles.pdf',
    fileUrl: '/dummy-presentations/upper_limb_muscles.pdf',
    thumbnailUrl: 'https://placehold.co/300x200.png?text=Upper+Limb',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
    dataAiHint: "muscular anatomy"
  },
  {
    id: 'physio-cvs-blood-pressure-regulation-2',
    title: 'Blood Pressure Regulation',
    subject: 'Physiology',
    topic: 'Cardiovascular System',
    subtopic: 'Blood Pressure',
    fileType: 'ppt',
    fileName: 'bp_regulation.pptx',
    fileUrl: '/dummy-presentations/bp_regulation.pptx',
    thumbnailUrl: 'https://placehold.co/300x200.png?text=Blood+Pressure',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
    dataAiHint: "bp physiology"
  }
];