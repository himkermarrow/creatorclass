import type { Presentation } from '@/types';
import { PresentationCard } from './PresentationCard';

interface PresentationGridProps {
  presentations: Presentation[];
  onViewPresentation: (presentation: Presentation) => void;
}

export function PresentationGrid({ presentations, onViewPresentation }: PresentationGridProps) {
  if (presentations.length === 0) return null;

  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        gap-x-6
        gap-y-8
        py-6
        animate-fade-in
      "
    >
      {presentations.map((presentation) => (
        <PresentationCard
          key={presentation.id}
          presentation={presentation}
          onView={onViewPresentation}
        />
      ))}
    </div>
  );
}