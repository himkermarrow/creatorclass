
'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TopicListProps {
  topics: string[];
  selectedTopic: string;
  onSelectTopic: (topic: string) => void;
  subject: string; // To potentially fetch descriptions or specific styles
  topicDescriptions: Record<string, string>;
}

export function TopicList({ topics, selectedTopic, onSelectTopic, subject, topicDescriptions }: TopicListProps) {
  if (topics.length === 0) {
    return <p className="text-xs text-muted-foreground px-3">No topics found for {subject}.</p>;
  }

  return (
    <nav className="space-y-1">
      {topics.map(topic => (
        <Button
          key={topic}
          variant={selectedTopic === topic ? 'secondary' : 'ghost'}
          className={cn(
            "w-full justify-start text-left h-auto py-2 px-3",
             selectedTopic === topic ? 'bg-accent/70 text-accent-foreground' : 'hover:bg-accent/50'
          )}
          onClick={() => onSelectTopic(topic)}
        >
          <div>
            <span className="font-normal block">{topic}</span>
            {topicDescriptions[topic] && <span className="text-xs opacity-70 block">{topicDescriptions[topic]}</span>}
          </div>
        </Button>
      ))}
    </nav>
  );
}
