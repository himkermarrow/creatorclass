'use client';

import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { FileUp } from 'lucide-react';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';
import type { Presentation } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { subjectHierarchy } from '@/lib/subjectHierarchy';

const formSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  subject: z.string().min(1, 'Subject is required'),
  topic: z.string().min(1, 'Topic is required'),
  subtopic: z.string().optional(),
  presentationFile: z.any()
    .refine((file) => file?.length > 0, 'File is required')
    .refine(
      (file) => file?.[0] && file[0].type === 'application/pdf',
      'Only PDF files are allowed'
    ),
});

type FormData = z.infer<typeof formSchema>;

interface UploadPresentationFormProps {
  onUpload: (presentation: Presentation) => void;
}

export function UploadPresentationForm({ onUpload }: UploadPresentationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const selectedSubject = watch('subject');
  const selectedTopic = watch('topic');

  const topics = selectedSubject ? Object.keys(subjectHierarchy[selectedSubject] || {}) : [];
  const subtopics =
    selectedSubject && selectedTopic
      ? subjectHierarchy[selectedSubject]?.[selectedTopic] || []
      : [];

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      const file = data.presentationFile[0];
      const objectUrl = URL.createObjectURL(file);

      const newPresentation: Presentation = {
        id: uuidv4(),
        title: data.title,
        subject: data.subject,
        topic: data.topic,
        subtopic: data.subtopic || '',
        fileType: 'pdf',
        fileName: file.name,
        fileUrl: objectUrl,
        createdAt: Date.now(),
      };

      onUpload(newPresentation);

      toast({
        title: 'Upload successful!',
        description: `${file.name} was uploaded.`,
      });

      reset();
    } catch (error) {
      console.error('Upload failed', error);
      toast({
        title: 'Upload failed',
        description: 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center">
          <FileUp className="mr-2 h-6 w-6 text-primary" />
          Upload Existing Presentation
        </CardTitle>
        <CardDescription>Upload your PDF and tag it properly.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Presentation Title</Label>
            <Input id="title" {...register('title')} placeholder="e.g., Embryology Basics" />
            {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select
                value={selectedSubject}
                onValueChange={(value) => {
                  setValue('subject', value);
                  setValue('topic', '');
                  setValue('subtopic', '');
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(subjectHierarchy).map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.subject && <p className="text-sm text-destructive">{errors.subject.message}</p>}
            </div>

            {/* Topic */}
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Select
                value={selectedTopic}
                onValueChange={(value) => {
                  setValue('topic', value);
                  setValue('subtopic', '');
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Topic" />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem key={topic} value={topic}>
                      {topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.topic && <p className="text-sm text-destructive">{errors.topic.message}</p>}
            </div>
          </div>

          {/* Subtopic */}
          <div className="space-y-2">
            <Label htmlFor="subtopic">Subtopic (optional)</Label>
            <Select
              value={watch('subtopic') || ''}
              onValueChange={(value) => setValue('subtopic', value)}
              disabled={subtopics.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Subtopic" />
              </SelectTrigger>
              <SelectContent>
                {subtopics.map((sub) => (
                  <SelectItem key={sub} value={sub}>
                    {sub}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="presentationFile">Upload File (PDF only)</Label>
            <Input
              id="presentationFile"
              type="file"
              accept=".pdf"
              {...register('presentationFile')}
              className="file:text-primary"
            />
            {errors.presentationFile && (
              <p className="text-sm text-destructive">{(errors.presentationFile as any).message}</p>
            )}
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? <LoadingSpinner size={20} /> : <FileUp className="mr-2 h-5 w-5" />}
            Upload and Tag
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}