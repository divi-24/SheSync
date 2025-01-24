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
      questionText: "What is the average length of a menstrual cycle?",
      answerOptions: [
        { answerText: "14 days", isCorrect: false },
        { answerText: "28 days", isCorrect: true },
        { answerText: "45 days", isCorrect: false },
        { answerText: "60 days", isCorrect: false },
      ],
      explanation: "The average menstrual cycle is 28 days long, although it can range from 21 to 35 days in adults."
    },
    {
      questionText: "Which of these is NOT a phase of the menstrual cycle?",
      answerOptions: [
        { answerText: "Follicular phase", isCorrect: false },
        { answerText: "Ovulation", isCorrect: false },
        { answerText: "Luteal phase", isCorrect: false },
        { answerText: "Gestation phase", isCorrect: true },
      ],
      explanation: "The menstrual cycle consists of the follicular phase, ovulation, and luteal phase. Gestation is related to pregnancy, not the menstrual cycle."
    },
    {
      questionText: "What hormone is primarily responsible for the thickening of the uterine lining?",
      answerOptions: [
        { answerText: "Estrogen", isCorrect: true },
        { answerText: "Testosterone", isCorrect: false },
        { answerText: "Progesterone", isCorrect: false },
        { answerText: "Follicle-stimulating hormone (FSH)", isCorrect: false },
      ],
      explanation: "Estrogen is primarily responsible for the thickening of the uterine lining during the first half of the menstrual cycle."
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
          <div className="question-section mb-6 text-white">
            <div className="question-count text-lg font-medium mb-2">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <h3 className="question-text text-xl font-semibold mb-4 text-white">{questions[currentQuestion].questionText}</h3>
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

