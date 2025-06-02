
'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TopicListProps {
  topics: string[];
  selectedTopic: string;
  onSelectTopic: (topic: string) => void;
  subject: string;
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
          variant={'ghost'} // Always ghost, selected state handled by custom classes
          className={cn(
            "w-full justify-start text-left h-auto py-2.5 px-3 rounded-md text-foreground", // Increased padding
            selectedTopic === topic 
              ? 'bg-blue-100 text-primary dark:bg-primary/20 dark:text-primary-foreground hover:bg-blue-200 dark:hover:bg-primary/30' // Light blue for selected topic
              : 'hover:bg-muted'
          )}
          onClick={() => onSelectTopic(topic)}
        >
          <div className="overflow-hidden w-full">
            <span className="font-normal block truncate text-sm">{topic}</span>
            {topicDescriptions[topic] && (
              <span className="text-xs opacity-70 block leading-tight line-clamp-2 mt-0.5">
                {topicDescriptions[topic]}
              </span>
            )}
          </div>
        </Button>
      ))}
    </nav>
  );
}
