import React, { useState } from "react";
import Sidebar from "../../SideBar";
import {
    ChevronRight,
    Smile,
    MessageSquareQuote,
    ArrowLeft,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function QuoteJoke() {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [joke, setJoke] = useState(null);
    const [quote, setQuote] = useState(null);
    const navigate = useNavigate();

    const toggleSidebar = () => setSidebarVisible((prev) => !prev);

    const fetchJoke = async () => {
        try {
            const res = await axios.get(
                "https://v2.jokeapi.dev/joke/Any?type=single"
            );
            setJoke(res.data.joke);
        } catch (err) {
            setJoke("Failed to load joke.");
        }
    };

    const fetchQuote = async () => {
        try {
            const res = await axios.get("https://api.api-ninjas.com/v1/quotes", {
                headers: {
                    "X-Api-Key": import.meta.env.VITE_API_NINJAS_KEY,
                },
            });
            const data = res.data[0];
            setQuote(`${data.quote} — ${data.author}`);
        } catch (err) {
            setQuote("Failed to load quote.");
        }
    };

    return (
        <div className="flex h-screen bg-pink-50 dark:bg-gray-950 overflow-hidden">
            {/* Sidebar */}
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

            {/* Back to Bliss */}
            <button
                onClick={() => navigate("/bliss")}
                className="fixed top-4 right-4 z-30 lg:z-40 flex items-center gap-2 bg-white text-pink-600 border border-pink-300 hover:bg-pink-100 dark:bg-gray-900 dark:text-pink-400 dark:border-pink-800 dark:hover:bg-gray-800 transition px-4 py-2 rounded-md text-sm shadow-md"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Bliss Page
            </button>

            {/* Main Content */}
                  <div className={`flex-1 transition-all duration-300 ${sidebarVisible ? "lg:ml-64" : "ml-0"} p-6 flex flex-col items-center justify-center text-center`}>
                <h1 className="text-4xl font-bold text-pink-700 dark:text-pink-300 mb-10">
                    Jokes & Quotes
                </h1>

                {/* Buttons */}
                <div className="flex flex-col md:flex-row gap-6 mb-10">
                    <button
                        onClick={fetchJoke}
                        className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white transition flex items-center gap-2"
                    >
                        <Smile size={18} /> Get a Joke
                    </button>

                    <button
                        onClick={fetchQuote}
                        className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white transition flex items-center gap-2"
                    >
                        <MessageSquareQuote size={18} /> Get a Quote
                    </button>
                </div>

                {/* Result Display */}
                <div className="w-full max-w-2xl space-y-6">
                    {/* Joke Box */}
                    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-6 rounded-lg shadow-md min-h-[100px]">
                        <h2 className="text-xl font-semibold mb-2 text-pink-600 dark:text-pink-400">
                            Joke
                        </h2>
                        {joke ? (
                            <p className="text-lg italic">{joke}</p>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400">
                                No joke yet. Click the button above to fetch one!
                            </p>
                        )}
                    </div>

                    {/* Quote Box */}
                    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-6 rounded-lg shadow-md min-h-[100px]">
                        <h2 className="text-xl font-semibold mb-2 text-pink-600 dark:text-pink-400">
                            Quote
                        </h2>
                        {quote ? (
                            <p className="text-lg italic">{quote}</p>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400">
                                No quote yet. Click the button above to fetch one!
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
