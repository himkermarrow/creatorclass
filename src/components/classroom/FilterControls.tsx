import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface FilterControlsProps {
  subjects: string[];
  topics: string[];
  subtopics: string[];
  selectedSubject: string;
  setSelectedSubject: (subject: string) => void;
  selectedTopic: string;
  setSelectedTopic: (topic: string) => void;
  selectedSubtopic: string;
  setSelectedSubtopic: (subtopic: string) => void;
  clearFilters: () => void;
}

export function FilterControls({
  subjects,
  topics,
  subtopics,
  selectedSubject,
  setSelectedSubject,
  selectedTopic,
  setSelectedTopic,
  selectedSubtopic,
  setSelectedSubtopic,
  clearFilters
}: FilterControlsProps) {
  return (
    <div className="mb-8 p-6 bg-card rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
        <div>
          <Label htmlFor="filter-subject" className="font-medium text-sm">Filter by Subject</Label>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger id="filter-subject">
              <SelectValue placeholder="All Subjects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Subjects</SelectItem>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="filter-topic" className="font-medium text-sm">Filter by Topic</Label>
          <Select value={selectedTopic} onValueChange={setSelectedTopic} disabled={!selectedSubject && topics.length === 0}>
            <SelectTrigger id="filter-topic">
              <SelectValue placeholder="All Topics" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Topics</SelectItem>
              {topics.map((topic) => (
                <SelectItem key={topic} value={topic}>
                  {topic}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="filter-subtopic" className="font-medium text-sm">Filter by Subtopic</Label>
          <Select value={selectedSubtopic} onValueChange={setSelectedSubtopic} disabled={!selectedTopic && subtopics.length === 0}>
            <SelectTrigger id="filter-subtopic">
              <SelectValue placeholder="All Subtopics" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Subtopics</SelectItem>
              {subtopics.map((subtopic) => (
                <SelectItem key={subtopic} value={subtopic}>
                  {subtopic}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={clearFilters} variant="outline" className="w-full md:w-auto">
          <X className="mr-2 h-4 w-4" /> Clear Filters
        </Button>
      </div>
    </div>
  );
}
