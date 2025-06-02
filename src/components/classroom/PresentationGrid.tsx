import type { Presentation } from '@/types';
import { PresentationCard } from './PresentationCard';

interface PresentationGridProps {
  presentations: Presentation[];
  onViewPresentation: (presentation: Presentation) => void;
}

export function PresentationGrid({ presentations, onViewPresentation }: PresentationGridProps) {
  if (presentations.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No presentations found matching your criteria.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {presentations.map((presentation) => (
        <PresentationCard key={presentation.id} presentation={presentation} onView={onViewPresentation} />
      ))}
    </div>
  );
}
