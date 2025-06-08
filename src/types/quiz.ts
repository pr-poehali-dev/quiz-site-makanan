export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  title: string;
  description: string;
  answers: Answer[];
  correctAnswers: string[];
  explanation: string;
  type: "single" | "multiple";
  character: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  answers: Record<number, string[]>;
}
