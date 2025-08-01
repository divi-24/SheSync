import React, { useState, useMemo, useEffect } from "react";


import { format, addDays } from "date-fns";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
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
    BarChart2,
    LineChart,
    PieChart,
} from "lucide-react";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion, AnimatePresence } from "framer-motion";
import SideBar from "./SideBar";
import useScreenSize from "../hooks/useScreenSize";

const server_url = import.meta.env.VITE_SERVER_URL;
const local_url = "http://localhost:3000/";

const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
};

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
    "Irregular menstruation (Oligomenorrhea)",
    "Heavy menstrual bleeding (Menorrhagia)",
    "Excessive Hair growth (face, body - including on back, belly, and chest)",
    "Acne (face, chest, and upper back)",
    "Weight gain",
    "Skin darkening (Neck, in the groin, and under the breasts)",
    "Skipped or absence of menstruation (Amenorrhea)",
    "Hair loss (hair on the scalp gets thinner and fall out)",
    "Skin Tags (Acrochordons)",
    "Sleep Disturbances",
    "Mood Disorders",
    "Infertility",
    "Pelvic Pain",
    "Headaches",
    "Fatigue",
    "Oily Skin or Scalp",
    "Appetite Changes or Cravings",
    "Bladder Issues",
    "Reduced Libido",
    "Hoarseness or Voice Changes",
    "Associated Metabolic and Long-Term Risks",
    "Insulin Resistance",
    "Dyslipidemia",
    "Cardiovascular Risks",
    "Endometrial Hyperplasia",
    "Diagnostic Clues (Not Symptoms, but Relevant)",
    "Ovarian Morphology",
    "Lab Abnormalities",
];

const categorizedSymptoms = {
    "Menstrual Symptoms": [
        "Irregular menstruation (Oligomenorrhea)",
        "Heavy menstrual bleeding (Menorrhagia)",
        "Skipped or absence of menstruation (Amenorrhea)",
    ],
    "Physical Appearance": [
        "Excessive Hair growth (face, body - including on back, belly, and chest)",
        "Acne (face, chest, and upper back)",
        "Skin darkening (Neck, in the groin, and under the breasts)",
        "Hair loss (hair on the scalp gets thinner and fall out)",
        "Skin Tags (Acrochordons)",
        "Oily Skin or Scalp",
    ],
    "Metabolic Signs": [
        "Weight gain",
        "Fatigue",
        "Appetite Changes or Cravings",
        "Reduced Libido",
        "Associated Metabolic and Long-Term Risks",
        "Insulin Resistance",
        "Dyslipidemia",
        "Cardiovascular Risks",
        "Endometrial Hyperplasia",
        "Ovarian Morphology",
        "Lab Abnormalities",
    ],
    "Mental Health": [
        "Mood Disorders",
        "Sleep Disturbances",
        "Infertility",
        "Headaches",
        "Bladder Issues",
        "Hoarseness or Voice Changes",
    ],
    "Other Clues": ["Diagnostic Clues (Not Symptoms, but Relevant)"],
};
const symptomSeverityOptions = ["None", "Mild", "Moderate", "Severe"];

const sleepQualityOptions = ["Poor", "Fair", "Good", "Excellent"];
const genAI = new GoogleGenerativeAI("AIzaSyDC_nwnZggf8CYID3qvJfazEE8KBnqd9Ro");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const symptomSeverityMapping = {
    severe: { value: 100, color: "#ec4899" },
    moderate: { value: 66, color: "#f472b6" },
    mild: { value: 33, color: "#fbcfe8" },
    none: { value: 0, color: "#f9fafb" },
};

const SymptomChart = ({ symptoms, severities }) => {
    const chartData = useMemo(() => {
        return symptoms
            .map((symptom) => {
                const severity = (severities[symptom] || "None").toLowerCase();
                const severityInfo = {
                    severe: { value: 100, color: "#ef4444", bgColor: "#fee2e2" },
                    moderate: { value: 66, color: "#f59e0b", bgColor: "#fef3c7" },
                    mild: { value: 33, color: "#ec4899", bgColor: "#fce7f3" },
                    none: { value: 0, color: "#9ca3af", bgColor: "#f3f4f6" },
                }[severity] || { value: 0, color: "#9ca3af", bgColor: "#f3f4f6" };

                return {
                    name: symptom,
                    severity: severity,
                    ...severityInfo,
                };
            })
            .filter((item) => item.name && item.severity);
    }, [symptoms, severities]);

    return (
        <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 h-[400px]">
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
                Symptom Analysis
            </h3>

            <div className="h-[calc(100%-4rem)] overflow-y-auto pr-2 -mr-2 scroll-smooth">
                <div className="space-y-4">
                    {chartData.map((item, index) => (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-gray-50 dark:bg-gray-700/30 rounded-lg overflow-hidden"
                        >
                            {/* Symptom header */}
                            <div className="p-3 border-b border-gray-100 dark:border-gray-600">
                                <div className="flex items-center justify-between">
                                    <h5 className="font-medium text-gray-900 dark:text-gray-100">
                                        {item.name}
                                    </h5>
                                    <span
                                        className="px-2.5 py-1 rounded-full text-xs font-medium"
                                        style={{
                                            backgroundColor: item.bgColor,
                                            color: item.color,
                                        }}
                                    >
                    {item.severity.charAt(0).toUpperCase() +
                        item.severity.slice(1)}
                  </span>
                                </div>
                            </div>

                            {/* Progress bar section */}
                            <div className="p-3 bg-white/50 dark:bg-gray-800/50">
                                <div className="relative">
                                    {/* Background track */}
                                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                        {/* Severity gradient background */}
                                        <div className="absolute inset-0 flex">
                                            <div className="w-1/4 bg-gradient-to-r from-gray-100 to-pink-100 dark:from-gray-700 dark:to-pink-900 opacity-20" />
                                            <div className="w-1/4 bg-gradient-to-r from-pink-100 to-yellow-100 dark:from-pink-900 dark:to-yellow-900 opacity-20" />
                                            <div className="w-1/4 bg-gradient-to-r from-yellow-100 to-red-100 dark:from-yellow-900 dark:to-red-900 opacity-20" />
                                            <div className="w-1/4 bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900 dark:to-red-800 opacity-20" />
                                        </div>

                                        {/* Progress bar */}
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.value}%` }}
                                            transition={{ duration: 0.6, delay: index * 0.1 }}
                                            className="relative h-full rounded-full"
                                            style={{
                                                backgroundColor: item.color,
                                                boxShadow: `0 0 10px ${item.color}40`,
                                            }}
                                        >
                                            {/* Shimmer effect */}
                                            <div className="absolute inset-0 overflow-hidden">
                                                <div
                                                    className="absolute inset-0 opacity-30 animate-[shimmer_2s_infinite]"
                                                    style={{
                                                        background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)`,
                                                        transform: "translateX(-100%)",
                                                    }}
                                                />
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Severity markers */}
                                    <div className="absolute top-3 left-0 right-0 flex justify-between">
                                        {["None", "Mild", "Moderate", "Severe"].map((label, i) => (
                                            <div key={label} className="flex flex-col items-center">
                                                <div
                                                    className={`w-px h-2 ${
                                                        item.severity === label.toLowerCase()
                                                            ? "bg-current"
                                                            : "bg-gray-300 dark:bg-gray-600"
                                                    }`}
                                                />
                                                <span
                                                    className={`text-xs mt-1 ${
                                                        item.severity === label.toLowerCase()
                                                            ? `text-${item.color}`
                                                            : "text-gray-400 dark:text-gray-500"
                                                    }`}
                                                >
                          {label}
                        </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Gradient overlay for scroll fade */}
            <div className="absolute bottom-0 left-0 right-2 h-12 bg-gradient-to-t from-white dark:from-gray-800 to-transparent pointer-events-none" />
        </div>
    );
};

const MoodTrendChart = ({ moodTypes, moodDate }) => {
    const moodValues = {
        Happy: { value: 100, color: "#10B981" }, // Green
        Energized: { value: 80, color: "#3B82F6" }, // Blue
        Calm: { value: 60, color: "#8B5CF6" }, // Purple
        Tired: { value: 40, color: "#F59E0B" }, // Orange
        Sad: { value: 20, color: "#6B7280" }, // Gray
        Angry: { value: 0, color: "#EF4444" }, // Red
    };

    const chartData = useMemo(() => {
        return moodTypes
            .map((mood) => ({
                mood,
                ...(moodValues[mood] || { value: 50, color: "#6B7280" }),
            }))
            .sort((a, b) => b.value - a.value); // Sort by value for better visualization
    }, [moodTypes]);

    return (
        <div className="relative h-64 bg-white dark:bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Mood Trends</h3>
            <div className="relative h-48">
                {/* Grid lines */}
                {[0, 25, 50, 75, 100].map((y) => (
                    <div
                        key={y}
                        className="absolute w-full border-t border-gray-200 dark:border-gray-700"
                        style={{ bottom: `${y}%` }}
                    >
            <span className="absolute -left-8 transform -translate-y-1/2 text-xs text-gray-500">
              {y}%
            </span>
                    </div>
                ))}

                {/* Mood points and connections */}
                <div className="absolute inset-0 flex items-stretch justify-between px-8">
                    {chartData.map((point, index) => (
                        <div
                            key={index}
                            className="relative flex-1"
                            style={{ height: "100%" }}
                        >
                            {index < chartData.length - 1 && (
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    style={{
                                        position: "absolute",
                                        top: `${100 - point.value}%`,
                                        left: "50%",
                                        width: "100%",
                                        height: "2px",
                                        background: `linear-gradient(to right, ${point.color}, ${
                                            chartData[index + 1]?.color || point.color
                                        })`,
                                        transformOrigin: "left",
                                    }}
                                />
                            )}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="absolute w-4 h-4 rounded-full cursor-pointer transform -translate-x-1/2 group hover:scale-125 transition-transform"
                                style={{
                                    backgroundColor: point.color,
                                    left: "50%",
                                    top: `${100 - point.value}%`,
                                }}
                            >
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                                        {point.mood}: {point.value}%
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>

                {/* Mood labels */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between px-8 pt-4">
                    {chartData.map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div
                                className="w-3 h-3 rounded-full mb-1"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="text-xs text-gray-600 dark:text-gray-400 transform -rotate-45 origin-top-left">
                {item.mood}
              </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const PCOSRiskChart = ({ pcosReport }) => {
    const [riskLevel, riskCategory] = useMemo(() => {
        if (!pcosReport || typeof pcosReport !== "string") return [0, "Low"];
        try {
            // Extract risk percentage from AI analysis
            const likelihoodMatch = pcosReport.match(/Likelihood:\s*(\d+)%/);
            const percentage = likelihoodMatch ? parseInt(likelihoodMatch[1]) : 0;

            // Determine risk category
            let category = "Low";
            if (percentage >= 75) category = "High";
            else if (percentage >= 40) category = "Moderate";

            return [percentage, category];
        } catch (error) {
            console.error("Error parsing PCOS report:", error);
            return [0, "Low"];
        }
    }, [pcosReport]);

    const circumference = 2 * Math.PI * 60;
    const getRiskColor = (level) => {
        if (level >= 75) return "#EF4444"; // High risk - Red
        if (level >= 40) return "#F59E0B"; // Moderate risk - Yellow
        return "#10B981"; // Low risk - Green
    };

    return (
        <div className="relative h-64 bg-white dark:bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">PCOS Risk Assessment</h3>
            <div className="relative h-48 flex items-center justify-center">
                <div className="relative">
                    <svg className="w-40 h-40 transform -rotate-90">
                        {/* Background circle */}
                        <circle
                            cx="80"
                            cy="80"
                            r="60"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="12"
                        />
                        {/* Risk level circle */}
                        <motion.circle
                            cx="80"
                            cy="80"
                            r="60"
                            fill="none"
                            stroke={getRiskColor(riskLevel)}
                            strokeWidth="12"
                            strokeLinecap="round"
                            initial={{ strokeDasharray: `0 ${circumference}` }}
                            animate={{
                                strokeDasharray: `${
                                    (riskLevel / 100) * circumference
                                } ${circumference}`,
                            }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        />
                        {/* Risk level marker */}
                        <motion.circle
                            cx="80"
                            cy="20"
                            r="4"
                            fill={getRiskColor(riskLevel)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.3 }}
                            className="text-center"
                        >
              <span
                  className="text-4xl font-bold"
                  style={{ color: getRiskColor(riskLevel) }}
              >
                {riskLevel}%
              </span>
                            <span className="block text-sm text-gray-500 mt-1">
                {riskCategory} Risk
              </span>
                        </motion.div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between px-4 mt-4">
                {["Low Risk", "Moderate Risk", "High Risk"].map((label, index) => (
                    <div key={label} className="flex items-center">
                        <div
                            className="w-3 h-3 rounded-full mr-1"
                            style={{
                                backgroundColor: getRiskColor(
                                    index === 0 ? 0 : index === 1 ? 50 : 100
                                ),
                            }}
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-400">
              {label}
            </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const RecommendationCard = ({ title, description, icon: Icon }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md"
    >
        <div className="flex items-start space-x-3">
            <div className="p-2 bg-pink-100 dark:bg-pink-900 rounded-lg">
                <Icon className="h-6 w-6 text-pink-600 dark:text-pink-400" />
            </div>
            <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    {title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {description}
                </p>
            </div>
        </div>
    </motion.div>
);

const Tooltip = ({ children, content }) => (
    <div className="relative group">
        {children}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            {content}
        </div>
    </div>
);

const AnalysisSummaryChart = ({ pcosReport }) => {
    const analysisData = useMemo(() => {
        if (!pcosReport) return null;

        // Extract risk percentage
        const riskMatch = pcosReport.match(/Likelihood:\s*(\d+)%/);
        const riskPercentage = riskMatch ? parseInt(riskMatch[1]) : 0;

        // Determine risk level and color
        const getRiskInfo = (percentage) => {
            if (percentage >= 75)
                return { level: "High", color: "#ef4444", bgColor: "#fee2e2" };
            if (percentage >= 40)
                return { level: "Moderate", color: "#f59e0b", bgColor: "#fef3c7" };
            return { level: "Low", color: "#10b981", bgColor: "#d1fae5" };
        };

        // Extract key findings
        const findingsSection =
            pcosReport.split("## Symptom Analysis")[1]?.split("##")[0] || "";
        const keyFindings = findingsSection
            .split("\n")
            .filter((line) => line.trim().length > 0 && line.includes("**"))
            .map((finding) => {
                const match = finding.match(/\*\*(.*?)\((.*?)\):\*\*(.*)/);
                if (match) {
                    return {
                        symptom: match[1].trim(),
                        severity: match[2].trim(),
                        description: match[3].trim(),
                    };
                }
                return null;
            })
            .filter(Boolean)
            .slice(0, 3);

        const riskInfo = getRiskInfo(riskPercentage);
        return {
            riskPercentage,
            ...riskInfo,
            keyFindings,
        };
    }, [pcosReport]);

    if (!analysisData) return null;

    return (
        <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 h-[400px] flex flex-col">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Analysis Summary
            </h3>

            <div className="flex-1 flex flex-col min-h-0">
                {/* Risk meter section */}
                <div className="mb-4">
                    <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4">
                        <div className="flex items-center justify-center">
                            {/* Risk circle */}
                            <div className="relative w-28 h-28">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle
                                        cx="56"
                                        cy="56"
                                        r="50"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="10"
                                        className="text-gray-200 dark:text-gray-600"
                                    />
                                    <motion.circle
                                        cx="56"
                                        cy="56"
                                        r="50"
                                        fill="none"
                                        stroke={analysisData.color}
                                        strokeWidth="10"
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: analysisData.riskPercentage / 100 }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        style={{
                                            strokeDasharray: `${2 * Math.PI * 50}`,
                                            strokeDashoffset: `${
                                                2 *
                                                Math.PI *
                                                50 *
                                                (1 - analysisData.riskPercentage / 100)
                                            }`,
                                        }}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                      className="text-3xl font-bold"
                      style={{ color: analysisData.color }}
                  >
                    {analysisData.riskPercentage}%
                  </span>
                                    <div className="flex items-center gap-1.5">
                                        <div
                                            className="w-2 h-2 rounded-full"
                                            style={{ backgroundColor: analysisData.color }}
                                        />
                                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {analysisData.level} Risk
                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key findings section */}
                <div className="flex-1 min-h-0 overflow-hidden">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3 px-1">
                        Key Findings
                    </h4>
                    <div className="overflow-y-auto h-[calc(100%-2rem)] space-y-3 pr-2 -mr-2 scroll-smooth">
                        {analysisData.keyFindings.map((finding, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="bg-gray-50 dark:bg-gray-700/30 rounded-lg overflow-hidden"
                            >
                                {/* Finding header */}
                                <div className="p-3 border-b border-gray-100 dark:border-gray-600">
                                    <div className="flex items-start justify-between gap-3">
                                        <h5 className="font-medium text-gray-900 dark:text-gray-100 text-sm">

                                        </h5>
                                        <span
                                            className="px-2.5 py-0.5 rounded-full text-xs font-medium flex-shrink-0 whitespace-nowrap"
                                            style={{
                                                backgroundColor:
                                                    finding.severity.toLowerCase() === "severe"
                                                        ? "#fee2e2"
                                                        : finding.severity.toLowerCase() === "moderate"
                                                            ? "#fef3c7"
                                                            : "#d1fae5",
                                                color:
                                                    finding.severity.toLowerCase() === "severe"
                                                        ? "#ef4444"
                                                        : finding.severity.toLowerCase() === "moderate"
                                                            ? "#f59e0b"
                                                            : "#10b981",
                                            }}
                                        >
                      {finding.severity}
                    </span>
                                    </div>
                                </div>

                                {/* Finding description */}
                                <div className="p-3 bg-white/50 dark:bg-gray-800/50">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed break-words">
                                        {finding.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Scroll fade overlay */}
                <div className="absolute bottom-0 left-0 right-2 h-12 bg-gradient-to-t from-white dark:from-gray-800 to-transparent pointer-events-none" />
            </div>
        </div>
    );
};

export function Diagnosis() {
    const navigate = useNavigate();
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [cycleDuration, setCycleDuration] = useState("");
    const [lastPeriodStart, setLastPeriodStart] = useState("");
    const [lastPeriodDuration, setLastPeriodDuration] = useState("");
    const [moodTypes, setMoodTypes] = useState([]);
    const [moodSeverity, setMoodSeverity] = useState("");
    const [moodDate, setMoodDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [symptomDates, setSymptomDates] = useState({});

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
    const [pcosReport, setPcosReport] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [showHealthTips, setShowHealthTips] = useState(false);
    const [showCharts, setShowCharts] = useState(false);
    const [chartData, setChartData] = useState({
        symptoms: [],
        moods: [],
        riskLevel: 0,
    });
    const [recommendations, setRecommendations] = useState([]);
    const [showTooltips, setShowTooltips] = useState(true);

    useEffect(() => {
        if (pcosReport) {
            setShowCharts(true);
            try {
                // Extract data for charts from the AI report
                const extractedData = {
                    symptoms: symptoms.map((symptom) => ({
                        name: symptom,
                        severity: symptomSeverities[symptom] || "Low",
                    })),
                    moods: moodTypes.map((mood) => ({
                        type: mood,
                        date: moodDate,
                    })),
                    riskLevel:
                        typeof pcosReport === "string" &&
                        pcosReport.match(/Likelihood: (\d+)%/)
                            ? parseInt(pcosReport.match(/Likelihood: (\d+)%/)[1])
                            : 0,
                };
                setChartData(extractedData);
            } catch (error) {
                console.error("Error processing chart data:", error);
                setChartData({
                    symptoms: [],
                    moods: [],
                    riskLevel: 0,
                });
            }
        }
    }, [pcosReport, symptoms, symptomSeverities, moodTypes, moodDate]);

    useEffect(() => {
        if (pcosReport) {
            // Generate recommendations based on the AI report
            const newRecommendations = [
                {
                    title: "Lifestyle Changes",
                    description:
                        "Consider incorporating regular exercise and a balanced diet to manage PCOS symptoms.",
                    icon: ActivitySquare,
                },
                {
                    title: "Medical Consultation",
                    description:
                        "Schedule a visit with your healthcare provider for a comprehensive evaluation.",
                    icon: Stethoscope,
                },
                {
                    title: "Stress Management",
                    description:
                        "Practice mindfulness and stress-reduction techniques to help balance hormones.",
                    icon: Heart,
                },
            ];
            setRecommendations(newRecommendations);
        }
    }, [pcosReport]);

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

    const handleSymptomDateChange = (symptom, date) => {
        setSymptomDates((prevDates) => ({
            ...prevDates,
            [symptom]: date,
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
        if (symptoms.length === 0) {
            setError("Please select at least one symptom");
            return;
        }

        setIsLoading(true);
        setError("");
        setShowCharts(false);
        setPcosReport("");

        try {
            // Format symptoms with severities for better analysis
            const formattedSymptoms = symptoms
                .map((symptom) => {
                    const severity = symptomSeverities[symptom] || "None";
                    return `${symptom} (${severity})`;
                })
                .join("\n- ");

            const prompt = `Analyze the following symptoms for PCOS risk assessment:
- ${formattedSymptoms}

Please provide a structured analysis in the following format:

## Symptom Analysis
[Analyze each symptom's severity and relevance to PCOS]

## Risk Assessment
Likelihood: {X}% (provide a number between 0-100 based on symptoms)
Risk Level: [Low/Moderate/High]

## Severity Levels
[List each symptom with its severity level: None/Mild/Moderate/Severe]

## Recommended Tests
[List recommended medical tests]

## Action Steps
[Provide immediate action steps]`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const analysisText = response.text();

            // Process the AI response
            const processedData = processAIResponse(
                analysisText,
                symptoms,
                symptomSeverities
            );

            setPcosReport(analysisText);
            setChartData(processedData);
            setShowCharts(true);
            setShowHealthTips(true);
        } catch (err) {
            console.error("Error generating report:", err);
            setError("Failed to generate report. Please try again.");
            setShowCharts(false);
            setShowHealthTips(false);
        } finally {
            setIsLoading(false);
        }
    };

    // Helper function to process AI response
    const processAIResponse = (text, symptoms, severities) => {
        try {
            // Extract risk percentage
            const riskMatch = text.match(/Likelihood:\s*(\d+)%/);
            const riskPercentage = riskMatch ? parseInt(riskMatch[1]) : 0;

            // Extract severity levels for each symptom
            const severitySection =
                text.split("## Severity Levels")[1]?.split("##")[0] || "";
            const processedSymptoms = symptoms.map((symptom) => {
                let severity = "None";
                if (severitySection.toLowerCase().includes(symptom.toLowerCase())) {
                    if (
                        severitySection
                            .toLowerCase()
                            .includes(symptom.toLowerCase() + ".*severe")
                    ) {
                        severity = "Severe";
                    } else if (
                        severitySection
                            .toLowerCase()
                            .includes(symptom.toLowerCase() + ".*moderate")
                    ) {
                        severity = "Moderate";
                    } else if (
                        severitySection
                            .toLowerCase()
                            .includes(symptom.toLowerCase() + ".*mild")
                    ) {
                        severity = "Mild";
                    }
                }
                return {
                    name: symptom,
                    severity: severity,
                };
            });

            // Process mood data if available
            const moodData = moodTypes.map((mood) => ({
                type: mood,
                value:
                    mood === "Happy"
                        ? 100
                        : mood === "Energized"
                            ? 90
                            : mood === "Calm"
                                ? 75
                                : mood === "Tired"
                                    ? 50
                                    : mood === "Sad"
                                        ? 25
                                        : mood === "Angry"
                                            ? 0
                                            : 50,
            }));

            return {
                symptoms: processedSymptoms,
                riskLevel: riskPercentage,
                moods: moodData,
            };
        } catch (error) {
            console.error("Error processing AI response:", error);
            return {
                symptoms: symptoms.map((s) => ({ name: s, severity: "None" })),
                riskLevel: 0,
                moods: [],
            };
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
            <SideBar
                sidebarVisible={sidebarVisible}
                setSidebarVisible={setSidebarVisible}
                activeLink={6}
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
                        <h2 className={`text-3xl font-bold text-pink-600 dark:text-pink-400 ${sidebarVisible && width > 816 ? "pl-0" : "pl-10"}`}>
                            PCOS Diagnosis
                        </h2>
                    </div>

                    <div className="bg-pink-50 dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-8">
                        <div className="text-center mb-8">
                            <p className="text-black dark:text-gray-300">Diagnosis</p>
                        </div>

                        {renderSection(
                            <span style={{ color: "#db0085" }}>Symptom Tracking</span>,
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Select Symptoms
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                                        {Object.entries(categorizedSymptoms).map(
                                            ([category, symptomsList]) => (
                                                <div
                                                    key={category}
                                                    className={`dark:bg-gray-900 bg-white rounded-lg shadow p-4 border-l-4 ${
                                                        category === "Menstrual Symptoms"
                                                            ? "border-pink-500"
                                                            : category === "Physical Appearance"
                                                                ? "border-pink-500"
                                                                : category === "Metabolic Signs"
                                                                    ? "border-pink-500"
                                                                    : category === "Mental Health"
                                                                        ? "border-pink-500"
                                                                        : "border-pink-500"
                                                    }`}
                                                >
                                                    <h3 className="text-lg font-semibold text-pink-600 dark:text-pink-300 mb-2">
                                                        {category}
                                                    </h3>
                                                    <div className="space-y-2">
                                                        {symptomsList.map((symptom) => (
                                                            <label
                                                                key={symptom}
                                                                className="flex items-center"
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    checked={symptoms.includes(symptom)}
                                                                    onChange={() => handleSymptomChange(symptom)}
                                                                    className="form-checkbox text-pink-500"
                                                                />
                                                                <span className="ml-2 text-black dark:text-white">
                                  {symptom}
                                </span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>

                                            )
                                        )}
                                    </div>
                                </div>

                                {/*{symptoms.map((symptom) => (
                  <div key={symptom} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {symptom} Severity
                    </label>
                    <select
                      value={symptomSeverities[symptom] || ""}
                      onChange={(e) =>
                        handleSymptomSeverityChange(symptom, e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 dark:bg-gray-700 text-white"
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
                      className="text-black w-full pl-10 pr-3 py-2 border bg-white border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 dark:bg-gray-900 dark:text-white"
                    />
                    <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>,*/}
                                {symptoms.map((symptom) => (
                                    <div key={symptom} className="space-y-4">
                                        {/* Symptom severity */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {symptom} Severity
                                            </label>
                                            <select
                                                value={symptomSeverities[symptom] || ""}
                                                onChange={(e) =>
                                                    handleSymptomSeverityChange(symptom, e.target.value)
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 dark:bg-gray-700 text-white"
                                            >
                                                <option value="">Select Severity</option>
                                                {symptomSeverityOptions.map((severity) => (
                                                    <option key={severity} value={severity}>
                                                        {severity}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Symptom date */}
                                        <div>
                                            <label className="block text-sm font-medium text-white-700 dark:text-gray-300">
                                                Date of {symptom}
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="date"
                                                    value={symptomDates[symptom] || ""}
                                                    onChange={(e) =>
                                                        handleSymptomDateChange(symptom, e.target.value)
                                                    }
                                                    className="text-white w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 dark:bg-gray-700 dark:text-white"
                                                />
                                                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>,
                            "symptomTracking" // ✅ this was missing!
                        )}

                        {isLoading ? (
                            <div className="text-center py-4">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
                                <p className="mt-2 text-pink-600">Analyzing symptoms...</p>
                            </div>
                        ) : error ? (
                            <div className="text-red-500 p-4 rounded bg-red-50 dark:bg-red-900/20">
                                {error}
                            </div>
                        ) : (
                            <>
                                {showCharts && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <SymptomChart
                                            symptoms={chartData.symptoms.map((s) => s.name)}
                                            severities={Object.fromEntries(
                                                chartData.symptoms.map((s) => [s.name, s.severity])
                                            )}
                                        />
                                        <AnalysisSummaryChart pcosReport={pcosReport} />
                                    </div>
                                )}

                                {showHealthTips && pcosReport && (
                                    <div className="mt-8">
                                        <h3 className="text-xl font-semibold mb-4">
                                            AI Analysis Report
                                        </h3>
                                        <div className="prose dark:prose-invert max-w-none">
                                            {pcosReport
                                                .split(/(## .+)/)
                                                .filter(Boolean)
                                                .map((section, index) => (
                                                    <div key={index} className="mb-4">
                                                        {section.startsWith("## ") ? (
                                                            <h2 className="text-xl font-bold text-pink-600 dark:text-pink-400 mb-2">
                                                                {section.replace("## ", "")}
                                                            </h2>
                                                        ) : (
                                                            <div className="text-gray-700 dark:text-gray-300">
                                                                <ReactMarkdown>{section}</ReactMarkdown>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => setShowTooltips(!showTooltips)}
                                className="text-sm text-black bg-white border border-black dark:bg-gray-900 dark:text-white hover:text-pink-600 dark:hover:text-pink-400"
                            >
                                {showTooltips ? "Hide Tooltips" : "Show Tooltips"}
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className={`bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-8 rounded-md text-lg transition duration-300 shadow-md ${
                                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            >
                                {isLoading ? "Analyzing..." : "Generate Analysis"}
                            </button>
                        </div>
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
