import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Presentation } from '@/types';
import {
  Eye,
  BrainCircuit,
  FileText,
  FileBarChart2,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from 'react';
import { QuestionModal } from "../QuestionModal";

export interface PresentationCardProps {
  id: string;
  title: string;
  subject: string;
  topic: string;
  subtopic: string;
  fileUrl: string;
}

export function PresentationCard({
  id,
  title,
  subject,
  topic,
  subtopic,
  fileUrl
}: PresentationCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(true);

  const handleGenerateQuestions = () => {
    setIsPreviewMode(false);
    setIsModalOpen(true);
  };

  const getIconForFileType = () => {
    if (fileUrl?.endsWith('.pdf') || fileUrl?.endsWith('.generated-pdf')) {
      return <FileText className="h-5 w-5 text-red-600" />;
    }
    if (fileUrl?.endsWith('.ppt')) {
      return <FileBarChart2 className="h-5 w-5 text-orange-500" />;
    }
    return <FileText className="h-5 w-5 text-gray-500" />;
  };

  // Ensure the fileUrl is absolute and valid
  const getFullFileUrl = () => {
    if (!fileUrl) return '';
    
    try {
      // Try to create a URL object to validate the URL
      new URL(fileUrl);
      return fileUrl;
    } catch {
      // If it's not a valid URL, assume it's a relative path
      const baseUrl = window.location.origin;
      const path = fileUrl.startsWith('/') ? fileUrl : `/${fileUrl}`;
      return `${baseUrl}${path}`;
    }
  };

  const handlePreview = () => {
    const fullUrl = getFullFileUrl();
    if (!fullUrl) {
      console.error('No valid file URL available');
      return;
    }
    setIsPreviewMode(true);
    setIsModalOpen(true);
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {subject} &gt; {topic} &gt; {subtopic}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            {getIconForFileType()}
            <span className="text-sm text-gray-500">
              {fileUrl ? new URL(getFullFileUrl()).pathname.split('/').pop() : 'No file attached'}
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button 
            variant="outline" 
            onClick={handlePreview}
            disabled={!fileUrl}
          >
            Preview
          </Button>
          <Button 
            onClick={handleGenerateQuestions}
            disabled={!fileUrl}
          >
            Generate Questions
          </Button>
        </CardFooter>
      </Card>

      <QuestionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsPreviewMode(true);
        }}
        title={title}
        subject={subject}
        topic={topic}
        subtopic={subtopic}
        fileUrl={isPreviewMode ? getFullFileUrl() : ''}
      />
    </>
  );
}