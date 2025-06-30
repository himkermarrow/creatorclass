'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Question } from '@/lib/questions';
import { PdfViewer } from "./PdfViewer";
import { TestGenerationDialog } from './TestGenerationDialog';
import { TestQuestions } from './TestQuestions';

interface QuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subject: string;
  topic: string;
  subtopic: string;
  fileUrl: string;
}

export function QuestionModal({
  isOpen,
  onClose,
  title,
  subject,
  topic,
  subtopic,
  fileUrl
}: QuestionModalProps) {
  const [isTestDialogOpen, setIsTestDialogOpen] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[] | null>(null);

  const handleGenerateQuestions = () => {
    setIsTestDialogOpen(true);
  };

  const handleQuestionsGenerated = (questions: Question[]) => {
    setGeneratedQuestions(questions);
  };

  const handleCloseTest = () => {
    setGeneratedQuestions(null);
    setIsTestDialogOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent 
          className="max-w-4xl h-[90vh] flex flex-col p-6"
          aria-describedby="modal-description"
        >
          {generatedQuestions ? (
            <TestQuestions 
              questions={generatedQuestions} 
              onClose={handleCloseTest} 
            />
          ) : (
            <>
              <DialogHeader className="flex-shrink-0">
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription id="modal-description">
                  {subject} &gt; {topic} &gt; {subtopic}
                </DialogDescription>
              </DialogHeader>
              
              <div className="flex-1 min-h-0 overflow-hidden rounded-md border border-gray-200 bg-white">
                {fileUrl ? (
                  <PdfViewer fileUrl={fileUrl} />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-red-500">No PDF file URL provided</p>
                  </div>
                )}
              </div>

              <DialogFooter className="flex-shrink-0 pt-4">
                <div className="flex justify-between w-full">
                  <Button variant="outline" onClick={onClose}>
                    Close
                  </Button>
                  <Button onClick={handleGenerateQuestions}>
                    Generate Questions
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <TestGenerationDialog
        isOpen={isTestDialogOpen}
        onClose={() => setIsTestDialogOpen(false)}
        subject={subject}
        topic={topic}
        subtopic={subtopic}
        onQuestionsGenerated={handleQuestionsGenerated}
      />
    </>
  );
} 