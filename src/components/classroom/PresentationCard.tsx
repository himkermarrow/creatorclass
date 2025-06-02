
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Presentation } from '@/types';
import { Eye, Download, FileText, FileSpreadsheet } from 'lucide-react'; // FileSpreadsheet for PPT as FilePresentation isn't ideal
import { formatDistanceToNow } from 'date-fns';

interface PresentationCardProps {
  presentation: Presentation;
  onView: (presentation: Presentation) => void;
}

export function PresentationCard({ presentation, onView }: PresentationCardProps) {
  const { title, subject, topic, subtopic, thumbnailUrl, fileType, fileName, generatedTextContent, createdAt, fileUrl } = presentation;

  const getIconForFileType = () => {
    if (fileType === 'pdf' || fileType === 'generated-pdf') {
      return <FileText className="h-5 w-5 text-red-600" />;
    }
    if (fileType === 'ppt') {
      // Using FileSpreadsheet as a stand-in for PPT, or consider a generic file icon
      return <FileSpreadsheet className="h-5 w-5 text-orange-500" />;
    }
    return <FileText className="h-5 w-5 text-gray-500" />; // Default icon
  };
  
  let hintKeywords = '';
  if (subtopic) {
    hintKeywords = subtopic.split(' ').slice(0, 2).join(' ');
  } else if (topic) {
    hintKeywords = topic.split(' ').slice(0, 2).join(' ');
  } else if (subject) {
    hintKeywords = subject.split(' ').slice(0, 2).join(' ');
  }
  const dataAiHint = hintKeywords.toLowerCase() || "medical illustration";

  const handleDownload = () => {
    if (fileUrl) {
      if (fileType === 'ppt') {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName || 'presentation.pptx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (fileType === 'pdf') {
         window.open(fileUrl, '_blank');
      } else {
        // For generated-pdf, direct download isn't straightforward.
        // We can open the viewer which displays the content.
        onView(presentation);
      }
    } else if (fileType === 'generated-pdf') {
        onView(presentation); // Open viewer for generated content as no direct fileUrl
    } else {
        alert("No file available for download.");
    }
  };

  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
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
      <CardContent className="flex-grow p-4 space-y-2 flex flex-col">
        <CardTitle className="font-headline text-lg leading-tight">{title}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          {subject} &gt; {topic} {subtopic && `> ${subtopic}`}
        </CardDescription>
        <div className="flex items-center space-x-2 pt-1 text-xs text-muted-foreground">
          {getIconForFileType()}
          <span className="truncate" title={fileName}>{fileName || 'Generated Presentation'}</span>
        </div>
        {generatedTextContent && (
          <div className="pt-2">
            <p className="text-xs text-muted-foreground line-clamp-3 prose prose-sm max-w-none dark:prose-invert">
              {generatedTextContent}
            </p>
          </div>
        )}
         <div className="text-xs text-muted-foreground mt-auto pt-2">
          Created {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t grid grid-cols-2 gap-2">
        <Button onClick={() => onView(presentation)} variant="outline" size="sm" className="w-full">
          <Eye className="mr-2 h-4 w-4" />
          Preview
        </Button>
        <Button onClick={handleDownload} variant="default" size="sm" className="w-full">
          <Download className="mr-2 h-4 w-4" />
          {fileType === 'ppt' ? 'Download' : (fileType === 'pdf' && fileUrl) ? 'Open PDF' : 'View Content'}
        </Button>
      </CardFooter>
    </Card>
  );
}
