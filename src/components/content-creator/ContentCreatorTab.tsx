import type { Presentation } from '@/types';
import { GeneratePdfForm } from './GeneratePdfForm';
import { UploadPresentationForm } from './UploadPresentationForm';

interface ContentCreatorTabProps {
  addPresentation: (presentation: Presentation) => void;
}

export function ContentCreatorTab({ addPresentation }: ContentCreatorTabProps) {
  return (
    <div className="space-y-8 py-8">
      <GeneratePdfForm addPresentation={addPresentation} />
      <UploadPresentationForm addPresentation={addPresentation} />
    </div>
  );
}
