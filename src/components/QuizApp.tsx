import { useState } from "react";
import { questions } from "@/data/questions";
import { QuizResult } from "@/types/quiz";
import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";
import AnswerExplanation from "./AnswerExplanation";
import ResultsScreen from "./ResultsScreen";

type QuizState = "question" | "explanation" | "results";

const QuizApp = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string[]>>({});
  const [quizState, setQuizState] = useState<QuizState>("question");
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswer = (answers: string[]) => {
    const newAnswers = { ...userAnswers, [currentQuestion.id]: answers };
    setUserAnswers(newAnswers);
    setQuizState("explanation");
  };

  const handleNext = () => {
    if (isLastQuestion) {
      calculateResults();
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setQuizState("question");
    }
  };

  const calculateResults = () => {
    let score = 0;
    questions.forEach((question) => {
      const userAnswer = userAnswers[question.id] || [];
      const isCorrect =
        question.correctAnswers.sort().join(",") ===
        userAnswer.sort().join(",");
      if (isCorrect) score++;
    });

    setQuizResult({
      score,
      totalQuestions: questions.length,
      answers: userAnswers,
    });
    setQuizState("results");
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setQuizState("question");
    setQuizResult(null);
  };

  if (quizState === "results" && quizResult) {
    return <ResultsScreen result={quizResult} onRestart={handleRestart} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Инфляция</h1>
          <p className="text-gray-600">Тест из пяти вопросов!</p>
        </div>

        <ProgressBar
          current={currentQuestionIndex + 1}
          total={questions.length}
        />

        {quizState === "question" && (
          <QuestionCard
            question={currentQuestion}
            onAnswer={handleAnswer}
            userAnswers={userAnswers[currentQuestion.id]}
          />
        )}

        {quizState === "explanation" && (
          <AnswerExplanation
            question={currentQuestion}
            userAnswers={userAnswers[currentQuestion.id] || []}
            onNext={handleNext}
            isLastQuestion={isLastQuestion}
          />
        )}
      </div>
    </div>
  );
};

export default QuizApp;
