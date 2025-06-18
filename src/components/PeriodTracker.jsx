import React, { useState, useMemo, useEffect } from "react";
import { format, addDays } from "date-fns";
import { useNavigate } from "react-router-dom";
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
  const [sidebarVisible, setSidebarVisible] = useState(true);
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

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please log in first");
      return;
    }

    const submissionData = {
      userId,
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
      try {
        const response = await axios.post(
          `${server_url}api/period/trackerdata`,
          submissionData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${localStorage.getItem("token") || ""}`, // Ensure token exists
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
        submissionData
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
    setSidebarVisible(!sidebarVisible);
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderSection = (title, content, section) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => toggleSection(section)}
      >
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {title}
        </h3>
        {expandedSections[section] ? (
          <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        )}
      </div>
      {expandedSections[section] && <div className="mt-4">{content}</div>}
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
          "Your period duration is shorter than average. This can be normal, but keep an eye on it and consult your doctor if you're concerned."
        );
      }
    }

    if (moodTypes.includes("Sad") || moodTypes.includes("Angry")) {
      tips.push(
        "Mood swings can be common during your cycle. Try relaxation techniques or gentle exercise to help manage your emotions."
      );
    }
    if (moodTypes.includes("Tired")) {
      tips.push(
        "Fatigue is common during menstruation. Ensure you're getting enough rest and consider iron-rich foods to combat tiredness."
      );
    }

    if (symptoms.includes("Lower Abdomen Cramps")) {
      tips.push(
        "For menstrual cramps, try using a heating pad or taking a warm bath to alleviate discomfort."
      );
    }
    if (symptoms.includes("Bloating")) {
      tips.push(
        "To reduce bloating, try to avoid salty foods and increase your water intake."
      );
    }
    if (symptoms.includes("Headaches")) {
      tips.push(
        "Headaches can be common during your cycle. Stay hydrated and consider over-the-counter pain relievers if needed."
      );
    }
    if (symptoms.includes("Sleep Disruption")) {
      tips.push(
        "To improve sleep during your cycle, try to maintain a consistent sleep schedule and create a relaxing bedtime routine."
      );
    }

    if (sleepDuration) {
      const sleepDurationInt = parseFloat(sleepDuration);
      if (sleepDurationInt < 7) {
        tips.push(
          "You might not be getting enough sleep. Aim for 7-9 hours of sleep per night for optimal health and well-being."
        );
      } else if (sleepDurationInt > 9) {
        tips.push(
          "You're getting more sleep than average. While this can be normal, excessive sleep might indicate other health issues. Consider discussing with your doctor if this persists."
        );
      } else {
        tips.push(
          "Your sleep duration is within the recommended range. Keep maintaining this healthy sleep pattern!"
        );
      }
    }

    if (sleepQuality === "Poor" || sleepQuality === "Fair") {
      tips.push(
        "To improve sleep quality, try establishing a consistent bedtime routine, avoiding screens before bed, and creating a comfortable sleep environment."
      );
    }

    tips.push(
      "Stay hydrated by drinking plenty of water throughout your cycle."
    );
    tips.push(
      "Regular exercise can help alleviate many menstrual symptoms and improve overall well-being."
    );
    tips.push(
      "A balanced diet rich in fruits, vegetables, and whole grains can help support your body during your cycle."
    );

    return tips;
  }, [
    cycleDuration,
    lastPeriodDuration,
    moodTypes,
    sleepDuration,
    sleepQuality,
    symptoms,
  ]);

  const { width } = useScreenSize();

  return (
    <div className={`flex h-screen`}>
      {/* Sidebar */}
      <SideBar
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        activeLink={4}
      />
      {width > 816 && (
        <button
          onClick={toggleSidebar}
          className="fixed left-0 top-0 w-10 z-10 p-2 bg-pink-600 text-white rounded-r-md  transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
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

      {/* Main Content */}
      <main
        className={`flex-1 p-6 overflow-auto bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out ${
          sidebarVisible ? "ml-64" : "ml-0"
        }`}
      >
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-pink-600 dark:text-pink-400">
              Period Tracker
            </h2>
          </div>

          <div className="bg-pink-50 dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-8">
            <div className="text-center mb-8">
              <p className="text-black dark:text-gray-300">
                Track your cycle, moods, symptoms, and sleep
              </p>
            </div>

            {renderSection(
              <span style={{ color: "#db0085" }}>Cycle Information</span>,
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white-700 dark:text-gray-300">
                      Start date of your last period
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="lastPeriodStart"
                        value={lastPeriodStart}
                        onChange={handleInputChange}
                        className="w-full text-white pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 dark:bg-gray-700 dark:text-white"
                      />
                      <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white-700 dark:text-gray-300">
                      Last Period Duration (days)
                    </label>
                    <input
                      type="number"
                      name="lastPeriodDuration"
                      value={lastPeriodDuration}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full px-3 py-2 text-white border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white-700 dark:text-gray-300">
                    Average Cycle Duration (days)
                  </label>
                  <input
                    type="number"
                    name="cycleDuration"
                    value={cycleDuration}
                    onChange={handleInputChange}
                    min="21"
                    max="35"
                    className="w-full px-3 py-2 text-white border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <button
                  onClick={predictNextPeriod}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-md transition duration-300 shadow-md"
                >
                  Predict Next Period
                </button>
                {nextPeriodPrediction && (
                  <p className="text-center font-medium text-white-700 dark:text-gray-300 bg-pink-300 dark:bg-pink-500 p-3 rounded-md">
                    Predicted next period:{" "}
                    {format(new Date(nextPeriodPrediction), "MMMM d, yyyy")}
                  </p>
                )}
              </div>,
              "cycleInfo"
            )}

            {renderSection(
              <span style={{ color: "#db0085" }}>Mood Tracking</span>,
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Select Mood(s)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {moodOptions.map((mood) => (
                      <button
                        key={mood.name}
                        onClick={() => handleMoodTypeChange(mood.name)}
                        className={`text-white flex items-center justify-center px-4 py-2 border rounded-md transition duration-300 ${
                          moodTypes.includes(mood.name)
                            ? "bg-pink-500 text-white-800 border-pink-300 dark:bg-pink-500 dark:text-gray-200 dark:border-pink-600"
                            : "bg-white text-gray-600 border-gray-300 hover:bg-pink-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-pink-900"
                        }`}
                      >
                        <mood.icon className="mr-2 h-4 w-4" />
                        {mood.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Mood Severity
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {moodSeverityOptions.map((option) => (
                      <label
                        key={option.value}
                        className="inline-flex items-center"
                      >
                        <input
                          type="radio"
                          value={option.value}
                          checked={moodSeverity === option.value}
                          onChange={() => setMoodSeverity(option.value)}
                          className="form-radio text-pink-500"
                        />
                        <span className="ml-2 text-gray-700 dark:text-gray-300">
                          {option.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white-700 dark:text-gray-300">
                    Date of Mood Log
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="moodDate"
                      value={moodDate}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 text-white border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 dark:bg-gray-700 dark:text-white"
                    />
                    <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-white-400" />
                  </div>
                </div>
              </div>,
              "moodTracking"
            )}

            {renderSection(
              <span style={{ color: "#db0085" }}>Symptom Tracking</span>,
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Select Symptoms
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {symptomOptions.map((symptom) => (
                      <label key={symptom} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={symptoms.includes(symptom)}
                          onChange={() => handleSymptomChange(symptom)}
                          className="form-checkbox text-pink-500"
                        />
                        <span className="ml-2 text-gray-700 dark:text-gray-300">
                          {symptom}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {symptoms.map((symptom) => (
                  <div key={symptom} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {symptom} Severity
                    </label>
                    <select
                      value={symptomSeverities[symptom] || ""}
                      onChange={(e) =>
                        handleSymptomSeverityChange(symptom, e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 dark:bg-gray-700  text-white dark:text-white"
                    >
                      <option value="">Select Severity</option>
                      {symptomSeverityOptions.map((severity) => (
                        <option key={severity} value={severity}>
                          {severity}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white-700 dark:text-gray-300">
                    Date of Symptoms
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="symptomDate"
                      value={symptomDate}
                      onChange={handleInputChange}
                      className="text-white w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 dark:bg-gray-700 dark:text-white"
                    />
                    <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>,
              "symptomTracking"
            )}

            {renderSection(
              <span style={{ color: "#db0085" }}>Sleep Tracking</span>,
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Sleep Duration (hours)
                  </label>
                  <input
                    type="number"
                    name="sleepDuration"
                    value={sleepDuration}
                    onChange={handleInputChange}
                    min="0"
                    max="24"
                    step="0.5"
                    className="w-full px-3 text-white py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white-700 dark:text-gray-300">
                    Sleep Quality
                  </label>
                  <select
                    name="sleepQuality"
                    value={sleepQuality}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-white border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select Sleep Quality</option>
                    {sleepQualityOptions.map((quality) => (
                      <option key={quality} value={quality}>
                        {quality}
                      </option>
                    ))}
                  </select>
                </div>
              </div>,
              "sleepTracking"
            )}

            {showHealthTips &&
              renderSection(
                <span style={{ color: "#db0085" }}>Health Tips</span>,
                <div className="space-y-4">
                  {generateHealthTips.map((tip, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 bg-white dark:bg-gray-700 p-4 rounded-md shadow-sm"
                    >
                      <Heart className="w-6 h-6 text-pink-600 flex-shrink-0 mt-1" />
                      <p className="text-white  dark:text-pink-500">{tip}</p>
                    </div>
                  ))}
                </div>,
                "healthTips"
              )}

            <button
              onClick={handleSubmit}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-4 rounded-md text-lg transition duration-300 shadow-md"
            >
              Submit Tracking Data
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

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
