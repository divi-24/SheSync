import React, { useState, useEffect } from "react";
import Sidebar from "../../SideBar";
import { ChevronRight, ArrowLeft, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const colors = ["red", "green", "yellow", "blue"];

const colorStyles = {
    red: "bg-red-500 hover:bg-red-600",
    green: "bg-green-500 hover:bg-green-600",
    yellow: "bg-yellow-400 hover:bg-yellow-500",
    blue: "bg-blue-500 hover:bg-blue-600",
};

export default function SimonGame() {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [sequence, setSequence] = useState([]);
    const [userIndex, setUserIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const [activeColor, setActiveColor] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [level, setLevel] = useState(0);
    const navigate = useNavigate();
    const toggleSidebar = () => setSidebarVisible((prev) => !prev);

    const playSound = (color) => {
        const audio = new Audio(`/bliss/audio/${color}.mp3`);
        audio.play();
    };

    const flashColor = async (color) => {
        setActiveColor(color);
        playSound(color);
        await new Promise((resolve) => setTimeout(resolve, 600));
        setActiveColor(null);
    };

    const playSequence = async () => {
        setIsPlaying(true);
        for (const color of sequence) {
            await flashColor(color);
            await new Promise((resolve) => setTimeout(resolve, 300));
        }
        setIsPlaying(false);
    };

    const startGame = () => {
        setGameOver(false);
        setGameStarted(true);
        setScore(0);
        setUserIndex(0);
        setLevel(1);

        const firstColor = colors[Math.floor(Math.random() * 4)];
        setTimeout(() => {
            setSequence([firstColor]);
        }, 1500);
    };

    const endGame = () => {
        setGameStarted(false);
        setGameOver(false);
        setSequence([]);
        setUserIndex(0);
        setScore(0);
        setLevel(0);
    };

    useEffect(() => {
        if (sequence.length > 0) playSequence();
    }, [sequence]);

    const handleUserInput = async (color) => {
        if (!gameStarted || isPlaying || gameOver) return;
        playSound(color);

        if (color === sequence[userIndex]) {
            if (userIndex === sequence.length - 1) {
                const nextColor = colors[Math.floor(Math.random() * 4)];

                setTimeout(() => {
                    setSequence([...sequence, nextColor]);
                    setUserIndex(0);
                    setScore((prev) => prev + 1);
                    setLevel((prev) => prev + 1);
                }, 1500);
            } else {
                setUserIndex(userIndex + 1);
            }
        } else {
            playSound("wrong");
            setGameOver(true);
            setGameStarted(false);
        }
    };

    return (
        <div className="flex h-screen bg-pink-50 dark:bg-gray-950 overflow-hidden">
            <Sidebar
                sidebarVisible={sidebarVisible}
                setSidebarVisible={setSidebarVisible}
                activeLink={13}
            />

            {/* Sidebar Toggle */}
            <button
                onClick={toggleSidebar}
                className="hidden lg:block fixed left-0 top-0 w-10 z-50 p-2 bg-pink-600 text-white rounded-r-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
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

            {/* Back to Bliss Button */}
            <button
                onClick={() => navigate("/bliss")}
                className="fixed top-4 right-4 z-30 lg:z-40 flex items-center gap-2 bg-white text-pink-600 border border-pink-300 hover:bg-pink-100 dark:bg-gray-900 dark:text-pink-400 dark:border-pink-800 dark:hover:bg-gray-800 transition px-4 py-2 rounded-md text-sm shadow-md"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Bliss Page
            </button>

            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 ${sidebarVisible ? "lg:ml-64" : "ml-0"} p-6 flex flex-col items-center justify-center text-center`}>
                <h1 className="text-4xl font-bold text-pink-700 dark:text-pink-300 mb-6">
                    Simon Game
                </h1>

                {gameOver ? (
                    <div className="flex flex-col items-center text-red-600 dark:text-red-400 mb-6">
                        <XCircle size={48} />
                        <p className="mt-2 text-xl font-bold">Game Over! Final Score: {score}</p>
                        <button
                            onClick={startGame}
                            className="mt-4 bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white transition"
                        >
                            Restart
                        </button>
                    </div>
                ) : (
                    <>
                        {!gameStarted ? (
                            <button
                                onClick={startGame}
                                className="bg-pink-600 text-white px-6 py-3 mb-8 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white transition"
                            >
                                Start
                            </button>
                        ) : (
                            <button
                                onClick={endGame}
                                className="bg-red-600 text-white px-6 py-3 mb-8 rounded-full hover:bg-red-700 dark:hover:bg-red-800 hover:text-white transition"
                            >
                                End
                            </button>
                        )}

                        {gameStarted && !gameOver && (
                            <p className="text-2xl font-bold text-pink-600 dark:text-pink-300 mb-4">
                                Level {level}
                            </p>
                        )}

                        <div className="grid grid-cols-2 gap-6 mb-6">
                            {colors.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => handleUserInput(color)}
                                    className={`w-32 h-32 rounded-[30px] transition-all duration-300 shadow-lg ${colorStyles[color]
                                        } ${activeColor === color ? "ring-4 ring-white scale-105" : ""}`}
                                />
                            ))}
                        </div>

                        <p className="text-xl font-semibold text-pink-700 dark:text-pink-300">
                            Score: {score}
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
