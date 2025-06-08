import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Question } from "@/types/quiz";

interface QuestionCardProps {
  question: Question;
  onAnswer: (answers: string[]) => void;
  userAnswers?: string[];
}

const QuestionCard = ({
  question,
  onAnswer,
  userAnswers = [],
}: QuestionCardProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(userAnswers);

  const handleAnswerChange = (answerId: string) => {
    if (question.type === "single") {
      setSelectedAnswers([answerId]);
    } else {
      setSelectedAnswers((prev) =>
        prev.includes(answerId)
          ? prev.filter((id) => id !== answerId)
          : [...prev, answerId],
      );
    }
  };

  const handleSubmit = () => {
    onAnswer(selectedAnswers);
  };

  const isAnswered = selectedAnswers.length > 0;

  return (
    <Card className="w-full max-w-3xl mx-auto animate-fade-in">
      <CardHeader className="text-center">
        <div className="text-6xl mb-4">{question.character}</div>
        <CardTitle className="text-2xl font-bold text-gray-800">
          {question.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-gray-700 leading-relaxed text-center">
          {question.description}
        </p>

        <div className="space-y-3">
          {question.answers.map((answer) => (
            <label
              key={answer.id}
              className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all hover:bg-gray-50 ${
                selectedAnswers.includes(answer.id)
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-200"
              }`}
            >
              <input
                type={question.type === "single" ? "radio" : "checkbox"}
                name={`question-${question.id}`}
                value={answer.id}
                checked={selectedAnswers.includes(answer.id)}
                onChange={() => handleAnswerChange(answer.id)}
                className="mr-3 h-4 w-4 text-purple-600"
              />
              <span className="text-gray-800">{answer.text}</span>
            </label>
          ))}
        </div>

        {question.type === "multiple" && (
          <p className="text-sm text-gray-600 text-center">
            Выберите 3 правильных ответа
          </p>
        )}

        <div className="flex justify-center pt-4">
          <Button
            onClick={handleSubmit}
            disabled={!isAnswered}
            className="px-8 py-2 bg-purple-600 hover:bg-purple-700"
          >
            Ответить
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
