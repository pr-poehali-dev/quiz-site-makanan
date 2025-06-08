import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuizResult } from "@/types/quiz";

interface ResultsScreenProps {
  result: QuizResult;
  onRestart: () => void;
}

const ResultsScreen = ({ result, onRestart }: ResultsScreenProps) => {
  const percentage = Math.round((result.score / result.totalQuestions) * 100);

  const getResultMessage = () => {
    if (percentage >= 90)
      return { emoji: "🏆", text: "Превосходно!", color: "text-yellow-600" };
    if (percentage >= 70)
      return { emoji: "🎉", text: "Отлично!", color: "text-green-600" };
    if (percentage >= 50)
      return { emoji: "👍", text: "Хорошо!", color: "text-blue-600" };
    return { emoji: "📚", text: "Стоит повторить", color: "text-orange-600" };
  };

  const resultData = getResultMessage();

  return (
    <Card className="w-full max-w-2xl mx-auto animate-fade-in">
      <CardHeader className="text-center">
        <div className="text-8xl mb-4">{resultData.emoji}</div>
        <CardTitle className={`text-3xl font-bold ${resultData.color}`}>
          {resultData.text}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-center">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
          <div className="text-4xl font-bold text-purple-600 mb-2">
            {result.score} / {result.totalQuestions}
          </div>
          <div className="text-xl text-gray-600">
            Правильных ответов: {percentage}%
          </div>
        </div>

        <div className="space-y-3 text-left">
          <h3 className="text-lg font-semibold text-gray-800 text-center">
            Разбор экономических понятий:
          </h3>
          <div className="grid gap-2 text-sm text-gray-600">
            <div>
              📈 <strong>Инфляция</strong> — рост общего уровня цен
            </div>
            <div>
              📉 <strong>Дефляция</strong> — снижение общего уровня цен
            </div>
            <div>
              ⚡ <strong>Стагфляция</strong> — одновременный рост цен и
              безработицы
            </div>
            <div>
              💱 <strong>Девальвация</strong> — снижение курса национальной
              валюты
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 pt-4">
          <Button
            onClick={onRestart}
            className="px-8 py-2 bg-purple-600 hover:bg-purple-700"
          >
            Пройти ещё раз
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsScreen;
