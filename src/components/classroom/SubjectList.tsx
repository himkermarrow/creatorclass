
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
    <nav className="space-y-1 px-2"> {/* Added px-2 for overall list padding, removed pr-1 */}
      {subjects.map(subject => (
        <Button
          key={subject}
          variant={selectedSubject === subject ? 'default' : 'ghost'}
          className={cn(
            "w-full justify-start text-left h-auto py-2.5 px-4 rounded-md", // Ensured px-4 for internal padding
            selectedSubject === subject 
              ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
              : 'hover:bg-muted text-foreground'
          )}
          onClick={() => onSelectSubject(subject)}
        >
          <div className="overflow-hidden w-full"> {/* This div helps manage text overflow */}
            <span className="font-medium block truncate text-sm">{subject}</span>
            {subject === 'Anatomy' && (
              <span className="text-xs opacity-70 block leading-tight line-clamp-1 mt-0.5">
                Complete NEET PG Anatomy curriculum with detailed subtopics
              </span>
            )}
             {subject === 'Physiology' && (
              <span className="text-xs opacity-70 block leading-tight line-clamp-1 mt-0.5">
                Core concepts of human physiology
              </span>
            )}
             {!(subject === 'Anatomy' || subject === 'Physiology') && (
                <span className="text-xs opacity-70 block leading-tight line-clamp-1 mt-0.5">
                    Presentations related to {subject}
                </span>
             )}
          </div>
        </Button>
      ))}
    </nav>
  );
}
