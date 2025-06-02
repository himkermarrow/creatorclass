
'use client';

import { useState, useMemo, useEffect } from 'react';
import type { Presentation } from '@/types';
import { PresentationGrid } from './PresentationGrid';
import { PresentationViewer } from '@/components/PresentationViewer';
import { TopicList } from './TopicList';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
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

const CARDS_PER_PAGE = 8;

export function ClassroomTab({ presentations: initialPresentations }: ClassroomTabProps) {
  const [presentations, setPresentations] = useState<Presentation[]>(initialPresentations);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewingPresentation, setViewingPresentation] = useState<Presentation | null>(null);

  useEffect(() => {
    setPresentations(initialPresentations);
    if (initialPresentations.length > 0 && !selectedSubject) {
      const defaultSubject = initialPresentations.find(p => p.subject === "Anatomy")?.subject || initialPresentations[0]?.subject || "";
      setSelectedSubject(defaultSubject);
    } else if (initialPresentations.length === 0) {
      setSelectedSubject('');
    }

    // Force layout reflow in case sidebar is broken on load
    setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
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
    setCurrentPage(1);
  }, [selectedSubject]);

  useEffect(() => {
    setSelectedSubtopic('');
    setCurrentPage(1);
  }, [selectedTopic]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSubtopic, searchTerm]);

  const filteredPresentations = useMemo(() => {
    return presentations.filter(p => {
      const subjectMatch = selectedSubject ? p.subject === selectedSubject : true;
      const topicMatch = selectedTopic ? p.topic === selectedTopic : true;
      const subtopicMatch = selectedSubtopic ? p.subtopic === selectedSubtopic : true;
      const searchTermMatch = searchTerm
        ? p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (p.generatedTextContent && p.generatedTextContent.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (p.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (p.topic.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (p.subtopic && p.subtopic.toLowerCase().includes(searchTerm.toLowerCase()))
        : true;
      return subjectMatch && topicMatch && subtopicMatch && searchTermMatch;
    }).sort((a, b) => b.createdAt - a.createdAt);
  }, [presentations, selectedSubject, selectedTopic, selectedSubtopic, searchTerm]);

  const indexOfLastCard = currentPage * CARDS_PER_PAGE;
  const indexOfFirstCard = indexOfLastCard - CARDS_PER_PAGE;
  const displayPresentations = filteredPresentations.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredPresentations.length / CARDS_PER_PAGE);

  const handleViewPresentation = (presentation: Presentation) => {
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

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const resetFilters = () => {
    setSelectedSubject(uniqueSubjects.includes("Anatomy") ? "Anatomy" : uniqueSubjects[0] || "");
    setSelectedTopic('');
    setSelectedSubtopic('');
    setSearchTerm('');
    setCurrentPage(1);
  };

  return (
    <div className="px-4 md:px-0">
      <h1 className="font-headline text-2xl font-semibold mb-6 text-foreground">Browse by Subject</h1>
      <div className="flex flex-col md:flex-row gap-0 md:gap-0 min-h-[calc(100vh-var(--header-height,12rem)-2rem)]">
        
        <aside className="md:w-64 w-full md:max-w-[16rem] shrink-0 bg-card border-r border-border shadow-sm md:shadow-none mb-6 md:mb-0 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 6rem)' }}>
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-xs font-medium text-muted-foreground mb-2">MEDICAL SUBJECTS</h3>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueSubjects.map(subject => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedSubject && topicsForSelectedSubject.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-xs font-medium text-muted-foreground mb-2">
                    TOPICS IN {selectedSubject.toUpperCase()}
                  </h3>
                  <TopicList
                    topics={topicsForSelectedSubject}
                    selectedTopic={selectedTopic}
                    onSelectTopic={setSelectedTopic}
                    subject={selectedSubject}
                    topicDescriptions={topicDescriptions[selectedSubject] || {}}
                  />
                </div>
              )}
            </div>
          </ScrollArea>
        </aside>

        <main className="flex-grow w-full md:w-auto md:pl-8 pt-4 md:pt-0">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4 px-4 md:px-0">
            <div className="flex-grow overflow-hidden">
              <h1 className="font-headline text-3xl font-bold text-foreground">
                {selectedTopic || selectedSubject || 'All Presentations'}
              </h1>
              <p className="text-muted-foreground mt-1 text-sm">{currentTopicDescription}</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <div className="relative w-full sm:w-auto sm:min-w-[250px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search in titles, content..."
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

          {(selectedSubject !== (uniqueSubjects.includes("Anatomy") ? "Anatomy" : uniqueSubjects[0] || "") || selectedTopic || selectedSubtopic || searchTerm) && (
            <div className="px-4 md:px-0">
              <Button variant="outline" size="sm" onClick={resetFilters} className="mb-6">
                Clear All Filters
              </Button>
            </div>
          )}

          <div className="px-4 md:px-0">
            {filteredPresentations.length > 0 ? (
              <PresentationGrid presentations={displayPresentations} onViewPresentation={handleViewPresentation} />
            ) : (
              <p className="text-center text-muted-foreground py-8">No presentations found matching your criteria.</p>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4 mt-8 py-4">
                <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <span className="text-sm text-muted-foreground">Page {currentPage} of {totalPages}</span>
                <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </main>

        <PresentationViewer presentation={viewingPresentation} isOpen={isViewerOpen} onClose={handleCloseViewer} />
      </div>
    </div>
  );
}
