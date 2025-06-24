import React, { useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "../../SideBar";
import { ChevronRight, Headphones, ArrowLeft } from "lucide-react";
import axios from "axios";

interface Question {
  question: string;
  options: string[];
}

interface Playlist {
  id: string;
  name?: string;
  description?: string;
  external_urls?: {
    spotify: string;
  };
}

const questions: Question[] = [
  {
    question: "How was your day today?",
    options: ["Good!", "In the middle", "Not good..."],
  },
  {
    question: "How are you feeling right now?",
    options: [
      "Happy/Content",
      "Sad/Discontent",
      "Angry/Irritated",
      "Nervous/Tense",
      "Sleepy/Tired",
    ],
  },
  {
    question: "What genres do you typically like?",
    options: ["Rock", "Hip-hop/Rap", "Pop", "Alternative", "Country"],
  },
];

type MoodKeyword = "happy" | "sad" | "angry" | "relax" | "chill" | "uplift" | "positive";

const Quiz: React.FC = () => {
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(true);
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const router = useRouter();
  const [moodKeyword, setMoodKeyword] = useState<MoodKeyword>("happy");

  const toggleSidebar = () => setSidebarVisible((prev) => !prev);

  const handleAnswer = async (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const mood = generateMoodKeyword(newAnswers);
      setMoodKeyword(mood);
      try {
        const res = await axios.get<{ playlist: Playlist }>(
          `/api/spotify/recommend?mood=${encodeURIComponent(mood)}`
        );
        setPlaylist(res.data.playlist);
        console.log("Final Answers:", newAnswers);
        console.log("Mood:", mood);
        console.log("Playlist Result:", res.data.playlist);
      } catch (err) {
        console.error("Failed to fetch playlist:", err instanceof Error ? err.message : String(err));
      }
    }
  };

  const generateMoodKeyword = (answers: string[]): MoodKeyword => {
    const [, feeling] = answers;
    if (feeling.includes("Happy")) return "happy";
    if (feeling.includes("Sad")) return "sad";
    if (feeling.includes("Angry")) return "angry";
    if (feeling.includes("Nervous")) return "relax";
    if (feeling.includes("Sleepy")) return "chill";
    if (answers[0]?.includes("Not good")) return "uplift";
    return "positive";
  };

  return (
    <div className="flex min-h-screen bg-pink-50 dark:bg-gray-950 overflow-auto">
      <Sidebar
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        activeLink={13}
      />

      {/* Sidebar toggle arrow */}
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
          className={`transition-transform duration-300 block m-auto ${
            sidebarVisible ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      {/* Back to Bliss Page button */}
      <button
        onClick={() => router.push("/bliss")}
        className="fixed top-4 right-4 z-30 lg:z-40 flex items-center gap-2 bg-white text-pink-600 border border-pink-300 hover:bg-pink-100 dark:bg-gray-900 dark:text-pink-400 dark:border-pink-800 dark:hover:bg-gray-800 transition px-4 py-2 rounded-md text-sm shadow-md"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Bliss Page
      </button>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarVisible ? "lg:ml-64" : "ml-0"
        } p-6 flex flex-col items-center justify-center text-center`}
      >
        {!playlist ? (
          <>
            {/* QUIZ Title */}
            <h1 className="text-4xl font-bold text-pink-700 dark:text-pink-300 mb-10">
              QUIZ
            </h1>

            <h2 className="text-2xl font-bold text-pink-700 dark:text-pink-300 mb-4">
              {questions[step].question}
            </h2>
            <div className="space-y-4 w-full max-w-md">
              {questions[step].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt)}
                  className="bg-pink-600 text-white px-6 py-3 w-full rounded-full hover:bg-pink-700 transition"
                >
                  {opt}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center flex flex-col items-center">
            <h2 className="text-3xl font-bold text-pink-600 mb-6 flex justify-center items-center gap-2">
              <Headphones className="w-7 h-7" /> Your Playlist Suggestion
            </h2>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl flex flex-col items-center">
              <div className="w-full mt-4">
                {playlist?.id && (
                  <iframe
                    src={`https://open.spotify.com/embed/playlist/${playlist.id}?utm_source=generator`}
                    width="100%"
                    height="450"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-lg"
                  />
                )}
              </div>

              {/* Mood Result Below Playlist */}
              <p className="mt-6 text-pink-700 dark:text-pink-300 text-lg font-medium">
                Your mood – <span className="capitalize">{moodKeyword}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;