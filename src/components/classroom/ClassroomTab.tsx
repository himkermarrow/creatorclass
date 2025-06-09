'use client';

import { useState, useMemo, useEffect } from 'react';
import type { Presentation } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { PresentationViewer } from '@/components/PresentationViewer';
import { PresentationGrid } from './PresentationGrid';
import TopicList from './TopicList';

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

  const subjects = useMemo(
    () => Array.from(new Set(initialPresentations.map((p) => p.subject))).sort(),
    [initialPresentations]
  );

  useEffect(() => {
    if (!selectedSubject && subjects.length > 0) {
      setSelectedSubject(subjects[0]);
    }
  }, [subjects]);

  const topicOptions = useMemo(() => {
    const rawTopics = Array.from(
      new Set(
        initialPresentations
          .filter((p) => p.subject === selectedSubject)
          .map((p) => p.topic)
      )
    ).sort();

    return rawTopics.map((topic) => ({
      label: topic,
      value: topic,
    }));
  }, [initialPresentations, selectedSubject]);

  const subtopics = useMemo(() => {
    return Array.from(
      new Set(
        initialPresentations
          .filter(
            (p) =>
              p.subject === selectedSubject &&
              p.topic === selectedTopic &&
              p.subtopic &&
              p.subtopic !== ''
          )
          .map((p) => p.subtopic!)
      )
    ).sort();
  }, [initialPresentations, selectedSubject, selectedTopic]);

  const filtered = useMemo(() => {
    return initialPresentations.filter((p) => {
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
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden md:block w-[260px] border-r bg-white shadow-sm p-6 space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Subjects</h2>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger>
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {topicOptions.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-md font-medium">Topics</h3>
            <TopicList
              topics={topicOptions}
              selectedTopic={selectedTopic}
              onSelectTopic={setSelectedTopic}
            />
          </div>
        )}

        {selectedTopic && subtopics.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-md font-medium">Subtopics</h3>
            <Select value={selectedSubtopic} onValueChange={setSelectedSubtopic}>
              <SelectTrigger>
                <SelectValue placeholder="All Subtopics" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Subtopics</SelectItem>
                {subtopics.map((sub) => (
                  <SelectItem key={sub} value={sub}>
                    {sub}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-6">
        {/* Heading and Search */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">
              {selectedTopic || selectedSubject || 'All Presentations'}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Browse and preview presentations below.
            </p>
          </div>
          <div className="relative w-full sm:w-80">
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

        {/* Grid or Empty State */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-muted-foreground text-lg">No presentations found.</p>
          </div>
        ) : (
          <PresentationGrid
            presentations={paginated}
            onViewPresentation={(p) => {
              setViewingPresentation(p);
              setIsViewerOpen(true);
            }}
          />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <Button
              size="sm"
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Prev
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Button
              size="sm"
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}

        {/* Modal Viewer */}
        <PresentationViewer
          presentation={viewingPresentation}
          isOpen={isViewerOpen}
          onClose={() => setIsViewerOpen(false)}
        />
      </main>
    </div>
  );
}