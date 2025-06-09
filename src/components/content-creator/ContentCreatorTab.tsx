import type { Presentation } from '@/types';
import GeneratePdfForm from './GeneratePdfForm';
import { UploadPresentationForm } from './UploadPresentationForm';

interface ContentCreatorTabProps {
  addPresentation: (presentation: Presentation) => void;
}

export function ContentCreatorTab({ addPresentation }: ContentCreatorTabProps) {
  return (
    <div className="space-y-10">
      {/* Section 1: Upload Existing Presentation */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Upload Existing Presentation</h2>
        <UploadPresentationForm onUpload={addPresentation} />
      </div>

      {/* Section 2: Generate Presentation with AI */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Generate with AI from Reference Material</h2>
        <GeneratePdfForm
          onGenerate={(file, subject, topic, subtopic) => {
            console.log("AI generate requested:", { file, subject, topic, subtopic });
            // Future: send to backend and call addPresentation() on success
          }}
        />
      </div>
    </div>
  );
}