//diet-plan.jsx
import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChevronRight } from "lucide-react";
import SideBar from "../components/SideBar";
import { useTheme } from "../context/ThemeContext";
import useScreenSize from "../hooks/useScreenSize";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const DietPlan = () => {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        weight: "",
        preference: "",
        allergies: "",
        goals: "",
        lastPeriod: "",
        cycleLength: "",
        periodDuration: "",
    });

    const [recommendation, setRecommendation] = useState("");
    const [phase, setPhase] = useState("");

    // Theme and sidebar integration
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const { theme, toggleTheme } = useTheme();
    const { width } = useScreenSize();

    const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const calculatePhase = () => {
        const lastDate = new Date(formData.lastPeriod);
        const today = new Date();
        const diff = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
        const cycleLength = parseInt(formData.cycleLength);
        const dayInCycle = diff % cycleLength;

        if (dayInCycle <= formData.periodDuration) return "Menstrual";
        if (dayInCycle <= 14) return "Follicular";
        if (dayInCycle <= 16) return "Ovulatory";
        return "Luteal";
    };

    const formatResponse = (text) => {
        const lines = text.split("\n");
        return lines.map((line, index) => {
            if (line.trim().startsWith("*") || line.trim().startsWith("-")) {
                return <li key={index} className="ml-6 list-disc text-gray-700 dark:text-gray-300">{line.replace(/^(\*|\-)\s*/, "")}</li>;
            } else if (line.trim().startsWith("**") && line.includes("**")) {
                return <h4 key={index} className="text-pink-700 dark:text-pink-400 font-bold mt-4">{line.replace(/\*\*/g, "")}</h4>;
            } else {
                return <p key={index} className="text-gray-700 dark:text-gray-300 mt-1">{line}</p>;
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setRecommendation("Generating your personalized diet plan...");

        const currentPhase = calculatePhase();
        setPhase(currentPhase);

        const prompt = `
You are a female health and nutrition assistant.
Generate a detailed diet plan for the following user who is in the "${currentPhase}" phase of her menstrual cycle:

Name: ${formData.name}
Age: ${formData.age}
Weight: ${formData.weight} kg
Diet Preference: ${formData.preference}
Allergies: ${formData.allergies}
Health Goals: ${formData.goals}
Cycle Length: ${formData.cycleLength} days
Period Duration: ${formData.periodDuration} days
First Day of Last Period: ${formData.lastPeriod}

Keep the response short, friendly, and personalized.
`;

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(prompt);
            const text = await result.response.text();
            setRecommendation(text || "⚠️ No response generated.");
        } catch (err) {
            console.error("Gemini error:", err);
            setRecommendation("❌ Failed to generate recommendation. Please try again later.");
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
            <SideBar
                sidebarVisible={sidebarVisible}
                setSidebarVisible={setSidebarVisible}
                activeLink={7}
                toggleDarkMode={toggleTheme}
            />

            {width > 816 && (
                <button
                    onClick={toggleSidebar}
                    className="fixed top-4 z-50 w-10 p-2 bg-pink-600 text-white rounded-r-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                    style={{
                        left: sidebarVisible ? "256px" : "0px",
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
            )}

            <div className={`flex-1 p-4 sm:p-8 bg-white dark:bg-gray-900 text-black dark:text-gray-100 transition-all duration-300 overflow-y-auto ${
                width > 816 && sidebarVisible ? "ml-64" : "ml-0"
            }`}>
                <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg mt-10 mb-10 transition-colors duration-300">
                    <h2 className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-6 text-center">
                        🩸 Period-Based Diet Planner
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {[
                            { label: "Name", name: "name" },
                            { label: "Age", name: "age" },
                            { label: "Weight (kg)", name: "weight" },
                            { label: "Diet Preference", name: "preference" },
                            { label: "Allergies", name: "allergies" },
                            { label: "Health Goals", name: "goals" },
                            { label: "First Day of Last Period", name: "lastPeriod", type: "date" },
                            { label: "Cycle Length (days)", name: "cycleLength" },
                            { label: "Period Duration (days)", name: "periodDuration" },
                        ].map(({ label, name, type = "text" }) => (
                            <div key={name}>
                                <label className="block text-sm font-semibold text-pink-700 dark:text-pink-300 mb-1">
                                    {label}
                                </label>
                                <input
                                    type={type}
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-pink-300 dark:border-pink-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300"
                                />
                            </div>
                        ))}

                        <button
                            type="submit"
                            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                        >
                            Get My Diet Plan
                        </button>
                    </form>

                    {recommendation && (
                        <div className="mt-8 p-6 bg-pink-50 dark:bg-gray-700 rounded-lg border border-pink-200 dark:border-pink-600 transition-colors duration-300">
                            <h3 className="text-xl font-bold text-pink-700 dark:text-pink-400 mb-4">
                                Your Personalized Diet Plan {phase && `(${phase} Phase)`}
                            </h3>
                            <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {formatResponse(recommendation)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DietPlan;
