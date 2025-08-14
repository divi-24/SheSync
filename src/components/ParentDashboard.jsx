"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  Activity,
  Bell,
  Brain,
  Calendar,
  ChevronRight,
  FileText,
  Heart,
  Mail,
  MessageCircle,
  Moon,
  Phone,
  Pill,
  Play,
  Plus,
  Sun,
  User,
  Sparkles,
  TrendingUp,
  Target,
  Gamepad2,
  Clock,
  Award,
  BarChart2,
  X,
  CheckCircle,
  RefreshCw,
  Apple,
  GraduationCap,
  AlertTriangle,
  Shield,
  BookOpen,
  Video,
  Music,
  Camera,
  MapPin,
  Star,
  Settings,
  Download,
  Share2,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  Filter,
  Search,
  MoreHorizontal,
  ArrowUpRight,
  TrendingDown,
  Zap,
  Smile,
  Frown,
  Meh,
  Info,
} from "lucide-react";
import SideBar from "./SideBar";
import useScreenSize from "../hooks/useScreenSize";

// Animation variants defined inline
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.645, 0.045, 0.355, 1], // Cubic bezier for smooth motion
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: [0.645, 0.045, 0.355, 1],
    },
  },
};

const cardVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.645, 0.045, 0.355, 1],
    },
  },
  hover: {
    y: -8,
    transition: {
      duration: 0.3,
      ease: [0.645, 0.045, 0.355, 1],
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: [0.645, 0.045, 0.355, 1],
    },
  },
};

const listItemVariants = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.645, 0.045, 0.355, 1],
    },
  },
};

// Mock data
const mockChildrenData = [
  {
    id: 1,
    name: "Priya",
    age: 13,
    lastPeriod: "2024-01-01",
    nextPeriod: "2025-01-30",
    cycleLength: 28,
    currentPhase: "Menstrual",
    symptoms: ["Mild cramps", "Headache"],
    mood: "Tired",
    sleep: "Good",
    medications: ["Iron supplement"],
    appointments: [{ date: "2024-01-15", type: "Gynecologist Check-up" }],
    healthScore: 85,
    recentUpdates: [
      { date: "2024-01-03", text: "Logged period start" },
      { date: "2024-01-02", text: "Completed daily mood tracking" },
    ],
    nutritionLog: [
      {
        date: "2024-01-03",
        meals: ["Breakfast", "Lunch", "Dinner"],
        waterIntake: 2000,
        ironRichFoods: true,
      },
      {
        date: "2024-01-02",
        meals: ["Breakfast", "Lunch"],
        waterIntake: 1500,
        ironRichFoods: false,
      },
    ],
    exerciseLog: [
      { date: "2024-01-03", type: "Yoga", duration: 30, intensity: "Low" },
      {
        date: "2024-01-02",
        type: "Walking",
        duration: 45,
        intensity: "Moderate",
      },
    ],
    sleepLog: [
      {
        date: "2024-01-03",
        hours: 8,
        quality: "Good",
        bedtime: "22:00",
        wakeTime: "06:00",
      },
      {
        date: "2024-01-02",
        hours: 7,
        quality: "Fair",
        bedtime: "23:00",
        wakeTime: "06:00",
      },
    ],
    educationProgress: {
      completedModules: ["Menstrual Health Basics", "Nutrition"],
      currentModule: "Exercise & Wellness",
      quizScores: [
        { module: "Menstrual Health Basics", score: 90 },
        { module: "Nutrition", score: 85 },
      ],
    },
    mentalHealth: {
      moodPatterns: [
        {
          date: "2024-01-03",
          mood: "Happy",
          stressLevel: "Low",
          notes: "Had a great day",
        },
        {
          date: "2024-01-02",
          mood: "Anxious",
          stressLevel: "High",
          notes: "School exam",
        },
      ],
      supportResources: [
        { type: "Counselor", name: "Dr. Anjali Sharma", contact: "+91-98765-43210" },
        {
          type: "Support Group",
          name: "Teen Wellness Circle",
          schedule: "Wednesdays 4 PM",
        },
      ],
    },
    notifications: [
      {
        id: 1,
        type: "medication",
        message: "Time for Iron supplement",
        time: "08:00",
      },
      {
        id: 2,
        type: "appointment",
        message: "Upcoming gynecologist appointment",
        date: "2024-01-15",
      },
      {
        id: 3,
        type: "period",
        message: "Period expected in 3 days",
        date: "2024-01-30",
      },
    ],
  },
  {
    id: 2,
    name: "Aisha",
    age: 15,
    lastPeriod: "2023-12-25",
    nextPeriod: "2024-01-22",
    cycleLength: 30,
    currentPhase: "Luteal",
    symptoms: ["Headache"],
    mood: "Calm",
    sleep: "Fair",
    medications: ["Multivitamin"],
    appointments: [{ date: "2024-01-20", type: "Regular Check-up" }],
    healthScore: 90,
    recentUpdates: [
      { date: "2024-01-03", text: "Updated symptom tracker" },
      { date: "2024-01-01", text: "Logged exercise session" },
    ],
    nutritionLog: [
      {
        date: "2024-01-03",
        meals: ["Breakfast", "Lunch", "Dinner"],
        waterIntake: 2200,
        ironRichFoods: true,
      },
      {
        date: "2024-01-02",
        meals: ["Breakfast", "Lunch"],
        waterIntake: 1800,
        ironRichFoods: true,
      },
    ],
    exerciseLog: [
      {
        date: "2024-01-03",
        type: "Swimming",
        duration: 45,
        intensity: "Moderate",
      },
      {
        date: "2024-01-02",
        type: "Stretching",
        duration: 20,
        intensity: "Low",
      },
    ],
    sleepLog: [
      {
        date: "2024-01-03",
        hours: 9,
        quality: "Excellent",
        bedtime: "21:30",
        wakeTime: "06:30",
      },
      {
        date: "2024-01-02",
        hours: 8,
        quality: "Good",
        bedtime: "22:00",
        wakeTime: "06:00",
      },
    ],
    educationProgress: {
      completedModules: ["Understanding Your Body", "Physical Activity"],
      currentModule: "Emotional Wellness",
      quizScores: [
        { module: "Understanding Your Body", score: 95 },
        { module: "Physical Activity", score: 88 },
      ],
    },
    mentalHealth: {
      moodPatterns: [
        {
          date: "2024-01-03",
          mood: "Energetic",
          stressLevel: "Low",
          notes: "Productive day at school",
        },
        {
          date: "2024-01-02",
          mood: "Calm",
          stressLevel: "Low",
          notes: "Relaxing weekend",
        },
      ],
      supportResources: [
        {
          type: "School Counselor",
          name: "Ms. Kavita Patel",
          contact: "+91-98765-43211",
        },
        {
          type: "Support Group",
          name: "Teen Wellness Club",
          schedule: "Mondays 3 PM",
        },
      ],
    },
    notifications: [
      {
        id: 1,
        type: "medication",
        message: "Time for Multivitamin",
        time: "09:00",
      },
      {
        id: 2,
        type: "appointment",
        message: "Regular check-up tomorrow",
        date: "2024-01-20",
      },
    ],
  },
];

const resources = [
  {
    title: "Understanding Your Cycle",
    type: "Video",
    duration: "15 mins",
    level: "Beginner",
    icon: Play,
  },
  {
    title: "Nutrition & Menstrual Health",
    type: "Article",
    duration: "10 mins",
    level: "Intermediate",
    icon: FileText,
  },
  {
    title: "Managing PMS Symptoms",
    type: "Interactive",
    duration: "20 mins",
    level: "Advanced",
    icon: Brain,
  },
];

const contacts = [
  {
    name: "Dr. Priya Desai",
    role: "Primary Gynecologist",
    phone: "+91 (98765) 43210",
    email: "dr.desai@example.com",
    available: "24/7",
  },
  {
    name: "Apollo Women's Hospital",
    role: "Emergency Room",
    phone: "+91 (98765) 43211",
    email: "emergency@apollohospital.com",
    available: "24/7",
  },
  {
    name: "Teen Health Clinic",
    role: "Urgent Care",
    phone: "+91 (98765) 43212",
    email: "clinic@example.com",
    available: "8AM - 8PM",
  },
];

const cycleData = {
  days: Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    symptoms: Math.random() * 5,
    mood: Math.random() * 5,
    energy: Math.random() * 5,
  })),
};

const medications = [
  {
    name: "Iron Supplement",
    schedule: "Daily",
    time: "8:00 AM",
    taken: true,
  },
  {
    name: "Vitamin D",
    schedule: "Daily",
    time: "8:00 AM",
    taken: true,
  },
  {
    name: "Pain Relief",
    schedule: "As needed",
    time: "When required",
    taken: false,
  },
];

const activities = [
  {
    type: "Exercise",
    duration: "30 mins",
    date: "Today",
    completed: true,
  },
  {
    type: "Meditation",
    duration: "15 mins",
    date: "Today",
    completed: false,
  },
  {
    type: "Water Intake",
    duration: "2L",
    date: "Today",
    completed: true,
  },
];

// New data structures for enhanced functionality
const communicationLog = [
  {
    id: 1,
    date: "2024-01-03",
    type: "Doctor Consultation",
    doctor: "Dr. Priya Desai",
    topic: "Period irregularity discussion",
    notes: "Discussed cycle tracking and symptoms",
    followUp: "2024-01-15",
  },
  {
    id: 2,
    date: "2024-01-02",
    type: "School Meeting",
    teacher: "Ms. Kavita Patel",
    topic: "Health education program",
    notes: "Discussed menstrual health awareness",
    followUp: "2024-01-20",
  },
  {
    id: 3,
    date: "2024-01-01",
    type: "Parent-Child Talk",
    topic: "Menstrual health discussion",
    notes: "Open conversation about body changes",
    followUp: "Ongoing",
  },
];

const educationalResources = [
  {
    id: 1,
    title: "Understanding Menstrual Health",
    type: "Video",
    duration: "15 mins",
    level: "Beginner",
    description: "Comprehensive guide to menstrual health basics",
    tags: ["Health", "Education", "Basics"],
    completed: false,
  },
  {
    id: 2,
    title: "Nutrition for Teen Girls",
    type: "Article",
    duration: "10 mins",
    level: "Intermediate",
    description: "Essential nutrition tips for growing teens",
    tags: ["Nutrition", "Health", "Teen"],
    completed: true,
  },
  {
    id: 3,
    title: "Mental Health & Wellness",
    type: "Interactive",
    duration: "20 mins",
    level: "Advanced",
    description: "Managing emotional health during puberty",
    tags: ["Mental Health", "Wellness", "Emotional"],
    completed: false,
  },
];

const healthAlerts = [
  {
    id: 1,
    type: "warning",
    title: "Irregular Cycle Detected",
    message: "Priya's cycle has been irregular for the past 2 months",
    date: "2024-01-03",
    priority: "medium",
  },
  {
    id: 2,
    type: "info",
    title: "Upcoming Health Check",
    message: "Aisha's annual health check is due next week",
    date: "2024-01-02",
    priority: "low",
  },
  {
    id: 3,
    type: "success",
    title: "Health Goal Achieved",
    message: "Priya completed her exercise goal for the week",
    date: "2024-01-01",
    priority: "low",
  },
];

const privacySettings = {
  dataSharing: {
    healthData: true,
    educationalProgress: true,
    mentalHealth: false,
    location: false,
  },
  notifications: {
    healthAlerts: true,
    educationalUpdates: true,
    appointmentReminders: true,
    marketing: false,
  },
  accessControl: {
    doctorAccess: true,
    schoolAccess: false,
    familyAccess: true,
  },
};

const goals = [
  {
    title: "Regular Exercise",
    progress: 80,
    target: "30 mins daily",
    streak: 5,
  },
  {
    title: "Sleep Schedule",
    progress: 90,
    target: "8 hours daily",
    streak: 7,
  },
  {
    title: "Symptom Tracking",
    progress: 100,
    target: "Daily logging",
    streak: 10,
  },
];

const NotificationsPanel = ({ notifications, onClose, onDismiss, onMarkAllRead }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="absolute right-0 top-16 w-96 rounded-lg shadow-xl z-50 bg-pink-50 dark:bg-gray-800"
  >
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-pink-700 dark:text-white">
          Notifications
        </h3>
        <button
          onClick={onClose}
          className="p-1 rounded-md bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      {notifications.length > 0 && (
        <button
          onClick={onMarkAllRead}
          className="mt-2 px-3 py-1 rounded-md bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white text-sm"
        >
          Mark all as read
        </button>
      )}
    </div>
    <div className="max-h-96 overflow-y-auto">
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={`p-4 transition-colors ${
              index < notifications.length - 1 ? 'border-b border-pink-100 dark:border-gray-700' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              {notification.type === "medication" && (
                <Pill className="h-5 w-5 text-blue-500" />
              )}
              {notification.type === "appointment" && (
                <Calendar className="h-5 w-5 text-green-500" />
              )}
              {notification.type === "period" && (
                <Heart className="h-5 w-5 text-pink-500" />
              )}
              <div className="flex-1">
                <p className="text-sm font-medium text-pink-800 dark:text-gray-100">
                  {notification.message}
                </p>
                <p className="text-xs text-pink-500 dark:text-gray-400 mt-1">
                  {notification.time || notification.date}
                </p>
              </div>
              <button
                onClick={() => onDismiss(notification.id)}
                className="p-1 rounded-md bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))
      ) : (
        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
          No new notifications.
        </div>
      )}
    </div>
  </motion.div>
);


const MentalHealthModal = ({ child, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
  >
    <motion.div
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.95 }}
      className="bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-pink-100/20"
    >
      <div className="p-6 space-y-6 text-zinc-800 dark:text-zinc-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Mental Health Tracking
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Mood Patterns */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
            Recent Mood Patterns
          </h3>
          <div className="grid gap-4">
            {child.mentalHealth.moodPatterns.map((entry, index) => (
              <div
                key={index}
                className="p-4 bg-white/70 dark:bg-gray-800/50 rounded-lg border border-pink-100/30 dark:border-pink-900/20"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-500">{entry.date}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      entry.stressLevel === "Low"
                        ? "bg-green-100 text-green-800"
                        : entry.stressLevel === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {entry.stressLevel} Stress
                  </span>
                </div>
                <p className="font-medium">{entry.mood}</p>
                <p className="text-sm text-gray-600 dark:text-zinc-300">
                  {entry.notes}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Support Resources */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
            Support Resources
          </h3>
          <div className="grid gap-4">
            {child.mentalHealth.supportResources.map((resource, index) => (
              <div
                key={index}
                className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg flex justify-between items-start border border-pink-100/30 dark:border-pink-900/30"
              >
                <div>
                  <p className="font-medium">{resource.name}</p>
                  <p className="text-sm text-gray-600 dark:text-zinc-300">
                    {resource.type}
                  </p>
                  {resource.schedule && (
                    <p className="text-sm text-gray-500">{resource.schedule}</p>
                  )}
                </div>
                {resource.contact && (
                  <button className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors">
                    <Phone className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-4 pt-2">
          <button className="flex-1 py-2 px-4 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors font-medium">
            Schedule Counseling
          </button>
          <button className="flex-1 py-2 px-4 border border-pink-600 text-pink-600 rounded-lg hover:bg-pink-50 dark:hover:bg-pink-900/10 transition-colors font-medium">
            View Resources
          </button>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const NutritionModal = ({ child, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
  >
    <motion.div
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.95 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
    >
      <div className="p-6 space-y-6 text-zinc-800 dark:text-zinc-100">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Nutrition Tracking
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Daily Log */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Daily Nutrition Log</h3>
          <div className="grid gap-4">
            {child.nutritionLog.map((log, index) => (
              <div
                key={index}
                className="p-4 bg-white/70 dark:bg-gray-800/50 rounded-xl border border-pink-100/30 dark:border-pink-900/20 space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{log.date}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      log.ironRichFoods
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {log.ironRichFoods ? "Iron-rich diet" : "Low iron intake"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {log.meals.map((meal, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-pink-100 dark:bg-pink-900/20 rounded-md text-xs font-medium"
                    >
                      {meal}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Water Intake:</span>
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                      style={{ width: `${(log.waterIntake / 2500) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm">{log.waterIntake}ml</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-pink-50/70 dark:bg-pink-900/20 rounded-xl p-4 border border-pink-100/20 dark:border-pink-900/30">
          <h3 className="font-semibold mb-3">Nutrition Recommendations</h3>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Include iron-rich foods daily</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">
                Maintain hydration (2000-2500ml daily)
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">
                Balance meals with proteins and vegetables
              </span>
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const EducationProgressModal = ({ child, onClose }) => {
  // Add error handling for undefined data
  if (!child?.educationProgress) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Education Progress</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-300">
                No education progress data available.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto text-zinc-800 dark:text-zinc-100"
      >
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Education Progress
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-gray-800 dark:text-gray-200" />
            </button>
          </div>

          {/* Current Module */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6 rounded-xl shadow-inner">
            <h3 className="text-lg font-semibold mb-2">Current Module</h3>
            <p className="text-xl font-medium">
              {child.educationProgress.currentModule}
            </p>
            <div className="mt-4 inline-flex items-center space-x-2 px-3 py-1 bg-white/10 rounded-full text-white font-medium text-sm">
              <Play className="h-4 w-4 text-white" />
              <span>Continue Learning</span>
            </div>
          </div>

          {/* Completed Modules */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Completed Modules</h3>
            <div className="grid gap-4">
              {child.educationProgress.quizScores.map((module, index) => (
                <div
                  key={index}
                  className="p-4 bg-white/70 dark:bg-gray-800/50 rounded-xl border border-pink-100/30 dark:border-pink-900/20 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{module.module}</p>
                    <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                      <Award className="h-4 w-4 text-yellow-500" />
                      <span>Quiz Score: {module.score}%</span>
                    </div>
                  </div>
                  <button
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none"
                    aria-label="Refresh"
                  >
                    <RefreshCw className="h-4 w-4 text-gray-800 dark:text-gray-200" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Overview */}
          <div className="bg-pink-50/70 dark:bg-pink-900/20 rounded-xl p-4 border border-pink-100/20 dark:border-pink-900/30">
            <h3 className="font-semibold mb-3">Learning Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Overall Progress</span>
                  <span className="font-medium">75%</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-purple-600"
                    style={{ width: "75%" }}
                  />
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>
                  Modules Completed:{" "}
                  {child.educationProgress.completedModules.length}
                </span>
                <span>Total Modules: 6</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// New Modal Components
const PrivacySettingsModal = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
  >
    <motion.div
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.95 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
    >
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Privacy Settings
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Data Sharing */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Data Sharing</h3>
            <div className="space-y-3">
              {Object.entries(privacySettings.dataSharing).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <button
                    className={`w-12 h-6 rounded-full transition-colors ${
                      value ? 'bg-pink-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Notifications</h3>
            <div className="space-y-3">
              {Object.entries(privacySettings.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <button
                    className={`w-12 h-6 rounded-full transition-colors ${
                      value ? 'bg-pink-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Access Control */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Access Control</h3>
            <div className="space-y-3">
              {Object.entries(privacySettings.accessControl).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <button
                    className={`w-12 h-6 rounded-full transition-colors ${
                      value ? 'bg-pink-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const CommunicationLogModal = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
  >
    <motion.div
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.95 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
    >
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Communication Log
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          {communicationLog.map((log) => (
            <div key={log.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{log.type}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{log.date}</p>
                </div>
                <span className="px-2 py-1 bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200 rounded-full text-xs">
                  {log.followUp}
                </span>
              </div>
              <div className="space-y-2">
                <p className="font-medium">{log.topic}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{log.notes}</p>
                {log.doctor && (
                  <p className="text-sm text-gray-500">With: {log.doctor}</p>
                )}
                {log.teacher && (
                  <p className="text-sm text-gray-500">With: {log.teacher}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const HealthAlertsModal = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
  >
    <motion.div
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.95 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
    >
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Health Alerts
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          {healthAlerts.map((alert, index) => (
            <div key={alert.id} className={`p-4 rounded-lg border ${
              alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800' :
              alert.type === 'success' ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' :
              'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
            }`}>
              <div className="flex items-start space-x-3">
                {alert.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-600" />}
                {alert.type === 'success' && <CheckCircle className="h-5 w-5 text-green-600" />}
                {alert.type === 'info' && <Info className="h-5 w-5 text-blue-600" />}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{alert.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-2">{alert.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const EducationalResourcesModal = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
  >
    <motion.div
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.95 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
    >
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Educational Resources
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="grid gap-4">
          {educationalResources.map((resource) => (
            <div key={resource.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{resource.title}</h3>
                    {resource.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{resource.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>{resource.type}</span>
                    <span>•</span>
                    <span>{resource.duration}</span>
                    <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 border border-gray-200 dark:bg-gray-700 dark:border-gray-600 text-gray-600 dark:text-gray-300">
                      {resource.level}
                    </span>
                  </div>
                </div>
                <button className="p-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
                  <Play className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export function ParentDashboard() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedChild, setSelectedChild] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(mockChildrenData[0].notifications);
  const [showMentalHealthModal, setShowMentalHealthModal] = useState(false);
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showNutritionModal, setShowNutritionModal] = useState(false);
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);
  const [showHealthReport, setShowHealthReport] = useState(false);
  const [showCommunicationLog, setShowCommunicationLog] = useState(false);
  const [showEducationalResources, setShowEducationalResources] = useState(false);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showQuickActions, setShowQuickActions] = useState(false);
  
  const handleDismissNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };
  
  const handleMarkAllRead = () => {
    setNotifications([]);
  };
  
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  
  const renderOverviewCards = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {mockChildrenData.map((child) => (
        <motion.div
          key={child.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-pink-100/20"
        >
          <div className="absolute inset-0 bg-grid-pink/5 pointer-events-none" />

          <div className="relative p-6 space-y-6 text-zinc-800 dark:text-zinc-100">
            {/* Header with Avatar, Name, Health */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-pink-100 dark:bg-pink-900/30">
                  <span className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br from-pink-300 to-pink-400 text-white font-semibold text-xl">
                    {child.name[0]}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                    {child.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-zinc-400">
                    Age: {child.age}
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 text-sm font-semibold rounded-full bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300">
                {child.healthScore}% Health
              </span>
            </div>

            {/* Phase Info */}
            <div className="grid grid-cols-2 gap-4">
              {[
                ["Current Phase", child.currentPhase],
                ["Next Period", child.nextPeriod],
              ].map(([label, value], i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg shadow-sm border bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700"
                >
                  <p className="text-sm text-gray-500 dark:text-zinc-400">
                    {label}
                  </p>
                  <p className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Recent Updates */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                  Recent Updates
                </h4>
                <TrendingUp className="h-4 w-4 text-pink-500" />
              </div>
              <div className="space-y-3">
                {child.recentUpdates.map((update, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start justify-between p-4 rounded-lg shadow-sm border bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-pink-100 dark:bg-pink-900/30">
                        <Activity className="h-5 w-5 text-pink-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                          {update.text}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-zinc-400">
                          {update.date}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-500 transition"
              >
                <FileText className="h-4 w-4" />
                View Details
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-white hover:bg-pink-100 text-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200 border border-gray-200 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                <MessageCircle className="h-4 w-4 text-pink-600" />
                Contact Doctor
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderHealthCards = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {mockChildrenData.map((child) => (
        <motion.div
          key={child.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-pink-100/20"
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2 text-zinc-900 dark:text-white">
              <User className="h-5 w-5 text-pink-500" />
              <span>{child.name}'s Health</span>
            </h3>

            <div className="space-y-6 text-zinc-800 dark:text-zinc-100">
              {/* Mood & Sleep */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Mood</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-zinc-700 border border-gray-200 dark:border-zinc-600 text-zinc-700 dark:text-zinc-200">
                    {child.mood}
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Sleep</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-zinc-700 border border-gray-200 dark:border-zinc-600 text-zinc-700 dark:text-zinc-200">
                    {child.sleep}
                  </span>
                </div>
              </div>

              {/* Symptoms */}
              <div>
                <p className="text-sm font-medium mb-2">Current Symptoms</p>
                <div className="flex flex-wrap gap-2">
                  {child.symptoms.map((symptom, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-gray-200 dark:border-zinc-600 text-zinc-700 dark:text-zinc-200 bg-white dark:bg-zinc-800"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>

              {/* Medications */}
              <div>
                <p className="text-sm font-medium mb-2">Medications</p>
                <div className="space-y-2">
                  {child.medications.map((medication, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Pill className="h-4 w-4 text-pink-500" />
                      <span className="text-sm">{medication}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insights */}
              <motion.div
                className="p-4 bg-pink-50/70 dark:bg-pink-900/20 rounded-lg border border-pink-100/30 dark:border-pink-900/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start space-x-2">
                  <Brain className="h-5 w-5 text-pink-500 mt-1" />
                  <div>
                    <p className="font-medium">Cycle Insights</p>
                    <p className="text-sm text-gray-600 dark:text-zinc-300">
                      {child.name} is in her {child.currentPhase} phase. Next
                      period expected on {child.nextPeriod}.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <button
                  onClick={() => {
                    setSelectedChild(child);
                    setShowMentalHealthModal(true);
                  }}
                  className="flex items-center justify-center space-x-2 p-2 bg-white hover:bg-pink-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-lg border border-gray-200 dark:border-zinc-600 transition-colors"
                >
                  <Brain className="h-4 w-4 text-pink-500" />
                  <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                    Mental Health
                  </span>
                </button>

                <button
                  onClick={() => {
                    setSelectedChild(child);
                    setShowNutritionModal(true);
                  }}
                  className="flex items-center justify-center space-x-2 p-2 bg-white hover:bg-pink-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-lg border border-gray-200 dark:border-zinc-600 transition-colors"
                >
                  <Apple className="h-4 w-4 text-pink-500" />
                  <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                    Nutrition
                  </span>
                </button>

                <button
                  onClick={() => {
                    setSelectedChild(child);
                    setShowEducationModal(true);
                  }}
                  className="flex items-center justify-center space-x-2 p-2 bg-white hover:bg-pink-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-lg border border-gray-200 dark:border-zinc-600 transition-colors"
                >
                  <GraduationCap className="h-4 w-4 text-pink-500" />
                  <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                    Education
                  </span>
                </button>

                <button className="flex items-center justify-center space-x-2 p-2 bg-white hover:bg-pink-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-lg border border-gray-200 dark:border-zinc-600 transition-colors">
                  <Calendar className="h-4 w-4 text-pink-500" />
                  <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                    Schedule
                  </span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderEducationResources = () => (
    <div className="grid gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-pink-100/20"
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Educational Resources
          </h3>
          <div className="grid gap-4">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start justify-between p-4 rounded-lg shadow-sm border bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700 transition-colors"
              >
                {/* Left Side */}
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                    <resource.icon className="h-5 w-5 text-pink-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-zinc-800 dark:text-zinc-100 mb-1">
                      {resource.title}
                    </h4>
                    <div className="flex items-center flex-wrap gap-x-2 text-sm text-gray-500 dark:text-zinc-400">
                      <span>{resource.type}</span>
                      <span>•</span>
                      <span>{resource.duration}</span>
                      <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 border border-gray-200 dark:bg-zinc-700 dark:border-zinc-600 text-gray-600 dark:text-zinc-300">
                        {resource.level}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Chevron Button */}
                <button className="p-2 rounded-full bg-white hover:bg-pink-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-gray-200 dark:border-zinc-600 transition-all focus:outline-none focus:ring-2 focus:ring-pink-400">
                  <ChevronRight className="h-4 w-4 text-zinc-700 dark:text-zinc-200" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderEmergencyContacts = () => (
    <div className="grid gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-pink-100/20"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Emergency Contacts
            </h3>
            <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-500 transition">
              <Plus className="w-4 h-4" />
              Add Contact
            </button>
          </div>
          <div className="space-y-4">
            {contacts.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg shadow-sm border bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700"
              >
                {/* Contact Info */}
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-full bg-pink-100 dark:bg-pink-900/30">
                    <User className="h-5 w-5 text-pink-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-zinc-800 dark:text-zinc-100">
                      {contact.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-zinc-400">
                      {contact.role}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full text-gray-600 bg-gray-100 border border-gray-200 dark:text-zinc-300 dark:bg-zinc-700 dark:border-zinc-600">
                    {contact.available}
                  </span>
                  <button className="p-2 rounded-full bg-white hover:bg-pink-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-gray-200 dark:border-zinc-600 transition-all focus:outline-none focus:ring-2 focus:ring-pink-400">
                    <Phone className="w-4 h-4 text-zinc-700 dark:text-zinc-200" />
                  </button>
                  <button className="p-2 rounded-full bg-white hover:bg-pink-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-gray-200 dark:border-zinc-600 transition-all focus:outline-none focus:ring-2 focus:ring-pink-400">
                    <Mail className="w-4 h-4 text-zinc-700 dark:text-zinc-200" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );

const renderCycleTracking = () => (
  <div className="grid gap-6">
    {/* Main Cycle Overview */}
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      className="grid md:grid-cols-2 gap-6"
    >
      {/* Symptom Intensity Chart */}
      <motion.div
        variants={cardVariants}
        whileHover="hover"
        className="relative overflow-hidden bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-pink-100/20"
      >
        <div className="p-6">
          <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
            Symptom Intensity
          </h3>
          <div className="relative h-64">
            <div className="absolute inset-0 flex items-end justify-between px-4">
              {cycleData.days.map((day, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${day.symptoms * 20}%` }}
                  transition={{
                    duration: 0.6,
                    ease: [0.645, 0.045, 0.355, 1],
                    delay: i * 0.02,
                  }}
                  className="w-1.5 bg-gradient-to-t from-pink-500 to-purple-600 rounded-full"
                />
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-between text-sm text-gray-600 dark:text-zinc-400">
            <span>Day 1</span>
            <span>Day 15</span>
            <span>Day 30</span>
          </div>
        </div>
      </motion.div>

      {/* Mood Patterns Chart */}
      <motion.div
        variants={cardVariants}
        whileHover="hover"
        className="relative overflow-hidden bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-pink-100/20"
      >
        <div className="p-6">
          <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
            Mood Patterns
          </h3>
          <div className="relative h-64">
            <div className="absolute inset-0 flex items-center justify-between px-4">
              {cycleData.days.map((day, i) => (
                <div key={i} className="h-full flex items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.03,
                      ease: [0.645, 0.045, 0.355, 1],
                    }}
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: `hsl(${
                        280 + day.mood * 20
                      }, 70%, 60%)`,
                    }}
                  />
                </div>
              ))}
            </div>
            {/* Mood Line Path */}
            <motion.div
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <svg className="w-full h-full">
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#9333ea" />
                  </linearGradient>
                </defs>
                <path
                  d={`M 0 ${32 * 2} ${cycleData.days
                    .map(
                      (day, i) =>
                        `L ${(i * 100) / 30}% ${100 - day.mood * 20}%`
                    )
                    .join(" ")}`}
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  className="transition-all duration-300"
                />
              </svg>
            </motion.div>
          </div>
          <div className="mt-4 flex justify-between text-sm text-gray-600 dark:text-zinc-400">
            <span>Morning</span>
            <span>Afternoon</span>
            <span>Evening</span>
          </div>
        </div>
      </motion.div>
    </motion.div>

    {/* Cycle Analysis */}
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      className="relative overflow-hidden bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-pink-100/20"
    >
      <div className="p-6">
        <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
          Cycle Analysis
        </h3>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Phase Indicators */}
          <div className="space-y-4">
            {/* Current Phase */}
            <div className="p-4 rounded-lg shadow-sm border bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700">
              <p className="text-sm font-medium text-gray-600 dark:text-zinc-300 mb-1">
                Current Phase
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur-lg opacity-20" />
                <p className="text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Follicular
                </p>
              </motion.div>
            </div>

            {/* Days Until Next */}
            <div className="p-4 rounded-lg shadow-sm border bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700">
              <p className="text-sm font-medium text-gray-600 dark:text-zinc-300 mb-1">
                Days Until Next
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg font-semibold text-purple-600 dark:text-purple-400"
              >
                14 Days
              </motion.div>
            </div>
          </div>

          {/* Calendar */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 28 }, (_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium ${
                    i === 0
                      ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md"
                      : "bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 border border-gray-200 dark:border-zinc-700 hover:bg-pink-50 dark:hover:bg-zinc-800 transition"
                  }`}
                >
                  {i + 1}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>

    {/* Symptoms & Wellness */}
    <div className="grid md:grid-cols-2 gap-6">
      {/* Symptom Log */}
      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="animate"
        className="relative overflow-hidden bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-pink-100/20"
      >
        <div className="p-6">
          <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
            Recent Symptoms
          </h3>
          <div className="space-y-4">
            {["Cramps", "Headache", "Fatigue"].map((symptom, index) => (
              <motion.div
                key={symptom}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700"
              >
                <span className="font-medium text-zinc-800 dark:text-zinc-100">
                  {symptom}
                </span>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <motion.button
                      key={level}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        level <= 3
                          ? "bg-gradient-to-r from-pink-500 to-purple-600"
                          : "bg-gray-200 dark:bg-zinc-700"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Wellness Score */}
      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="animate"
        className="relative overflow-hidden bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-pink-100/20"
      >
        <div className="p-6">
          <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
            Wellness Metrics
          </h3>
          <div className="space-y-6">
            {[
              { label: "Sleep Quality", value: 85, trend: "up" },
              { label: "Energy Level", value: 70, trend: "down" },
              { label: "Mood Balance", value: 90, trend: "up" },
              { label: "Mental Wellness", value: 80, trend: "stable" },
            ].map((metric, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                  {metric.label}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold">{metric.value}%</span>
                  {metric.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                  {metric.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                  {metric.trend === "stable" && <BarChart2 className="h-4 w-4 text-blue-500" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

  const renderMedications = () => (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="grid gap-6"
    >
      <motion.div
        variants={cardVariants}
        className="relative overflow-hidden bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-pink-100/20"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Medication Schedule
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-500 transition"
            >
              <Plus className="h-4 w-4" />
            </motion.button>
          </div>

          {/* Medication List */}
          <div className="space-y-4">
            <LayoutGroup>
              {medications.map((med, index) => (
                <motion.div
                  layout
                  key={index}
                  variants={listItemVariants}
                  className="p-4 rounded-lg shadow-sm border bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700"
                >
                  <div className="flex items-center justify-between">
                    {/* Left: Icon + Info */}
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                        <Pill className="h-5 w-5 text-pink-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-zinc-800 dark:text-zinc-100">
                          {med.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-zinc-400">
                          {med.schedule}
                        </p>
                      </div>
                    </div>

                    {/* Right: Time + Taken Button */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 dark:text-zinc-300">
                        {med.time}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`h-6 w-6 rounded-full border transition-all duration-200 ${
                          med.taken
                            ? "bg-green-500 border-green-500"
                            : "bg-gray-100 dark:bg-zinc-700 border-gray-300 dark:border-zinc-600"
                        }`}
                        aria-label={med.taken ? "Taken" : "Mark as taken"}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </LayoutGroup>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderActivities = () => (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="grid gap-6"
    >
      <motion.div
        variants={cardVariants}
        className="relative overflow-hidden bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-pink-100/20"
      >
        <div className="p-6">
          <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
            Daily Activities
          </h3>

          <div className="space-y-4">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                variants={listItemVariants}
                className="p-4 rounded-lg shadow-sm border bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700"
              >
                <div className="flex items-center justify-between">
                  {/* Left Side: Icon + Info */}
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-pink-100 dark:bg-pink-900/30">
                      <Activity className="h-5 w-5 text-pink-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-zinc-800 dark:text-zinc-100">
                        {activity.type}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-zinc-400">
                        {activity.duration}
                      </p>
                    </div>
                  </div>

                  {/* Completion Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`h-6 w-6 rounded-full border transition-all duration-200 ${
                      activity.completed
                        ? "bg-green-500 border-green-500"
                        : "bg-gray-100 dark:bg-zinc-700 border-gray-300 dark:border-zinc-600"
                    }`}
                    aria-label={
                      activity.completed ? "Completed" : "Mark as complete"
                    }
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderGoals = () => (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="grid gap-6"
    >
      <motion.div
        variants={cardVariants}
        className="relative overflow-hidden bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-pink-100/20"
      >
        <div className="p-6">
          <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
            Wellness Goals
          </h3>

          <div className="grid gap-4">
            {goals.map((goal, index) => (
              <motion.div
                key={index}
                variants={listItemVariants}
                className="flex flex-col gap-2 p-4 rounded-lg shadow-sm border bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700"
              >
                <div className="flex items-center justify-between">
                  {/* Goal Info */}
                  <div>
                    <h4 className="font-medium text-zinc-800 dark:text-zinc-100">
                      {goal.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-zinc-400">
                      {goal.target}
                    </p>
                  </div>

                  {/* Streak Info */}
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-pink-500" />
                    <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                      {goal.streak} days
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-2 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${goal.progress}%` }}
                    transition={{
                      duration: 1,
                      ease: [0.645, 0.045, 0.355, 1],
                    }}
                    className="h-full bg-gradient-to-r from-pink-400 to-pink-600"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  // New render functions for enhanced functionality
  const renderQuickActions = () => (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="grid gap-6"
    >
      <motion.div
        variants={cardVariants}
        className="relative overflow-hidden bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-pink-100/20"
      >
        <div className="p-6">
          <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
            Quick Actions
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Shield, label: "Privacy Settings", action: () => setShowPrivacySettings(true) },
              { icon: MessageCircle, label: "Communication Log", action: () => setShowCommunicationLog(true) },
              { icon: AlertTriangle, label: "Health Alerts", action: () => setShowHealthReport(true) },
              { icon: BookOpen, label: "Educational Resources", action: () => setShowEducationalResources(true) },
              { icon: Download, label: "Export Data", action: () => console.log("Export data") },
              { icon: Share2, label: "Share Report", action: () => console.log("Share report") },
              { icon: Settings, label: "Settings", action: () => console.log("Settings") },
              { icon: Eye, label: "Privacy Mode", action: () => setPrivacyMode(!privacyMode) },
            ].map((action, index) => (
              <motion.button
                key={index}
                onClick={action.action}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-700 hover:bg-pink-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <div className="flex flex-col items-center space-y-2">
                  <action.icon className="h-6 w-6 text-pink-500" />
                  <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100 text-center">
                    {action.label}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderHealthAlerts = () => (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="grid gap-6"
    >
      <motion.div
        variants={cardVariants}
        className="relative overflow-hidden bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-pink-100/20"
      >
        <div className="p-6">
          <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
            Health Alerts & Insights
          </h3>

          <div className="space-y-4">
            {healthAlerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border ${
                  alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800' :
                  alert.type === 'success' ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' :
                  'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
                }`}
              >
                <div className="flex items-start space-x-3">
                  {alert.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-600" />}
                  {alert.type === 'success' && <CheckCircle className="h-5 w-5 text-green-600" />}
                  {alert.type === 'info' && <Info className="h-5 w-5 text-blue-600" />}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{alert.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-2">{alert.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderAnalytics = () => (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="grid gap-6"
    >
      <div className="grid md:grid-cols-2 gap-6">
        {/* Mood Trends */}
        <motion.div
          variants={cardVariants}
          className="relative overflow-hidden bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-pink-100/20"
        >
          <div className="p-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
              Mood Trends
            </h3>
            <div className="flex items-center justify-center space-x-4">
              <div className="text-center">
                <Smile className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-300">Happy</p>
                <p className="text-lg font-semibold">60%</p>
              </div>
              <div className="text-center">
                <Meh className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-300">Neutral</p>
                <p className="text-lg font-semibold">25%</p>
              </div>
              <div className="text-center">
                <Frown className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-300">Sad</p>
                <p className="text-lg font-semibold">15%</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Health Metrics */}
        <motion.div
          variants={cardVariants}
          className="relative overflow-hidden bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-pink-100/20"
        >
          <div className="p-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
              Health Metrics
            </h3>
            <div className="space-y-4">
              {[
                { label: "Sleep Quality", value: 85, trend: "up" },
                { label: "Exercise Consistency", value: 70, trend: "down" },
                { label: "Nutrition Score", value: 90, trend: "up" },
                { label: "Mental Wellness", value: 80, trend: "stable" },
              ].map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                    {metric.label}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold">{metric.value}%</span>
                    {metric.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                    {metric.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                    {metric.trend === "stable" && <BarChart2 className="h-4 w-4 text-blue-500" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  const renderHeader = () => (
    <header className="sticky top-0 z-10 backdrop-blur-xl bg-white/90 dark:bg-gray-900/80 border-b border-pink-100/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-300 to-pink-400 rounded-full blur-lg opacity-30 animate-pulse" />
              <Heart className="h-8 w-8 text-pink-400 relative" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-pink-500 bg-clip-text text-transparent">
              Parent's Dashboard
            </h2>
          </motion.div>
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="all">All</option>
                <option value="health">Health</option>
                <option value="education">Education</option>
                <option value="mental">Mental Health</option>
                <option value="nutrition">Nutrition</option>
              </select>
            </div>

            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full bg-pink-50 hover:bg-pink-100 dark:bg-pink-900/30 text-pink-400"
              >
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-pink-400 rounded-full flex items-center justify-center text-xs text-white">
                    {notifications.length}
                  </span>
                )}
              </motion.button>
              <AnimatePresence>
                {showNotifications && (
                  <NotificationsPanel
                    notifications={notifications}
                    onClose={() => setShowNotifications(false)}
                    onDismiss={handleDismissNotification}
                    onMarkAllRead={handleMarkAllRead}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  const { width } = useScreenSize();

  return (
    <div className={`flex h-screen dark:bg-[#111827]`}>
      <SideBar
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        activeLink={11}
      />
      {width > 816 && (
        <button
          onClick={toggleSidebar}
          className="fixed left-0 top-0 w-10 z-50 p-2 bg-pink-600 text-white rounded-r-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
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

      <main
        className={`flex-1 p-6 overflow-auto bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out ${
          sidebarVisible ? "ml-64" : "ml-0"
        }`}
      >
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
          {renderHeader()}
          <main className="container mx-auto px-4 py-8">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.645, 0.045, 0.355, 1],
                }}
                className="flex flex-wrap space-x-1 p-1 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-lg border border-pink-100/20 dark:border-pink-900/20"
              >
                {[
                  "overview",
                  "health",
                  "cycle",
                  "medications",
                  "activities",
                  "goals",
                  "education",
                  "emergency",
                  "alerts",
                  "analytics",
                  "quick-actions",
                ].map((tab) => (
                  <motion.button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-pink-300 to-pink-400 text-white shadow-lg"
                        : "text-gray- bg-white text-black dark:bg-[#111827] dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-pink-900/20"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
                  </motion.button>
                ))}
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageTransition}
                >
                  {activeTab === "overview" && renderOverviewCards()}
                  {activeTab === "health" && renderHealthCards()}
                  {activeTab === "cycle" && renderCycleTracking()}
                  {activeTab === "medications" && renderMedications()}
                  {activeTab === "activities" && renderActivities()}
                  {activeTab === "goals" && renderGoals()}
                  {activeTab === "education" && renderEducationResources()}
                  {activeTab === "emergency" && renderEmergencyContacts()}
                  {activeTab === "alerts" && renderHealthAlerts()}
                  {activeTab === "analytics" && renderAnalytics()}
                  {activeTab === "quick-actions" && renderQuickActions()}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
          <AnimatePresence>
            {showMentalHealthModal && selectedChild && (
              <MentalHealthModal
                child={selectedChild}
                onClose={() => setShowMentalHealthModal(false)}
              />
            )}
            {showNutritionModal && selectedChild && (
              <NutritionModal
                child={selectedChild}
                onClose={() => setShowNutritionModal(false)}
              />
            )}
            {showEducationModal && selectedChild && (
              <EducationProgressModal
                child={selectedChild}
                onClose={() => setShowEducationModal(false)}
              />
            )}
            {showPrivacySettings && (
              <PrivacySettingsModal
                onClose={() => setShowPrivacySettings(false)}
              />
            )}
            {showCommunicationLog && (
              <CommunicationLogModal
                onClose={() => setShowCommunicationLog(false)}
              />
            )}
            {showHealthReport && (
              <HealthAlertsModal
                onClose={() => setShowHealthReport(false)}
              />
            )}
            {showEducationalResources && (
              <EducationalResourcesModal
                onClose={() => setShowEducationalResources(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}