import { useState, useEffect } from "react";
import { ChevronRight, Droplet } from "lucide-react";
import SideBar from "../components/SideBar";
import { useTheme } from "../context/ThemeContext";
import useScreenSize from "../hooks/useScreenSize";

const getAIResponse = async (prompt) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error("API key missing. Add VITE_GEMINI_API_KEY in .env.");

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };

  let retries = 0;
  const maxRetries = 3;

  while (retries < maxRetries) {
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const result = await res.json();
        return result.candidates?.[0]?.content?.parts?.[0]?.text || "";
      } else if (res.status === 429) {
        await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, retries)));
        retries++;
      } else {
        throw new Error(`Error ${res.status}: ${await res.text()}`);
      }
    } catch (err) {
      if (retries === maxRetries - 1) throw err;
      retries++;
    }
  }
  throw new Error("Failed after multiple retries.");
};

const formatResponse = (text) => {
  if (!text) return null;

  text = text.replace(/\*\*/g, "").replace(/\*/g, "");

  return text.split("\n").map((line, i) => {
    const l = line.trim();

    if (/^Day\s*\d+/i.test(l)) {
      return (
        <h4 key={i} className="text-lg font-bold text-pink-600 dark:text-pink-400 mt-4">
          {l}
        </h4>
      );
    }
    if (/^(Breakfast|Lunch|Dinner|Snacks|Notes)/i.test(l)) {
      return (
        <p key={i} className="font-semibold text-white dark:text-gray-200 mt-2">
          {l}
        </p>
      );
    }
    if (l.startsWith("-")) {
      return (
        <li key={i} className="ml-6 list-disc text-white dark:text-gray-300">
          {l.replace(/^[-]\s*/, "")}
        </li>
      );
    }
    return (
      <p key={i} className="text-white dark:text-gray-300 mt-1">
        {l}
      </p>
    );
  });
};

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
  const [loading, setLoading] = useState(false);

  const [sidebarVisible, setSidebarVisible] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const { width } = useScreenSize();

  useEffect(() => setSidebarVisible(width >= 816), [width]);
  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRecommendation("");

    const currentPhase = calculatePhase();
    setPhase(currentPhase);

    const prompt = `
      You are a female health and nutrition assistant.
      Generate a vegetarian diet plan for the "${currentPhase}" phase of a menstrual cycle.
      Personalize it for:
      Name: ${formData.name}, Age: ${formData.age}, Weight: ${formData.weight}kg,
      Preference: ${formData.preference}, Allergies: ${formData.allergies}, Goals: ${formData.goals}.
      Keep it structured by days and meals, short and friendly.
      Do NOT use markdown or asterisks (*, **). Only plain text.
    `;

    try {
      const text = await getAIResponse(prompt);
      setRecommendation(text || "No response generated.");
    } catch (err) {
      setRecommendation(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <SideBar
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        activeLink={19}
        toggleDarkMode={toggleTheme}
      />

      {width > 816 && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 z-50 w-10 h-10 p-2 bg-pink-600 text-white rounded-r-md flex items-center justify-center transition-all duration-300"
          style={{ left: sidebarVisible ? "256px" : "0px" }}
        >
          <ChevronRight
            size={14}
            className={`transition-transform ${sidebarVisible ? "rotate-180" : "rotate-0"}`}
          />
        </button>
      )}

      <div
        className={`flex-1 p-4 sm:p-8 text-white dark:text-gray-100 transition-all duration-300 overflow-y-auto ${
          width > 816 && sidebarVisible ? "ml-64" : "ml-0"
        }`}
      >
        <div className="max-w-3xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl mt-10 mb-10 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center mb-6">
            <Droplet className="text-pink-600 dark:text-pink-400 w-8 h-8 mr-2" />
            <h2 className="text-3xl font-bold text-pink-600 dark:text-pink-400">
              Period-Based Diet Planner
            </h2>
          </div>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
            Enter your details below to get a personalized diet plan for your current menstrual phase.
          </p>

          {/* Autofill fix styles */}
          <style>
            {`
              input:-webkit-autofill {
                -webkit-box-shadow: 0 0 0px 1000px #f3f4f6 inset !important;
                -webkit-text-fill-color: #000 !important;
                transition: background-color 5000s ease-in-out 0s;
              }
              .dark input:-webkit-autofill {
                -webkit-box-shadow: 0 0 0px 1000px #374151 inset !important;
                -webkit-text-fill-color: #fff !important;
              }
            `}
          </style>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: "Name", name: "name", type: "text" },
                { label: "Age", name: "age", type: "number" },
                { label: "Weight (kg)", name: "weight", type: "number" },
                { label: "Diet Preference", name: "preference", type: "text" },
                { label: "Allergies", name: "allergies", type: "text" },
                { label: "Health Goals", name: "goals", type: "text" },
                { label: "First Day of Last Period", name: "lastPeriod", type: "date" },
                { label: "Cycle Length (days)", name: "cycleLength", type: "number" },
                { label: "Period Duration (days)", name: "periodDuration", type: "number" },
              ].map(({ label, name, type }) => (
                <div key={name} className="relative group">
                  <label className="absolute -top-3 left-3 text-xs font-semibold bg-white dark:bg-gray-800 px-1 text-pink-700 dark:text-pink-300">
                    {label}
                  </label>
                  <input
                    type={type} 
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-pink-300 dark:border-pink-600 rounded-xl bg-gray-100 dark:bg-gray-700 text-white dark:text-gray-100 focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              ))}
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full font-bold py-4 px-4 rounded-xl shadow-md transition-all ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-pink-500 to-pink-700 text-white hover:scale-105"
              }`}
            >
              {loading ? "Generating..." : "Get My Personalized Plan"}
            </button>
          </form>

          {recommendation && (
            <div className="mt-12 p-8 bg-pink-50 dark:bg-gray-700 rounded-2xl border border-pink-200 dark:border-pink-600 shadow-inner">
              <div className="flex items-center mb-4">
                <h3 className="text-2xl font-bold text-pink-700 dark:text-pink-400">
                  Your Diet Plan
                </h3>
                {phase && (
                  <span className="ml-4 px-3 py-1 text-sm font-semibold bg-pink-200 dark:bg-pink-800 text-pink-800 dark:text-pink-200 rounded-full">
                    {phase} Phase
                  </span>
                )}
              </div>
              <div className="text-white dark:text-gray-300 leading-relaxed space-y-2">
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