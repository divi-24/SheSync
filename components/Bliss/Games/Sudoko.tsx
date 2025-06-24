import React, { useEffect, useState } from "react";
import Sidebar from "../../SideBar";
import { useRouter } from "next/router";
import { ChevronRight, PartyPopper, XCircle, ArrowLeft } from "lucide-react";

type Board = (number | string)[][];
type Difficulty = "Easy" | "Medium" | "Hard";
type GameStatus = "playing" | "win" | "lose";
type Feedback = Record<string, "correct" | "wrong">;

const difficulties: Record<Difficulty, number> = {
    Easy: 35,
    Medium: 30,
    Hard: 25,
};

function generateEmptyBoard(): Board {
    return Array.from({ length: 9 }, () => Array(9).fill(""));
}

function deepCopy(board: Board): Board {
    return board.map((row) => [...row]);
}

function isSafe(board: Board, row: number, col: number, num: number): boolean {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num || board[x][col] === num) return false;
        const boxRow = 3 * Math.floor(row / 3) + Math.floor(x / 3);
        const boxCol = 3 * Math.floor(col / 3) + (x % 3);
        if (board[boxRow][boxCol] === num) return false;
    }
    return true;
}

function solveSudoku(board: Board): boolean {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === "") {
                for (let num = 1; num <= 9; num++) {
                    if (isSafe(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudoku(board)) return true;
                        board[row][col] = "";
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function generateSudoku(full = false, clues = 30): Board {
    const board = generateEmptyBoard();
    solveSudoku(board);
    if (full) return board;

    const puzzle = deepCopy(board);
    let removed = 81 - clues;
    while (removed > 0) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (puzzle[row][col] !== "") {
            puzzle[row][col] = "";
            removed--;
        }
    }
    return puzzle;
}

export default function Sudoku() {
    const [sidebarVisible, setSidebarVisible] = useState<boolean>(true);
    const [difficulty, setDifficulty] = useState<Difficulty>("Easy");
    const [clues, setClues] = useState<number>(difficulties["Easy"]);
    const [solution, setSolution] = useState<Board>([]);
    const [board, setBoard] = useState<Board>([]);
    const [initial, setInitial] = useState<Board>([]);
    const [lives, setLives] = useState<number>(5);
    const [time, setTime] = useState<number>(600);
    const [timerRunning, setTimerRunning] = useState<boolean>(false);
    const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
    const [status, setStatus] = useState<GameStatus>("playing");
    const [feedback, setFeedback] = useState<Feedback>({});
    const router = useRouter();

    useEffect(() => {
        if (timerRunning && time > 0 && status === "playing") {
            const interval = setInterval(() => setTime((t) => t - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timerRunning, time, status]);

    useEffect(() => {
        if (lives === 0 || time === 0) {
            setStatus("lose");
            setTimerRunning(false);
        }
        if (status === "playing" && board.length > 0 && isBoardComplete()) {
            setStatus("win");
            setTimerRunning(false);
        }
    }, [board, lives, time]);

    const isBoardComplete = (): boolean =>
        board.every((row, r) =>
            row.every((cell, c) => cell === solution[r][c])
        );

    const handleNewGame = () => {
        const full = generateSudoku(true);
        const puzzle = generateSudoku(false, clues);
        setSolution(full);
        setBoard(puzzle);
        setInitial(puzzle);
        setLives(5);
        setTime(600);
        setStatus("playing");
        setTimerRunning(true);
        setSelectedCell(null);
        setFeedback({});
    };

    const handleInput = (row: number, col: number, val: string) => {
        if (initial[row][col] !== "" || !/^[1-9]$/.test(val) || status !== "playing") return;
        const newBoard = deepCopy(board);
        newBoard[row][col] = parseInt(val);

        if (solution[row][col] === parseInt(val)) {
            setFeedback({ [`${row}-${col}`]: "correct" });
            setBoard(newBoard);
        } else {
            setFeedback({ [`${row}-${col}`]: "wrong" });
            setLives((l) => l - 1);
            setTimeout(() => setFeedback({}), 800);
        }
    };

    const formatTime = (): string => {
        const m = Math.floor(time / 60);
        const s = time % 60;
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

    const toggleSidebar = () => setSidebarVisible((prev) => !prev);

    return (
        <div className="flex bg-pink-50 dark:bg-gray-950 h-full min-h-screen">
            <Sidebar
                sidebarVisible={sidebarVisible}
                setSidebarVisible={setSidebarVisible}
                activeLink={13} // Bliss
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
                    className={`transition-transform duration-300 block m-auto ${
                        sidebarVisible ? "rotate-180" : "rotate-0"
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
            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 ${
                sidebarVisible ? "lg:ml-64" : "ml-0"
            } p-6 flex flex-col items-center justify-center text-center`}>
                <h1 className="text-4xl font-bold text-fuchsia-800 mb-6">Sudoku</h1>
                <div className="flex gap-6 mb-6">
                    <div>
                        <label className="font-semibold text-pink-700">Choose Difficulty:</label>
                        <div className="flex gap-2 mt-1">
                            {Object.keys(difficulties).map((diff) => (
                                <button
                                    key={diff}
                                    className={`px-3 py-1 rounded ${
                                        difficulty === diff
                                            ? "bg-pink-700 text-white"
                                            : "bg-white text-pink-700 border"
                                    }`}
                                    onClick={() => {
                                        setDifficulty(diff as Difficulty);
                                        setClues(difficulties[diff as Difficulty]);
                                    }}
                                >
                                    {diff}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col justify-end">
                        <button
                            onClick={handleNewGame}
                            className="bg-fuchsia-600 text-white px-4 py-2 rounded mt-auto shadow hover:bg-fuchsia-700"
                        >
                            Create New Game
                        </button>
                    </div>
                </div>

                <div className="mb-4">
                    <p className="text-lg text-pink-700 font-semibold">
                        Time Remaining: {formatTime()} | Lives Remaining: {lives}
                    </p>
                </div>

                {status !== "playing" && (
                    <div
                        className={`text-center mb-6 text-2xl font-bold flex items-center gap-2 ${
                            status === "win" ? "text-green-600" : "text-red-600"
                        }`}
                    >
                        {status === "win" ? <PartyPopper /> : <XCircle />}
                        {status === "win" ? "You solved it!" : "Game Over!"}
                    </div>
                )}

                <div className="grid grid-cols-9 gap-1 border-4 border-pink-700 p-2 bg-white rounded-md shadow-md">
                    {board.map((row, rIdx) =>
                        row.map((cell, cIdx) => {
                            const isInitial = initial[rIdx]?.[cIdx] !== "";
                            const key = `${rIdx}-${cIdx}`;
                            const feedbackClass =
                                feedback[key] === "correct"
                                    ? "bg-green-300"
                                    : feedback[key] === "wrong"
                                    ? "bg-red-300"
                                    : "";
                            const selected =
                                selectedCell?.[0] === rIdx && selectedCell?.[1] === cIdx
                                    ? "ring-2 ring-pink-500"
                                    : "";

                            return (
                                <input
                                    key={key}
                                    maxLength={1}
                                    value={cell === "" ? "" : String(cell)}
                                    onClick={() => setSelectedCell([rIdx, cIdx])}
                                    onChange={(e) => handleInput(rIdx, cIdx, e.target.value)}
                                    disabled={isInitial}
                                    className={`w-10 h-10 text-center font-bold text-xl border border-gray-300 focus:outline-none 
                                    ${
                                        isInitial
                                            ? "bg-gray-300 text-black"
                                            : "text-pink-700 bg-white"
                                    } 
                                    ${rIdx % 3 === 2 && rIdx !== 8 ? "mb-2" : ""} 
                                    ${cIdx % 3 === 2 && cIdx !== 8 ? "mr-2" : ""} 
                                    ${feedbackClass} ${selected}`}
                                />
                            );
                        })
                    )}
                </div>

                <div className="mt-6 p-4 bg-fuchsia-700 text-white rounded-xl shadow-xl w-full max-w-2xl">
                    <h2 className="text-xl font-bold text-center mb-2">Rules</h2>
                    <ul className="text-sm list-disc list-inside space-y-1">
                        <li>Fill the 9×9 grid so each row, column, and 3×3 box has 1–9 once</li>
                        <li>You have 5 lives and 10 minutes</li>
                        <li>Correct inputs are highlighted in green</li>
                        <li>Wrong inputs reduce lives and flash red</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}