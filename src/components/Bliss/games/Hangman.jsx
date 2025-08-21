import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ArrowLeft } from "lucide-react";
import SideBar from "../../SideBar";

const WORDS = [
  { word: "period", hint: "Monthly menstrual cycle" },
  { word: "ovulation", hint: "Release of an egg from the ovary" },
  { word: "fertility", hint: "Ability to conceive a child" },
  { word: "hormones", hint: "Chemical messengers affecting cycles" },
  { word: "menstrual", hint: "Related to menstruation" },
  { word: "pregnancy", hint: "State of carrying a developing baby" },
  { word: "trimester", hint: "One-third of pregnancy period" },
  { word: "cramps", hint: "Common period pain" },
  { word: "flow", hint: "Discharge during menstruation" },
  { word: "implantation", hint: "When fertilized egg attaches to uterus" },
  { word: "estrogen", hint: "Primary female sex hormone" },
  { word: "progesterone", hint: "Hormone important for pregnancy" },
  { word: "cervix", hint: "Neck of the uterus" },
  { word: "uterus", hint: "Womb, where the baby grows" },
  { word: "placenta", hint: "Organ that nourishes the baby" },
  { word: "contractions", hint: "Labor muscle tightening" },
  { word: "midwife", hint: "Healthcare professional for childbirth" },
  { word: "doula", hint: "Support person during pregnancy/labor" },
  { word: "periodtracker", hint: "App to monitor menstrual cycles" },
  { word: "menopause", hint: "End of menstruation cycle" },
  { word: "flowchart", hint: "Visual tracker for menstrual cycle" },
  { word: "cycle", hint: "Repeating hormonal pattern" },
  { word: "spotting", hint: "Light bleeding between periods" },
  { word: "basal", hint: "Body temperature used to track ovulation" },
  { word: "mood", hint: "Emotional changes during PMS" },
  { word: "nutrition", hint: "Essential for pregnancy health" },
  { word: "hydration", hint: "Important during menstruation" },
  { word: "calendar", hint: "Used to track ovulation or periods" },
  { word: "pregnancytest", hint: "Used to check if you're pregnant" },
  { word: "breastfeeding", hint: "Feeding a baby with milk from the breast" }
];


export default function Hangman() {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [word, setWord] = useState("");
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [wrongGuesses, setWrongGuesses] = useState(0);
    const [hint, setHint] = useState("");
    const [lastWord, setLastWord] = useState(null);
    const maxWrong = 6;
    const navigate = useNavigate();

    useEffect(() => {
        restartGame();
    }, []);

    const handleGuess = (letter) => {
        if (guessedLetters.includes(letter)) return;
        setGuessedLetters((prev) => [...prev, letter]);
        if (!word.includes(letter)) {
            setWrongGuesses((prev) => prev + 1);
        }
    };

    const isWinner = word.split("").every((char) => guessedLetters.includes(char));
    const isGameOver = wrongGuesses >= maxWrong;

    const restartGame = () => {
        let newWordObj;
        do {
            newWordObj = WORDS[Math.floor(Math.random() * WORDS.length)];
        } while (newWordObj.word === lastWord && WORDS.length > 1);

        setWord(newWordObj.word);
        setHint(newWordObj.hint);
        setLastWord(newWordObj.word);
        setGuessedLetters([]);
        setWrongGuesses(0);
    };

    const renderWord = () =>
        word.split("").map((char, i) => (
            <span
                key={i}
                className="border-b-2 border-pink-600 dark:border-pink-400 text-xl sm:text-2xl mx-1 w-6 sm:w-8 inline-block text-center font-semibold"
            >
                {guessedLetters.includes(char) || isGameOver ? char : ""}
            </span>
        ));

    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

    const toggleSidebar = () => setSidebarVisible((prev) => !prev);

    return (
        <div className="flex min-h-screen bg-pink-50 dark:bg-gray-950">
            {/* Sidebar */}
            <SideBar
                sidebarVisible={sidebarVisible}
                setSidebarVisible={setSidebarVisible}
                activeLink={16}
            />

            {/* Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="hidden lg:block fixed left-0 top-0 w-10 z-50 p-2 bg-pink-600 text-white rounded-r-md transition-all duration-300 ease-in-out"
                style={{
                    transform: sidebarVisible ? "translateX(256px)" : "translateX(0)",
                }}
                aria-label={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
            >
                <ChevronRight
                    size={14}
                    className={`transition-transform duration-300 block m-auto ${sidebarVisible ? "rotate-180" : "rotate-0"
                        }`}
                />
            </button>

            {/* Back Button */}
            <button
                onClick={() => navigate("/bliss")}
                className="fixed top-4 right-4 z-30 lg:z-40 flex items-center gap-2 bg-white text-pink-600 border border-pink-300 hover:bg-pink-100 dark:bg-gray-900 dark:text-pink-400 dark:border-pink-800 dark:hover:bg-gray-800 transition px-4 py-2 rounded-md text-sm shadow-md"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Bliss Page
            </button>

            {/* Game UI */}
            <div className="flex-1 flex flex-col items-center justify-center p-4 sm:px-6">
                <div className="text-center w-full max-w-3xl">
                    <h2 className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-4">
                        🎯 Hangman Game
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm sm:text-base">
                        <p className="mb-4 text-sm sm:text-base text-pink-700 dark:text-pink-300">
                            💡 <span className="font-medium">Hint:</span> {hint}
                        </p>

                        Guess the hidden word one letter at a time. You can only make{" "}
                        <span className="font-bold">{maxWrong}</span> wrong guesses!
                    </p>

                    {/* Word Display */}
                    <div className="mb-6 text-2xl font-mono tracking-wide flex justify-center flex-wrap gap-1">
                        {renderWord()}
                    </div>

                    {/* Alphabet Buttons */}
                    <div className="grid grid-cols-7 sm:grid-cols-13 gap-2 justify-center mb-6">
                        {alphabet.map((letter) => (
                            <button
                                key={letter}
                                disabled={guessedLetters.includes(letter) || isWinner || isGameOver}
                                onClick={() => handleGuess(letter)}
                                className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded text-sm font-medium border shadow-sm transition ${guessedLetters.includes(letter)
                                    ? "bg-gray-300 text-white cursor-not-allowed"
                                    : "bg-white text-pink-700 border-pink-400 hover:bg-pink-100"
                                    }`}
                            >
                                {letter.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    {/* Game Result */}
                    <div className="text-lg font-semibold mb-4">
                        {isWinner && (
                            <span className="text-green-600 dark:text-green-400">
                                🎉 You won! The word was "{word}"
                            </span>
                        )}
                        {isGameOver && (
                            <span className="text-red-600 dark:text-red-400">
                                😢 Game Over! The word was "{word}"
                            </span>
                        )}
                    </div>

                    {/* Restart Button */}
                    {(isWinner || isGameOver) && (
                        <button
                            onClick={restartGame}
                            className="mt-4 bg-pink-600 text-white px-5 py-2 rounded hover:bg-pink-700 transition"
                        >
                            🔁 Play Again
                        </button>
                    )}

                    {/* Wrong Guesses Count */}
                    <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
                        Wrong guesses: {wrongGuesses} / {maxWrong}
                    </p>
                </div>
            </div>
        </div>
    );
}
