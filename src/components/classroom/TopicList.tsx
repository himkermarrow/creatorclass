"use client"

import React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Topic = {
  label: string
  value: string
}

type TopicListProps = {
  topics: Topic[]
  selectedTopic: string
  onSelectTopic: (value: string) => void
}

const TopicList: React.FC<TopicListProps> = ({
  topics,
  selectedTopic,
  onSelectTopic,
}) => {
  return (
    <div className="w-full max-w-sm">
      <Select value={selectedTopic} onValueChange={onSelectTopic}>
        <SelectTrigger>
          <SelectValue placeholder="Select Topic" />
        </SelectTrigger>
        <SelectContent>
          {topics
            .filter((topic) => topic.value && topic.value !== "")
            .map((topic) => (
              <SelectItem key={topic.value} value={topic.value}>
                {topic.label}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default TopicList