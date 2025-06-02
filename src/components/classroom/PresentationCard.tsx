
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Presentation } from '@/types';
import { Eye, Download, FileText, FileSpreadsheetIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface PresentationCardProps {
  presentation: Presentation;
  onView: (presentation: Presentation) => void; // Retained for future modal use if needed
}

export function PresentationCard({ presentation, onView }: PresentationCardProps) {
  const { title, subject, topic, subtopic, fileType, fileName, generatedTextContent, createdAt, fileUrl, id } = presentation;

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
      window.open(`/view-presentation/${id}`, '_blank');
    } else if (fileUrl) {
      window.open(fileUrl, '_blank');
    } else {
      // Fallback for safety, though should not be reached with current logic
      onView(presentation);
    }
  };

  const handleDownload = () => {
    if (fileUrl && (fileType === 'pdf' || fileType === 'ppt')) {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName || title; // Suggest a filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    // For generated-pdf, download is disabled (handled by button's disabled state)
  };

  const isDownloadDisabled = fileType === 'generated-pdf';

  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <CardContent className="flex-grow p-6 space-y-3 flex flex-col">
        <div className="flex items-start space-x-3 mb-1">
            {getIconForFileType()}
            <CardTitle className="font-headline text-lg leading-tight flex-1 -mt-0.5">{title}</CardTitle>
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          {subject} &gt; {topic} {subtopic && `> ${subtopic}`}
        </CardDescription>
        
        {generatedTextContent && (
          <div className="pt-1">
            <p className="text-sm text-muted-foreground line-clamp-3 prose prose-sm max-w-none dark:prose-invert">
              {generatedTextContent}
            </p>
          </div>
        )}
         <div className="text-xs text-muted-foreground mt-auto pt-3">
          Created {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t grid grid-cols-2 gap-2">
        <Button onClick={handlePreview} variant="outline" size="sm" className="w-full">
          <Eye className="mr-2 h-4 w-4" />
          Preview
        </Button>
        <TooltipProvider>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              {/* Wrap button in a span for tooltip to work when button is disabled */}
              <span tabIndex={isDownloadDisabled ? 0 : -1} className="w-full inline-block"> 
                <Button 
                  onClick={handleDownload} 
                  variant="default" 
                  size="sm" 
                  className="w-full"
                  disabled={isDownloadDisabled}
                  aria-disabled={isDownloadDisabled}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </span>
            </TooltipTrigger>
            {isDownloadDisabled && (
              <TooltipContent>
                <p>Download not available for AI-generated content.</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}
