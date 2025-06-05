import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Presentation } from '@/types';
import {
  Eye,
  Download,
  FileText,
  FileBarChart2,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface PresentationCardProps {
  presentation: Presentation;
  onView: (presentation: Presentation) => void;
}

export function PresentationCard({ presentation, onView }: PresentationCardProps) {
  const {
    title,
    subject,
    topic,
    subtopic,
    fileType,
    fileName,
    generatedTextContent,
    createdAt,
    fileUrl,
    id,
  } = presentation;

  const getIconForFileType = () => {
    if (fileType === 'pdf' || fileType === 'generated-pdf') {
      return <FileText className="h-5 w-5 text-red-600" />;
    }
    if (fileType === 'ppt') {
      return <FileBarChart2 className="h-5 w-5 text-orange-500" />;
    }
    return <FileText className="h-5 w-5 text-gray-500" />;
  };

  const handlePreview = () => {
    if (fileType === 'generated-pdf') {
      window.open(`/view-presentation/${id}`, '_blank');
    } else if (fileUrl) {
      window.open(fileUrl, '_blank');
    } else {
      onView(presentation);
    }
  };

  const handleDownload = () => {
    if (fileUrl && (fileType === 'pdf' || fileType === 'ppt')) {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName || title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const isDownloadDisabled = fileType === 'generated-pdf';

  return (
    <Card className="flex flex-col overflow-hidden rounded-xl bg-white shadow border border-gray-200 h-full">
      <CardContent className="p-6 space-y-3 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start space-x-3">
          <div className="shrink-0">{getIconForFileType()}</div>
          <div className="flex-1">
            <CardTitle className="font-semibold text-base leading-snug">{title}</CardTitle>
            <CardDescription className="text-sm mt-1 text-muted-foreground">
              {subject} &gt; {topic} {subtopic ? `> ${subtopic}` : ''}
            </CardDescription>
          </div>
        </div>

        {/* Text Summary */}
        {generatedTextContent && (
          <p className="text-sm text-muted-foreground line-clamp-3 mt-1">
            {generatedTextContent}
          </p>
        )}

        {/* Timestamp */}
        <div className="text-xs text-muted-foreground mt-auto pt-4">
          Created {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </div>
      </CardContent>

      {/* Footer Actions */}
      <CardFooter className="p-4 border-t bg-gray-50 grid grid-cols-2 gap-3">
        <Button
          onClick={handlePreview}
          variant="outline"
          size="sm"
          className="w-full border-gray-300 text-gray-800"
        >
          <Eye className="mr-2 h-4 w-4" />
          Preview
        </Button>

        <TooltipProvider>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <span tabIndex={isDownloadDisabled ? 0 : -1} className="w-full inline-block">
                <Button
                  onClick={handleDownload}
                  size="sm"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isDownloadDisabled}
                  aria-disabled={isDownloadDisabled}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </span>
            </TooltipTrigger>
            {isDownloadDisabled && (
              <TooltipContent side="top">
                <p>Download not available for AI-generated content.</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}