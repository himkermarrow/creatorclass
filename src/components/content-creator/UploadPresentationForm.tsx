'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Presentation } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { FileUp } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  subject: z.string().min(2, { message: 'Subject is required.' }),
  topic: z.string().min(2, { message: 'Topic is required.' }),
  subtopic: z.string().optional(),
  presentationFile: z.any()
    .refine((files) => files?.length > 0, 'File is required.')
    .refine((files) => {
      if (!files || files.length === 0) return true;
      const fileType = files[0]?.type;
      return [
        'application/pdf',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      ].includes(fileType);
    }, 'Only PDF or PPT/PPTX files are allowed.'),
});

type FormData = z.infer<typeof formSchema>;

interface UploadPresentationFormProps {
  onUpload: (presentation: Presentation) => void;
}

export function UploadPresentationForm({ onUpload }: UploadPresentationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);

    const file = data.presentationFile?.[0];
    if (!file) {
      toast({ title: 'Error', description: 'Please select a file.', variant: 'destructive' });
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        title: data.title,
        subject: data.subject,
        topic: data.topic,
        subtopic: data.subtopic,
        fileType: file.type === 'application/pdf' ? 'pdf' : 'ppt',
        fileName: file.name,
        fileUrl: `/uploads/${file.name}`, // Assumes static upload directory
        thumbnailUrl: `https://placehold.co/300x200.png?text=${encodeURIComponent(data.title)}`,
      };

      const res = await fetch('/api/presentations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to upload');
      const saved = await res.json();
      onUpload(saved);

      toast({ title: 'Success', description: `${file.name} uploaded and saved!` });
      reset();
    } catch (error) {
      console.error('Upload error:', error);
      toast({ title: 'Error', description: 'Failed to upload file.', variant: 'destructive' });
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
        <CardDescription>Upload your PPT/PPTX or PDF files and tag them for easy organization.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="upload-title">Presentation Title</Label>
            <Input id="upload-title" {...register('title')} placeholder="e.g., Histology of Connective Tissues" />
            {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="upload-subject">Subject</Label>
              <Input id="upload-subject" {...register('subject')} placeholder="e.g., Anatomy" />
              {errors.subject && <p className="text-sm text-destructive">{errors.subject.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="upload-topic">Topic</Label>
              <Input id="upload-topic" {...register('topic')} placeholder="e.g., Histology" />
              {errors.topic && <p className="text-sm text-destructive">{errors.topic.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="upload-subtopic">Subtopic (Optional)</Label>
            <Input id="upload-subtopic" {...register('subtopic')} placeholder="e.g., Epithelial Tissue" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="upload-presentationFile">Upload File (PDF/PPT/PPTX)</Label>
            <Input id="upload-presentationFile" type="file" accept=".pdf,.ppt,.pptx" {...register('presentationFile')} />
            {errors.presentationFile && <p className="text-sm text-destructive">{(errors.presentationFile as any).message}</p>}
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