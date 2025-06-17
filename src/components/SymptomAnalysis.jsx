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
  AppWindowMac,
  Sun,
  Moon,
  ArrowLeft,
  Plus,
  Handshake,
  Minus,
  Info,
  LayoutDashboard,
  Home,
  GraduationCap,
  ShoppingBag,
  ActivitySquare,
  ClipboardList,
  Gamepad2,
  Stethoscope,
  Bot,
  HeartPulse,
  MessageSquare,
  Calendar,
  Bell,
  AlertTriangle,
  History,
  BarChart,
  Tag,
  Clock,
  CalendarClock,
  Heart,
} from "lucide-react";
import SideBar from "./SideBar";
import useScreenSize from "../hooks/useScreenSize";
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

const symptomCategories = {
  "Pain & Discomfort": [
    "Abdominal cramps",
    "Back pain",
    "Breast tenderness",
    "Headache",
    "Joint pain",
    "Muscle aches",
  ],
  "Emotional & Mental": [
    "Mood swings",
    "Anxiety",
    "Depression",
    "Irritability",
    "Sleep issues",
    "Fatigue",
  ],
  "Physical Changes": [
    "Bloating",
    "Weight changes",
    "Acne",
    "Hair changes",
    "Skin changes",
    "Swelling",
  ],
  "Digestive Issues": [
    "Nausea",
    "Appetite changes",
    "Constipation",
    "Diarrhea",
    "Indigestion",
  ],
};

const severityGuides = {
  "Abdominal cramps": {
    mild: "Noticeable but doesn't affect daily activities",
    moderate: "Interferes with some activities",
    severe: "Significantly impacts daily life",
  },
  Headache: {
    mild: "Slight discomfort, can focus on tasks",
    moderate: "Distracting, difficulty concentrating",
    severe: "Intense pain, sensitivity to light/sound",
  },
  // Add more guides for other symptoms
};

const emergencySymptoms = [
  "Severe chest pain",
  "Difficulty breathing",
  "Severe abdominal pain",
  "Heavy bleeding",
  "Fainting",
  "Severe headache with vision changes",
];

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
  const [symptomHistory, setSymptomHistory] = useState([]);
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const toggleCategory = (category) => {
  setSelectedCategories((prev) =>
    prev.includes(category)
      ? prev.filter((c) => c !== category)
      : [...prev, category]
  );
};

  const [symptomPatterns, setSymptomPatterns] = useState({});
  const [showSeverityGuide, setShowSeverityGuide] = useState(false);
  const [currentSymptomGuide, setCurrentSymptomGuide] = useState(null);
  const [cycleDay, setCycleDay] = useState(null);
  const [recentPatterns, setRecentPatterns] = useState([]);

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
      <div className="w-full bg-pink-50 rounded-full h-2.5 mb-4">
        <div
          className="bg-pink-300 h-2.5 rounded-full"
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

            {/* Cycle Day Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Current Day of Menstrual Cycle (optional)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="1"
                  max="28"
                  value={cycleDay || ""}
                  onChange={(e) =>
                    setCycleDay(e.target.value ? Number(e.target.value) : null)
                  }
                  className="w-20 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                  placeholder="Day"
                />
                <CalendarClock className="h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Category Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Select Category</h3>
              <div className="grid grid-cols-1 gap-3">
                {Object.keys(symptomCategories).map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`p-4 rounded-lg text-base transition-colors ${
                      selectedCategories.includes(category)
                        ? "bg-pink-200 text-pink-700 font-medium shadow-sm"
                        : "bg-pink-50 text-gray-700 hover:bg-pink-100 border border-pink-100"
                    }`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <span className={selectedCategories.includes(category) ? "text-pink-700" : "text-gray-700"}>
                      {category}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>


            {/* Symptom Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Select Symptoms</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {(selectedCategories.length > 0? selectedCategories.flatMap((cat) => symptomCategories[cat]): commonSymptoms).map((symptom) => (
                  <motion.button
                    key={symptom}
                    onClick={() => {
                      handleSymptomToggle(symptom);
                      checkEmergencySymptoms([...selectedSymptoms, symptom]);
                    }}
                    className={`p-3 rounded-md text-sm transition-colors relative group ${
                      selectedSymptoms.includes(symptom)
                        ? "bg-pink-200 text-pink-700 font-medium shadow-sm"
                        : "bg-pink-50 text-gray-700 hover:bg-pink-100 border border-pink-100"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span
                      className={
                        selectedSymptoms.includes(symptom)
                          ? "text-pink-700"
                          : "text-gray-700"
                      }
                    >
                      {symptom}
                    </span>
                    {severityGuides[symptom] && (
                      <Info
                        className={`h-4 w-4 absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer ${
                          selectedSymptoms.includes(symptom)
                            ? "text-pink-700"
                            : "text-gray-500"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentSymptomGuide(symptom);
                          setShowSeverityGuide(true);
                        }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Custom Symptom Input */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={customSymptom}
                onChange={(e) => setCustomSymptom(e.target.value)}
                placeholder="Add custom symptom"
                className="flex-grow p-2 border border-pink-100 rounded-md bg-pink-50 placeholder-gray-500 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-transparent"
              />
              <motion.button
                onClick={handleAddCustomSymptom}
                className="p-2 bg-pink-200 text-pink-700 rounded-md hover:bg-pink-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus size={24} />
              </motion.button>
            </div>

            {showEmergencyAlert && <EmergencyAlert />}
            {showSeverityGuide && currentSymptomGuide && (
              <SeverityGuideModal
                symptom={currentSymptomGuide}
                onClose={() => {
                  setShowSeverityGuide(false);
                  setCurrentSymptomGuide(null);
                }}
              />
            )}

            <motion.button
              onClick={handleNext}
              disabled={selectedSymptoms.length === 0}
              className={`w-full py-3 rounded-md text-white font-semibold transition-colors ${
                selectedSymptoms.length > 0
                  ? "bg-pink-600 hover:bg-pink-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              whileHover={selectedSymptoms.length > 0 ? { scale: 1.02 } : {}}
              whileTap={selectedSymptoms.length > 0 ? { scale: 0.98 } : {}}
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
            <h2 className="text-2xl font-semibold mb-4 text-pink-700">
              Step 2: Rate Symptom Intensity
            </h2>
            <div className="space-y-4 mb-6">
              {["Mild", "Moderate", "Severe"].map((level) => (
                <motion.button
                  key={level}
                  onClick={() => setIntensity(level)}
                  className={`w-full p-4 rounded-lg text-base transition-colors ${
                    intensity === level
                      ? "bg-pink-200 text-pink-700 font-medium shadow-sm"
                      : "bg-pink-50 text-gray-700 hover:bg-pink-100 border border-pink-100"
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {level}
                </motion.button>
              ))}
            </div>
            <div className="flex justify-between">
              <motion.button
                onClick={handleBack}
                className="py-3 px-6 rounded-lg text-pink-700 font-medium border border-pink-200 hover:bg-pink-50 transition-colors"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <ArrowLeft className="inline mr-2" />
                Back
              </motion.button>
              <motion.button
                onClick={handleNext}
                disabled={!intensity}
                className={`py-3 px-6 rounded-lg font-medium transition-colors ${
                  intensity
                    ? "bg-pink-200 text-pink-700 hover:bg-pink-300"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
                whileHover={intensity ? { scale: 1.01 } : {}}
                whileTap={intensity ? { scale: 0.99 } : {}}
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
            <h2 className="text-2xl font-semibold mb-4 text-pink-700">
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
                  className={`w-full p-4 rounded-lg text-base transition-colors ${
                    duration === period
                      ? "bg-pink-200 text-pink-700 font-medium shadow-sm"
                      : "bg-pink-50 text-gray-700 hover:bg-pink-100 border border-pink-100"
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span
                    className={
                      duration === period ? "text-pink-700" : "text-gray-700"
                    }
                  >
                    {period}
                  </span>
                </motion.button>
              ))}
            </div>
            <div className="flex justify-between">
              <motion.button
                onClick={handleBack}
                className="py-3 px-6 rounded-lg text-pink-700 font-medium border border-pink-200 hover:bg-pink-50 transition-colors"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <ArrowLeft className="inline mr-2" />
                Back
              </motion.button>
              <motion.button
                onClick={handleNext}
                disabled={!duration}
                className={`py-3 px-6 rounded-lg font-medium transition-colors ${
                  duration
                    ? "bg-pink-200 text-pink-700 hover:bg-pink-300"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
                whileHover={duration ? { scale: 1.01 } : {}}
                whileTap={duration ? { scale: 0.99 } : {}}
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
            <h2 className="text-2xl font-semibold mb-4 text-pink-700">
              Step 4: Additional Information
            </h2>
            <textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Any other details you'd like to share..."
              className="w-full p-4 border border-pink-100 rounded-lg bg-pink-50 text-gray-700 placeholder-gray-500 mb-6 
                focus:ring-2 focus:ring-pink-200 focus:border-transparent transition-colors
                hover:border-pink-200"
              rows={4}
            />
            <div className="flex justify-between">
              <motion.button
                onClick={handleBack}
                className="py-3 px-6 rounded-lg text-pink-700 font-medium border border-pink-200 hover:bg-pink-50 transition-colors"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <ArrowLeft className="inline mr-2" />
                Back
              </motion.button>
              <motion.button
                onClick={handleNext}
                className="py-3 px-6 rounded-lg font-medium bg-pink-200 text-pink-700 hover:bg-pink-300 transition-colors"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
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
            <h2 className="text-2xl font-semibold mb-4 text-pink-700">
              Step 5: Review and Submit
            </h2>
            <div className="bg-pink-50/80 p-6 rounded-lg border border-pink-100">
              <h3 className="font-semibold mb-2 text-pink-700">
                Selected Symptoms:
              </h3>
              <ul className="list-disc pl-5 mb-4 text-gray-700">
                {selectedSymptoms.map((symptom, index) => (
                  <li key={index}>{symptom}</li>
                ))}
              </ul>
              <p className="text-gray-700">
                <strong className="text-pink-700">Intensity:</strong>{" "}
                {intensity}
              </p>
              <p className="text-gray-700">
                <strong className="text-pink-700">Duration:</strong> {duration}
              </p>
              {additionalInfo && (
                <>
                  <h3 className="font-semibold mt-4 mb-2 text-pink-700">
                    Additional Information:
                  </h3>
                  <p className="text-gray-700">{additionalInfo}</p>
                </>
              )}
            </div>
            <div className="flex justify-between">
              <motion.button
                onClick={handleBack}
                className="py-3 px-6 rounded-lg text-pink-700 font-medium border border-pink-200 hover:bg-pink-50 transition-colors"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <ArrowLeft className="inline mr-2" />
                Back
              </motion.button>
              <motion.button
                onClick={handleSubmit}
                className={`py-3 px-6 rounded-lg font-medium bg-pink-200 text-pink-700 hover:bg-pink-300 transition-colors ${
                  isAnalyzing ? "opacity-50 cursor-not-allowed" : ""
                }`}
                whileHover={isAnalyzing ? {} : { scale: 1.01 }}
                whileTap={isAnalyzing ? {} : { scale: 0.99 }}
              >
                {isAnalyzing ? (
                  <span className="flex items-center text-pink-700">
                    <Loader2 className="animate-spin mr-2" />
                    Analyzing...
                  </span>
                ) : (
                  <span className="text-pink-700">
                    Submit for Analysis
                    <ChevronRight className="inline ml-2" />
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
            <h2 className="text-2xl font-semibold text-pink-700">
              Analysis Results
            </h2>

            {/* Existing analysis sections */}
            <div className="space-y-6">
              {/* Causes section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-pink-50/80 rounded-lg p-6 shadow-sm border border-pink-100"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center text-pink-700">
                  <Brain className="mr-2 text-pink-600" /> Possible Causes
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {analysis.possibleCauses.map((cause, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-2 text-gray-700"
                    >
                      <div className="w-2 h-2 rounded-full bg-pink-400" />
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Pattern Analysis */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-pink-50/80 rounded-lg p-6 shadow-sm border border-pink-100"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center text-pink-700">
                  <BarChart className="mr-2 text-pink-600" /> Symptom Patterns
                </h3>
                {analysis.patterns.recommendations.map(
                  (recommendation, index) => (
                    <div
                      key={index}
                      className="mb-3 flex items-start space-x-3"
                    >
                      <Tag className="w-5 h-5 text-pink-600 flex-shrink-0 mt-1" />
                      <p className="text-gray-700">{recommendation}</p>
                    </div>
                  )
                )}
              </motion.div>

              {/* Lifestyle Recommendations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-pink-50/80 rounded-lg p-6 shadow-sm border border-pink-100"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center text-pink-700">
                  <Activity className="mr-2 text-pink-600" /> Lifestyle
                  Recommendations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(analysis.lifestyle).map(
                    ([category, items]) => (
                      <div key={category} className="space-y-2">
                        <h4 className="font-medium capitalize mb-2 text-pink-700">
                          {category}
                        </h4>
                        <ul className="space-y-1">
                          {items.map((item, index) => (
                            <li
                              key={index}
                              className="text-sm flex items-start space-x-2"
                            >
                              <CheckCircle className="w-4 h-4 text-pink-500 flex-shrink-0 mt-1" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  )}
                </div>
              </motion.div>

              {/* Community Insights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-pink-50/80 rounded-lg p-6 border border-pink-100"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center text-pink-700">
                  <Users className="mr-2 text-pink-600" /> Community Insights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3">
                    <ThumbsUp className="w-8 h-8 text-pink-500" />
                    <div>
                      <div className="text-2xl font-bold text-pink-700">
                        {analysis.communityInsights.similarExperiences}%
                      </div>
                      <div className="text-sm text-gray-700">
                        Report Similar Symptoms
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="w-8 h-8 text-pink-500" />
                    <div>
                      <div className="text-2xl font-bold text-pink-700">
                        {
                          analysis.communityInsights
                            .percentageSeekingMedicalAttention
                        }
                        %
                      </div>
                      <div className="text-sm text-gray-700">
                        Sought Medical Care
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Heart className="w-8 h-8 text-pink-500" />
                    <div>
                      <div className="text-sm font-medium text-pink-700">
                        Common Relief:
                      </div>
                      <div className="text-sm text-gray-700">
                        {analysis.communityInsights.commonRelief}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Medical Disclaimer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="bg-pink-50/80 border-l-4 border-pink-300 p-4 rounded"
            >
              <div className="flex space-x-3">
                <AlertTriangle className="w-6 h-6 text-pink-500 flex-shrink-0" />
                <p className="text-sm text-gray-700">
                  This analysis is not a substitute for professional medical
                  advice. If symptoms persist or worsen, please consult a
                  healthcare provider.
                </p>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <motion.button
                onClick={() => {
                  setStep(1);
                  setSelectedSymptoms([]);
                  setIntensity("");
                  setDuration("");
                  setAdditionalInfo("");
                  setAnalysis(null);
                }}
                className="flex-1 py-3 px-6 rounded-lg font-medium bg-pink-200 text-pink-700 hover:bg-pink-300 transition-colors"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                Start New Analysis
              </motion.button>
              <motion.button
                onClick={() => {
                  updateSymptomHistory(selectedSymptoms);
                }}
                className="flex-1 py-3 px-6 rounded-lg text-pink-700 font-medium border border-pink-200 hover:bg-pink-50 transition-colors"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                Save to History
              </motion.button>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  const checkEmergencySymptoms = (symptoms) => {
    const hasEmergency = symptoms.some((symptom) =>
      emergencySymptoms.includes(symptom.toLowerCase())
    );
    setShowEmergencyAlert(hasEmergency);
  };

  const updateSymptomHistory = (newSymptoms) => {
    const entry = {
      date: new Date(),
      symptoms: newSymptoms,
      intensity,
      duration,
      cycleDay,
    };
    setSymptomHistory((prev) => [...prev, entry]);
    analyzePatterns([...symptomHistory, entry]);
  };

  const analyzePatterns = (history) => {
    const patterns = {};
    history.forEach((entry) => {
      entry.symptoms.forEach((symptom) => {
        if (!patterns[symptom]) {
          patterns[symptom] = {
            frequency: 1,
            commonIntensity: [entry.intensity],
            cycleDays: [entry.cycleDay],
          };
        } else {
          patterns[symptom].frequency++;
          patterns[symptom].commonIntensity.push(entry.intensity);
          patterns[symptom].cycleDays.push(entry.cycleDay);
        }
      });
    });
    setSymptomPatterns(patterns);
  };

  const EmergencyAlert = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-6"
    >
      <div className="flex items-center">
        <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
        <div>
          <h3 className="text-red-500 font-semibold">Emergency Warning</h3>
          <p className="text-sm text-red-600 dark:text-red-400">
            Some of your symptoms may require immediate medical attention.
            Please contact emergency services or visit the nearest emergency
            room.
          </p>
        </div>
      </div>
    </motion.div>
  );

  const SeverityGuideModal = ({ symptom, onClose }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold mb-4">
          Severity Guide: {symptom}
        </h3>
        <div className="space-y-4">
          {Object.entries(severityGuides[symptom] || {}).map(
            ([level, description]) => (
              <div
                key={level}
                className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700 "
              >
                <span className="font-medium capitalize">{level}:</span>
                <p className="text-sm mt-1">{description}</p>
              </div>
            )
          )}
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
        >
          Close Guide
        </button>
      </div>
    </motion.div>
  );

  const mockAiAnalysis = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Initialize default patterns if no history exists
    const defaultPatterns = selectedSymptoms.reduce((acc, symptom) => {
      acc[symptom] = {
        frequency: 1,
        commonIntensity: [intensity],
        cycleDays: cycleDay ? [cycleDay] : [],
      };
      return acc;
    }, {});

    // Use existing patterns or default ones
    const currentPatterns =
      Object.keys(symptomPatterns).length > 0
        ? symptomPatterns
        : defaultPatterns;

    // Analyze patterns for better recommendations
    const mostFrequentSymptoms = Object.entries(currentPatterns)
      .sort(([, a], [, b]) => b.frequency - a.frequency)
      .slice(0, 3)
      .map(([symptom]) => symptom);

    const cyclePatterns = selectedSymptoms
      .map((symptom) => {
        const pattern = currentPatterns[symptom];
        if (pattern && pattern.cycleDays && pattern.cycleDays.length > 0) {
          const commonCycleDays = pattern.cycleDays.reduce((acc, day) => {
            if (day) {
              acc[day] = (acc[day] || 0) + 1;
            }
            return acc;
          }, {});
          return { symptom, commonCycleDays };
        }
        return null;
      })
      .filter(Boolean);

    const cycleRecommendation = cycleDay
      ? `Your symptoms are being recorded for day ${cycleDay} of your cycle`
      : "Consider tracking your cycle day for better pattern analysis";

    return {
      possibleCauses: [
        "Hormonal changes",
        "Stress",
        "Dietary factors",
        "Sleep patterns",
        "Exercise habits",
      ],
      suggestions: [
        "Get plenty of rest",
        "Stay hydrated",
        "Consider speaking with a healthcare provider",
        "Track your symptoms regularly",
        "Practice stress management techniques",
      ],
      communityInsights: {
        similarExperiences: 75,
        commonRelief: "Warm compress and over-the-counter pain relievers",
        percentageSeekingMedicalAttention: 30,
      },
      patterns: {
        frequentSymptoms: mostFrequentSymptoms,
        cyclePatterns,
        recommendations: [
          cycleRecommendation,
          "Consider tracking these patterns with your healthcare provider",
          "Preventive measures may be more effective when started before these days",
        ],
      },
      lifestyle: {
        diet: [
          "Increase water intake",
          "Reduce caffeine consumption",
          "Add anti-inflammatory foods",
        ],
        exercise: [
          "Light yoga or stretching",
          "Moderate cardio exercises",
          "Regular walking",
        ],
        stress: [
          "Practice deep breathing",
          "Try meditation",
          "Ensure adequate sleep",
        ],
      },
    };
  };

  const { width } = useScreenSize();

  return (
    <div className={`flex h-screen`}>
      <SideBar
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        activeLink={8}
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
      <div
        className={`transition-all duration-300 ease-in-out ${
          sidebarVisible ? "ml-64" : "ml-0"
        } flex-1 dark:bg-gray-900`}
      >
        <div className="max-w-screen-xl mx-auto p-4 space-y-6 dark:text-gray-100">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-pink-700">
              AI-Powered Symptom Analysis
            </h2>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Progress Bar */}
            <div className="w-full bg-pink-50 rounded-full h-2.5 mb-4">
              <div
                className="bg-pink-300 h-2.5 rounded-full"
                style={{ width: `${((step - 1) / 5) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mb-8">
              {[1, 2, 3, 4, 5].map((stepNumber) => (
                <div key={stepNumber} className="flex flex-col items-center">
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step >= stepNumber
                        ? "bg-pink-200 text-pink-700"
                        : "bg-pink-50 text-gray-500"
                    }`}
                    animate={{
                      scale: step === stepNumber ? 1.1 : 1,
                      transition: { duration: 0.3 },
                    }}
                  >
                    {step > stepNumber ? (
                      <CheckCircle size={20} className="text-pink-700" />
                    ) : (
                      stepNumber
                    )}
                  </motion.div>
                  <div className="text-xs mt-2 text-gray-600">
                    Step {stepNumber}
                  </div>
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
