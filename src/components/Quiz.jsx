import React, { useState, useEffect } from 'react';
import { Check, X, AlertCircle } from 'lucide-react';

export function Quiz({ onQuizComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [explanation, setExplanation] = useState('');

  const questions = [
    {
      questionText: "What is the function of progesterone in the menstrual cycle?",
      answerOptions: [
        { answerText: "Triggers ovulation", isCorrect: false },
        { answerText: "Maintains the uterine lining", isCorrect: true },
        { answerText: "Inhibits FSH and LH", isCorrect: false },
        { answerText: "Stimulates follicle growth", isCorrect: false },
      ],
      explanation: "Progesterone helps maintain the uterine lining after ovulation to support a potential pregnancy."
    },
    {
      questionText: "During which phase of the menstrual cycle does ovulation occur?",
      answerOptions: [
        { answerText: "Follicular phase", isCorrect: false },
        { answerText: "Ovulation phase", isCorrect: true },
        { answerText: "Luteal phase", isCorrect: false },
        { answerText: "Menstrual phase", isCorrect: false },
      ],
      explanation: "Ovulation occurs around the middle of the cycle, usually on day 14 of a 28-day cycle."
    },
    {
      questionText: "Which hormone surges to trigger ovulation?",
      answerOptions: [
        { answerText: "Progesterone", isCorrect: false },
        { answerText: "Luteinizing hormone (LH)", isCorrect: true },
        { answerText: "Estrogen", isCorrect: false },
        { answerText: "Follicle-stimulating hormone (FSH)", isCorrect: false },
      ],
      explanation: "A surge in luteinizing hormone (LH) triggers ovulation, causing the release of an egg."
    },
    {
      questionText: "What happens during the follicular phase?",
      answerOptions: [
        { answerText: "The uterine lining is shed", isCorrect: false },
        { answerText: "An egg is released", isCorrect: false },
        { answerText: "Follicles develop in the ovary", isCorrect: true },
        { answerText: "Progesterone levels peak", isCorrect: false },
      ],
      explanation: "During the follicular phase, follicles develop in the ovary, with one dominant follicle maturing to release an egg."
    },
    {
      questionText: "Which hormone is responsible for stimulating follicle growth?",
      answerOptions: [
        { answerText: "Luteinizing hormone (LH)", isCorrect: false },
        { answerText: "Estrogen", isCorrect: false },
        { answerText: "Follicle-stimulating hormone (FSH)", isCorrect: true },
        { answerText: "Progesterone", isCorrect: false },
      ],
      explanation: "FSH stimulates the growth of follicles in the ovary, leading to egg maturation."
    },
    {
      questionText: "What happens to the uterine lining if fertilization does not occur?",
      answerOptions: [
        { answerText: "It thickens further", isCorrect: false },
        { answerText: "It remains the same", isCorrect: false },
        { answerText: "It sheds, resulting in menstruation", isCorrect: true },
        { answerText: "It turns into a placenta", isCorrect: false },
      ],
      explanation: "If fertilization does not occur, progesterone levels drop, causing the uterine lining to shed during menstruation."
    },
  ];

  useEffect(() => {
    if (showScore) {
      onQuizComplete(score);
    }
  }, [showScore, score, onQuizComplete]);

  const handleAnswerClick = (isCorrect, index) => {
    setSelectedAnswer(index);
    setAnswered(true);
    if (isCorrect) {
      setScore(score + 1);
      setExplanation("Correct! " + questions[currentQuestion].explanation);
    } else {
      setExplanation("Incorrect. " + questions[currentQuestion].explanation);
    }
  };

  const handleNextQuestion = () => {
    setAnswered(false);
    setSelectedAnswer(null);
    setExplanation('');
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="quiz bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      {showScore ? (
        <div className="score-section text-center">
          <h3 className="text-2xl font-semibold mb-4">Quiz Completed!</h3>
          <p className="text-xl mb-4">You scored {score} out of {questions.length}</p>
          <div className="flex justify-center items-center mb-4">
            {score === questions.length ? (
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full flex items-center">
                <Check className="mr-2" />
                Perfect Score!
              </div>
            ) : score >= questions.length / 2 ? (
              <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full flex items-center">
                <AlertCircle className="mr-2" />
                Good Job!
              </div>
            ) : (
              <div className="bg-red-100 text-red-800 px-4 py-2 rounded-full flex items-center">
                <X className="mr-2" />
                Keep Learning!
              </div>
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {score === questions.length
              ? "Congratulations! You're a women's health expert!"
              : score >= questions.length / 2
                ? "Great effort! You have a good understanding of women's health."
                : "Don't worry! Learning about women's health is a journey. Keep exploring and learning!"}
          </p>
        </div>
      ) : (
        <>
          <div className="question-section mb-6 text-black-900 dark:text-gray-200">
            <div className="question-count font-medium mb-2">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <h3 className="question-text text-xl font-semibold mb-4 text-black-900 dark:text-gray-200">{questions[currentQuestion].questionText}</h3>
            <div className="w-full bg-pink-200 rounded-full h-2.5 mb-6 dark:bg-pink-700">
              <div className="bg-pink-600 h-2.5 rounded-full dark:bg-pink-500" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
            </div>
          </div>
          <div className="answer-section grid grid-cols-1 gap-4 mb-6" >
            {questions[currentQuestion].answerOptions.map((answerOption, index) => (
              <button
                key={index}
                onClick={() => !answered && handleAnswerClick(answerOption.isCorrect, index)}
                className={`px-4 py-3 text-sm font-medium text-left rounded-md transition-colors duration-300 flex justify-between items-center ${
                  answered
                    ? index === selectedAnswer
                      ? answerOption.isCorrect
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    : 'bg-pink-100 text-pink-100 hover:bg-pink-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                }`}
                disabled={answered}
              >
                <p>{answerOption.answerText}</p>
                {answered && index === selectedAnswer && (
                  answerOption.isCorrect ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />
                )}
              </button>
            ))}
          </div>
          {explanation && (
            <div className={`mb-6 p-4 rounded-md ${answered && selectedAnswer !== null && questions[currentQuestion].answerOptions[selectedAnswer].isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              <p className="text-sm">{explanation}</p>
            </div>
          )}
          {answered && (
            <button
              onClick={handleNextQuestion}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-300"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
            </button>
          )}
        </>
      )}
    </div>
  );
}
