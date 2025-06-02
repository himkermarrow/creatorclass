
import type { Presentation } from '@/types';
import { PresentationCard } from './PresentationCard';

interface PresentationGridProps {
  presentations: Presentation[];
  onViewPresentation: (presentation: Presentation) => void;
}

export function PresentationGrid({ presentations, onViewPresentation }: PresentationGridProps) {
  // This component now just renders the presentations it's given.
  // The "no presentations found" message is handled in ClassroomTab.
  if (presentations.length === 0) {
    return null; 
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {presentations.map((presentation) => (
        <PresentationCard key={presentation.id} presentation={presentation} onView={onViewPresentation} />
      ))}
    </div>
  );
}
