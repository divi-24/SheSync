import React, { useState, useMemo, useEffect } from "react";
import { format, addDays } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import {
  Calendar,
  ChevronRight,
  Frown,
  AppWindowMac,
  HeartPulse,
  Smile,
  Angry,
  Gamepad2,
  ShoppingBag,
  MessageSquare,
  Coffee,
  HeartHandshake,
  Zap,
  Moon,
  ChevronDown,
  ChevronUp,
  Heart,
  Handshake,
  Sun,
  LayoutDashboard,
  Home,
  GraduationCap,
  ActivitySquare,
  ClipboardList,
  Stethoscope,
  Bot,
} from "lucide-react";
import axios from "axios";
import SideBar from "./SideBar";
import useScreenSize from "../hooks/useScreenSize";
import { motion } from "framer-motion";

const server_url = import.meta.env.VITE_SERVER_URL;
const local_url = "http://localhost:3000/";

const moodOptions = [
  { name: "Happy", icon: Smile },
  { name: "Sad", icon: Frown },
  { name: "Calm", icon: Coffee },
  { name: "Angry", icon: Angry },
  { name: "Tired", icon: Moon },
  { name: "Energized", icon: Zap },
];

const moodSeverityOptions = [
  { name: "Low", value: "low" },
  { name: "Medium", value: "medium" },
  { name: "High", value: "high" },
];

const symptomOptions = [
  "Lower Abdomen Cramps",
  "Back Pain",
  "Bloating",
  "Fatigue",
  "Headaches",
  "Nausea",
  "Sleep Disruption",
  "Digestive Issues",
];

const symptomSeverityOptions = ["None", "Mild", "Moderate", "Severe"];

const sleepQualityOptions = ["Poor", "Fair", "Good", "Excellent"];

export function PeriodTracker() {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const { width } = useScreenSize();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/login");
    }
  }, [isLoaded, isSignedIn, navigate]);

  const [sidebarVisible, setSideBarVisible] = useState(true);
  const [cycleDuration, setCycleDuration] = useState("");
  const [lastPeriodStart, setLastPeriodStart] = useState("");
  const [lastPeriodDuration, setLastPeriodDuration] = useState("");
  const [moodTypes, setMoodTypes] = useState([]);
  const [moodSeverity, setMoodSeverity] = useState("");
  const [moodDate, setMoodDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [symptoms, setSymptoms] = useState([]);
  const [symptomSeverities, setSymptomSeverities] = useState({});
  const [symptomDate, setSymptomDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [sleepDuration, setSleepDuration] = useState("");
  const [sleepQuality, setSleepQuality] = useState("");
  const [nextPeriodPrediction, setNextPeriodPrediction] = useState("");
  const [expandedSections, setExpandedSections] = useState({
    cycleInfo: true,
    moodTracking: true,
    symptomTracking: true,
    sleepTracking: true,
    healthTips: true,
  });
  const [showHealthTips, setShowHealthTips] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );
  const [waterIntakeCount, setWaterIntakeCount] = useState(0);

  // Redirect if not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/login");
    }
  }, [isLoaded, isSignedIn, navigate]);

  const handleWaterIntakeUpdate = async () => {
    if (!isSignedIn || !user) {
      alert("You must be logged in to update water intake");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(
        `${server_url}/api/period/waterupdate/me`,
        {
          headers: {
            Authorization: `Bearer ${await user.getToken()}`,
          },
        }
      );
      setWaterIntakeCount(response.data.waterIntakeCount);
      console.log("Water intake updated:", response.data);
    } catch (error) {
      console.error("Error updating water intake:", error);
      alert("Error updating water intake. Please try again.");
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode.toString());
      return newMode;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "cycleDuration":
        setCycleDuration(value);
        break;
      case "lastPeriodStart":
        setLastPeriodStart(value);
        break;
      case "lastPeriodDuration":
        setLastPeriodDuration(value);
        break;
      case "moodDate":
        setMoodDate(value);
        break;
      case "symptomDate":
        setSymptomDate(value);
        break;
      case "sleepDuration":
        setSleepDuration(value);
        break;
      case "sleepQuality":
        setSleepQuality(value);
        break;
      default:
        break;
    }
  };

  const handleMoodTypeChange = (moodName) => {
    setMoodTypes((prev) =>
      prev.includes(moodName)
        ? prev.filter((mood) => mood !== moodName)
        : [...prev, moodName]
    );
  };

  const handleSymptomChange = (symptom) => {
    setSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSymptomSeverityChange = (symptom, severity) => {
    setSymptomSeverities((prev) => ({
      ...prev,
      [symptom]: severity,
    }));
  };

  const predictNextPeriod = () => {
    if (lastPeriodStart && cycleDuration) {
      const nextPeriodDate = addDays(
        new Date(lastPeriodStart),
        parseInt(cycleDuration)
      );
      setNextPeriodPrediction(format(nextPeriodDate, "yyyy-MM-dd"));
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!isSignedIn || !user) {
      alert("You must be logged in to submit data");
      navigate("/login");
      return;
    }

    const submissionData = {
      userId: user.id,
      cycleDuration,
      lastPeriodStart,
      lastPeriodDuration,
      moodTypes,
      moodSeverity,
      moodDate,
      symptoms,
      symptomSeverities,
      symptomDate,
      sleepDuration,
      sleepQuality,
      nextPeriodPrediction,
    };

    try {
      const token = await user.getToken();

      try {
        const response = await axios.post(
          `${server_url}/api/period/trackerdata`,
          submissionData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Data submitted successfully:", response.data);
        setShowHealthTips(true);
        alert("Data submitted successfully!");
        return;
      } catch (primaryError) {
        console.warn(
          "Primary server failed, attempting local fallback:",
          primaryError
        );
      }

      const localResponse = await axios.post(
        "http://localhost:3000/api/period/trackerdata/",
        submissionData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(
        "Data submitted successfully via local server:",
        localResponse.data
      );
      setShowHealthTips(true);
      alert("Data submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
      if (error.response) {
        alert(`Error: ${error.response.data.message || "Server error"}`);
      } else if (error.request) {
        alert("No response from server. Please check your network connection.");
      } else {
        alert("Error submitting data. Please try again.");
      }
    }
  };

  const toggleSidebar = () => {
    setSideBarVisible(!sidebarVisible);
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderSection = (title, content, section) => (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-6 shadow-sm transition-all duration-300">
      <div
        onClick={() => toggleSection(section)}
        className="w-full flex justify-between items-center px-6 py-4 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
      >
        <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
          {title}
        </h3>
        {expandedSections[section] ? (
          <ChevronUp className="w-5 h-5 text-zinc-500 dark:text-zinc-300" />
        ) : (
          <ChevronDown className="w-5 h-5 text-zinc-500 dark:text-zinc-300" />
        )}
      </div>

      {expandedSections[section] && (
        <div className="px-6 pb-6 pt-2 bg-white dark:bg-zinc-800 rounded-b-lg">
          {content}
        </div>
      )}
    </div>
  );

  const generateHealthTips = useMemo(() => {
    const tips = [];

    if (cycleDuration) {
      const cycleDurationInt = parseInt(cycleDuration);
      if (cycleDurationInt < 21) {
        tips.push(
          "Your cycle is shorter than average. Consider consulting with a healthcare professional to ensure everything is normal."
        );
      } else if (cycleDurationInt > 35) {
        tips.push(
          "Your cycle is longer than average. This can be normal, but you may want to discuss it with your doctor."
        );
      } else {
        tips.push(
          "Your cycle length is within the normal range. Keep tracking to notice any changes."
        );
      }
    }

    if (lastPeriodDuration) {
      const periodDuration = parseInt(lastPeriodDuration);
      if (periodDuration > 7) {
        tips.push(
          "Your period duration is longer than average. If this is consistent, consider discussing it with your healthcare provider."
        );
      } else if (periodDuration < 3) {
        tips.push(
          "Your period duration is shorter than average. This can be normal, but tracking consistently will help identify any patterns."
        );
      } else {
        tips.push(
          "Your period duration is within the normal range. Continue tracking to maintain awareness of your cycle."
        );
      }
    }

    if (symptoms.includes("Lower Abdomen Cramps")) {
      const severity =
        symptomSeverities["Lower Abdomen Cramps"] || "Not specified";
      if (severity === "Severe") {
        tips.push(
          "For severe cramps, consider over-the-counter pain relievers, a heating pad, and gentle exercise. If pain is debilitating, consult your doctor."
        );
      } else {
        tips.push(
          "For menstrual cramps, try using a heating pad, gentle yoga, or over-the-counter pain relievers if needed."
        );
      }
    }

    if (symptoms.includes("Fatigue")) {
      tips.push(
        "Combat period fatigue by ensuring adequate iron intake, staying hydrated, and getting enough rest. Consider iron-rich foods like spinach, beans, and lean meats."
      );
    }

    if (symptoms.includes("Bloating")) {
      tips.push(
        "To reduce bloating, try limiting salt intake, avoiding carbonated drinks, and eating smaller, more frequent meals. Gentle exercise can also help."
      );
    }

    if (sleepQuality === "Poor" || sleepQuality === "Fair") {
      tips.push(
        "Improve sleep quality by maintaining a regular sleep schedule, creating a comfortable sleep environment, and avoiding caffeine and screens before bedtime."
      );
    }

    if (moodTypes.includes("Sad") || moodTypes.includes("Angry")) {
      tips.push(
        "Mood changes during your cycle are normal. Regular exercise, mindfulness practices, and adequate sleep can help manage mood fluctuations."
      );
    }

    if (tips.length === 0) {
      tips.push(
        "Keep tracking your cycle regularly to receive personalized health insights."
      );
    }

    return tips;
  }, [
    cycleDuration,
    lastPeriodDuration,
    symptoms,
    symptomSeverities,
    sleepQuality,
    moodTypes,
  ]);

  const cycleInfoContent = (
    <div className="space-y-6 text-zinc-800 dark:text-zinc-100">
      {/* Input: Average Cycle Duration */}
      <div className="space-y-2">
        <label
          htmlFor="cycleDuration"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Average Cycle Duration (days)
        </label>
        <input
          type="number"
          id="cycleDuration"
          name="cycleDuration"
          value={cycleDuration}
          onChange={handleInputChange}
          min="1"
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      {/* Input: Last Period Start Date */}
      <div className="space-y-2">
        <label
          htmlFor="lastPeriodStart"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Last Period Start Date
        </label>
        <input
          type="date"
          id="lastPeriodStart"
          name="lastPeriodStart"
          value={lastPeriodStart}
          onChange={handleInputChange}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      {/* Input: Last Period Duration */}
      <div className="space-y-2">
        <label
          htmlFor="lastPeriodDuration"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Last Period Duration (days)
        </label>
        <input
          type="number"
          id="lastPeriodDuration"
          name="lastPeriodDuration"
          value={lastPeriodDuration}
          onChange={handleInputChange}
          min="1"
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      {/* Predict Button */}
      <motion.button
        onClick={predictNextPeriod}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-2 px-4 rounded-md font-medium text-white bg-pink-500 hover:bg-pink-600 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-500"
      >
        Predict Next Period
      </motion.button>

      {/* Prediction Result */}
      {nextPeriodPrediction && (
        <div className="p-4 rounded-md bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800">
          <p className="text-pink-700 dark:text-pink-300">
            Your next period is predicted to start around:{" "}
            <span className="font-semibold">{nextPeriodPrediction}</span>
          </p>
        </div>
      )}
    </div>
  );

  const moodTrackingContent = (
    <div className="space-y-6 text-zinc-800 dark:text-zinc-100">
      {/* Mood Date */}
      <div className="space-y-2">
        <label
          htmlFor="moodDate"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Date
        </label>
        <input
          type="date"
          id="moodDate"
          name="moodDate"
          value={moodDate}
          onChange={handleInputChange}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      {/* Mood Types */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Mood Types (select all that apply)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {moodOptions.map((mood) => {
            const MoodIcon = mood.icon;
            const isSelected = moodTypes.includes(mood.name);
            return (
              <button
                key={mood.name}
                type="button"
                onClick={() => handleMoodTypeChange(mood.name)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md border transition-colors text-sm ${
                  isSelected
                    ? "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800"
                    : "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-gray-300 dark:border-zinc-600 hover:bg-pink-50 dark:hover:bg-zinc-700"
                }`}
              >
                <MoodIcon className="w-5 h-5" />
                <span>{mood.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mood Intensity */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Mood Intensity
        </label>
        <div className="flex flex-wrap gap-3">
          {moodSeverityOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setMoodSeverity(option.value)}
              className={`px-4 py-2 rounded-md border transition-colors text-sm ${
                moodSeverity === option.value
                  ? "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800"
                  : "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-gray-300 dark:border-zinc-600 hover:bg-pink-50 dark:hover:bg-zinc-700"
              }`}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const symptomTrackingContent = (
    <div className="space-y-6 text-zinc-800 dark:text-zinc-100">
      {/* Date Picker */}
      <div className="space-y-2">
        <label
          htmlFor="symptomDate"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Date
        </label>
        <input
          type="date"
          id="symptomDate"
          name="symptomDate"
          value={symptomDate}
          onChange={handleInputChange}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      {/* Symptom List */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Symptoms
        </label>
        <div className="space-y-4">
          {symptomOptions.map((symptom) => {
            const isSelected = symptoms.includes(symptom);
            return (
              <div key={symptom} className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`symptom-${symptom}`}
                    checked={isSelected}
                    onChange={() => handleSymptomChange(symptom)}
                    className="h-4 w-4 text-pink-500 focus:ring-pink-400 border-gray-300 dark:border-zinc-600 rounded"
                  />
                  <label
                    htmlFor={`symptom-${symptom}`}
                    className="ml-2 text-sm text-zinc-700 dark:text-zinc-300"
                  >
                    {symptom}
                  </label>
                </div>

                {/* Severity Selector */}
                {isSelected && (
                  <div className="ml-6 space-y-1">
                    <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      Severity
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {symptomSeverityOptions.map((severity) => (
                        <button
                          key={`${symptom}-${severity}`}
                          type="button"
                          onClick={() =>
                            handleSymptomSeverityChange(symptom, severity)
                          }
                          className={`px-3 py-1 rounded-md text-xs font-medium transition-colors border ${
                            symptomSeverities[symptom] === severity
                              ? "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800"
                              : "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-gray-300 dark:border-zinc-600 hover:bg-pink-50 dark:hover:bg-zinc-700"
                          }`}
                        >
                          {severity}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const sleepTrackingContent = (
    <div className="space-y-6 text-zinc-800 dark:text-zinc-100">
      {/* Sleep Duration Input */}
      <div className="space-y-2">
        <label
          htmlFor="sleepDuration"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Sleep Duration (hours)
        </label>
        <input
          type="number"
          id="sleepDuration"
          name="sleepDuration"
          value={sleepDuration}
          onChange={handleInputChange}
          min="0"
          max="24"
          step="0.5"
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      {/* Sleep Quality Selector */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Sleep Quality
        </label>
        <div className="flex flex-wrap gap-3">
          {sleepQualityOptions.map((quality) => (
            <button
              key={quality}
              type="button"
              onClick={() => setSleepQuality(quality)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border ${
                sleepQuality === quality
                  ? "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800"
                  : "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-gray-300 dark:border-zinc-600 hover:bg-pink-50 dark:hover:bg-zinc-700"
              }`}
            >
              {quality}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const healthTipsContent = (
    <div className="space-y-4 text-zinc-800 dark:text-zinc-100">
      {showHealthTips ? (
        <ul className="space-y-3">
          {generateHealthTips.map((tip, index) => (
            <li
              key={index}
              className="flex items-start gap-3 p-3 bg-pink-50 dark:bg-pink-900/10 border border-pink-100 dark:border-pink-800 rounded-md"
            >
              <HeartPulse className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-zinc-800 dark:text-zinc-200">
                {tip}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Submit your tracking data to receive personalized health tips based on
          your cycle information.
        </p>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 transition-colors duration-300">
      <SideBar
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSideBarVisible}
        activeLink={5}
      />

      {width > 816 && (
        <button
          onClick={toggleSidebar}
          className="fixed left-0 top-0 w-10 z-10 p-2 bg-pink-600 text-white rounded-r-md transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
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
      )}

      <div
        className={`flex-1 p-6 lg:p-8 transition-all duration-300 ease-in-out ${
          sidebarVisible && width > 816 ? "ml-64" : "ml-0"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className={`text-2xl font-bold text-gray-900 dark:text-white ${sidebarVisible && width > 816 ? "pl-0" : "pl-10"}`}>
              Period Tracker
            </h1>
            {width < 816 && (
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Subheading */}
          <div className="mb-8">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Track your menstrual cycle, symptoms, mood, and sleep patterns to gain
              insights into your reproductive health.
            </p>
          </div>

          {/* Sections */}
          {renderSection("Cycle Information", cycleInfoContent, "cycleInfo")}
          {renderSection("Mood Tracking", moodTrackingContent, "moodTracking")}
          {renderSection(
            "Symptom Tracking",
            symptomTrackingContent,
            "symptomTracking"
          )}
          {renderSection(
            "Sleep Tracking",
            sleepTrackingContent,
            "sleepTracking"
          )}
          {renderSection("Health Tips", healthTipsContent, "healthTips")}

          {/* Submit Button */}
          <div className="mt-10 flex justify-center">
            <button
              onClick={handleSubmit}
              className="inline-flex items-center justify-center py-3 px-6 rounded-md font-medium bg-pink-500 hover:bg-pink-600 text-white transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-500"
            >
              Submit Tracking Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
