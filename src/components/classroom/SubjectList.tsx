
'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SubjectListProps {
  subjects: string[];
  selectedSubject: string;
  onSelectSubject: (subject: string) => void;
}

export function SubjectList({ subjects, selectedSubject, onSelectSubject }: SubjectListProps) {
  return (
    <nav className="space-y-1 px-3"> {/* Overall padding for the list */}
      {subjects.map(subject => (
        <Button
          key={subject}
          variant={selectedSubject === subject ? 'default' : 'ghost'}
          className={cn(
            "w-full justify-start text-left h-auto py-2.5 px-4 rounded-md transition-colors duration-150 ease-in-out", // Internal button padding
            selectedSubject === subject 
              ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
              : 'hover:bg-muted/80 text-foreground'
          )}
          onClick={() => onSelectSubject(subject)}
        >
          <div className="overflow-hidden"> {/* Removed w-full */}
            <span className="font-medium block truncate text-sm">{subject}</span>
            {subject === 'Anatomy' && (
              <span className={cn("text-xs block leading-tight line-clamp-1 mt-0.5", selectedSubject === subject ? 'opacity-80' : 'opacity-70')}>
                Complete NEET PG Anatomy curriculum with detailed subtopics
              </span>
            )}
             {subject === 'Physiology' && (
              <span className={cn("text-xs block leading-tight line-clamp-1 mt-0.5", selectedSubject === subject ? 'opacity-80' : 'opacity-70')}>
                Core concepts of human physiology
              </span>
            )}
             {!(subject === 'Anatomy' || subject === 'Physiology') && (
                <span className={cn("text-xs block leading-tight line-clamp-1 mt-0.5", selectedSubject === subject ? 'opacity-80' : 'opacity-70')}>
                    Presentations related to {subject}
                </span>
             )}
          </div>
        </Button>
      ))}
    </nav>
  );
}
