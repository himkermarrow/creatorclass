
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
    <nav className="space-y-1">
      {subjects.map(subject => (
        <Button
          key={subject}
          variant={selectedSubject === subject ? 'default' : 'ghost'}
          className={cn(
            "w-full justify-start text-left h-auto py-2 px-3",
            selectedSubject === subject ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/50'
          )}
          onClick={() => onSelectSubject(subject)}
        >
          <div>
            <span className="font-medium block">{subject}</span>
            {subject === 'Anatomy' && <span className="text-xs opacity-80 block">Complete NEET PG Anatomy curriculum</span>}
          </div>
        </Button>
      ))}
    </nav>
  );
}
