'use client';

import { useState, useMemo, useEffect } from 'react';
import type { Presentation } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { PresentationViewer } from '@/components/PresentationViewer';
import { PresentationGrid } from './PresentationGrid';
import { TopicList } from './TopicList';

interface ClassroomTabProps {
  presentations: Presentation[];
}

export function ClassroomTab({ presentations: initialPresentations }: ClassroomTabProps) {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedSubtopic, setSelectedSubtopic] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewingPresentation, setViewingPresentation] = useState<Presentation | null>(null);

  const CARDS_PER_PAGE = 8;

  const subjects = useMemo(() => Array.from(new Set(initialPresentations.map(p => p.subject))).sort(), [initialPresentations]);

  useEffect(() => {
    if (!selectedSubject && subjects.length > 0) setSelectedSubject(subjects[0]);
  }, [subjects]);

  const topics = useMemo(() => {
    return Array.from(new Set(initialPresentations.filter(p => p.subject === selectedSubject).map(p => p.topic))).sort();
  }, [initialPresentations, selectedSubject]);

  const subtopics = useMemo(() => {
    return Array.from(new Set(
      initialPresentations
        .filter(p => p.subject === selectedSubject && p.topic === selectedTopic && p.subtopic && p.subtopic !== "")
        .map(p => p.subtopic!)
    )).sort();
  }, [initialPresentations, selectedSubject, selectedTopic]);

  const filtered = useMemo(() => {
    return initialPresentations.filter(p => {
      return (
        (!selectedSubject || p.subject === selectedSubject) &&
        (!selectedTopic || p.topic === selectedTopic) &&
        (!selectedSubtopic || p.subtopic === selectedSubtopic) &&
        (!searchTerm || p.title.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
  }, [initialPresentations, selectedSubject, selectedTopic, selectedSubtopic, searchTerm]);

  const paginated = useMemo(() => {
    const start = (page - 1) * CARDS_PER_PAGE;
    return filtered.slice(start, start + CARDS_PER_PAGE);
  }, [filtered, page]);

  const totalPages = Math.ceil(filtered.length / CARDS_PER_PAGE);

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <aside className="hidden md:block w-[260px] border-r bg-muted p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Subjects</h2>
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
          <SelectContent>
            {subjects.map(subject => <SelectItem key={subject} value={subject}>{subject}</SelectItem>)}
          </SelectContent>
        </Select>

        {topics.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Topics</h3>
            <TopicList topics={topics} selectedTopic={selectedTopic} onSelectTopic={setSelectedTopic} subject={selectedSubject} topicDescriptions={{}} />
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex-grow">
            <h1 className="text-2xl font-bold">{selectedTopic || selectedSubject || 'All Presentations'}</h1>
            <p className="text-sm text-muted-foreground">Browse and preview presentations below.</p>
          </div>
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {selectedTopic && subtopics.length > 0 && (
          <div className="flex gap-2">
            <Select value={selectedSubtopic} onValueChange={setSelectedSubtopic}>
              <SelectTrigger><SelectValue placeholder="All Subtopics" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Subtopics</SelectItem>
                {subtopics.map(sub => (
                  sub && <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {filtered.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">No presentations found.</p>
        ) : (
          <PresentationGrid presentations={paginated} onViewPresentation={p => { setViewingPresentation(p); setIsViewerOpen(true); }} />
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4">
            <Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Prev
            </Button>
            <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
            <Button size="sm" variant="outline" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}

        <PresentationViewer presentation={viewingPresentation} isOpen={isViewerOpen} onClose={() => setIsViewerOpen(false)} />
      </main>
    </div>
  );
}