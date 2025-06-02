
'use client';

import { useState, useMemo, useEffect } from 'react';
import type { Presentation } from '@/types';
import { PresentationGrid } from './PresentationGrid';
import { PresentationViewer } from '@/components/PresentationViewer';
import { SubjectList } from './SubjectList';
import { TopicList } from './TopicList';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ClassroomTabProps {
  presentations: Presentation[];
}

const topicDescriptions: Record<string, Record<string, string>> = {
  Anatomy: {
    'General Embryology': 'Developmental processes and embryonic structures.',
    'Histology': 'Microscopic anatomy of tissues and organs.',
    'Osteology and Arthrology': 'Study of bones and joints.',
    'Neuroanatomy': 'Structure and organization of the nervous system.',
    'Head and Neck': 'Anatomical structures of head and neck regions.',
    'Back Region': 'Structures of the vertebral column and associated musculature.',
    'Thorax': 'Thoracic cavity structures and cardiovascular system.',
    'Upper Limb': 'Anatomy of the shoulder, arm, forearm, and hand.',
    'Abdomen': 'Abdominal cavity organs and structures.',
    'Pelvis and Perineum': 'Structures of the pelvic girdle and perineal region.',
    'Lower Limb': 'Hip, thigh, leg and foot anatomy.',
  },
  Physiology: {
    'Respiratory System': 'Functions of the lungs and airways.',
    'Cardiovascular System': 'Heart and blood vessel functions.',
    'Nervous System': 'Physiology of nerve impulses and brain function.',
  }
};

export function ClassroomTab({ presentations: initialPresentations }: ClassroomTabProps) {
  const [presentations, setPresentations] = useState<Presentation[]>(initialPresentations);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewingPresentation, setViewingPresentation] = useState<Presentation | null>(null);

  useEffect(() => {
    setPresentations(initialPresentations);
    if (initialPresentations.length > 0 && !selectedSubject) {
      const defaultSubject = initialPresentations.find(p => p.subject === "Anatomy")?.subject || initialPresentations[0].subject;
      setSelectedSubject(defaultSubject);
    } else if (initialPresentations.length === 0) {
      setSelectedSubject('');
    }
  }, [initialPresentations, selectedSubject]);

  const uniqueSubjects = useMemo(() => {
    const subjects = new Set(presentations.map(p => p.subject));
    return Array.from(subjects).sort();
  }, [presentations]);

  const topicsForSelectedSubject = useMemo(() => {
    if (!selectedSubject) return [];
    const topics = new Set(
      presentations.filter(p => p.subject === selectedSubject).map(p => p.topic)
    );
    return Array.from(topics).sort();
  }, [presentations, selectedSubject]);

  const subtopicsForSelectedTopic = useMemo(() => {
    if (!selectedSubject || !selectedTopic) return [];
    const subtopics = new Set(
      presentations
        .filter(p => p.subject === selectedSubject && p.topic === selectedTopic && p.subtopic)
        .map(p => p.subtopic!)
    );
    return Array.from(subtopics).sort();
  }, [presentations, selectedSubject, selectedTopic]);

  useEffect(() => {
    setSelectedTopic('');
    setSelectedSubtopic('');
  }, [selectedSubject]);

  useEffect(() => {
    setSelectedSubtopic('');
  }, [selectedTopic]);

  const filteredPresentations = useMemo(() => {
    return presentations.filter(p => {
      const subjectMatch = selectedSubject ? p.subject === selectedSubject : true;
      const topicMatch = selectedTopic ? p.topic === selectedTopic : true;
      const subtopicMatch = selectedSubtopic ? p.subtopic === selectedSubtopic : true;
      const searchTermMatch = searchTerm
        ? p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (p.generatedTextContent && p.generatedTextContent.toLowerCase().includes(searchTerm.toLowerCase()))
        : true;
      return subjectMatch && topicMatch && subtopicMatch && searchTermMatch;
    }).sort((a, b) => b.createdAt - a.createdAt);
  }, [presentations, selectedSubject, selectedTopic, selectedSubtopic, searchTerm]);

  const handleViewPresentation = (presentation: Presentation) => {
    // This function might be used by card actions if we re-introduce modal previews for some types
    // For now, direct link opening is handled by PresentationCard itself
    setViewingPresentation(presentation);
    setIsViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setViewingPresentation(null);
  };

  const currentTopicDescription = selectedSubject && selectedTopic && topicDescriptions[selectedSubject]?.[selectedTopic]
    ? topicDescriptions[selectedSubject]?.[selectedTopic]
    : selectedTopic ? `Content related to ${selectedTopic}.` : selectedSubject ? `Select a topic in ${selectedSubject}.` : 'Select a subject and topic to see presentations.';

  return (
    <div>
      <h1 className="font-headline text-2xl font-semibold mb-6 text-foreground">Browse by Subject</h1>
      <div className="flex flex-col md:flex-row gap-0 md:gap-8 min-h-[calc(100vh-var(--header-height,12rem)-2rem)]"> {/* Adjusted min-height */}
        <aside className="w-full md:w-1/3 lg:w-1/4 p-4 md:p-0 bg-card md:bg-transparent rounded-lg md:rounded-none shadow-md md:shadow-none mb-6 md:mb-0">
          <div className="sticky top-24 h-full">
            <ScrollArea className="flex-grow pr-2" style={{ maxHeight: 'calc(100vh - 10rem)' }}> {/* Approx Header (4rem) + Sticky (6rem) */}
              <div className="space-y-1">
                <h3 className="text-xs font-medium text-muted-foreground mb-2 px-3 pt-1">MEDICAL SUBJECTS</h3>
                <SubjectList
                  subjects={uniqueSubjects}
                  selectedSubject={selectedSubject}
                  onSelectSubject={setSelectedSubject}
                />
              </div>
              {selectedSubject && topicsForSelectedSubject.length > 0 && (
                <div className="mt-6 space-y-1">
                  <h3 className="text-xs font-medium text-muted-foreground mb-2 px-3">TOPICS IN {selectedSubject.toUpperCase()}</h3>
                  <TopicList
                    topics={topicsForSelectedSubject}
                    selectedTopic={selectedTopic}
                    onSelectTopic={setSelectedTopic}
                    subject={selectedSubject}
                    topicDescriptions={topicDescriptions[selectedSubject] || {}}
                  />
                </div>
              )}
            </ScrollArea>
          </div>
        </aside>

        <main className="flex-grow w-full md:w-2/3 lg:w-3/4 p-4 md:p-0">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
            <div>
              <h1 className="font-headline text-3xl font-bold text-foreground">
                {selectedTopic || selectedSubject || 'All Presentations'}
              </h1>
              <p className="text-muted-foreground mt-1">
                {currentTopicDescription}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <div className="relative w-full sm:w-auto sm:min-w-[250px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search presentations..."
                  className="pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {selectedTopic && subtopicsForSelectedTopic.length > 0 && (
                <div className="w-full sm:w-auto sm:min-w-[200px]">
                  <Select value={selectedSubtopic} onValueChange={(value) => setSelectedSubtopic(value === "all-subtopics" ? "" : value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Subtopics" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-subtopics">All Subtopics</SelectItem>
                      {subtopicsForSelectedTopic.map(subtopic => (
                        <SelectItem key={subtopic} value={subtopic}>{subtopic}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>

          {(selectedSubject || selectedTopic || selectedSubtopic || searchTerm) && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedSubject(uniqueSubjects.includes("Anatomy") ? "Anatomy" : uniqueSubjects[0] || "");
                setSelectedTopic('');
                setSelectedSubtopic('');
                setSearchTerm('');
              }}
              className="mb-6"
            >
              Clear Filters
            </Button>
          )}

          <PresentationGrid presentations={filteredPresentations} onViewPresentation={handleViewPresentation} />
        </main>

        <PresentationViewer presentation={viewingPresentation} isOpen={isViewerOpen} onClose={handleCloseViewer} />
      </div>
    </div>
  );
}
