import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Question } from "@/types/quiz";

interface AnswerExplanationProps {
  question: Question;
  userAnswers: string[];
  onNext: () => void;
  isLastQuestion: boolean;
}

const AnswerExplanation = ({
  question,
  userAnswers,
  onNext,
  isLastQuestion,
}: AnswerExplanationProps) => {
  const isCorrect =
    question.correctAnswers.sort().join(",") === userAnswers.sort().join(",");

  return (
    <Card className="w-full max-w-3xl mx-auto animate-fade-in">
      <CardHeader className="text-center">
        <div className="text-6xl mb-4">{isCorrect ? "🎉" : "😔"}</div>
        <CardTitle
          className={`text-2xl font-bold ${
            isCorrect ? "text-green-600" : "text-red-600"
          }`}
        >
          {isCorrect ? "Правильно!" : "Неправильно"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">
            Правильный ответ:
          </h4>
          <div className="space-y-1">
            {question.answers
              .filter((answer) => question.correctAnswers.includes(answer.id))
              .map((answer) => (
                <div key={answer.id} className="text-green-600 font-medium">
                  {answer.id.toUpperCase()}) {answer.text}
                </div>
              ))}
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">Объяснение:</h4>
          <p className="text-gray-700">{question.explanation}</p>
        </div>

        <div className="flex justify-center pt-4">
          <Button
            onClick={onNext}
            className="px-8 py-2 bg-purple-600 hover:bg-purple-700"
          >
            {isLastQuestion ? "Показать результаты" : "Следующий вопрос"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnswerExplanation;
