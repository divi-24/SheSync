import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import Sidebar from "../SideBar";
import { Link } from "react-router-dom";

const games = [
    {
        title: "Quiz",
        image: "/bliss/images/quiz.jpg",
        description:
            "It's a mental state assessment quiz. Based on your answers, a playlist is created to improve your mental state.",
        link: "/bliss/quiz",
    },
    {
        title: "Sudoku",
        image: "/bliss/images/sudoku.jpg",
        description:
            "Fill a 9x9 grid with digits so that every row, column, and 3x3 box contains all digits from 1 to 9.",
        link: "/bliss/sudoku",
    },
    {
        title: "Memory Game",
        image: "/bliss/images/memorygame.jpg",
        description:
            "Flip cards to find identical pairs. Train your memory and have fun.",
        link: "/bliss/memory-game",
    },
    {
        title: "Jokes And Quotes",
        image: "/bliss/images/laugh.jpg",
        description:
            "Uplift your mood with jokes and quotes. Share with your friends and enjoy.",
        link: "/bliss/joke-quote",
    },
    {
        title: "Mood Map",
        image: "/bliss/images/moodmap.jpg",
        description:
            "Track your mood via a video feed and share your emotional insights with friends.",
        link: "/bliss/mood-map",
    },
    {
        title: "Simon Game",
        image: "/bliss/images/simon_game.png",
        description:
            "Repeat the pattern shown by the game. Test your memory and reflexes!",
        link: "/bliss/simon",
    },
    {
        title: "Hangman Game",
        image: "/bliss/images/Hangman.png",
        description:
            "A health-themed Hangman game where you guess words related to pregnancy and the menstrual cycle, one letter at a time!",
        link: "/bliss/Hangman",
    },
];

export default function Bliss() {
    const [sidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setSidebarVisible((prev) => !prev);
    };

    return (
        <div className="flex h-screen bg-pink-50 dark:bg-gray-950 overflow-hidden">
            {/* Sidebar (mobile toggle handled inside Sidebar) */}
            <Sidebar
                sidebarVisible={sidebarVisible}
                setSidebarVisible={setSidebarVisible}
                activeLink={14}
            />

            {/* Toggle Button (only on laptops) */}
            <button
                onClick={toggleSidebar}
                className="hidden lg:block fixed left-0 top-0 w-10 z-50 p-2 bg-pink-600 text-white rounded-r-md transition-all duration-300"
                style={{
                    transform: sidebarVisible ? "translateX(256px)" : "translateX(0)",
                }}
            >
                <ChevronRight
                    size={14}
                    className={`m-auto transition-transform ${sidebarVisible ? "rotate-180" : ""}`}
                />
            </button>

            {/* Main Content */}
            <div
                className={`flex-1 overflow-y-auto transition-all duration-300 ${sidebarVisible ? "lg:ml-64" : "ml-0"
                }`}
            >
                <div className="p-6 max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold text-pink-600 mb-8 text-center">
                        Games
                    </h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {games.map((game, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col"
                            >
                                <div className="h-48 w-full bg-white overflow-hidden">
                                    <img
                                        src={game.image}
                                        alt={game.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="p-4 flex flex-col flex-1 justify-between">
                                    <div>
                                        <h2 className="text-xl font-semibold text-pink-700 dark:text-pink-400 mb-2">
                                            {game.title}
                                        </h2>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                            {game.description}
                                        </p>
                                    </div>
                                    <Link
                                        to={game.link}
                                        className="mt-4 inline-block bg-pink-600 text-white text-center py-2 px-4 rounded-lg hover:bg-pink-700 hover:text-gray-200 transition-colors"
                                    >
                                        {["Mood Map", "Simon Game"].includes(game.title)
                                            ? "Visit"
                                            : "Play"}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
