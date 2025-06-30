import { PresentationCard } from './PresentationCard';

interface Presentation {
  id: string;
  title: string;
  subject: string;
  topic: string;
  subtopic: string;
  fileUrl: string;
}

interface PresentationGridProps {
  presentations: Presentation[];
}

export function PresentationGrid({ presentations }: PresentationGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {presentations.map((presentation) => (
        <PresentationCard
          key={presentation.id}
          id={presentation.id}
          title={presentation.title}
          subject={presentation.subject}
          topic={presentation.topic}
          subtopic={presentation.subtopic || 'General'} // Provide default value
          fileUrl={presentation.fileUrl}
        />
      ))}
    </div>
  );
}