
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Presentation } from '@/types';
import { Eye, FileText, FileSpreadsheetIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PresentationCardProps {
  presentation: Presentation;
  onView: (presentation: Presentation) => void; // Retain for potential future use or other interactions
}

export function PresentationCard({ presentation, onView }: PresentationCardProps) {
  const { title, subject, topic, subtopic, fileType, fileName, generatedTextContent, createdAt, fileUrl } = presentation;

  const getIconForFileType = () => {
    if (fileType === 'pdf' || fileType === 'generated-pdf') {
      return <FileText className="h-5 w-5 text-red-600" data-ai-hint="document paper" />;
    }
    if (fileType === 'ppt') {
      return <FileSpreadsheetIcon className="h-5 w-5 text-orange-500" data-ai-hint="slides presentation" />;
    }
    return <FileText className="h-5 w-5 text-gray-500" data-ai-hint="file document"/>; 
  };

  const handlePreview = () => {
    if (fileType === 'generated-pdf') {
      // Open AI-generated content in a new dedicated viewer page
      window.open(`/view-presentation/${presentation.id}`, '_blank');
    } else if (fileUrl) { 
      // For uploaded PDF or PPT files with a URL, open the URL in a new tab
      window.open(fileUrl, '_blank');
    } else {
      // Fallback: if it's generated-pdf but somehow logic failed above, or if no fileUrl for pdf/ppt (should not happen)
      // This could also be a case where we want to use the modal for some types, but user asked for new tab
      // For now, we'll attempt to use the modal as a last resort if other conditions aren't met.
      console.warn('Standard new tab preview not available, attempting modal for:', presentation);
      onView(presentation);
    }
  };

  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <CardContent className="flex-grow p-6 space-y-3 flex flex-col">
        <CardTitle className="font-headline text-xl leading-tight">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {subject} &gt; {topic} {subtopic && `> ${subtopic}`}
        </CardDescription>
        <div className="flex items-center space-x-2 pt-1 text-sm text-muted-foreground">
          {getIconForFileType()}
          <span className="truncate" title={fileName}>{fileName || 'Generated Presentation'}</span>
        </div>
        {generatedTextContent && (
          <div className="pt-2">
            <p className="text-sm text-muted-foreground line-clamp-3 prose prose-sm max-w-none dark:prose-invert">
              {generatedTextContent}
            </p>
          </div>
        )}
         <div className="text-xs text-muted-foreground mt-auto pt-3">
          Created {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button onClick={handlePreview} variant="default" size="sm" className="w-full">
          <Eye className="mr-2 h-4 w-4" />
          Preview
        </Button>
      </CardFooter>
    </Card>
  );
}
