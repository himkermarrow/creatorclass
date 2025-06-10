"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { UploadCloud } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { subjectHierarchy } from "@/lib/subjectHierarchy";
import { LoadingSpinner } from "../LoadingSpinner";

interface GeneratePdfFormProps {
  onGenerate: (
    files: File[],
    subject: string,
    slideCount: number,
    topic?: string,
    subtopic?: string
  ) => void;
}

const GeneratePdfForm: React.FC<GeneratePdfFormProps> = ({ onGenerate }) => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedSubtopic, setSelectedSubtopic] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [slideCount, setSlideCount] = useState(10);

  const subjects = useMemo(() => Object.keys(subjectHierarchy), []);

  const topics = useMemo(() => {
    if (!selectedSubject) return [];
    return Object.keys(subjectHierarchy[selectedSubject] || {});
  }, [selectedSubject]);

  const subtopics = useMemo(() => {
    if (!selectedSubject || !selectedTopic) return [];
    return subjectHierarchy[selectedSubject]?.[selectedTopic] || [];
  }, [selectedSubject, selectedTopic]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (files.length === 0 || !selectedSubject) {
      toast({ title: "Please select a subject and upload at least one file." });
      return;
    }
    if (slideCount < 3 || slideCount > 20) {
      toast({ title: "Number of slides must be between 3 and 20." });
      return;
    }

    onGenerate(files, selectedSubject, slideCount, selectedTopic || undefined, selectedSubtopic || undefined);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="gen-subject">Select Subject</Label>
        <Select
          value={selectedSubject}
          onValueChange={(value) => {
            setSelectedSubject(value);
            setSelectedTopic("");
            setSelectedSubtopic("");
          }}
        >
          <SelectTrigger id="gen-subject">
            <SelectValue placeholder="Select Subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subj) => (
              <SelectItem key={subj} value={subj}>
                {subj}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* MODIFICATION START: Always render Topic dropdown, but disable it */}
      <div className="space-y-2">
        <Label htmlFor="gen-topic">Optional: Select Topic</Label>
        <Select
          value={selectedTopic}
          onValueChange={(value) => {
            setSelectedTopic(value);
            setSelectedSubtopic("");
          }}
          disabled={topics.length === 0}
        >
          <SelectTrigger id="gen-topic">
            <SelectValue placeholder="Select Topic (optional)" />
          </SelectTrigger>
          <SelectContent>
            {topics.map((topic) => (
              <SelectItem key={topic} value={topic}>
                {topic}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* MODIFICATION END */}

      {/* MODIFICATION START: Always render Sub-topic dropdown, but disable it */}
      <div className="space-y-2">
        <Label htmlFor="gen-subtopic">Optional: Select Subtopic</Label>
        <Select
          value={selectedSubtopic}
          onValueChange={setSelectedSubtopic}
          disabled={subtopics.length === 0}
        >
          <SelectTrigger id="gen-subtopic">
            <SelectValue placeholder="Select Subtopic (optional)" />
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
      {/* MODIFICATION END */}
      
      <div className="space-y-2">
        <Label htmlFor="slide-count">Number of Slides (3-20)</Label>
        <Input
          id="slide-count"
          type="number"
          value={slideCount}
          onChange={(e) => setSlideCount(parseInt(e.target.value, 10))}
          min="3"
          max="20"
          placeholder="e.g., 10"
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="generate-files"
          className="block cursor-pointer rounded-md border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-primary"
        >
          <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
          <p>
            <span className="text-primary font-medium">Choose files</span> or drag and drop
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            PDF, PPT, DOC, DOCX, TXT
          </p>
        </Label>
        <Input
          id="generate-files"
          type="file"
          accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        <ul className="mt-2 text-sm text-muted-foreground text-center space-y-1">
          {files.length > 0
            ? files.map((f) => <li key={f.name}>{f.name}</li>)
            : <li>No files selected</li>}
        </ul>
      </div>

      <Button type="submit" className="w-full">
        Generate PDF Presentation
      </Button>
    </form>
  );
};

export default GeneratePdfForm;