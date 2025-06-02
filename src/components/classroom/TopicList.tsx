
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
    return <p className="text-xs text-muted-foreground px-4 py-2">No topics found for {subject}.</p>;
  }

  return (
    <nav className="space-y-1 px-3"> {/* px-3 for list container */}
      {topics.map(topic => (
        <Button
          key={topic}
          variant={'ghost'} 
          className={cn(
            "w-full justify-start text-left h-auto py-2.5 px-3 rounded-md text-foreground transition-colors duration-150 ease-in-out", // px-3 for button internal padding
            selectedTopic === topic 
              ? 'bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:text-primary-foreground dark:hover:bg-primary/30' 
              : 'hover:bg-muted/80'
          )}
          onClick={() => onSelectTopic(topic)}
        >
          <div className="overflow-hidden w-full">
            <span className="font-medium block truncate text-sm">{topic}</span>
            {topicDescriptions[topic] && (
              <span className={cn("text-xs block leading-tight line-clamp-2 mt-0.5", selectedTopic === topic ? 'opacity-80' : 'opacity-70')}>
                {topicDescriptions[topic]}
              </span>
            )}
          </div>
        </Button>
      ))}
    </nav>
  );
}
