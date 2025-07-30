import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChevronRight } from "lucide-react";
import SideBar from "../components/SideBar"; // ✅ Update this path based on your project structure

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

  // 🔄 Sidebar related state
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);

  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        return <li key={index} className="ml-6 list-disc text-gray-700">{line.replace(/^(\*|\-)\s*/, "")}</li>;
      } else if (line.trim().startsWith("**") && line.includes("**")) {
        return <h4 key={index} className="text-pink-700 font-bold mt-4">{line.replace(/\*\*/g, "")}</h4>;
      } else {
        return <p key={index} className="text-gray-700 mt-1">{line}</p>;
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
    <div className="flex h-screen overflow-hidden">
      <SideBar
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        activeLink={7}
      />

      {width > 816 && (
        <button
          onClick={toggleSidebar}
          className="fixed left-0 top-0 w-10 z-10 p-2 bg-pink-600 text-white rounded-r-md transition-all duration-300"
          style={{ transform: sidebarVisible ? "translateX(256px)" : "translateX(0)" }}
          aria-label="Toggle Sidebar"
        >
          <ChevronRight
            size={14}
            className={`transition-transform duration-300 block m-auto ${
              sidebarVisible ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      )}

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10 mb-10">
          <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">
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
                <label className="block text-sm font-semibold text-pink-700 mb-1">
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required
              className="w-full px-4 py-2 rounded-lg text-gray-700 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"

                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded-xl transition"
            >
              🥗 Get My Diet Plan
            </button>
          </form>

          {phase && (
            <div className="mt-6 text-center">
              <p className="text-lg font-medium text-gray-700">
                🩺 Current Cycle Phase:{" "}
                <span className="text-pink-600 font-bold">{phase}</span>
              </p>
              <p className="text-gray-600">its takes 30-40 seconds to generate response</p>
            </div>
          )}

          {recommendation && (
            <div className="mt-6 bg-pink-50 p-5 rounded-xl border border-pink-300">
              <h3 className="text-xl font-semibold text-pink-600 mb-3">
             🍓 Your Personalized Diet Plan
              </h3>
              <div className="space-y-2">{formatResponse(recommendation)}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DietPlan;
