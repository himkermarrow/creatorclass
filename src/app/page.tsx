
'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { ContentCreatorTab } from "@/components/content-creator/ContentCreatorTab";
import { ClassroomTab } from "@/components/classroom/ClassroomTab";
import type { Presentation } from "@/types";
import { BookOpen, LayoutGrid } from 'lucide-react';

const initialPresentationsData: Presentation[] = [
  // Anatomy - General Embryology
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
    id: 'anat-general-embryology-gametogenesis-ivf-1',
    title: 'Gametogenesis and In-Vitro Fertilization',
    subject: 'Anatomy',
    topic: 'General Embryology',
    subtopic: 'Gametogenesis and In-Vitro Fertilization',
    fileType: 'generated-pdf',
    fileName: 'gametogenesis_ivf_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Gametogenesis and In-Vitro Fertilization within General Embryology.',
    generatedImages: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 14.9,
    dataAiHint: "gametes fertilization"
  },
  {
    id: 'anat-general-embryology-dev-week-1-2-2',
    title: 'Developmental Period: Week 1 & 2',
    subject: 'Anatomy',
    topic: 'General Embryology',
    subtopic: 'Developmental Period: Week 1 & 2',
    fileType: 'generated-pdf',
    fileName: 'dev_period_week_1_2_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Developmental Period: Week 1 & 2 within General Embryology.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 14.8,
    dataAiHint: "embryonic development"
  },
  {
    id: 'anat-general-embryology-dev-week-3-4-3',
    title: 'Developmental Period: Week 3 & 4',
    subject: 'Anatomy',
    topic: 'General Embryology',
    subtopic: 'Developmental Period: Week 3 & 4',
    fileType: 'generated-pdf',
    fileName: 'dev_period_week_3_4_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Developmental Period: Week 3 & 4 within General Embryology.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 14.7,
    dataAiHint: "embryonic period"
  },
  {
    id: 'anat-general-embryology-primitive-streak-4',
    title: 'Primitive Streak & Germ Layer Derivatives',
    subject: 'Anatomy',
    topic: 'General Embryology',
    subtopic: 'Primitive Streak & Germ Layer Derivatives',
    fileType: 'generated-pdf',
    fileName: 'primitive_streak_germ_layer_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Primitive Streak & Germ Layer Derivatives within General Embryology.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 14.6,
    dataAiHint: "gastrulation germ"
  },
  {
    id: 'anat-general-embryology-ectoderm-neural-crest-5',
    title: 'Ectoderm and Neural Crest Cells Derivatives',
    subject: 'Anatomy',
    topic: 'General Embryology',
    subtopic: 'Ectoderm and Neural Crest Cells Derivatives',
    fileType: 'generated-pdf',
    fileName: 'ectoderm_neural_crest_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Ectoderm and Neural Crest Cells Derivatives within General Embryology.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 14.5,
    dataAiHint: "ectoderm neural"
  },
  {
    id: 'anat-general-embryology-mesoderm-derivatives-6',
    title: 'Mesoderm Derivatives',
    subject: 'Anatomy',
    topic: 'General Embryology',
    subtopic: 'Mesoderm Derivatives',
    fileType: 'generated-pdf',
    fileName: 'mesoderm_derivatives_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Mesoderm Derivatives within General Embryology.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 14.4,
    dataAiHint: "mesoderm development"
  },
  {
    id: 'anat-general-embryology-endoderm-derivatives-7',
    title: 'Endoderm Derivatives',
    subject: 'Anatomy',
    topic: 'General Embryology',
    subtopic: 'Endoderm Derivatives',
    fileType: 'generated-pdf',
    fileName: 'endoderm_derivatives_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Endoderm Derivatives within General Embryology.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 14.3,
    dataAiHint: "endoderm development"
  },
  {
    id: 'anat-general-embryology-placenta-development-8',
    title: 'Placenta Development',
    subject: 'Anatomy',
    topic: 'General Embryology',
    subtopic: 'Placenta Development',
    fileType: 'generated-pdf',
    fileName: 'placenta_development_notes.pdf',
    generatedTextContent: 'Detailed overview of placenta formation, structure, and common developmental anomalies. Covers chorionic villi development, maternal-fetal circulation, and placental functions.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2.5,
    dataAiHint: "placenta fetal"
  },

  // Anatomy - Histology
  {
    id: 'anat-histology-body-tubes-0',
    title: 'Body Tubes (Histology)',
    subject: 'Anatomy',
    topic: 'Histology',
    subtopic: 'Body Tubes (Histology)',
    fileType: 'generated-pdf',
    fileName: 'histo_body_tubes_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Body Tubes within Histology.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 14.2,
    dataAiHint: "histology body"
  },
  {
    id: 'anat-histology-epithelial-tissue-1',
    title: 'Epithelial Tissue',
    subject: 'Anatomy',
    topic: 'Histology',
    subtopic: 'Epithelial Tissue',
    fileType: 'generated-pdf',
    fileName: 'histo_epithelial_tissue_notes.pdf',
    generatedTextContent: 'Introduction to the classification, structure, and functions of epithelial tissues. Includes examples of simple and stratified epithelia, and specialized epithelial cells.',
    generatedImages: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
    dataAiHint: "epithelium histology"
  },
  {
    id: 'anat-histology-glandular-tissue-2',
    title: 'Glands', // Changed from Glandular Tissue to Glands
    subject: 'Anatomy',
    topic: 'Histology',
    subtopic: 'Glands', // Changed from Glandular Tissue to Glands
    fileType: 'generated-pdf',
    fileName: 'histo_glands_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Glandular Tissue (Glands) within Histology.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 14.0,
    dataAiHint: "glands histology"
  },
  {
    id: 'anat-histology-connective-tissue-3',
    title: 'Connective Tissue', // Removed (Histology)
    subject: 'Anatomy',
    topic: 'Histology',
    subtopic: 'Connective Tissue', // Removed (Histology)
    fileType: 'ppt', 
    fileName: 'connective_tissue_histo.pptx',
    fileUrl: '#', 
    thumbnailUrl: 'https://placehold.co/300x200.png',
    generatedTextContent: 'Overview of different types of connective tissues, their cells, fibers, and ground substance.',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5.5,
    dataAiHint: "connective tissue"
  },
  {
    id: 'anat-histology-cartilage-tissue-4',
    title: 'Cartilage Tissue',
    subject: 'Anatomy',
    topic: 'Histology',
    subtopic: 'Cartilage Tissue',
    fileType: 'generated-pdf',
    fileName: 'histo_cartilage_tissue_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Cartilage Tissue within Histology.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 13.8,
    dataAiHint: "cartilage histology"
  },
  {
    id: 'anat-histology-lymphoid-tissue-5',
    title: 'Lymphoid Tissue',
    subject: 'Anatomy',
    topic: 'Histology',
    subtopic: 'Lymphoid Tissue',
    fileType: 'generated-pdf',
    fileName: 'histo_lymphoid_tissue_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Lymphoid Tissue within Histology.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 13.7,
    dataAiHint: "lymphoid tissue"
  },
  {
    id: 'anat-histology-integumentary-system-6',
    title: 'Integumentary System (Histology)',
    subject: 'Anatomy',
    topic: 'Histology',
    subtopic: 'Integumentary System', // Corrected subtopic name
    fileType: 'generated-pdf',
    fileName: 'histo_integumentary_system_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Integumentary System within Histology.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 13.6,
    dataAiHint: "skin histology"
  },
  {
    id: 'anat-histology-cell-junctions-7',
    title: 'Cell Junctions',
    subject: 'Anatomy',
    topic: 'Histology',
    subtopic: 'Cell Junctions',
    fileType: 'generated-pdf',
    fileName: 'histo_cell_junctions_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Cell Junctions within Histology.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 13.5,
    dataAiHint: "cell junctions"
  },
    {
    id: 'anat-histology-muscular-system-8', // Renamed from muscle-tissue for clarity with syllabus
    title: 'Muscular System (Histology)', // Renamed
    subject: 'Anatomy',
    topic: 'Histology',
    subtopic: 'Muscular System', // Matched to syllabus
    fileType: 'generated-pdf',
    fileName: 'histo_muscular_system_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Muscular System within Histology.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 13.4,
    dataAiHint: "muscle histology"
  },
  {
    id: 'anat-histology-respiratory-system-9',
    title: 'Respiratory System (Histology)',
    subject: 'Anatomy',
    topic: 'Histology',
    subtopic: 'Respiratory System', // Corrected subtopic name
    fileType: 'generated-pdf',
    fileName: 'histo_respiratory_system_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Respiratory System within Histology.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 13.3,
    dataAiHint: "lung histology"
  },
  {
    id: 'anat-histology-digestive-system-10',
    title: 'Digestive System (Histology)',
    subject: 'Anatomy',
    topic: 'Histology',
    subtopic: 'Digestive System', // Corrected subtopic name
    fileType: 'generated-pdf',
    fileName: 'histo_digestive_system_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Digestive System within Histology.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 13.2,
    dataAiHint: "gut histology"
  },
  {
    id: 'anat-histology-urinary-system-11',
    title: 'Urinary System (Histology)',
    subject: 'Anatomy',
    topic: 'Histology',
    subtopic: 'Urinary System', // Corrected subtopic name
    fileType: 'generated-pdf',
    fileName: 'histo_urinary_system_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Urinary System within Histology.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 13.1,
    dataAiHint: "kidney histology"
  },
  {
    id: 'anat-histology-genital-system-12', // Combined Male and Female for 'Genital System'
    title: 'Genital System (Histology)',
    subject: 'Anatomy',
    topic: 'Histology',
    subtopic: 'Genital System', // Matched to syllabus
    fileType: 'generated-pdf',
    fileName: 'histo_genital_system_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Genital System (Male and Female) within Histology.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 13.0,
    dataAiHint: "reproductive histology"
  },

  // Anatomy - Osteology and Arthrology
  {
    id: 'anat-osteo-arthro-osteology-0',
    title: 'Osteology',
    subject: 'Anatomy',
    topic: 'Osteology and Arthrology',
    subtopic: 'Osteology',
    fileType: 'generated-pdf',
    fileName: 'osteo_arthro_osteology_notes.pdf',
    generatedTextContent: 'A foundational overview of the human skeletal system, bone types, and major anatomical landmarks of bones. Discusses bone formation and classification.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6,
    dataAiHint: "bones skeleton"
  },
  {
    id: 'anat-osteo-arthro-arthrology-1',
    title: 'Arthrology',
    subject: 'Anatomy',
    topic: 'Osteology and Arthrology',
    subtopic: 'Arthrology',
    fileType: 'generated-pdf',
    fileName: 'osteo_arthro_arthrology_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Arthrology within Osteology and Arthrology.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 12.8,
    dataAiHint: "joints articulation"
  },

  // Anatomy - Neuroanatomy
  {
    id: 'anat-neuro-organization-nervous-system-0',
    title: 'Organization of Nervous System',
    subject: 'Anatomy',
    topic: 'Neuroanatomy',
    subtopic: 'Organization of Nervous System',
    fileType: 'generated-pdf',
    fileName: 'neuro_organization_nervous_system_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Organization of Nervous System within Neuroanatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 12.7,
    dataAiHint: "nervous system"
  },
  {
    id: 'anat-neuro-development-nervous-system-1',
    title: 'Development of Nervous System',
    subject: 'Anatomy',
    topic: 'Neuroanatomy',
    subtopic: 'Development of Nervous System',
    fileType: 'generated-pdf',
    fileName: 'neuro_development_nervous_system_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Development of Nervous System within Neuroanatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 12.6,
    dataAiHint: "neurodevelopment brain"
  },
  {
    id: 'anat-neuro-third-ventricle-2',
    title: 'Third Ventricle',
    subject: 'Anatomy',
    topic: 'Neuroanatomy',
    subtopic: 'Third Ventricle',
    fileType: 'generated-pdf',
    fileName: 'neuro_third_ventricle_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Third Ventricle within Neuroanatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 12.5,
    dataAiHint: "brain ventricle"
  },
  {
    id: 'anat-neuro-fourth-ventricle-3',
    title: 'Fourth Ventricle',
    subject: 'Anatomy',
    topic: 'Neuroanatomy',
    subtopic: 'Fourth Ventricle',
    fileType: 'generated-pdf',
    fileName: 'neuro_fourth_ventricle_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Fourth Ventricle within Neuroanatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 12.4,
    dataAiHint: "brain csf"
  },
  {
    id: 'anat-neuro-white-matter-fibers-4',
    title: 'White Matter (Types of Fibers)',
    subject: 'Anatomy',
    topic: 'Neuroanatomy',
    subtopic: 'White Matter (Types of Fibers)',
    fileType: 'generated-pdf',
    fileName: 'neuro_white_matter_fibers_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of White Matter (Types of Fibers) within Neuroanatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 12.3,
    dataAiHint: "brain white matter"
  },
  {
    id: 'anat-neuro-neural-columns-5',
    title: 'Neural Columns',
    subject: 'Anatomy',
    topic: 'Neuroanatomy',
    subtopic: 'Neural Columns',
    fileType: 'generated-pdf',
    fileName: 'neuro_neural_columns_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Neural Columns within Neuroanatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 12.2,
    dataAiHint: "spinal cord"
  },
  {
    id: 'anat-neuro-cerebrum-6',
    title: 'Cerebrum',
    subject: 'Anatomy',
    topic: 'Neuroanatomy',
    subtopic: 'Cerebrum',
    fileType: 'generated-pdf',
    fileName: 'neuro_cerebrum_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Cerebrum within Neuroanatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 12.1,
    dataAiHint: "brain cerebrum"
  },
  {
    id: 'anat-neuro-basal-ganglia-7',
    title: 'Basal Ganglia',
    subject: 'Anatomy',
    topic: 'Neuroanatomy',
    subtopic: 'Basal Ganglia',
    fileType: 'generated-pdf',
    fileName: 'neuro_basal_ganglia_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Basal Ganglia within Neuroanatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 12.0,
    dataAiHint: "brain motor"
  },
  {
    id: 'anat-neuro-internal-capsule-8',
    title: 'Internal Capsule',
    subject: 'Anatomy',
    topic: 'Neuroanatomy',
    subtopic: 'Internal Capsule',
    fileType: 'generated-pdf',
    fileName: 'neuro_internal_capsule_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Internal Capsule within Neuroanatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 11.9,
    dataAiHint: "brain white matter"
  },
  {
    id: 'anat-neuro-thalamus-hypothalamus-9',
    title: 'Thalamus and Hypothalamus',
    subject: 'Anatomy',
    topic: 'Neuroanatomy',
    subtopic: 'Thalamus and Hypothalamus',
    fileType: 'generated-pdf',
    fileName: 'neuro_thalamus_hypothalamus_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Thalamus and Hypothalamus within Neuroanatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 11.8,
    dataAiHint: "brain diencephalon"
  },
  {
    id: 'anat-neuro-brainstem-cranial-nerves-10',
    title: 'Brainstem and Cranial Nerves',
    subject: 'Anatomy',
    topic: 'Neuroanatomy',
    subtopic: 'Brainstem and Cranial Nerves',
    fileType: 'generated-pdf',
    fileName: 'neuro_brainstem_cranial_nerves_notes.pdf',
    generatedTextContent: 'An in-depth guide to the structure and function of the brainstem (midbrain, pons, medulla) and the twelve cranial nerves, including their nuclei and pathways.',
    generatedImages: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
    dataAiHint: "brainstem nerves"
  },
  {
    id: 'anat-neuro-neural-column-brainstem-nuclei-11',
    title: 'Neural Column and Brainstem Nuclei',
    subject: 'Anatomy',
    topic: 'Neuroanatomy',
    subtopic: 'Neural Column and Brainstem Nuclei',
    fileType: 'generated-pdf',
    fileName: 'neuro_neural_column_brainstem_nuclei_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Neural Column and Brainstem Nuclei within Neuroanatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 11.6,
    dataAiHint: "brainstem nuclei"
  },
  {
    id: 'anat-neuro-cerebellum-12',
    title: 'Cerebellum',
    subject: 'Anatomy',
    topic: 'Neuroanatomy',
    subtopic: 'Cerebellum',
    fileType: 'generated-pdf',
    fileName: 'neuro_cerebellum_notes.pdf',
    generatedTextContent: 'An overview of the cerebellum, its lobes, peduncles, and functional divisions. Discusses clinical correlations of cerebellar lesions.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1.5,
    dataAiHint: "brain cerebellum"
  },
  {
    id: 'anat-neuro-spinal-cord-13',
    title: 'Spinal Cord',
    subject: 'Anatomy',
    topic: 'Neuroanatomy',
    subtopic: 'Spinal Cord',
    fileType: 'generated-pdf',
    fileName: 'neuro_spinal_cord_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Spinal Cord within Neuroanatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 11.4,
    dataAiHint: "spinal cord"
  },
  {
    id: 'anat-neuro-autonomic-nervous-system-14',
    title: 'Autonomic Nervous System',
    subject: 'Anatomy',
    topic: 'Neuroanatomy',
    subtopic: 'Autonomic Nervous System',
    fileType: 'generated-pdf',
    fileName: 'neuro_autonomic_nervous_system_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Autonomic Nervous System within Neuroanatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 11.3,
    dataAiHint: "ans sympathetic"
  },
  {
    id: 'anat-neuro-arterial-supply-nervous-system-15',
    title: 'Arterial Supply of Nervous System',
    subject: 'Anatomy',
    topic: 'Neuroanatomy',
    subtopic: 'Arterial Supply of Nervous System',
    fileType: 'generated-pdf',
    fileName: 'neuro_arterial_supply_nervous_system_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Arterial Supply of Nervous System within Neuroanatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 11.2,
    dataAiHint: "brain blood"
  },
  {
    id: 'anat-neuro-brainstem-lesions-16',
    title: 'Brainstem Lesions',
    subject: 'Anatomy',
    topic: 'Neuroanatomy',
    subtopic: 'Brainstem Lesions',
    fileType: 'generated-pdf',
    fileName: 'neuro_brainstem_lesions_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Brainstem Lesions within Neuroanatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 11.1,
    dataAiHint: "brainstem stroke"
  },
  {
    id: 'anat-neuro-venous-drainage-cranial-cavity-17',
    title: 'Venous Drainage of Cranial Cavity',
    subject: 'Anatomy',
    topic: 'Neuroanatomy',
    subtopic: 'Venous Drainage of Cranial Cavity',
    fileType: 'generated-pdf',
    fileName: 'neuro_venous_drainage_cranial_cavity_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Venous Drainage of Cranial Cavity within Neuroanatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 11.0,
    dataAiHint: "brain veins"
  },

  // Anatomy - Head and Neck
  {
    id: 'anat-headneck-pharyngeal-arches-0',
    title: 'Pharyngeal Arches',
    subject: 'Anatomy',
    topic: 'Head and Neck',
    subtopic: 'Pharyngeal Arches',
    fileType: 'generated-pdf',
    fileName: 'headneck_pharyngeal_arches_notes.pdf',
    generatedTextContent: 'A detailed review of the six pharyngeal arches, their associated cranial nerves, and the muscular, skeletal, and arterial derivatives. Clinical correlations of common arch anomalies are also discussed.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 4,
    dataAiHint: "embryo neck"
  },
  {
    id: 'anat-headneck-pharyngeal-pouches-clefts-1',
    title: 'Pharyngeal Pouches and Clefts',
    subject: 'Anatomy',
    topic: 'Head and Neck',
    subtopic: 'Pharyngeal Pouches and Clefts',
    fileType: 'generated-pdf',
    fileName: 'headneck_pharyngeal_pouches_clefts_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Pharyngeal Pouches and Clefts within Head and Neck Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10.8,
    dataAiHint: "embryo development"
  },
  {
    id: 'anat-headneck-tongue-development-2',
    title: 'Tongue Development',
    subject: 'Anatomy',
    topic: 'Head and Neck',
    subtopic: 'Tongue Development',
    fileType: 'generated-pdf',
    fileName: 'headneck_tongue_development_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Tongue Development within Head and Neck Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10.7,
    dataAiHint: "tongue embryo"
  },
  {
    id: 'anat-headneck-pharyngeal-arch-arteries-3',
    title: 'Pharyngeal Arch Arteries',
    subject: 'Anatomy',
    topic: 'Head and Neck',
    subtopic: 'Pharyngeal Arch Arteries',
    fileType: 'generated-pdf',
    fileName: 'headneck_pharyngeal_arch_arteries_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Pharyngeal Arch Arteries within Head and Neck Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10.6,
    dataAiHint: "embryo arteries"
  },
  {
    id: 'anat-headneck-development-skull-4',
    title: 'Development of Skull',
    subject: 'Anatomy',
    topic: 'Head and Neck',
    subtopic: 'Development of Skull',
    fileType: 'generated-pdf',
    fileName: 'headneck_development_skull_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Development of Skull within Head and Neck Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10.5,
    dataAiHint: "skull development"
  },
  {
    id: 'anat-headneck-cranial-cavity-intro-5',
    title: 'Cranial Cavity (Introduction)',
    subject: 'Anatomy',
    topic: 'Head and Neck',
    subtopic: 'Cranial Cavity (Introduction)',
    fileType: 'generated-pdf',
    fileName: 'headneck_cranial_cavity_intro_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Cranial Cavity (Introduction) within Head and Neck Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10.4,
    dataAiHint: "skull anatomy"
  },
  {
    id: 'anat-headneck-cranial-fossae-foramina-6',
    title: 'Cranial Fossae and Related Foramina',
    subject: 'Anatomy',
    topic: 'Head and Neck',
    subtopic: 'Cranial Fossae and Related Foramina',
    fileType: 'generated-pdf',
    fileName: 'headneck_cranial_fossae_foramina_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Cranial Fossae and Related Foramina within Head and Neck Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10.3,
    dataAiHint: "skull foramina"
  },
  {
    id: 'anat-headneck-trigeminal-nerve-7',
    title: 'Trigeminal Nerve',
    subject: 'Anatomy',
    topic: 'Head and Neck',
    subtopic: 'Trigeminal Nerve',
    fileType: 'generated-pdf',
    fileName: 'headneck_trigeminal_nerve_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Trigeminal Nerve within Head and Neck Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10.2,
    dataAiHint: "cranial nerve"
  },
  {
    id: 'anat-headneck-middle-cranial-fossa-8',
    title: 'Middle Cranial Fossa',
    subject: 'Anatomy',
    topic: 'Head and Neck',
    subtopic: 'Middle Cranial Fossa',
    fileType: 'generated-pdf',
    fileName: 'headneck_middle_cranial_fossa_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Middle Cranial Fossa within Head and Neck Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10.1,
    dataAiHint: "skull anatomy"
  },
  {
    id: 'anat-headneck-cavernous-sinus-9',
    title: 'Cavernous Sinus',
    subject: 'Anatomy',
    topic: 'Head and Neck',
    subtopic: 'Cavernous Sinus',
    fileType: 'generated-pdf',
    fileName: 'headneck_cavernous_sinus_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Cavernous Sinus within Head and Neck Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10.0,
    dataAiHint: "brain sinus"
  },
  {
    id: 'anat-headneck-posterior-cranial-fossa-10',
    title: 'Posterior Cranial Fossa',
    subject: 'Anatomy',
    topic: 'Head and Neck',
    subtopic: 'Posterior Cranial Fossa',
    fileType: 'generated-pdf',
    fileName: 'headneck_posterior_cranial_fossa_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Posterior Cranial Fossa within Head and Neck Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 9.9,
    dataAiHint: "skull anatomy"
  },
  {
    id: 'anat-headneck-facial-nerve-11',
    title: 'Facial Nerve',
    subject: 'Anatomy',
    topic: 'Head and Neck',
    subtopic: 'Facial Nerve',
    fileType: 'generated-pdf',
    fileName: 'headneck_facial_nerve_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Facial Nerve within Head and Neck Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 9.8,
    dataAiHint: "cranial nerve"
  },
  {
    id: 'anat-headneck-glossopharyngeal-nerve-12',
    title: 'Glossopharyngeal Nerve',
    subject: 'Anatomy',
    topic: 'Head and Neck',
    subtopic: 'Glossopharyngeal Nerve',
    fileType: 'generated-pdf',
    fileName: 'headneck_glossopharyngeal_nerve_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Glossopharyngeal Nerve within Head and Neck Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 9.7,
    dataAiHint: "cranial nerve"
  },
  {
    id: 'anat-headneck-vagus-nerve-13',
    title: 'Vagus Nerve',
    subject: 'Anatomy',
    topic: 'Head and Neck',
    subtopic: 'Vagus Nerve',
    fileType: 'generated-pdf',
    fileName: 'headneck_vagus_nerve_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Vagus Nerve within Head and Neck Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 9.6,
    dataAiHint: "cranial nerve"
  },
  {
    id: 'anat-headneck-hypoglossal-nerve-14',
    title: 'Hypoglossal Nerve',
    subject: 'Anatomy',
    topic: 'Head and Neck',
    subtopic: 'Hypoglossal Nerve',
    fileType: 'generated-pdf',
    fileName: 'headneck_hypoglossal_nerve_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Hypoglossal Nerve within Head and Neck Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 9.5,
    dataAiHint: "cranial nerve"
  },
  {
    id: 'anat-headneck-cervical-plexus-15',
    title: 'Cervical Plexus',
    subject: 'Anatomy',
    topic: 'Head and Neck',
    subtopic: 'Cervical Plexus',
    fileType: 'generated-pdf',
    fileName: 'headneck_cervical_plexus_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Cervical Plexus within Head and Neck Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 9.4,
    dataAiHint: "nerve plexus"
  },
  {
    id: 'anat-headneck-scalenus-anterior-relations-16',
    title: 'Scalenus Anterior Muscle: Relations',
    subject: 'Anatomy',
    topic: 'Head and Neck',
    subtopic: 'Scalenus Anterior Muscle: Relations',
    fileType: 'generated-pdf',
    fileName: 'headneck_scalenus_anterior_relations_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Scalenus Anterior Muscle: Relations within Head and Neck Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 9.3,
    dataAiHint: "neck muscle"
  },
  {
    id: 'anat-headneck-arterial-supply-17',
    title: 'Arterial Supply (Head and Neck)',
    subject: 'Anatomy',
    topic: 'Head and Neck',
    subtopic: 'Arterial Supply', // Simplified from syllabus for consistency
    fileType: 'generated-pdf',
    fileName: 'headneck_arterial_supply_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Arterial Supply of the Head and Neck.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 9.2,
    dataAiHint: "head arteries"
  },
  {
    id: 'anat-headneck-venous-drainage-18',
    title: 'Venous Drainage (Head and Neck)',
    subject: 'Anatomy',
    topic: 'Head and Neck',
    subtopic: 'Venous Drainage', // Simplified
    fileType: 'generated-pdf',
    fileName: 'headneck_venous_drainage_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Venous Drainage of the Head and Neck.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 9.1,
    dataAiHint: "head veins"
  },
  {
    id: 'anat-headneck-lymphatic-drainage-19',
    title: 'Lymphatic Drainage (Head and Neck)',
    subject: 'Anatomy',
    topic: 'Head and Neck',
    subtopic: 'Lymphatic Drainage', // Simplified
    fileType: 'generated-pdf',
    fileName: 'headneck_lymphatic_drainage_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Lymphatic Drainage of the Head and Neck.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 9.0,
    dataAiHint: "lymph nodes"
  },
  {
    id: 'anat-headneck-scalp-20',
    title: 'Scalp',
    subject: 'Anatomy',
    topic: 'Head and Neck',
    subtopic: 'Scalp',
    fileType: 'generated-pdf',
    fileName: 'headneck_scalp_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Scalp within Head and Neck Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 8.9,
    dataAiHint: "scalp anatomy"
  },
  {
    id: 'anat-headneck-neck-triangles-21',
    title: 'Neck Triangles',
    subject: 'Anatomy',
    topic: 'Head and Neck',
    subtopic: 'Neck Triangles',
    fileType: 'generated-pdf',
    fileName: 'headneck_neck_triangles_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Neck Triangles within Head and Neck Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 8.8,
    dataAiHint: "neck anatomy"
  },
  {
    id: 'anat-headneck-neck-fascia-spaces-22',
    title: 'Neck Fascia and Spaces',
    subject: 'Anatomy',
    topic: 'Head and Neck',
    subtopic: 'Neck Fascia and Spaces',
    fileType: 'generated-pdf',
    fileName: 'headneck_neck_fascia_spaces_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Neck Fascia and Spaces within Head and Neck Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 8.7,
    dataAiHint: "neck fascia"
  },
  {
    id: 'anat-headneck-parotid-gland-23',
    title: 'Parotid Gland',
    subject: 'Anatomy',
    topic: 'Head and Neck',
    subtopic: 'Parotid Gland',
    fileType: 'generated-pdf',
    fileName: 'headneck_parotid_gland_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Parotid Gland within Head and Neck Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 8.6,
    dataAiHint: "salivary gland"
  },
  {
    id: 'anat-headneck-pharynx-24',
    title: 'Pharynx',
    subject: 'Anatomy',
    topic: 'Head and Neck',
    subtopic: 'Pharynx',
    fileType: 'generated-pdf',
    fileName: 'headneck_pharynx_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Pharynx within Head and Neck Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 8.5,
    dataAiHint: "throat anatomy"
  },
  {
    id: 'anat-headneck-oesophagus-25',
    title: 'Oesophagus',
    subject: 'Anatomy',
    topic: 'Head and Neck',
    subtopic: 'Oesophagus',
    fileType: 'generated-pdf',
    fileName: 'headneck_oesophagus_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Oesophagus within Head and Neck Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 8.4,
    dataAiHint: "esophagus anatomy"
  },
  {
    id: 'anat-headneck-larynx-26',
    title: 'Larynx',
    subject: 'Anatomy',
    topic: 'Head and Neck',
    subtopic: 'Larynx',
    fileType: 'generated-pdf',
    fileName: 'headneck_larynx_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Larynx within Head and Neck Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 8.3,
    dataAiHint: "voice box"
  },
  {
    id: 'anat-headneck-vertebral-landmarks-trachea-27',
    title: 'Vertebral Landmarks and Trachea',
    subject: 'Anatomy',
    topic: 'Head and Neck',
    subtopic: 'Vertebral Landmarks and Trachea',
    fileType: 'generated-pdf',
    fileName: 'headneck_vertebral_landmarks_trachea_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Vertebral Landmarks and Trachea within Head and Neck Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 8.2,
    dataAiHint: "neck vertebrae"
  },
  {
    id: 'anat-headneck-ear-28',
    title: 'Ear',
    subject: 'Anatomy',
    topic: 'Head and Neck',
    subtopic: 'Ear',
    fileType: 'generated-pdf',
    fileName: 'headneck_ear_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Ear within Head and Neck Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 8.1,
    dataAiHint: "ear anatomy"
  },
  {
    id: 'anat-headneck-nose-29',
    title: 'Nose',
    subject: 'Anatomy',
    topic: 'Head and Neck',
    subtopic: 'Nose',
    fileType: 'generated-pdf',
    fileName: 'headneck_nose_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Nose within Head and Neck Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 8.0,
    dataAiHint: "nose anatomy"
  },
  {
    id: 'anat-headneck-eyeball-30',
    title: 'Eyeball',
    subject: 'Anatomy',
    topic: 'Head and Neck',
    subtopic: 'Eyeball',
    fileType: 'generated-pdf',
    fileName: 'headneck_eyeball_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Eyeball within Head and Neck Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7.9,
    dataAiHint: "eye anatomy"
  },
  {
    id: 'anat-headneck-cranial-nerves-3-4-6-31',
    title: 'Cranial Nerves III, IV, and VI',
    subject: 'Anatomy',
    topic: 'Head and Neck',
    subtopic: 'Cranial Nerves III, IV, and VI',
    fileType: 'generated-pdf',
    fileName: 'headneck_cranial_nerves_3_4_6_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Cranial Nerves III, IV, and VI within Head and Neck Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7.8,
    dataAiHint: "eye movement nerves"
  },

  // Anatomy - Back Region
  {
    id: 'anat-back-spinal-cord-termination-0',
    title: 'Spinal Cord Termination',
    subject: 'Anatomy',
    topic: 'Back Region',
    subtopic: 'Spinal Cord Termination',
    fileType: 'generated-pdf',
    fileName: 'back_spinal_cord_termination_notes.pdf',
    generatedTextContent: 'Examines the anatomy of the vertebral column, individual vertebrae characteristics, and the termination point of the spinal cord (conus medullaris).',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 8,
    dataAiHint: "spinal cord"
  },
  {
    id: 'anat-back-spinal-cord-enlargements-spaces-1',
    title: 'Spinal Cord: Enlargements and Spaces',
    subject: 'Anatomy',
    topic: 'Back Region',
    subtopic: 'Spinal Cord: Enlargements and Spaces',
    fileType: 'generated-pdf',
    fileName: 'back_spinal_cord_enlargements_spaces_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Spinal Cord: Enlargements and Spaces within Back Region Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7.7,
    dataAiHint: "spinal anatomy"
  },
  {
    id: 'anat-back-vertebrae-2',
    title: 'Vertebrae',
    subject: 'Anatomy',
    topic: 'Back Region',
    subtopic: 'Vertebrae',
    fileType: 'generated-pdf',
    fileName: 'back_vertebrae_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Vertebrae within Back Region Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7.6,
    dataAiHint: "spine bones"
  },
  {
    id: 'anat-back-lumbar-puncture-3',
    title: 'Lumbar Puncture',
    subject: 'Anatomy',
    topic: 'Back Region',
    subtopic: 'Lumbar Puncture',
    fileType: 'generated-pdf',
    fileName: 'back_lumbar_puncture_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Lumbar Puncture within Back Region Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7.5,
    dataAiHint: "spinal tap"
  },
  {
    id: 'anat-back-vertebral-curvatures-slip-disc-4',
    title: 'Vertebral Curvatures and Slip Disc',
    subject: 'Anatomy',
    topic: 'Back Region',
    subtopic: 'Vertebral Curvatures and Slip Disc',
    fileType: 'generated-pdf',
    fileName: 'back_vertebral_curvatures_slip_disc_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Vertebral Curvatures and Slip Disc within Back Region Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7.4,
    dataAiHint: "spine disc"
  },
  {
    id: 'anat-back-cranio-vertebral-joints-5',
    title: 'Cranio-Vertebral Joints',
    subject: 'Anatomy',
    topic: 'Back Region',
    subtopic: 'Cranio-Vertebral Joints',
    fileType: 'generated-pdf',
    fileName: 'back_cranio_vertebral_joints_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Cranio-Vertebral Joints within Back Region Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7.3,
    dataAiHint: "neck joints"
  },
  {
    id: 'anat-back-vertebral-landmarks-triangles-6',
    title: 'Vertebral Landmarks and Triangles',
    subject: 'Anatomy',
    topic: 'Back Region',
    subtopic: 'Vertebral Landmarks and Triangles',
    fileType: 'generated-pdf',
    fileName: 'back_vertebral_landmarks_triangles_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Vertebral Landmarks and Triangles within Back Region Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7.2,
    dataAiHint: "back anatomy"
  },

  // Anatomy - Thorax
  {
    id: 'anat-thorax-dev-cardiovascular-system-0',
    title: 'Development of Cardiovascular System',
    subject: 'Anatomy',
    topic: 'Thorax',
    subtopic: 'Development of Cardiovascular System',
    fileType: 'generated-pdf',
    fileName: 'thorax_dev_cardiovascular_system_notes.pdf',
    generatedTextContent: 'Overview of the key stages in embryonic heart development, including heart tube formation, looping, septation, and development of major vessels.',
    generatedImages: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
    dataAiHint: "heart embryo"
  },
  {
    id: 'anat-thorax-dev-embryonic-veins-1',
    title: 'Development of Embryonic Veins',
    subject: 'Anatomy',
    topic: 'Thorax',
    subtopic: 'Development of Embryonic Veins',
    fileType: 'generated-pdf',
    fileName: 'thorax_dev_embryonic_veins_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Development of Embryonic Veins within Thorax Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7.1,
    dataAiHint: "embryo veins"
  },
  {
    id: 'anat-thorax-dev-heart-tube-2',
    title: 'Development of Heart Tube',
    subject: 'Anatomy',
    topic: 'Thorax',
    subtopic: 'Development of Heart Tube',
    fileType: 'generated-pdf',
    fileName: 'thorax_dev_heart_tube_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Development of Heart Tube within Thorax Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7.0,
    dataAiHint: "heart development"
  },
  {
    id: 'anat-thorax-transverse-pericardial-sinus-3',
    title: 'Transverse Pericardial Sinus',
    subject: 'Anatomy',
    topic: 'Thorax',
    subtopic: 'Transverse Pericardial Sinus',
    fileType: 'generated-pdf',
    fileName: 'thorax_transverse_pericardial_sinus_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Transverse Pericardial Sinus within Thorax Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6.9,
    dataAiHint: "heart anatomy"
  },
  {
    id: 'anat-thorax-interatrial-septum-dev-4',
    title: 'Interatrial Septum Development',
    subject: 'Anatomy',
    topic: 'Thorax',
    subtopic: 'Interatrial Septum Development',
    fileType: 'generated-pdf',
    fileName: 'thorax_interatrial_septum_dev_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Interatrial Septum Development within Thorax Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6.8,
    dataAiHint: "heart septum"
  },
  {
    id: 'anat-thorax-ap-septum-formation-anomalies-5',
    title: 'AP Septum Formation and Anomalies',
    subject: 'Anatomy',
    topic: 'Thorax',
    subtopic: 'AP Septum Formation and Anomalies',
    fileType: 'generated-pdf',
    fileName: 'thorax_ap_septum_formation_anomalies_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of AP Septum Formation and Anomalies within Thorax Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6.7,
    dataAiHint: "heart defect"
  },
  {
    id: 'anat-thorax-fetoplacental-circulation-6',
    title: 'Fetoplacental Circulation',
    subject: 'Anatomy',
    topic: 'Thorax',
    subtopic: 'Fetoplacental Circulation',
    fileType: 'generated-pdf',
    fileName: 'thorax_fetoplacental_circulation_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Fetoplacental Circulation within Thorax Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6.6,
    dataAiHint: "fetal circulation"
  },
  {
    id: 'anat-thorax-heart-surfaces-grooves-7',
    title: 'Heart: Surfaces and Grooves',
    subject: 'Anatomy',
    topic: 'Thorax',
    subtopic: 'Heart: Surfaces and Grooves',
    fileType: 'generated-pdf',
    fileName: 'thorax_heart_surfaces_grooves_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Heart: Surfaces and Grooves within Thorax Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6.5,
    dataAiHint: "heart anatomy"
  },
  {
    id: 'anat-thorax-heart-venous-drainage-8',
    title: 'Heart: Venous Drainage',
    subject: 'Anatomy',
    topic: 'Thorax',
    subtopic: 'Heart: Venous Drainage',
    fileType: 'generated-pdf',
    fileName: 'thorax_heart_venous_drainage_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Heart: Venous Drainage within Thorax Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6.4,
    dataAiHint: "heart veins"
  },
  {
    id: 'anat-thorax-heart-interior-features-9',
    title: 'Heart: Interior Features',
    subject: 'Anatomy',
    topic: 'Thorax',
    subtopic: 'Heart: Interior Features',
    fileType: 'generated-pdf',
    fileName: 'thorax_heart_interior_features_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Heart: Interior Features within Thorax Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6.3,
    dataAiHint: "heart chambers"
  },
  {
    id: 'anat-thorax-heart-arterial-supply-10',
    title: 'Heart: Arterial Supply',
    subject: 'Anatomy',
    topic: 'Thorax',
    subtopic: 'Heart: Arterial Supply',
    fileType: 'generated-pdf',
    fileName: 'thorax_heart_arterial_supply_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Heart: Arterial Supply within Thorax Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6.2,
    dataAiHint: "coronary arteries"
  },
  {
    id: 'anat-thorax-sternal-angle-mediastinum-11',
    title: 'Sternal Angle and Mediastinum',
    subject: 'Anatomy',
    topic: 'Thorax',
    subtopic: 'Sternal Angle and Mediastinum',
    fileType: 'generated-pdf',
    fileName: 'thorax_sternal_angle_mediastinum_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Sternal Angle and Mediastinum within Thorax Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6.1,
    dataAiHint: "chest anatomy"
  },
  {
    id: 'anat-thorax-lungs-hilum-12',
    title: 'Lungs: Hilum',
    subject: 'Anatomy',
    topic: 'Thorax',
    subtopic: 'Lungs: Hilum',
    fileType: 'generated-pdf',
    fileName: 'thorax_lungs_hilum_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Lungs: Hilum within Thorax Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6.0,
    dataAiHint: "lung anatomy"
  },
  {
    id: 'anat-thorax-lungs-bronchopulmonary-segments-13',
    title: 'Lungs: Bronchopulmonary Segments',
    subject: 'Anatomy',
    topic: 'Thorax',
    subtopic: 'Lungs: Bronchopulmonary Segments',
    fileType: 'generated-pdf',
    fileName: 'thorax_lungs_bronchopulmonary_segments_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Lungs: Bronchopulmonary Segments within Thorax Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5.9,
    dataAiHint: "lung segments"
  },
  {
    id: 'anat-thorax-lungs-pleura-surface-markings-14',
    title: 'Lungs: Pleura - Surface Markings',
    subject: 'Anatomy',
    topic: 'Thorax',
    subtopic: 'Lungs: Pleura - Surface Markings',
    fileType: 'generated-pdf',
    fileName: 'thorax_lungs_pleura_surface_markings_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Lungs: Pleura - Surface Markings within Thorax Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5.8,
    dataAiHint: "lung pleura"
  },
  {
    id: 'anat-thorax-joints-thorax-15',
    title: 'Joints (Thorax)', // Matched to syllabus "Joints" under Thorax
    subject: 'Anatomy',
    topic: 'Thorax',
    subtopic: 'Joints', // Matched to syllabus
    fileType: 'generated-pdf',
    fileName: 'thorax_joints_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Joints of the Thorax.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5.7,
    dataAiHint: "rib cage joints"
  },
  {
    id: 'anat-thorax-respiratory-movements-16',
    title: 'Respiratory Movements',
    subject: 'Anatomy',
    topic: 'Thorax',
    subtopic: 'Respiratory Movements',
    fileType: 'generated-pdf',
    fileName: 'thorax_respiratory_movements_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Respiratory Movements within Thorax Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5.6,
    dataAiHint: "breathing mechanics"
  },
  {
    id: 'anat-thorax-intercostal-drainage-block-17',
    title: 'Intercostal Drainage and Block',
    subject: 'Anatomy',
    topic: 'Thorax',
    subtopic: 'Intercostal Drainage and Block',
    fileType: 'generated-pdf',
    fileName: 'thorax_intercostal_drainage_block_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Intercostal Drainage and Block within Thorax Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5.5,
    dataAiHint: "chest tube"
  },
  {
    id: 'anat-thorax-phrenic-nerve-18',
    title: 'Phrenic Nerve',
    subject: 'Anatomy',
    topic: 'Thorax',
    subtopic: 'Phrenic Nerve',
    fileType: 'generated-pdf',
    fileName: 'thorax_phrenic_nerve_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Phrenic Nerve within Thorax Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5.4,
    dataAiHint: "diaphragm nerve"
  },
  {
    id: 'anat-thorax-venous-drainage-thorax-19',
    title: 'Venous Drainage (Thorax)', // Matched to syllabus "Venous Drainage" under Thorax
    subject: 'Anatomy',
    topic: 'Thorax',
    subtopic: 'Venous Drainage', // Matched to syllabus
    fileType: 'generated-pdf',
    fileName: 'thorax_venous_drainage_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Venous Drainage of the Thorax.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5.3,
    dataAiHint: "chest veins"
  },
  {
    id: 'anat-thorax-lymphatic-drainage-thorax-20',
    title: 'Lymphatic Drainage (Thorax)', // Matched to syllabus "Lymphatic Drainage" under Thorax
    subject: 'Anatomy',
    topic: 'Thorax',
    subtopic: 'Lymphatic Drainage', // Matched to syllabus
    fileType: 'generated-pdf',
    fileName: 'thorax_lymphatic_drainage_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Lymphatic Drainage of the Thorax.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5.2,
    dataAiHint: "chest lymph"
  },

  // Anatomy - Upper Limb
  {
    id: 'anat-upperlimb-embryology-0',
    title: 'Embryology (Upper Limb)',
    subject: 'Anatomy',
    topic: 'Upper Limb',
    subtopic: 'Embryology', // Matched to syllabus
    fileType: 'generated-pdf',
    fileName: 'upperlimb_embryology_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Embryology of the Upper Limb.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5.1,
    dataAiHint: "arm development"
  },
  {
    id: 'anat-upperlimb-nerve-supply-overview-1',
    title: 'Nerve Supply Overview (Upper Limb)',
    subject: 'Anatomy',
    topic: 'Upper Limb',
    subtopic: 'Nerve Supply Overview', // Matched to syllabus
    fileType: 'generated-pdf',
    fileName: 'upperlimb_nerve_supply_overview_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Nerve Supply Overview of the Upper Limb.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5.0,
    dataAiHint: "arm nerves"
  },
  {
    id: 'anat-upperlimb-dermatomes-myotomes-2',
    title: 'Dermatomes and Myotomes (Upper Limb)',
    subject: 'Anatomy',
    topic: 'Upper Limb',
    subtopic: 'Dermatomes and Myotomes', // Matched to syllabus
    fileType: 'generated-pdf',
    fileName: 'upperlimb_dermatomes_myotomes_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Dermatomes and Myotomes of the Upper Limb.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 4.9,
    dataAiHint: "skin innervation"
  },
  {
    id: 'anat-upperlimb-brachial-plexus-3',
    title: 'Brachial Plexus: Trunks and Cords',
    subject: 'Anatomy',
    topic: 'Upper Limb',
    subtopic: 'Brachial Plexus: Trunks and Cords',
    fileType: 'generated-pdf',
    fileName: 'upperlimb_brachial_plexus_notes.pdf',
    generatedTextContent: 'Detailed explanation of the brachial plexus, including its roots, trunks, divisions, cords, and branches. Clinical significance of injuries discussed.',
    generatedImages: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
    dataAiHint: "brachial plexus"
  },
  {
    id: 'anat-upperlimb-bones-muscles-proximal-4',
    title: 'Bones and Muscles (Proximal Region)',
    subject: 'Anatomy',
    topic: 'Upper Limb',
    subtopic: 'Bones and Muscles (Proximal Region)',
    fileType: 'generated-pdf',
    fileName: 'upperlimb_bones_muscles_proximal_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Bones and Muscles of the Proximal Region of the Upper Limb.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 4.7,
    dataAiHint: "shoulder arm"
  },
  {
    id: 'anat-upperlimb-axilla-5',
    title: 'Axilla',
    subject: 'Anatomy',
    topic: 'Upper Limb',
    subtopic: 'Axilla',
    fileType: 'generated-pdf',
    fileName: 'upperlimb_axilla_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Axilla within Upper Limb Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 4.6,
    dataAiHint: "armpit anatomy"
  },
  {
    id: 'anat-upperlimb-scapular-movements-6',
    title: 'Scapular Movements',
    subject: 'Anatomy',
    topic: 'Upper Limb',
    subtopic: 'Scapular Movements',
    fileType: 'generated-pdf',
    fileName: 'upperlimb_scapular_movements_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Scapular Movements within Upper Limb Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 4.5,
    dataAiHint: "shoulder blade"
  },
  {
    id: 'anat-upperlimb-clavipectoral-fascia-7',
    title: 'Clavipectoral Fascia',
    subject: 'Anatomy',
    topic: 'Upper Limb',
    subtopic: 'Clavipectoral Fascia',
    fileType: 'generated-pdf',
    fileName: 'upperlimb_clavipectoral_fascia_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Clavipectoral Fascia within Upper Limb Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 4.4,
    dataAiHint: "chest fascia"
  },
  {
    id: 'anat-upperlimb-muscles-anterior-arm-8',
    title: 'Muscles of Anterior Arm Region',
    subject: 'Anatomy',
    topic: 'Upper Limb',
    subtopic: 'Muscles of Anterior Arm Region',
    fileType: 'generated-pdf',
    fileName: 'upperlimb_muscles_anterior_arm_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Muscles of the Anterior Arm Region within Upper Limb Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 4.3,
    dataAiHint: "biceps arm"
  },
  {
    id: 'anat-upperlimb-muscles-anterior-forearm-9',
    title: 'Muscles of Anterior Forearm Region',
    subject: 'Anatomy',
    topic: 'Upper Limb',
    subtopic: 'Muscles of Anterior Forearm Region',
    fileType: 'generated-pdf',
    fileName: 'upperlimb_muscles_anterior_forearm_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Muscles of the Anterior Forearm Region within Upper Limb Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 4.2,
    dataAiHint: "forearm muscles"
  },
  {
    id: 'anat-upperlimb-cubital-fossa-10',
    title: 'Cubital Fossa',
    subject: 'Anatomy',
    topic: 'Upper Limb',
    subtopic: 'Cubital Fossa',
    fileType: 'generated-pdf',
    fileName: 'upperlimb_cubital_fossa_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Cubital Fossa within Upper Limb Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 4.1,
    dataAiHint: "elbow anatomy"
  },
  {
    id: 'anat-upperlimb-carpal-metacarpal-bones-11',
    title: 'Carpal and Metacarpal Bones',
    subject: 'Anatomy',
    topic: 'Upper Limb',
    subtopic: 'Carpal and Metacarpal Bones',
    fileType: 'generated-pdf',
    fileName: 'upperlimb_carpal_metacarpal_bones_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Carpal and Metacarpal Bones within Upper Limb Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 4.0,
    dataAiHint: "hand bones"
  },
  {
    id: 'anat-upperlimb-muscles-hand-12',
    title: 'Muscles of Hand',
    subject: 'Anatomy',
    topic: 'Upper Limb',
    subtopic: 'Muscles of Hand',
    fileType: 'generated-pdf',
    fileName: 'upperlimb_muscles_hand_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Muscles of the Hand within Upper Limb Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3.9,
    dataAiHint: "hand muscles"
  },
  {
    id: 'anat-upperlimb-posterior-forearm-muscles-13',
    title: 'Posterior Forearm Muscles',
    subject: 'Anatomy',
    topic: 'Upper Limb',
    subtopic: 'Posterior Forearm Muscles',
    fileType: 'generated-pdf',
    fileName: 'upperlimb_posterior_forearm_muscles_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Posterior Forearm Muscles within Upper Limb Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3.8,
    dataAiHint: "forearm extensors"
  },
  {
    id: 'anat-upperlimb-anatomical-snuff-box-14',
    title: 'Anatomical Snuff Box',
    subject: 'Anatomy',
    topic: 'Upper Limb',
    subtopic: 'Anatomical Snuff Box',
    fileType: 'generated-pdf',
    fileName: 'upperlimb_anatomical_snuff_box_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Anatomical Snuff Box within Upper Limb Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3.7,
    dataAiHint: "wrist anatomy"
  },
  {
    id: 'anat-upperlimb-nerve-supply-ant-forearm-hand-15',
    title: 'Nerve Supply of Anterior Forearm and Hand Muscles',
    subject: 'Anatomy',
    topic: 'Upper Limb',
    subtopic: 'Nerve Supply of Anterior Forearm and Hand Muscles',
    fileType: 'generated-pdf',
    fileName: 'upperlimb_nerve_supply_ant_forearm_hand_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Nerve Supply of Anterior Forearm and Hand Muscles within Upper Limb Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3.6,
    dataAiHint: "median ulnar nerve"
  },
  {
    id: 'anat-upperlimb-median-ulnar-radial-lesions-16',
    title: 'Median, Ulnar, and Radial Nerve Lesions',
    subject: 'Anatomy',
    topic: 'Upper Limb',
    subtopic: 'Median, Ulnar, and Radial Nerve Lesions',
    fileType: 'generated-pdf',
    fileName: 'upperlimb_median_ulnar_radial_lesions_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Median, Ulnar, and Radial Nerve Lesions within Upper Limb Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3.5,
    dataAiHint: "nerve injury"
  },
  {
    id: 'anat-upperlimb-comparative-nerve-lesions-17',
    title: 'Comparative Analysis of Nerve Lesions',
    subject: 'Anatomy',
    topic: 'Upper Limb',
    subtopic: 'Comparative Analysis of Nerve Lesions',
    fileType: 'generated-pdf',
    fileName: 'upperlimb_comparative_nerve_lesions_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Comparative Analysis of Nerve Lesions within Upper Limb Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3.4,
    dataAiHint: "nerve palsy"
  },
  {
    id: 'anat-upperlimb-arterial-supply-18',
    title: 'Arterial Supply (Upper Limb)', // Simplified to match syllabus "Arterial Supply"
    subject: 'Anatomy',
    topic: 'Upper Limb',
    subtopic: 'Arterial Supply', // Simplified
    fileType: 'generated-pdf',
    fileName: 'upperlimb_arterial_supply_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Arterial Supply of the Upper Limb.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3.3,
    dataAiHint: "arm arteries"
  },
  {
    id: 'anat-upperlimb-venous-drainage-19',
    title: 'Venous Drainage (Upper Limb)', // Simplified
    subject: 'Anatomy',
    topic: 'Upper Limb',
    subtopic: 'Venous Drainage', // Simplified
    fileType: 'generated-pdf',
    fileName: 'upperlimb_venous_drainage_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Venous Drainage of the Upper Limb.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3.2,
    dataAiHint: "arm veins"
  },
  {
    id: 'anat-upperlimb-lymphatic-drainage-20',
    title: 'Lymphatic Drainage (Upper Limb)', // Simplified
    subject: 'Anatomy',
    topic: 'Upper Limb',
    subtopic: 'Lymphatic Drainage', // Simplified
    fileType: 'generated-pdf',
    fileName: 'upperlimb_lymphatic_drainage_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Lymphatic Drainage of the Upper Limb.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3.1,
    dataAiHint: "arm lymph"
  },
  {
    id: 'anat-upperlimb-hand-spaces-21',
    title: 'Hand Spaces',
    subject: 'Anatomy',
    topic: 'Upper Limb',
    subtopic: 'Hand Spaces',
    fileType: 'generated-pdf',
    fileName: 'upperlimb_hand_spaces_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Hand Spaces within Upper Limb Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3.0,
    dataAiHint: "hand infection"
  },

  // Anatomy - Abdomen
  {
    id: 'anat-abdomen-umbilical-cord-anomalies-0',
    title: 'Umbilical Cord Contents and Anomalies',
    subject: 'Anatomy',
    topic: 'Abdomen',
    subtopic: 'Umbilical Cord Contents and Anomalies',
    fileType: 'generated-pdf',
    fileName: 'abdomen_umbilical_cord_anomalies_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Umbilical Cord Contents and Anomalies within Abdomen Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2.9,
    dataAiHint: "umbilical cord"
  },
  {
    id: 'anat-abdomen-diaphragm-dev-openings-1',
    title: 'Diaphragm: Development and Openings',
    subject: 'Anatomy',
    topic: 'Abdomen',
    subtopic: 'Diaphragm: Development and Openings',
    fileType: 'generated-pdf',
    fileName: 'abdomen_diaphragm_dev_openings_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Diaphragm: Development and Openings within Abdomen Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2.8,
    dataAiHint: "diaphragm anatomy"
  },
  {
    id: 'anat-abdomen-dev-mesentery-pancreas-2',
    title: 'Development of Mesentery and Pancreas',
    subject: 'Anatomy',
    topic: 'Abdomen',
    subtopic: 'Development of Mesentery and Pancreas',
    fileType: 'generated-pdf',
    fileName: 'abdomen_dev_mesentery_pancreas_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Development of Mesentery and Pancreas within Abdomen Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2.7,
    dataAiHint: "gut development"
  },
  {
    id: 'anat-abdomen-gut-rotation-3',
    title: 'Gut Rotation',
    subject: 'Anatomy',
    topic: 'Abdomen',
    subtopic: 'Gut Rotation',
    fileType: 'generated-pdf',
    fileName: 'abdomen_gut_rotation_notes.pdf',
    generatedTextContent: 'Explanation of the embryonic development of the gut, including physiological herniation, rotation of the midgut, and formation of mesenteries. Common congenital anomalies are discussed.',
    generatedImages: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 9,
    dataAiHint: "embryo gut"
  },
  {
    id: 'anat-abdomen-abdominal-planes-4',
    title: 'Abdominal Planes',
    subject: 'Anatomy',
    topic: 'Abdomen',
    subtopic: 'Abdominal Planes',
    fileType: 'generated-pdf',
    fileName: 'abdomen_abdominal_planes_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Abdominal Planes within Abdomen Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2.5,
    dataAiHint: "abdomen regions"
  },
  {
    id: 'anat-abdomen-neurovascular-bundles-5',
    title: 'Neurovascular Bundles (Abdomen)',
    subject: 'Anatomy',
    topic: 'Abdomen',
    subtopic: 'Neurovascular Bundles', // Simplified
    fileType: 'generated-pdf',
    fileName: 'abdomen_neurovascular_bundles_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Neurovascular Bundles of the Abdomen.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2.4,
    dataAiHint: "abdomen nerves"
  },
  {
    id: 'anat-abdomen-liver-6',
    title: 'Liver',
    subject: 'Anatomy',
    topic: 'Abdomen',
    subtopic: 'Liver',
    fileType: 'generated-pdf',
    fileName: 'abdomen_liver_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Liver within Abdomen Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2.3,
    dataAiHint: "liver anatomy"
  },
  {
    id: 'anat-abdomen-inguinal-femoral-herniae-7',
    title: 'Inguinal and Femoral Regions and Associated Herniae',
    subject: 'Anatomy',
    topic: 'Abdomen',
    subtopic: 'Inguinal and Femoral Regions and Associated Herniae',
    fileType: 'generated-pdf',
    fileName: 'abdomen_inguinal_femoral_herniae_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Inguinal and Femoral Regions and Associated Herniae within Abdomen Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2.2,
    dataAiHint: "hernia anatomy"
  },
  {
    id: 'anat-abdomen-peritoneal-cavity-sacs-spaces-8',
    title: 'Peritoneal Cavity: Sacs and Spaces',
    subject: 'Anatomy',
    topic: 'Abdomen',
    subtopic: 'Peritoneal Cavity: Sacs and Spaces',
    fileType: 'generated-pdf',
    fileName: 'abdomen_peritoneal_cavity_sacs_spaces_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Peritoneal Cavity: Sacs and Spaces within Abdomen Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2.1,
    dataAiHint: "peritoneum anatomy"
  },
  {
    id: 'anat-abdomen-arterial-supply-9',
    title: 'Arterial Supply (Abdomen)', // Simplified
    subject: 'Anatomy',
    topic: 'Abdomen',
    subtopic: 'Arterial Supply', // Simplified
    fileType: 'generated-pdf',
    fileName: 'abdomen_arterial_supply_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Arterial Supply of the Abdomen.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2.0,
    dataAiHint: "abdomen arteries"
  },
  {
    id: 'anat-abdomen-stomach-10',
    title: 'Stomach',
    subject: 'Anatomy',
    topic: 'Abdomen',
    subtopic: 'Stomach',
    fileType: 'generated-pdf',
    fileName: 'abdomen_stomach_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Stomach within Abdomen Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1.9,
    dataAiHint: "stomach anatomy"
  },
  {
    id: 'anat-abdomen-small-intestine-11',
    title: 'Small Intestine: Duodenum, Jejunum, Ileum',
    subject: 'Anatomy',
    topic: 'Abdomen',
    subtopic: 'Small Intestine: Duodenum, Jejunum, Ileum',
    fileType: 'generated-pdf',
    fileName: 'abdomen_small_intestine_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Small Intestine (Duodenum, Jejunum, Ileum) within Abdomen Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1.8,
    dataAiHint: "small bowel"
  },
  {
    id: 'anat-abdomen-biliary-apparatus-12',
    title: 'Biliary Apparatus',
    subject: 'Anatomy',
    topic: 'Abdomen',
    subtopic: 'Biliary Apparatus',
    fileType: 'generated-pdf',
    fileName: 'abdomen_biliary_apparatus_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Biliary Apparatus within Abdomen Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1.7,
    dataAiHint: "gallbladder bile"
  },
  {
    id: 'anat-abdomen-large-intestine-13',
    title: 'Large Intestine',
    subject: 'Anatomy',
    topic: 'Abdomen',
    subtopic: 'Large Intestine',
    fileType: 'generated-pdf',
    fileName: 'abdomen_large_intestine_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Large Intestine within Abdomen Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1.6,
    dataAiHint: "colon anatomy"
  },
  {
    id: 'anat-abdomen-pancreas-14',
    title: 'Pancreas',
    subject: 'Anatomy',
    topic: 'Abdomen',
    subtopic: 'Pancreas',
    fileType: 'generated-pdf',
    fileName: 'abdomen_pancreas_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Pancreas within Abdomen Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1.5,
    dataAiHint: "pancreas anatomy"
  },
  {
    id: 'anat-abdomen-kidney-15',
    title: 'Kidney',
    subject: 'Anatomy',
    topic: 'Abdomen',
    subtopic: 'Kidney',
    fileType: 'generated-pdf',
    fileName: 'abdomen_kidney_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Kidney within Abdomen Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1.4,
    dataAiHint: "kidney anatomy"
  },
  {
    id: 'anat-abdomen-ureter-16',
    title: 'Ureter',
    subject: 'Anatomy',
    topic: 'Abdomen',
    subtopic: 'Ureter',
    fileType: 'generated-pdf',
    fileName: 'abdomen_ureter_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Ureter within Abdomen Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1.3,
    dataAiHint: "ureter anatomy"
  },
  {
    id: 'anat-abdomen-venous-drainage-abdo-thorax-17',
    title: 'Venous Drainage of Abdomen and Thorax',
    subject: 'Anatomy',
    topic: 'Abdomen',
    subtopic: 'Venous Drainage of Abdomen and Thorax',
    fileType: 'generated-pdf',
    fileName: 'abdomen_venous_drainage_abdo_thorax_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Venous Drainage of Abdomen and Thorax.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1.2,
    dataAiHint: "portal vein"
  },

  // Anatomy - Pelvis and Perineum
  {
    id: 'anat-pelvis-dev-genito-urinary-system-0',
    title: 'Development of Genito-Urinary System',
    subject: 'Anatomy',
    topic: 'Pelvis and Perineum',
    subtopic: 'Development of Genito-Urinary System',
    fileType: 'generated-pdf',
    fileName: 'pelvis_dev_genito_urinary_system_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Development of Genito-Urinary System within Pelvis and Perineum Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1.1,
    dataAiHint: "urogenital development"
  },
  {
    id: 'anat-pelvis-pelvis-perineum-overview-1',
    title: 'Pelvis and Perineum (Overview)', // Matched to syllabus
    subject: 'Anatomy',
    topic: 'Pelvis and Perineum',
    subtopic: 'Pelvis and Perineum', // Matched to syllabus
    fileType: 'generated-pdf',
    fileName: 'pelvis_pelvis_perineum_overview_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Pelvis and Perineum (Overview).',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1.0,
    dataAiHint: "pelvic anatomy"
  },
  {
    id: 'anat-pelvis-prostate-male-urethra-2',
    title: 'Prostate Gland and Parts of Male Urethra',
    subject: 'Anatomy',
    topic: 'Pelvis and Perineum',
    subtopic: 'Prostate Gland and Parts of Male Urethra',
    fileType: 'generated-pdf',
    fileName: 'pelvis_prostate_male_urethra_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Prostate Gland and Parts of Male Urethra within Pelvis and Perineum Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 0.9,
    dataAiHint: "prostate urethra"
  },
  {
    id: 'anat-pelvis-perineal-pouches-ischiorectal-fossa-3',
    title: 'Perineal Pouches and Ischiorectal Fossa',
    subject: 'Anatomy',
    topic: 'Pelvis and Perineum',
    subtopic: 'Perineal Pouches and Ischiorectal Fossa',
    fileType: 'generated-pdf',
    fileName: 'pelvis_perineal_pouches_ischiorectal_fossa_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Perineal Pouches and Ischiorectal Fossa within Pelvis and Perineum Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 0.8,
    dataAiHint: "perineum anatomy"
  },
  {
    id: 'anat-pelvis-pelvic-diaphragm-4',
    title: 'Pelvic Diaphragm',
    subject: 'Anatomy',
    topic: 'Pelvis and Perineum',
    subtopic: 'Pelvic Diaphragm',
    fileType: 'generated-pdf',
    fileName: 'pelvis_pelvic_diaphragm_notes.pdf',
    generatedTextContent: 'Anatomical overview of the pelvic diaphragm muscles (levator ani and coccygeus) and the structure of perineal pouches.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
    dataAiHint: "pelvic floor"
  },
  {
    id: 'anat-pelvis-extravasation-urine-5',
    title: 'Extravasation of Urine',
    subject: 'Anatomy',
    topic: 'Pelvis and Perineum',
    subtopic: 'Extravasation of Urine',
    fileType: 'generated-pdf',
    fileName: 'pelvis_extravasation_urine_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Extravasation of Urine within Pelvis and Perineum Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 0.6,
    dataAiHint: "urethral injury"
  },
  {
    id: 'anat-pelvis-pudendal-nerve-6',
    title: 'Pudendal Nerve',
    subject: 'Anatomy',
    topic: 'Pelvis and Perineum',
    subtopic: 'Pudendal Nerve',
    fileType: 'generated-pdf',
    fileName: 'pelvis_pudendal_nerve_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Pudendal Nerve within Pelvis and Perineum Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 0.5,
    dataAiHint: "pelvic nerve"
  },
  {
    id: 'anat-pelvis-nerve-supply-7',
    title: 'Nerve Supply (Pelvis and Perineum)', // Simplified
    subject: 'Anatomy',
    topic: 'Pelvis and Perineum',
    subtopic: 'Nerve Supply', // Simplified
    fileType: 'generated-pdf',
    fileName: 'pelvis_nerve_supply_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Nerve Supply of the Pelvis and Perineum.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 0.4,
    dataAiHint: "pelvic nerves"
  },
  {
    id: 'anat-pelvis-arterial-supply-8',
    title: 'Arterial Supply (Pelvis and Perineum)', // Simplified
    subject: 'Anatomy',
    topic: 'Pelvis and Perineum',
    subtopic: 'Arterial Supply', // Simplified
    fileType: 'generated-pdf',
    fileName: 'pelvis_arterial_supply_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Arterial Supply of the Pelvis and Perineum.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 0.3,
    dataAiHint: "pelvic arteries"
  },
  {
    id: 'anat-pelvis-female-reproductive-system-9',
    title: 'Female Reproductive System',
    subject: 'Anatomy',
    topic: 'Pelvis and Perineum',
    subtopic: 'Female Reproductive System',
    fileType: 'generated-pdf',
    fileName: 'pelvis_female_reproductive_system_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Female Reproductive System within Pelvis and Perineum Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 0.2,
    dataAiHint: "uterus ovary"
  },
  {
    id: 'anat-pelvis-rectum-anal-canal-10',
    title: 'Rectum and Anal Canal',
    subject: 'Anatomy',
    topic: 'Pelvis and Perineum',
    subtopic: 'Rectum and Anal Canal',
    fileType: 'generated-pdf',
    fileName: 'pelvis_rectum_anal_canal_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Rectum and Anal Canal within Pelvis and Perineum Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 0.1,
    dataAiHint: "rectum anatomy"
  },

  // Anatomy - Lower Limb
  {
    id: 'anat-lowerlimb-nerve-supply-overview-0',
    title: 'Nerve Supply Overview (Lower Limb)',
    subject: 'Anatomy',
    topic: 'Lower Limb',
    subtopic: 'Nerve Supply Overview', // Matched syllabus
    fileType: 'generated-pdf',
    fileName: 'lowerlimb_nerve_supply_overview_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Nerve Supply Overview of the Lower Limb.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 0.0,
    dataAiHint: "leg nerves"
  },
  {
    id: 'anat-lowerlimb-muscles-proximal-region-1',
    title: 'Muscles of Proximal Region (Hip and Knee Joints)',
    subject: 'Anatomy',
    topic: 'Lower Limb',
    subtopic: 'Muscles of Proximal Region (Hip and Knee Joints)',
    fileType: 'generated-pdf',
    fileName: 'lowerlimb_muscles_proximal_region_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Muscles of the Proximal Region (Hip and Knee Joints) within Lower Limb Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() + 1000 * 60 * 60 * 24 * 0.1,
    dataAiHint: "hip knee muscles"
  },
  {
    id: 'anat-lowerlimb-nerve-supply-thigh-muscles-2',
    title: 'Nerve Supply to Thigh Muscles',
    subject: 'Anatomy',
    topic: 'Lower Limb',
    subtopic: 'Nerve Supply to Thigh Muscles',
    fileType: 'generated-pdf',
    fileName: 'lowerlimb_nerve_supply_thigh_muscles_notes.pdf',
    generatedTextContent: 'A review of the major nerves supplying the muscles of the anterior, medial, and posterior compartments of the thigh, including the femoral, obturator, and sciatic nerves.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 11,
    dataAiHint: "thigh nerves"
  },
  {
    id: 'anat-lowerlimb-muscles-gluteal-region-3',
    title: 'Muscles of Gluteal Region',
    subject: 'Anatomy',
    topic: 'Lower Limb',
    subtopic: 'Muscles of Gluteal Region',
    fileType: 'generated-pdf',
    fileName: 'lowerlimb_muscles_gluteal_region_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Muscles of the Gluteal Region within Lower Limb Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() + 1000 * 60 * 60 * 24 * 0.3,
    dataAiHint: "glutes muscles"
  },
  {
    id: 'anat-lowerlimb-muscles-anterior-thigh-4',
    title: 'Muscles of Anterior Thigh',
    subject: 'Anatomy',
    topic: 'Lower Limb',
    subtopic: 'Muscles of Anterior Thigh',
    fileType: 'generated-pdf',
    fileName: 'lowerlimb_muscles_anterior_thigh_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Muscles of the Anterior Thigh within Lower Limb Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() + 1000 * 60 * 60 * 24 * 0.4,
    dataAiHint: "quadriceps muscles"
  },
  {
    id: 'anat-lowerlimb-muscles-medial-thigh-5',
    title: 'Muscles of Medial Thigh',
    subject: 'Anatomy',
    topic: 'Lower Limb',
    subtopic: 'Muscles of Medial Thigh',
    fileType: 'generated-pdf',
    fileName: 'lowerlimb_muscles_medial_thigh_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Muscles of the Medial Thigh within Lower Limb Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() + 1000 * 60 * 60 * 24 * 0.5,
    dataAiHint: "adductor muscles"
  },
  {
    id: 'anat-lowerlimb-muscles-posterior-thigh-6',
    title: 'Muscles of Posterior Thigh',
    subject: 'Anatomy',
    topic: 'Lower Limb',
    subtopic: 'Muscles of Posterior Thigh',
    fileType: 'generated-pdf',
    fileName: 'lowerlimb_muscles_posterior_thigh_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Muscles of the Posterior Thigh within Lower Limb Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() + 1000 * 60 * 60 * 24 * 0.6,
    dataAiHint: "hamstring muscles"
  },
  {
    id: 'anat-lowerlimb-muscles-anterior-leg-7',
    title: 'Muscles of Anterior Leg',
    subject: 'Anatomy',
    topic: 'Lower Limb',
    subtopic: 'Muscles of Anterior Leg',
    fileType: 'generated-pdf',
    fileName: 'lowerlimb_muscles_anterior_leg_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Muscles of the Anterior Leg within Lower Limb Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() + 1000 * 60 * 60 * 24 * 0.7,
    dataAiHint: "leg muscles"
  },
  {
    id: 'anat-lowerlimb-muscles-lateral-leg-8',
    title: 'Muscles of Lateral Leg',
    subject: 'Anatomy',
    topic: 'Lower Limb',
    subtopic: 'Muscles of Lateral Leg',
    fileType: 'generated-pdf',
    fileName: 'lowerlimb_muscles_lateral_leg_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Muscles of the Lateral Leg within Lower Limb Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() + 1000 * 60 * 60 * 24 * 0.8,
    dataAiHint: "leg muscles"
  },
  {
    id: 'anat-lowerlimb-muscles-posterior-leg-9',
    title: 'Muscles of Posterior Leg',
    subject: 'Anatomy',
    topic: 'Lower Limb',
    subtopic: 'Muscles of Posterior Leg',
    fileType: 'generated-pdf',
    fileName: 'lowerlimb_muscles_posterior_leg_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Muscles of the Posterior Leg within Lower Limb Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() + 1000 * 60 * 60 * 24 * 0.9,
    dataAiHint: "calf muscles"
  },
  {
    id: 'anat-lowerlimb-muscles-foot-10',
    title: 'Muscles of the Foot',
    subject: 'Anatomy',
    topic: 'Lower Limb',
    subtopic: 'Muscles of the Foot',
    fileType: 'generated-pdf',
    fileName: 'lowerlimb_muscles_foot_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Muscles of the Foot within Lower Limb Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() + 1000 * 60 * 60 * 24 * 1.0,
    dataAiHint: "foot muscles"
  },
  {
    id: 'anat-lowerlimb-femoral-triangle-11',
    title: 'Femoral Triangle',
    subject: 'Anatomy',
    topic: 'Lower Limb',
    subtopic: 'Femoral Triangle',
    fileType: 'generated-pdf',
    fileName: 'lowerlimb_femoral_triangle_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Femoral Triangle within Lower Limb Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() + 1000 * 60 * 60 * 24 * 1.1,
    dataAiHint: "thigh anatomy"
  },
  {
    id: 'anat-lowerlimb-popliteal-fossa-12',
    title: 'Popliteal Fossa',
    subject: 'Anatomy',
    topic: 'Lower Limb',
    subtopic: 'Popliteal Fossa',
    fileType: 'generated-pdf',
    fileName: 'lowerlimb_popliteal_fossa_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Popliteal Fossa within Lower Limb Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() + 1000 * 60 * 60 * 24 * 1.2,
    dataAiHint: "knee anatomy"
  },
  {
    id: 'anat-lowerlimb-arches-foot-13',
    title: 'Arches of the Foot',
    subject: 'Anatomy',
    topic: 'Lower Limb',
    subtopic: 'Arches of the Foot',
    fileType: 'generated-pdf',
    fileName: 'lowerlimb_arches_foot_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Arches of the Foot within Lower Limb Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() + 1000 * 60 * 60 * 24 * 1.3,
    dataAiHint: "foot arches"
  },
  {
    id: 'anat-lowerlimb-major-nerves-14',
    title: 'Major Nerves (Sciatic, Femoral, Obturator)',
    subject: 'Anatomy',
    topic: 'Lower Limb',
    subtopic: 'Major Nerves (Sciatic, Femoral, Obturator)',
    fileType: 'generated-pdf',
    fileName: 'lowerlimb_major_nerves_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Major Nerves (Sciatic, Femoral, Obturator) within Lower Limb Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() + 1000 * 60 * 60 * 24 * 1.4,
    dataAiHint: "leg nerves"
  },
  {
    id: 'anat-lowerlimb-major-arteries-15',
    title: 'Major Arteries (Femoral, Popliteal, Tibial)',
    subject: 'Anatomy',
    topic: 'Lower Limb',
    subtopic: 'Major Arteries (Femoral, Popliteal, Tibial)',
    fileType: 'generated-pdf',
    fileName: 'lowerlimb_major_arteries_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Major Arteries (Femoral, Popliteal, Tibial) within Lower Limb Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() + 1000 * 60 * 60 * 24 * 1.5,
    dataAiHint: "leg arteries"
  },
   {
    id: 'anat-lowerlimb-major-veins-lymphatics-16',
    title: 'Major Veins and Lymphatics (Lower Limb)',
    subject: 'Anatomy',
    topic: 'Lower Limb',
    subtopic: 'Major Veins and Lymphatics', // Corrected from syllabus
    fileType: 'generated-pdf',
    fileName: 'lowerlimb_major_veins_lymphatics_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of Major Veins and Lymphatics of the Lower Limb.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() + 1000 * 60 * 60 * 24 * 1.6,
    dataAiHint: "leg veins"
  },
  {
    id: 'anat-lowerlimb-hip-joint-17',
    title: 'Hip Joint',
    subject: 'Anatomy',
    topic: 'Lower Limb',
    subtopic: 'Hip Joint',
    fileType: 'generated-pdf',
    fileName: 'lowerlimb_hip_joint_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Hip Joint within Lower Limb Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() + 1000 * 60 * 60 * 24 * 1.7,
    dataAiHint: "hip joint"
  },
  {
    id: 'anat-lowerlimb-knee-joint-18',
    title: 'Knee Joint',
    subject: 'Anatomy',
    topic: 'Lower Limb',
    subtopic: 'Knee Joint',
    fileType: 'generated-pdf',
    fileName: 'lowerlimb_knee_joint_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Knee Joint within Lower Limb Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() + 1000 * 60 * 60 * 24 * 1.8,
    dataAiHint: "knee joint"
  },
  {
    id: 'anat-lowerlimb-ankle-foot-joints-19',
    title: 'Ankle Joint and Foot Joints',
    subject: 'Anatomy',
    topic: 'Lower Limb',
    subtopic: 'Ankle Joint and Foot Joints',
    fileType: 'generated-pdf',
    fileName: 'lowerlimb_ankle_foot_joints_notes.pdf',
    generatedTextContent: 'This presentation covers key aspects of the Ankle Joint and Foot Joints within Lower Limb Anatomy.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() + 1000 * 60 * 60 * 24 * 1.9,
    dataAiHint: "ankle foot"
  },


  // Example of a different subject (Physiology)
  {
    id: 'physio-resp-001',
    title: 'Physiology of Respiration',
    subject: 'Physiology',
    topic: 'Respiratory System',
    subtopic: 'Lung Volumes and Capacities',
    fileType: 'generated-pdf',
    fileName: 'resp_physiology_extracted.pdf',
    generatedTextContent: 'Overview of lung volumes (e.g., Tidal Volume, Inspiratory Reserve Volume) and capacities (e.g., Vital Capacity, Total Lung Capacity) and their clinical significance.',
    generatedImages: ['https://placehold.co/600x400.png'],
    thumbnailUrl: 'https://placehold.co/300x200.png',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 12,
    dataAiHint: "lung physiology"
  }
];


export default function HomePage() {
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    // This code runs only on the client, after initial hydration
    // Always load initialPresentationsData to ensure medical content is shown
    // and to bypass any potentially stale or incomplete data in localStorage for now.
    setPresentations(initialPresentationsData);
    
    // The localStorage loading logic can be re-introduced or refined later if needed
    // For example, to persist user-added presentations.
    // If you want to re-enable localStorage loading:
    // const storedPresentations = localStorage.getItem('courseDeckPresentations');
    // if (storedPresentations) {
    //   try {
    //     const parsed = JSON.parse(storedPresentations);
    //     // Add validation to ensure parsed data is an array of presentations
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
      // This will save the (potentially modified by user actions) presentations list to localStorage.
      // If initial load always comes from initialPresentationsData, this ensures newly added ones
      // would also be saved, though they'd be overwritten on next full page load unless the
      // localStorage loading logic in the first useEffect is re-enabled and prioritized.
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
