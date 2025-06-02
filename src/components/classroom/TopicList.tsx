
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
    return <p className="text-xs text-muted-foreground px-4">No topics found for {subject}.</p>;
  }

  return (
    <nav className="space-y-1 px-2"> {/* Added px-2 for overall list padding, removed pr-1 */}
      {topics.map(topic => (
        <Button
          key={topic}
          variant={'ghost'} 
          className={cn(
            "w-full justify-start text-left h-auto py-2.5 px-4 rounded-md text-foreground", // Ensured px-4 for internal padding
            selectedTopic === topic 
              ? 'bg-blue-100 text-primary dark:bg-primary/20 dark:text-primary-foreground hover:bg-blue-200 dark:hover:bg-primary/30' 
              : 'hover:bg-muted'
          )}
          onClick={() => onSelectTopic(topic)}
        >
          <div className="overflow-hidden w-full"> {/* This div helps manage text overflow */}
            <span className="font-medium block truncate text-sm">{topic}</span>
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
