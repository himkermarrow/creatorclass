'use client';

import { useState, useMemo, useEffect } from 'react';
import type { Presentation } from '@/types';
import { FilterControls } from './FilterControls';
import { PresentationGrid } from './PresentationGrid';
import { PresentationViewer } from '@/components/PresentationViewer';

interface ClassroomTabProps {
  presentations: Presentation[];
}

export function ClassroomTab({ presentations: initialPresentations }: ClassroomTabProps) {
  const [presentations, setPresentations] = useState<Presentation[]>(initialPresentations);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedSubtopic, setSelectedSubtopic] = useState('');
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewingPresentation, setViewingPresentation] = useState<Presentation | null>(null);

  useEffect(() => {
    setPresentations(initialPresentations); // Sync with parent state if it changes
  }, [initialPresentations]);
  
  const uniqueSubjects = useMemo(() => {
    const subjects = new Set(presentations.map(p => p.subject));
    return Array.from(subjects).sort();
  }, [presentations]);

  const uniqueTopics = useMemo(() => {
    if (!selectedSubject) return Array.from(new Set(presentations.map(p => p.topic))).sort();
    const topics = new Set(
      presentations.filter(p => p.subject === selectedSubject).map(p => p.topic)
    );
    return Array.from(topics).sort();
  }, [presentations, selectedSubject]);

  const uniqueSubtopics = useMemo(() => {
    if (!selectedTopic) return Array.from(new Set(presentations.filter(p => p.subtopic).map(p => p.subtopic!))).sort();
    const subtopics = new Set(
      presentations
        .filter(p => p.subject === selectedSubject && p.topic === selectedTopic && p.subtopic)
        .map(p => p.subtopic!)
    );
    return Array.from(subtopics).sort();
  }, [presentations, selectedSubject, selectedTopic]);

  useEffect(() => {
    // Reset topic if subject changes and selected topic is no longer valid
    if (selectedSubject && !uniqueTopics.includes(selectedTopic)) {
      setSelectedTopic('');
    }
  }, [selectedSubject, selectedTopic, uniqueTopics]);

  useEffect(() => {
    // Reset subtopic if topic changes and selected subtopic is no longer valid
    if (selectedTopic && !uniqueSubtopics.includes(selectedSubtopic)) {
      setSelectedSubtopic('');
    }
  }, [selectedTopic, selectedSubtopic, uniqueSubtopics]);


  const filteredPresentations = useMemo(() => {
    return presentations.filter(p => {
      const subjectMatch = selectedSubject ? p.subject === selectedSubject : true;
      const topicMatch = selectedTopic ? p.topic === selectedTopic : true;
      const subtopicMatch = selectedSubtopic ? p.subtopic === selectedSubtopic : true;
      return subjectMatch && topicMatch && subtopicMatch;
    }).sort((a, b) => b.createdAt - a.createdAt); // Sort by newest first
  }, [presentations, selectedSubject, selectedTopic, selectedSubtopic]);

  const handleViewPresentation = (presentation: Presentation) => {
    setViewingPresentation(presentation);
    setIsViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setViewingPresentation(null);
  };
  
  const clearFilters = () => {
    setSelectedSubject('');
    setSelectedTopic('');
    setSelectedSubtopic('');
  };

  return (
    <div className="py-8">
      <FilterControls
        subjects={uniqueSubjects}
        topics={uniqueTopics}
        subtopics={uniqueSubtopics}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
        selectedSubtopic={selectedSubtopic}
        setSelectedSubtopic={setSelectedSubtopic}
        clearFilters={clearFilters}
      />
      <PresentationGrid presentations={filteredPresentations} onViewPresentation={handleViewPresentation} />
      <PresentationViewer presentation={viewingPresentation} isOpen={isViewerOpen} onClose={handleCloseViewer} />
    </div>
  );
}
