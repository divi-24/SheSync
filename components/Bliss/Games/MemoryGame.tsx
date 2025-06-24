import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Smile,
  Sun,
  Moon,
  Star,
  Cloud,
  Zap,
  Leaf,
  Flame,
  Droplet,
  Eye,
  Heart,
  Ghost,
  Bell,
  Apple,
  Camera,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import SideBar from "../../SideBar"; // Adjust path as needed

type IconType = React.ComponentType<{ size: number }>;
const icons: IconType[] = [Smile, Sun, Moon, Star, Cloud, Zap, Leaf, Flame, Droplet, Eye, Heart, Ghost, Bell, Apple, Camera];
const TOTAL_MOVES = 15;

interface Card {
  id: number;
  icon: IconType;
}

export default function MemoryGamePage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(TOTAL_MOVES);
  const [gameKey, setGameKey] = useState<number>(0);
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const shuffled = shuffleIcons();
    setCards(shuffled);
  }, [gameKey]);

  const toggleSidebar = () => setSidebarVisible((prev) => !prev);

  const shuffleIcons = (): Card[] => {
    const chosenIcons = icons.slice(0, 8);
    const pairs = [...chosenIcons, ...chosenIcons];
    return pairs
      .map((icon, i) => ({ id: i, icon }))
      .sort(() => Math.random() - 0.5);
  };

  const handleFlip = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].icon === cards[second].icon) {
        setMatched((prev) => [...prev, first, second]);
        setTimeout(() => setFlipped([]), 600);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setMoves((prev) => prev - 1);
        }, 800);
      }
    }
  };

  const isGameOver = moves === 0 || matched.length === 16;
  const isFlipped = (index: number) => flipped.includes(index) || matched.includes(index) || isGameOver;

  const restartGame = () => {
    setFlipped([]);
    setMatched([]);
    setMoves(TOTAL_MOVES);
    setGameKey((prev) => prev + 1);
  };

  return (
    <div className="flex min-h-screen bg-pink-50 dark:bg-gray-950">
      {/* Sidebar */}
      <SideBar
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        activeLink={13} // or the index you'd like to highlight
      />
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
      <button
        onClick={() => router.push("/bliss")}
        className="fixed top-4 right-4 z-30 lg:z-40 flex items-center gap-2 bg-white text-pink-600 border border-pink-300 hover:bg-pink-100 dark:bg-gray-900 dark:text-pink-400 dark:border-pink-800 dark:hover:bg-gray-800 transition px-4 py-2 rounded-md text-sm shadow-md"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Bliss Page
      </button>
      <div className={`flex-1 transition-all duration-300 ${sidebarVisible ? "lg:ml-64" : "ml-0"} p-6 flex flex-col items-center justify-center text-center`}>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-pink-600 dark:text-pink-300 mb-2">
            Memory Game
          </h1>
          <p className="text-lg text-pink-700 dark:text-pink-400 mb-4">
            Moves Left: {moves}
          </p>
          <button
            onClick={restartGame}
            className="mb-6 bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition"
          >
            Restart Game
          </button>

          <div className="grid grid-cols-4 gap-4">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className="w-24 h-24 perspective"
                onClick={() => handleFlip(index)}
              >
                <div className={`card-inner ${isFlipped(index) ? "rotate" : ""}`}>
                  <div className="card-face card-front">?</div>
                  <div className="card-face card-back">
                    {React.createElement(card.icon, { size: 50 })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {moves === 0 && matched.length < 16 && (
            <p className="mt-6 text-xl font-semibold text-red-600">
              Game Over! Try again.
            </p>
          )}
          {matched.length === 16 && (
            <p className="mt-6 text-xl font-semibold text-green-600">
              You Won! 🎉
            </p>
          )}
        </div>
      </div>
    </div>
  );
}