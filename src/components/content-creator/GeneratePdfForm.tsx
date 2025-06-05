"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

interface GeneratePdfFormProps {
  subjects: string[]
  topicsBySubject: Record<string, string[]>
  onGenerate: (file: File, subject: string, topic?: string) => void
}

const GeneratePdfForm: React.FC<GeneratePdfFormProps> = ({
  subjects,
  topicsBySubject,
  onGenerate,
}) => {
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("")
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!file || !selectedSubject) {
      toast({ title: "Please select a subject and upload a file." })
      return
    }

    onGenerate(file, selectedSubject, selectedTopic || undefined)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0])
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label>Select Subject</Label>
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger>
            <SelectValue placeholder="Select subject" />
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

      {selectedSubject && topicsBySubject[selectedSubject]?.length > 0 && (
        <div className="space-y-2">
          <Label>Optional: Select Topic</Label>
          <Select value={selectedTopic} onValueChange={setSelectedTopic}>
            <SelectTrigger>
              <SelectValue placeholder="Select topic (optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">None</SelectItem>
              {topicsBySubject[selectedSubject].map((topic) => (
                <SelectItem key={topic} value={topic}>
                  {topic}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <Label>Upload Reference Document</Label>
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
          onChange={handleFileChange}
        />
        <p className="text-sm text-muted-foreground">
          Accepted formats: PDF, PPT, DOC, DOCX, TXT
        </p>
      </div>

      <Button type="submit" className="w-full">
        Generate Presentation
      </Button>
    </form>
  )
}

export default GeneratePdfForm