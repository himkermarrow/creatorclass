
'use client';

import { useState, type FormEvent } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { generatePresentationFromPdf } from '@/ai/flows/generate-presentation-from-pdf';
import type { Presentation } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { FileUp, Wand2 } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  subject: z.string().min(2, { message: 'Subject is required.' }),
  topic: z.string().min(2, { message: 'Topic is required.' }),
  subtopic: z.string().optional(),
  pdfFile: z.any().refine((files) => files?.length > 0, 'PDF file is required.')
                   .refine((files) => files?.[0]?.type === 'application/pdf', 'Please upload a valid PDF file.'),
});

type FormData = z.infer<typeof formSchema>;

interface GeneratePdfFormProps {
  addPresentation: (presentation: Presentation) => void;
}

// Helper function to convert File to Data URI
const fileToDataUri = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export function GeneratePdfForm({ addPresentation }: GeneratePdfFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    if (!data.pdfFile || data.pdfFile.length === 0) {
      toast({ title: 'Error', description: 'Please select a PDF file.', variant: 'destructive' });
      setIsLoading(false);
      return;
    }

    try {
      const file = data.pdfFile[0];
      // Client-side check is still useful though Zod handles it
      if (file.type !== 'application/pdf') {
        toast({ title: 'Error', description: 'Please upload a valid PDF file.', variant: 'destructive' });
        setIsLoading(false);
        return;
      }
      const pdfDataUri = await fileToDataUri(file);
      
      const result = await generatePresentationFromPdf({ pdfDataUri });

      const newPresentation: Presentation = {
        id: crypto.randomUUID(),
        title: data.title,
        subject: data.subject,
        topic: data.topic,
        subtopic: data.subtopic,
        fileType: 'generated-pdf',
        fileName: file.name,
        generatedTextContent: result.presentationContent,
        generatedImages: result.extractedImages,
        thumbnailUrl: result.extractedImages && result.extractedImages.length > 0 ? result.extractedImages[0] : `https://placehold.co/300x200.png?text=${encodeURIComponent(data.title)}`,
        createdAt: Date.now(),
      };
      addPresentation(newPresentation);
      toast({ title: 'Success', description: 'Presentation generated successfully!' });
      reset();
    } catch (error) {
      console.error('Error generating presentation:', error);
      toast({ title: 'Error', description: 'Failed to generate presentation. Check console for details.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center">
          <Wand2 className="mr-2 h-6 w-6 text-accent" />
          Generate Presentation from PDF
        </CardTitle>
        <CardDescription>Let AI parse your PDF and create slides with text and images.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="gen-title" className="font-medium">Presentation Title</Label>
            <Input id="gen-title" {...register('title')} placeholder="e.g., Overview of Diabetes Mellitus" />
            {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gen-subject" className="font-medium">Subject</Label>
              <Input id="gen-subject" {...register('subject')} placeholder="e.g., Medicine" />
              {errors.subject && <p className="text-sm text-destructive">{errors.subject.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="gen-topic" className="font-medium">Topic</Label>
              <Input id="gen-topic" {...register('topic')} placeholder="e.g., Endocrinology" />
              {errors.topic && <p className="text-sm text-destructive">{errors.topic.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gen-subtopic" className="font-medium">Subtopic (Optional)</Label>
            <Input id="gen-subtopic" {...register('subtopic')} placeholder="e.g., Insulin Therapy" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gen-pdfFile" className="font-medium">Upload PDF</Label>
            <Input id="gen-pdfFile" type="file" accept=".pdf" {...register('pdfFile')} className="file:text-primary file:font-medium"/>
            {errors.pdfFile && <p className="text-sm text-destructive">{(errors.pdfFile as any).message}</p>}
          </div>

          <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            {isLoading ? <LoadingSpinner size={20} /> : <Wand2 className="mr-2 h-5 w-5" />}
            Generate with AI
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
