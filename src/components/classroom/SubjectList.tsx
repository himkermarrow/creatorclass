"use client"

import React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Subject = {
  label: string
  value: string
}

type SubjectListProps = {
  subjects: Subject[]
  selectedSubject: string
  onSelectSubject: (value: string) => void
}

const SubjectList: React.FC<SubjectListProps> = ({
  subjects,
  selectedSubject,
  onSelectSubject,
}) => {
  return (
    <div className="w-full max-w-sm">
      <Select value={selectedSubject} onValueChange={onSelectSubject}>
        <SelectTrigger>
          <SelectValue placeholder="Select Subject" />
        </SelectTrigger>
        <SelectContent>
          {subjects
            .filter((subject) => subject.value && subject.value !== "")
            .map((subject) => (
              <SelectItem key={subject.value} value={subject.value}>
                {subject.label}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default SubjectList