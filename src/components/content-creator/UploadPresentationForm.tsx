'use client';

import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

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
import { useToast } from '@/hooks/use-toast';
import type { Presentation } from '@/types';
import { subjectHierarchy } from '@/lib/subjectHierarchy';

interface UploadPresentationFormProps {
  onUpload: (presentation: Presentation) => void;
}

export function UploadPresentationForm({ onUpload }: UploadPresentationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedSubtopic, setSelectedSubtopic] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'application/pdf') {
        toast({
          title: 'Invalid file type',
          description: 'Please upload a PDF file',
          variant: 'destructive',
        });
        return;
      }
      setFile(selectedFile);
      // Set default title from filename if title is empty
      if (!title) {
        setTitle(selectedFile.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!file) {
      toast({
        title: 'No file selected',
        description: 'Please select a PDF file to upload',
        variant: 'destructive',
      });
      return;
    }

    if (!title.trim()) {
      toast({
        title: 'Title required',
        description: 'Please enter a title for the presentation',
        variant: 'destructive',
      });
      return;
    }

    if (!selectedSubject) {
      toast({
        title: 'Subject required',
        description: 'Please select a subject',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      formData.append('subject', selectedSubject);
      formData.append('topic', selectedTopic);
      formData.append('subtopic', selectedSubtopic);

      const response = await fetch('/api/upload-presentation', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Upload failed');
      }

      const { presentation } = await response.json();

      onUpload({
        ...presentation,
        createdAt: Date.now()
      });

      toast({
        title: 'Success',
        description: 'Presentation uploaded successfully',
      });

      // Reset form
      setFile(null);
      setTitle('');
      setSelectedSubject('');
      setSelectedTopic('');
      setSelectedSubtopic('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description: 'There was an error uploading your presentation',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getTopicsForSubject = (subject: string) => {
    return Object.keys(subjectHierarchy[subject] || {});
  };

  const getSubtopicsForTopic = (subject: string, topic: string) => {
    return subjectHierarchy[subject]?.[topic] || [];
  };

  return (
    <Card className="shadow">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <FileUp className="text-primary" /> Upload Existing Presentation
        </CardTitle>
        <CardDescription>Upload your PDF and tag it properly.</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Presentation Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Embryology Basics"
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="file">Upload PDF</Label>
            <Input
              id="file"
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="w-full"
            />
            {file && (
              <p className="mt-2 text-sm text-muted-foreground">
                Selected file: {file.name}
              </p>
            )}
          </div>

          {/* Subject & Topic */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <select
                id="subject"
                value={selectedSubject}
                onChange={(e) => {
                  setSelectedSubject(e.target.value);
                  setSelectedTopic('');
                  setSelectedSubtopic('');
                }}
                className="w-full p-2 border rounded"
              >
                <option value="">Select a subject</option>
                {Object.keys(subjectHierarchy).map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            {selectedSubject && (
              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <select
                  id="topic"
                  value={selectedTopic}
                  onChange={(e) => {
                    setSelectedTopic(e.target.value);
                    setSelectedSubtopic('');
                  }}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select a topic</option>
                  {getTopicsForSubject(selectedSubject).map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedTopic && (
              <div className="space-y-2">
                <Label htmlFor="subtopic">Subtopic (Optional)</Label>
                <select
                  id="subtopic"
                  value={selectedSubtopic}
                  onChange={(e) => setSelectedSubtopic(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select a subtopic</option>
                  {getSubtopicsForTopic(selectedSubject, selectedTopic).map(
                    (subtopic) => (
                      <option key={subtopic} value={subtopic}>
                        {subtopic}
                      </option>
                    )
                  )}
                </select>
              </div>
            )}
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Uploading...' : 'Upload Presentation'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}