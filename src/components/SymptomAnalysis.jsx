import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Brain,
  Users,
  ThumbsUp,
  AlertCircle,
  ChevronRight,
  HeartHandshake,
  Loader2,
  CheckCircle,
  Sun,
  Moon,
  ArrowLeft,
  Plus,
  Handshake ,
  Minus,
  Info,
  LayoutDashboard,
  Home,
  GraduationCap,
  ShoppingBag,
  ActivitySquare,
  Stethoscope,
  Bot,
  HeartPulse,
  MessageSquare,
} from "lucide-react";

const commonSymptoms = [
  "Abdominal cramps",
  "Fatigue",
  "Headache",
  "Nausea",
  "Back pain",
  "Mood swings",
  "Bloating",
  "Breast tenderness",
  "Acne",
  "Insomnia",
];

const mockAiAnalysis = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    possibleCauses: ["Hormonal changes", "Stress", "Dietary factors"],
    suggestions: [
      "Get plenty of rest",
      "Stay hydrated",
      "Consider speaking with a healthcare provider",
    ],
    communityInsights: {
      similarExperiences: 75,
      commonRelief: "Warm compress and over-the-counter pain relievers",
      percentageSeekingMedicalAttention: 30,
    },
  };
};

export function SymptomAnalysis() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [customSymptom, setCustomSymptom] = useState("");
  const [intensity, setIntensity] = useState("");
  const [duration, setDuration] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const SidebarLink = ({ icon, label, onClick, active = false }) => {
    return (
      <button
        onClick={onClick}
        className={`flex items-center space-x-2 w-full px-2 py-2 rounded-lg transition-colors ${
          active
            ? "bg-pink-200 dark:bg-pink-900 text-pink-800 dark:text-pink-200"
            : "text-gray-900 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-gray-700"
        }`}
      >
        {icon}
        <span>{label}</span>
      </button>
    );
  };
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  const handleSymptomToggle = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleAddCustomSymptom = () => {
    if (customSymptom && !selectedSymptoms.includes(customSymptom)) {
      setSelectedSymptoms((prev) => [...prev, customSymptom]);
      setCustomSymptom("");
    }
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    setIsAnalyzing(true);
    const result = await mockAiAnalysis();
    setAnalysis(result);
    setIsAnalyzing(false);
    setStep(6);
  };

  const renderProgressBar = () => {
    const progress = ((step - 1) / 5) * 100;
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
        <div
          className="bg-pink-600 h-2.5 rounded-full dark:bg-pink-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold mb-4">
              Step 1: Select Your Symptoms
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
              {commonSymptoms.map((symptom) => (
                <motion.button
                  key={symptom}
                  onClick={() => handleSymptomToggle(symptom)}
                  className={`p-3 rounded-md text-white text-sm transition-colors ${
                    selectedSymptoms.includes(symptom)
                      ? "bg-pink-600 text-white shadow-lg"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {symptom}
                </motion.button>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={customSymptom}
                onChange={(e) => setCustomSymptom(e.target.value)}
                placeholder="Add custom symptom"
                className="flex-grow p-2 border text-white border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <motion.button
                onClick={handleAddCustomSymptom}
                className="p-2 bg-pink-600 text-white rounded-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus size={24} />
              </motion.button>
            </div>
            <motion.button
              onClick={handleNext}
              disabled={selectedSymptoms.length === 0}
              className={`w-full py-3 rounded-md text-white font-semibold transition-colors ${
                selectedSymptoms.length > 0
                  ? "bg-pink-600 hover:bg-pink-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              whileHover={selectedSymptoms.length > 0 ? { scale: 1.05 } : {}}
              whileTap={selectedSymptoms.length > 0 ? { scale: 0.95 } : {}}
            >
              Next
              <ChevronRight className="inline ml-2" />
            </motion.button>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold mb-4">
              Step 2: Rate Symptom Intensity
            </h2>
            <div className="space-y-4 mb-6">
              {["Mild", "Moderate", "Severe"].map((level) => (
                <motion.button
                  key={level}
                  onClick={() => setIntensity(level)}
                  className={`w-full p-4 rounded-md text-sm text-white transition-colors ${
                    intensity === level
                      ? "bg-pink-600 text-white shadow-lg"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {level}
                </motion.button>
              ))}
            </div>
            <div className="flex justify-between">
              <motion.button
                onClick={handleBack}
                className="py-3 px-6 rounded-md text-pink-600 font-semibold border border-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="inline mr-2" />
                Back
              </motion.button>
              <motion.button
                onClick={handleNext}
                disabled={!intensity}
                className={`py-3 px-6 rounded-md text-white font-semibold transition-colors ${
                  intensity
                    ? "bg-pink-600 hover:bg-pink-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                whileHover={intensity ? { scale: 1.05 } : {}}
                whileTap={intensity ? { scale: 0.95 } : {}}
              >
                Next
                <ChevronRight className="inline ml-2" />
              </motion.button>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold mb-4">
              Step 3: Symptom Duration
            </h2>
            <div className="space-y-4 mb-6">
              {[
                "Less than a day",
                "1-3 days",
                "4-7 days",
                "More than a week",
              ].map((period) => (
                <motion.button
                  key={period}
                  onClick={() => setDuration(period)}
                  className={`w-full p-4 rounded-md text-sm text-white transition-colors ${
                    duration === period
                      ? "bg-pink-600 text-white shadow-lg"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {period}
                </motion.button>
              ))}
            </div>
            <div className="flex justify-between">
              <motion.button
                onClick={handleBack}
                className="py-3 px-6 rounded-md text-pink-600 font-semibold border border-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="inline mr-2" />
                Back
              </motion.button>
              <motion.button
                onClick={handleNext}
                disabled={!duration}
                className={`py-3 px-6 rounded-md text-white font-semibold transition-colors ${
                  duration
                    ? "bg-pink-600 hover:bg-pink-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                whileHover={duration ? { scale: 1.05 } : {}}
                whileTap={duration ? { scale: 0.95 } : {}}
              >
                Next
                <ChevronRight className="inline ml-2" />
              </motion.button>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold mb-4">
              Step 4: Additional Information
            </h2>
            <textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Any other details you'd like to share..."
              className="w-full p-4 border border-gray-300 text-white dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 mb-6 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              rows={4}
            />
            <div className="flex justify-between">
              <motion.button
                onClick={handleBack}
                className="py-3 px-6 rounded-md text-pink-600 font-semibold border border-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="inline mr-2" />
                Back
              </motion.button>
              <motion.button
                onClick={handleNext}
                className="py-3 px-6 rounded-md text-white font-semibold bg-pink-600 hover:bg-pink-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Next
                <ChevronRight className="inline ml-2" />
              </motion.button>
            </div>
          </motion.div>
        );
      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold mb-4">
              Step 5: Review and Submit
            </h2>
            <div className="bg-gray-100 text-white dark:bg-gray-700 p-4 rounded-md">
              <h3 className="font-semibold mb-2">Selected Symptoms:</h3>
              <ul className="list-disc pl-5 mb-4">
                {selectedSymptoms.map((symptom, index) => (
                  <li key={index}>{symptom}</li>
                ))}
              </ul>
              <p>
                <strong>Intensity:</strong> {intensity}
              </p>
              <p>
                <strong>Duration:</strong> {duration}
              </p>
              {additionalInfo && (
                <>
                  <h3 className="font-semibold mt-4 mb-2">
                    Additional Information:
                  </h3>
                  <p>{additionalInfo}</p>
                </>
              )}
            </div>
            <div className="flex justify-between">
              <motion.button
                onClick={handleBack}
                className="py-3 px-6 rounded-md text-pink-600 font-semibold border border-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="inline mr-2" />
                Back
              </motion.button>
              <motion.button
                onClick={handleSubmit}
                className="py-3 px-6 rounded-md text-white font-semibold bg-pink-600 hover:bg-pink-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isAnalyzing ? (
                  <span className="flex items-center text-white">
                    <Loader2 className="animate-spin mr-2" />
                    Analyzing...
                  </span>
                ) : (
                  <span className="text-white">
                    Submit for Analysis
                    <ChevronRight className="inline ml-2 text-white" />
                  </span>
                )}
              </motion.button>
            </div>
          </motion.div>
        );
      case 6:
        return (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold">Analysis Results</h2>
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Brain className="mr-2 text-pink-600" /> Possible Causes:
                </h3>
                <ul className="list-disc pl-6 space-y-1">
                  {analysis.possibleCauses.map((cause, index) => (
                    <li key={index}>{cause}</li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Activity className="mr-2 text-pink-600" /> Suggestions:
                </h3>
                <ul className="list-disc pl-6 space-y-1">
                  {analysis.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Users className="mr-2 text-pink-600" /> Community Insights:
                </h3>
                <div className="bg-pink-50 dark:bg-pink-900 rounded-lg p-4 space-y-2">
                  <p className="flex items-center">
                    <ThumbsUp className="mr-2 text-green-500" />
                    <span className="font-semibold">
                      {analysis.communityInsights.similarExperiences}%
                    </span>{" "}
                    of users reported similar symptoms
                  </p>
                  <p className="flex items-center">
                    <AlertCircle className="mr-2 text-yellow-500" />
                    <span className="font-semibold">
                      {
                        analysis.communityInsights
                          .percentageSeekingMedicalAttention
                      }
                      %
                    </span>{" "}
                    of users with these symptoms sought medical attention
                  </p>
                  <p>
                    Common relief method:{" "}
                    <span className="font-semibold">
                      {analysis.communityInsights.commonRelief}
                    </span>
                  </p>
                </div>
              </motion.div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-sm text-gray-500 dark:text-gray-400 bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-500 p-4 rounded"
            >
              Remember: This analysis is not a substitute for professional
              medical advice. If symptoms persist or worsen, please consult a
              healthcare provider.
            </motion.p>
            <motion.button
              onClick={() => {
                setStep(1);
                setSelectedSymptoms([]);
                setIntensity("");
                setDuration("");
                setAdditionalInfo("");
                setAnalysis(null);
              }}
              className="w-full py-3 px-6 mt-4 rounded-md text-white font-semibold bg-pink-600 hover:bg-pink-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start New Analysis
            </motion.button>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""}`}>
      {/* Sidebar**/}
      <aside
        className={`bg-pink-100 dark:bg-gray-800 fixed min-h-screen  transition-all duration-300 ease-in-out ${
          sidebarVisible ? "w-64" : "w-0"
        }`}
        style={{
          zIndex: 40,
          overflow: sidebarVisible ? "visible" : "hidden",
        }}
      >
        <div className="px-4 py-4 flex flex-col space-y-2">
          <h1 className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-4">
            SheSync
          </h1>
          <SidebarLink
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            onClick={() => navigate("/dashboard")}
          />
          <SidebarLink
            icon={<Home size={20} />}
            label="Home"
            onClick={() => navigate("/")}
          />
          <SidebarLink
            icon={<GraduationCap size={20} />}
            label="Education"
            onClick={() => navigate("/blogs")}
          />
          <SidebarLink
            icon={<ShoppingBag size={20} />}
            label="Shop"
            onClick={() => navigate("/Ecom")}
          />
          <SidebarLink
            icon={<ActivitySquare size={20} />}
            label="Track Your Health"
            onClick={() => navigate("/tracker")}
          />
          <SidebarLink
            icon={<Stethoscope size={20} />}
            label="Expert Consultation"
            onClick={() => navigate("/consultations")}
          />
          <SidebarLink
            icon={<Bot size={20} />}
            label="Eve"
            onClick={() => navigate("/ChatBot")}
          />
          <SidebarLink
            icon={<HeartPulse size={20} />}
            label="HealthLens"
            onClick={() => navigate("/symptomsanalyzer")}
          />
          <SidebarLink
            icon={<MessageSquare size={20} />}
            label="Forums"
            onClick={() => navigate("/forums")}
          />
          <SidebarLink
            icon={<HeartHandshake size={20} />}
            label="ShareJoy"
            onClick={() => navigate("/")}
          />
          <SidebarLink
                      icon={<Handshake  size={20} />}
                      label="NGO's"
                      onClick={() => navigate("/")}
                    />
        </div>
      </aside>

      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 z-10 p-2 bg-pink-600 text-white rounded-r-md transition-all duration-300 ease-in-out focus:outline-none ${
          sidebarVisible ? "left-64" : "left-0"
        }`}
        aria-label={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
      >
        <ChevronRight
          size={24}
          className={`transition-transform duration-300 ${
            sidebarVisible ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          sidebarVisible ? "ml-64" : "ml-0"
        } flex-1 dark:bg-gray-900`}
      >
        <div className="max-w-screen-xl mx-auto p-4 space-y-6  dark:text-gray-100">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-pink-600 dark:text-pink-400">
              AI-Powered Symptom Analysis
            </h1>
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            {renderProgressBar()}
            <div className="flex justify-between mb-8">
              {[1, 2, 3, 4, 5].map((stepNumber) => (
                <div key={stepNumber} className="flex flex-col items-center">
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step >= stepNumber
                        ? "bg-pink-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                    animate={{
                      scale: step === stepNumber ? 1.1 : 1,
                      transition: { duration: 0.3 },
                    }}
                  >
                    {step > stepNumber ? <CheckCircle size={20} /> : stepNumber}
                  </motion.div>
                  <div className="text-xs mt-2">Step {stepNumber}</div>
                </div>
              ))}
            </div>
            <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
