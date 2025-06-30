import questionsData from '../../Question.json';

export interface Question {
  id: string;
  question: string;
  options: string[];
  correct_answer: string;
  subject: string;
  lesson: string;
  subtopic: string;
  explanation: string;
}

const questions = questionsData as Question[];

export const getQuestionsByMetadata = (
  subject: string,
  topic?: string,
  subtopic?: string,
  count: number = 10
): Question[] => {
  // First, filter by subject (required)
  let filteredQuestions = questions.filter((q: Question) => 
    q.subject.toLowerCase() === subject.toLowerCase()
  );

  // If we have a subtopic, prioritize those questions first
  if (subtopic) {
    const subtopicQuestions = filteredQuestions.filter((q: Question) =>
      q.subtopic.toLowerCase() === subtopic.toLowerCase()
    );
    
    // If we have enough subtopic questions, use those
    if (subtopicQuestions.length >= count) {
      return shuffleAndSlice(subtopicQuestions, count);
    }
  }

  // If we have a topic, try to fill remaining slots with topic-level questions
  if (topic) {
    const topicQuestions = filteredQuestions.filter((q: Question) =>
      q.lesson.toLowerCase() === topic.toLowerCase()
    );
    
    // If we have enough topic questions, use those
    if (topicQuestions.length >= count) {
      return shuffleAndSlice(topicQuestions, count);
    }
  }

  // If we still don't have enough questions, use subject-level questions
  return shuffleAndSlice(filteredQuestions, count);
};

// Helper function to shuffle and slice an array
const shuffleAndSlice = (array: Question[], count: number): Question[] => {
  return [...array].sort(() => Math.random() - 0.5).slice(0, count);
}; 