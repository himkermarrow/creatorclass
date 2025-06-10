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

interface GeneratePdfFormProps {
  onGenerate: (
    files: File[],
    subject: string,
    topic?: string,
    subtopic?: string
  ) => void;
}

const GeneratePdfForm: React.FC<GeneratePdfFormProps> = ({ onGenerate }) => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedSubtopic, setSelectedSubtopic] = useState("");
  const [files, setFiles] = useState<File[]>([]);

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

    onGenerate(files, selectedSubject, selectedTopic || undefined, selectedSubtopic || undefined);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Subject */}
      <div className="space-y-2">
        <Label>Select Subject</Label>
        <Select
          value={selectedSubject}
          onValueChange={(value) => {
            setSelectedSubject(value);
            setSelectedTopic("");
            setSelectedSubtopic("");
          }}
        >
          <SelectTrigger>
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

      {/* Topic */}
      {topics.length > 0 && (
        <div className="space-y-2">
          <Label>Optional: Select Topic</Label>
          <Select
            value={selectedTopic}
            onValueChange={(value) => {
              setSelectedTopic(value);
              setSelectedSubtopic("");
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Topic (optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">None</SelectItem>
              {topics.map((topic) => (
                <SelectItem key={topic} value={topic}>
                  {topic}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Subtopic */}
      {subtopics.length > 0 && (
        <div className="space-y-2">
          <Label>Optional: Select Subtopic</Label>
          <Select
            value={selectedSubtopic}
            onValueChange={setSelectedSubtopic}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Subtopic (optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">None</SelectItem>
              {subtopics.map((sub) => (
                <SelectItem key={sub} value={sub}>
                  {sub}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* File Upload */}
      <div className="space-y-2">
        <Label>Upload Reference Documents</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
          <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
          <p>
            <span className="text-primary font-medium cursor-pointer">Choose files</span> or drag and drop
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            PDF, PPT, DOC, DOCX, TXT – Max size 10MB each
          </p>
          <Input
            type="file"
            accept="
              application/pdf,
              application/vnd.openxmlformats-officedocument.wordprocessingml.document,
              application/msword,
              application/vnd.openxmlformats-officedocument.presentationml.presentation,
              application/vnd.ms-powerpoint,
              text/plain
            "
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          <ul className="mt-2 text-sm text-muted-foreground">
            {files.length > 0
              ? files.map((f) => <li key={f.name}>{f.name}</li>)
              : <li>No files selected</li>}
          </ul>
        </div>
      </div>

      {/* Submit */}
      <Button type="submit" className="w-full">
        Generate Presentation
      </Button>
    </form>
  );
};

export default GeneratePdfForm;