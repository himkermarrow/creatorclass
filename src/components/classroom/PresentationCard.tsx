
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Presentation } from '@/types';
import { Eye, FileText, FileTypeIcon } from 'lucide-react';

interface PresentationCardProps {
  presentation: Presentation;
  onView: (presentation: Presentation) => void;
}

export function PresentationCard({ presentation, onView }: PresentationCardProps) {
  const { title, subject, topic, subtopic, thumbnailUrl, fileType, fileName, generatedTextContent } = presentation;

  const getIconForFileType = () => {
    if (fileType === 'pdf' || fileType === 'generated-pdf') {
      return <FileText className="h-5 w-5 text-red-600" />;
    }
    if (fileType === 'ppt') {
      return <FileTypeIcon className="h-5 w-5 text-orange-500" />;
    }
    return <FileTypeIcon className="h-5 w-5 text-gray-500" />;
  };
  
  let hintKeywords = '';
  if (subtopic) {
    hintKeywords = subtopic.split(' ').slice(0, 2).join(' ');
  } else if (topic) {
    hintKeywords = topic.split(' ').slice(0, 2).join(' ');
  } else if (subject) {
    hintKeywords = subject.split(' ').slice(0, 2).join(' ');
  }
  const dataAiHint = hintKeywords.toLowerCase() || "medical slide";

  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-4">
        <div className="aspect-[3/2] w-full relative overflow-hidden rounded-md bg-muted">
          <Image
            src={thumbnailUrl || `https://placehold.co/300x200.png`}
            alt={`Thumbnail for ${title}`}
            layout="fill"
            objectFit="cover"
            data-ai-hint={dataAiHint}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 space-y-2">
        <CardTitle className="font-headline text-lg leading-tight">{title}</CardTitle>
        <CardDescription className="text-sm">
          {subject} &gt; {topic} {subtopic && `> ${subtopic}`}
        </CardDescription>
        <div className="flex items-center space-x-2 pt-1">
          {getIconForFileType()}
          <span className="text-xs text-muted-foreground truncate" title={fileName}>{fileName || 'Generated Presentation'}</span>
        </div>
        {generatedTextContent && (
          <div className="pt-2">
            <p className="text-xs text-muted-foreground line-clamp-3 prose prose-sm max-w-none dark:prose-invert">
              {generatedTextContent}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button onClick={() => onView(presentation)} variant="outline" size="sm" className="w-full">
          <Eye className="mr-2 h-4 w-4" />
          View Presentation
        </Button>
      </CardFooter>
    </Card>
  );
}
