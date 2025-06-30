'use client';

import React, { useState } from 'react';
import type { Question } from '@/lib/questions';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface TestQuestionsProps {
  questions: Question[];
  onClose: () => void;
}

export function TestQuestions({ questions, onClose }: TestQuestionsProps) {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      toast({
        title: 'Incomplete test',
        description: 'Please answer all questions before submitting.',
        variant: 'destructive'
      });
      return;
    }

    setShowResults(true);
  };

  const getScore = () => {
    return questions.reduce((score, question) => {
      return score + (answers[question.id] === question.correct_answer ? 1 : 0);
    }, 0);
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-grow">
        <div className="space-y-6 p-4">
          {questions.map((question, index) => (
            <Card key={question.id} className={showResults ? (answers[question.id] === question.correct_answer ? 'border-green-500' : 'border-red-500') : ''}>
              <CardHeader>
                <CardTitle className="text-lg">Question {index + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{question.question}</p>
                <RadioGroup
                  value={answers[question.id]}
                  onValueChange={(value) => setAnswers(prev => ({ ...prev, [question.id]: value }))}
                  disabled={showResults}
                >
                  {question.options.map((option, optIndex) => (
                    <div key={optIndex} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={option}
                        id={`${question.id}-${optIndex}`}
                      />
                      <Label htmlFor={`${question.id}-${optIndex}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
                {showResults && (
                  <div className="mt-4">
                    <p className="font-semibold text-sm">
                      {answers[question.id] === question.correct_answer ? (
                        <span className="text-green-600">Correct!</span>
                      ) : (
                        <span className="text-red-600">
                          Incorrect. The correct answer is: {question.correct_answer}
                        </span>
                      )}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {question.explanation}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t flex justify-between items-center">
        {showResults ? (
          <>
            <p className="text-lg font-semibold">
              Score: {getScore()} out of {questions.length} ({Math.round((getScore() / questions.length) * 100)}%)
            </p>
            <Button onClick={onClose}>Close</Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Submit Test
            </Button>
          </>
        )}
      </div>
    </div>
  );
} 