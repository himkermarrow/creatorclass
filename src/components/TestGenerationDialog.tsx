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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getQuestionsByMetadata } from '@/lib/questions';
import type { Question } from '@/lib/questions';
import { useToast } from '@/hooks/use-toast';

interface TestGenerationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  subject: string;
  topic: string;
  subtopic?: string;
  onQuestionsGenerated: (questions: Question[]) => void;
}

export function TestGenerationDialog({
  isOpen,
  onClose,
  subject,
  topic,
  subtopic,
  onQuestionsGenerated
}: TestGenerationDialogProps) {
  const [numQuestions, setNumQuestions] = useState(5);
  const { toast } = useToast();

  const handleGenerateTest = () => {
    if (numQuestions < 1 || numQuestions > 20) {
      toast({
        title: 'Invalid number of questions',
        description: 'Please enter a number between 1 and 20',
        variant: 'destructive'
      });
      return;
    }

    try {
      const questions = getQuestionsByMetadata(subject, topic, subtopic, numQuestions);
      
      if (questions.length < numQuestions) {
        toast({
          title: 'Not enough questions available',
          description: `Only ${questions.length} questions available for the selected topic. Generating test with available questions.`,
          variant: 'default'
        });
      }

      onQuestionsGenerated(questions);
      onClose();
    } catch (error) {
      toast({
        title: 'Error generating test',
        description: 'Failed to generate test questions. Please try again.',
        variant: 'destructive'
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate Test</DialogTitle>
          <DialogDescription>
            Create a test from questions related to {topic} in {subject}
            {subtopic ? ` (${subtopic})` : ''}.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="numQuestions" className="col-span-2">
              Number of Questions
            </Label>
            <Input
              id="numQuestions"
              type="number"
              min={1}
              max={20}
              value={numQuestions}
              onChange={(e) => setNumQuestions(parseInt(e.target.value, 10))}
              className="col-span-2"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleGenerateTest}>
            Generate Test
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 