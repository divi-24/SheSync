'use client'

import React, { useState, useMemo, useEffect } from "react";
import { format, addDays } from "date-fns";
import { useRouter } from "next/navigation";
import { useAuth, useUser } from '@clerk/nextjs';
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
import { apiWithFallback } from "../utils/api";
import SideBar from "./SideBar";
import useScreenSize from "../hooks/useScreenSize";

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
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const { width } = useScreenSize();
  
  // Redirect to login if not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/login');
    }
  }, [isLoaded, isSignedIn, router]);
  
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [cycleDuration, setCycleDuration] = useState("");
  const [lastPeriodStart, setLastPeriodStart] = useState("");
  const [lastPeriodDuration, setLastPeriodDuration] = useState("");
  const [moodTypes, setMoodTypes] = useState<string[]>([]);
  const [moodSeverity, setMoodSeverity] = useState("");
  const [moodDate, setMoodDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [symptomSeverities, setSymptomSeverities] = useState<Record<string, string>>({});
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
  const [waterIntakeCount, setWaterIntakeCount] = useState(0);

  // Redirect if not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/login");
    }
  }, [isLoaded, isSignedIn, router]);
  
  const handleWaterIntakeUpdate = async () => {
    if (!isSignedIn || !user) {
      alert("You must be logged in to update water intake");
      router.push('/login');
      return;
    }
    
    try {
      const response = await apiWithFallback(`/api/period/waterupdate/me`, {
        method: 'GET',
      });
      setWaterIntakeCount(response.data.waterIntakeCount);
      console.log("Water intake updated:", response.data);
    } catch (error) {
      console.error("Error updating water intake:", error);
      alert("Error updating water intake. Please try again.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const handleMoodTypeChange = (moodName: string) => {
    setMoodTypes((prev) =>
      prev.includes(moodName)
        ? prev.filter((mood) => mood !== moodName)
        : [...prev, moodName]
    );
  };

  const handleSymptomChange = (symptom: string) => {
    setSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSymptomSeverityChange = (symptom: string, severity: string) => {
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

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!isSignedIn || !user) {
      alert("You must be logged in to submit data");
      router.push('/login');
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
      await apiWithFallback('/api/period/trackerdata', {
        method: 'POST',
        data: submissionData,
      });
      console.log("Data submitted successfully");
      setShowHealthTips(true);
      alert("Data submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error submitting data. Please try again.");
    }
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderSection = (title: string, content: React.ReactNode, section: string) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => toggleSection(section)}
      >
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {title}
        </h3>
        {expandedSections[section as keyof typeof expandedSections] ? (
          <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        )}
      </div>
      {expandedSections[section as keyof typeof expandedSections] && <div className="mt-4">{content}</div>}
    </div>
  );

  const generateHealthTips = useMemo(() => {
    const tips: string[] = [];

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
    <div className="space-y-4">
      <div>
        <label
          htmlFor="cycleDuration"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
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
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="lastPeriodStart"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Last Period Start Date
        </label>
        <input
          type="date"
          id="lastPeriodStart"
          name="lastPeriodStart"
          value={lastPeriodStart}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="lastPeriodDuration"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
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
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
        />
      </div>

      <button
        onClick={predictNextPeriod}
        className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
      >
        Predict Next Period
      </button>

      {nextPeriodPrediction && (
        <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900 rounded-md">
          <p className="text-indigo-700 dark:text-indigo-200">
            Your next period is predicted to start around:{" "}
            <span className="font-semibold">{nextPeriodPrediction}</span>
          </p>
        </div>
      )}
    </div>
  );

  const moodTrackingContent = (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="moodDate"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Date
        </label>
        <input
          type="date"
          id="moodDate"
          name="moodDate"
          value={moodDate}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                className={`flex items-center space-x-2 p-3 rounded-md transition-colors ${isSelected
                  ? "bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
              >
                <MoodIcon className="w-5 h-5" />
                <span>{mood.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Mood Intensity
        </label>
        <div className="flex space-x-3">
          {moodSeverityOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setMoodSeverity(option.value)}
              className={`px-4 py-2 rounded-md transition-colors ${moodSeverity === option.value
                ? "bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
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
    <div className="space-y-4">
      <div>
        <label
          htmlFor="symptomDate"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Date
        </label>
        <input
          type="date"
          id="symptomDate"
          name="symptomDate"
          value={symptomDate}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Symptoms
        </label>
        <div className="space-y-3">
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
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded"
                  />
                  <label
                    htmlFor={`symptom-${symptom}`}
                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                  >
                    {symptom}
                  </label>
                </div>

                {isSelected && (
                  <div className="ml-6">
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Severity
                    </label>
                    <div className="flex space-x-2">
                      {symptomSeverityOptions.map((severity) => (
                        <button
                          key={`${symptom}-${severity}`}
                          type="button"
                          onClick={() =>
                            handleSymptomSeverityChange(symptom, severity)
                          }
                          className={`px-2 py-1 text-xs rounded-md transition-colors ${symptomSeverities[symptom] === severity
                            ? "bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
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
    <div className="space-y-4">
      <div>
        <label
          htmlFor="sleepDuration"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
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
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Sleep Quality
        </label>
        <div className="flex flex-wrap gap-2">
          {sleepQualityOptions.map((quality) => (
            <button
              key={quality}
              type="button"
              onClick={() => setSleepQuality(quality)}
              className={`px-4 py-2 rounded-md transition-colors ${sleepQuality === quality
                ? "bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
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
    <div className="space-y-4">
      {showHealthTips ? (
        <div>
          <ul className="space-y-2">
            {generateHealthTips.map((tip, index) => (
              <li
                key={index}
                className="flex items-start space-x-2 text-gray-700 dark:text-gray-300"
              >
                <HeartPulse className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">
          Submit your tracking data to receive personalized health tips based on
          your cycle information.
        </p>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <SideBar
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        activeLink={4}
      />

      <div className="flex-1 p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Period Tracker
            </h1>
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-8">
            <p className="text-gray-600 dark:text-gray-400">
              Track your menstrual cycle, symptoms, mood, and sleep patterns to
              gain insights into your reproductive health.
            </p>
          </div>

          {renderSection("Cycle Information", cycleInfoContent, "cycleInfo")}
          {renderSection("Mood Tracking", moodTrackingContent, "moodTracking")}
          {renderSection("Symptom Tracking", symptomTrackingContent, "symptomTracking")}
          {renderSection("Sleep Tracking", sleepTrackingContent, "sleepTracking")}
          {renderSection("Health Tips", healthTipsContent, "healthTips")}

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleSubmit}
              className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors"
            >
              Submit Tracking Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}