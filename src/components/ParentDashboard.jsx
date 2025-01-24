'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { Activity, Bell, Brain, Calendar, ChevronRight, FileText, Heart, Mail, MessageCircle, Moon, Phone, Pill, Play, Plus, Sun, User, Sparkles, TrendingUp, Target, Clock, Award, BarChart2 } from 'lucide-react'

// Animation variants defined inline
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.645, 0.045, 0.355, 1], // Cubic bezier for smooth motion
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.4,
      ease: [0.645, 0.045, 0.355, 1]
    }
  }
}

const cardVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.645, 0.045, 0.355, 1]
    }
  },
  hover: { 
    y: -8,
    transition: {
      duration: 0.3,
      ease: [0.645, 0.045, 0.355, 1]
    }
  },
  tap: { 
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: [0.645, 0.045, 0.355, 1]
    }
  }
}

const listItemVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.645, 0.045, 0.355, 1]
    }
  }
}

// Mock data
const mockChildrenData = [
  {
    id: 1,
    name: 'Sarah',
    age: 13,
    lastPeriod: '2024-01-01',
    nextPeriod: '2025-01-30',
    cycleLength: 28,
    currentPhase: 'Menstrual',
    symptoms: ['Mild cramps', 'Headache'],
    mood: 'Tired',
    sleep: 'Good',
    medications: ['Iron supplement'],
    appointments: [
      { date: '2024-01-15', type: 'Gynecologist Check-up' }
    ],
    healthScore: 85,
    recentUpdates: [
      { date: '2024-01-03', text: 'Logged period start' },
      { date: '2024-01-02', text: 'Completed daily mood tracking' }
    ]
  },
  {
    id: 2,
    name: 'Emily',
    age: 15,
    lastPeriod: '2023-12-25',
    nextPeriod: '2024-01-22',
    cycleLength: 30,
    currentPhase: 'Luteal',
    symptoms: ['Headache'],
    mood: 'Calm',
    sleep: 'Fair',
    medications: ['Multivitamin'],
    appointments: [
      { date: '2024-01-20', type: 'Regular Check-up' }
    ],
    healthScore: 90,
    recentUpdates: [
      { date: '2024-01-03', text: 'Updated symptom tracker' },
      { date: '2024-01-01', text: 'Logged exercise session' }
    ]
  }
]

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
]

const contacts = [
  {
    name: "Dr. Sarah Johnson",
    role: "Primary Gynecologist",
    phone: "+1 (555) 123-4567",
    email: "dr.johnson@example.com",
    available: "24/7",
  },
  {
    name: "City Women's Hospital",
    role: "Emergency Room",
    phone: "+1 (555) 987-6543",
    email: "emergency@cityhospital.com",
    available: "24/7",
  },
  {
    name: "Teen Health Clinic",
    role: "Urgent Care",
    phone: "+1 (555) 456-7890",
    email: "clinic@example.com",
    available: "8AM - 8PM",
  },
]

const cycleData = {
  days: Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    symptoms: Math.random() * 5,
    mood: Math.random() * 5,
    energy: Math.random() * 5
  }))
}

const medications = [
  {
    name: "Iron Supplement",
    schedule: "Daily",
    time: "8:00 AM",
    taken: true
  },
  {
    name: "Vitamin D",
    schedule: "Daily",
    time: "8:00 AM",
    taken: true
  },
  {
    name: "Pain Relief",
    schedule: "As needed",
    time: "When required",
    taken: false
  }
]

const activities = [
  {
    type: "Exercise",
    duration: "30 mins",
    date: "Today",
    completed: true
  },
  {
    type: "Meditation",
    duration: "15 mins",
    date: "Today",
    completed: false
  },
  {
    type: "Water Intake",
    duration: "2L",
    date: "Today",
    completed: true
  }
]

const goals = [
  {
    title: "Regular Exercise",
    progress: 80,
    target: "30 mins daily",
    streak: 5
  },
  {
    title: "Sleep Schedule",
    progress: 90,
    target: "8 hours daily",
    streak: 7
  },
  {
    title: "Symptom Tracking",
    progress: 100,
    target: "Daily logging",
    streak: 10
  }
]


export  function ParentDashboard() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.toggle('dark', darkMode)
  }, [darkMode])

  const renderOverviewCards = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {mockChildrenData.map(child => (
        <motion.div
          key={child.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-pink-100/20"
        >
          <div className="absolute inset-0 bg-grid-pink/5" />
          <div className="relative p-6 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full blur-lg opacity-20 animate-pulse" />
                <div className="relative h-16 w-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center border-2 border-white dark:border-gray-700">
                  <span className="text-xl font-semibold text-white">{child.name[0]}</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  {child.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Age: {child.age}</p>
              </div>
              <div className="ml-auto">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-1 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-900/30"
                >
                  <Sparkles className="h-4 w-4 text-pink-500" />
                  <span className="text-sm font-medium text-pink-700 dark:text-pink-300">
                    {child.healthScore}% Health
                  </span>
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-100/20 dark:border-pink-900/20">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Current Phase</p>
                <p className="text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  {child.currentPhase}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-100/20 dark:border-pink-900/20">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Next Period</p>
                <p className="text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  {child.nextPeriod}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300">Recent Updates</h4>
                <TrendingUp className="h-4 w-4 text-pink-500" />
              </div>
              <div className="space-y-2">
                {child.recentUpdates.map((update, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-pink-100/20 dark:border-pink-900/20"
                  >
                    <Activity className="h-5 w-5 text-pink-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{update.text}</p>
                      <p className="text-xs text-gray-500">{update.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/30 transition-shadow"
              >
                <FileText className="h-4 w-4 mr-2" />
                View Details
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium border border-pink-100 dark:border-pink-900/50 shadow-lg shadow-pink-500/10 hover:shadow-xl hover:shadow-pink-500/20 transition-shadow"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Doctor
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderHealthCards = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {mockChildrenData.map(child => (
        <motion.div
          key={child.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-pink-100/20"
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>{child.name}'s Health</span>
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Mood</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700">
                    {child.mood}
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Sleep</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700">
                    {child.sleep}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Current Symptoms</p>
                <div className="flex flex-wrap gap-2">
                  {child.symptoms.map((symptom, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-700"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>

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

              <motion.div
                className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start space-x-2">
                  <Brain className="h-5 w-5 text-pink-500 mt-1" />
                  <div>
                    <p className="font-medium">Cycle Insights</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {child.name} is in her {child.currentPhase} phase. 
                      Next period expected on {child.nextPeriod}.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderEducationResources = () => (
    <div className="grid gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-pink-100/20"
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Educational Resources</h3>
          <div className="grid gap-4">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <div className="p-2 bg-pink-100 dark:bg-pink-900/20 rounded-lg">
                  <resource.icon className="h-5 w-5 text-pink-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{resource.title}</h4>
                  <div className="flex items-center space-x-3 text-sm text-gray-500">
                    <span>{resource.type}</span>
                    <span>•</span>
                    <span>{resource.duration}</span>
                    <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700">
                      {resource.level}
                    </span>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )

  const renderEmergencyContacts = () => (
    <div className="grid gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-pink-100/20"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Emergency Contacts</h3>
            <button className="inline-flex items-center px-3 py-2 text-sm font-medium bg-pink-500 text-white rounded-md hover:bg-pink-600">
              <Plus className="h-4 w-4 mr-2" />
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
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-pink-100 dark:bg-pink-900/20 rounded-full">
                    <User className="h-5 w-5 text-pink-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">{contact.name}</h4>
                    <p className="text-sm text-gray-500">{contact.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="px-2.5 py-0.5 text-xs font-medium border border-gray-200 dark:border-gray-700 rounded-full">
                    {contact.available}
                  </span>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                    <Phone className="h-4 w-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                    <Mail className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )

  const renderCycleTracking = () => (
    <div className="grid gap-6">
      {/* Main Cycle Overview */}
      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="animate"
        className="grid md:grid-cols-2 gap-6"
      >
        {/* Symptoms Chart */}
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
                      delay: i * 0.02
                    }}
                    className="w-1.5 bg-gradient-to-t from-pink-500 to-purple-600 rounded-full"
                  />
                ))}
              </div>
            </div>
            <div className="mt-4 flex justify-between text-sm text-gray-500">
              <span>Day 1</span>
              <span>Day 15</span>
              <span>Day 30</span>
            </div>
          </div>
        </motion.div>
        {/* Mood Tracking */}
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
                        ease: [0.645, 0.045, 0.355, 1]
                      }}
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: `hsl(${280 + (day.mood * 20)}, 70%, 60%)`
                      }}
                    />
                  </div>
                ))}
              </div>
              <motion.div
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <svg className="w-full h-full">
                  <path
                    d={`M 0 ${32 * 2} ${cycleData.days.map((day, i) => `L ${(i * 100) / 30}% ${100 - (day.mood * 20)}%`).join(' ')}`}
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    className="transition-all duration-300"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#9333ea" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            </div>
            <div className="mt-4 flex justify-between text-sm text-gray-500">
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
            {/* Phase Indicator */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-100/20 dark:border-pink-900/20">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Current Phase</p>
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
              <div className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-100/20 dark:border-pink-900/20">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Days Until Next</p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg font-semibold text-purple-600 dark:text-purple-400"
                >
                  14 Days
                </motion.div>
              </div>
            </div>

            {/* Cycle Calendar */}
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
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                        : 'bg-white/50 dark:bg-gray-800/50 border border-pink-100/20 dark:border-pink-900/20'
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
              {['Cramps', 'Headache', 'Fatigue'].map((symptom, index) => (
                <motion.div
                  key={symptom}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/50<continuation_point>
dark:bg-gray-800/50 border border-pink-100/20 dark:border-pink-900/20"
                >
                  <span className="font-medium">{symptom}</span>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <motion.button
                        key={level}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-2 h-2 rounded-full ${
                          level <= 3
                            ? 'bg-gradient-to-r from-pink-500 to-purple-600'
                            : 'bg-gray-200 dark:bg-gray-700'
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
                { label: 'Sleep Quality', value: 85 },
                { label: 'Energy Level', value: 70 },
                { label: 'Mood Balance', value: 90 }
              ].map((metric, index) => (
                <div key={metric.label} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{metric.label}</span>
                    <span className="text-gray-500">{metric.value}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.value}%` }}
                      transition={{
                        duration: 1,
                        delay: index * 0.2,
                        ease: [0.645, 0.045, 0.355, 1]
                      }}
                      className="h-full bg-gradient-to-r from-pink-500 to-purple-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )

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
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Medication Schedule
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg bg-pink-500 text-white font-medium"
            >
              <Plus className="h-4 w-4" />
            </motion.button>
          </div>
          <div className="space-y-4">
            <LayoutGroup>
              {medications.map((med, index) => (
                <motion.div
                  layout
                  key={index}
                  variants={listItemVariants}
                  className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-pink-100/20 dark:border-pink-900/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                        <Pill className="h-5 w-5 text-pink-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">{med.name}</h4>
                        <p className="text-sm text-gray-500">{med.schedule}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-500">{med.time}</span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`h-6 w-6 rounded-full ${
                          med.taken
                            ? 'bg-green-500'
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}
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
  )

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
                className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-pink-100/20 dark:border-pink-900/20"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                      <Activity className="h-5 w-5 text-pink-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">{activity.type}</h4>
                      <p className="text-sm text-gray-500">{activity.duration}</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`h-6 w-6 rounded-full ${
                      activity.completed
                        ? 'bg-green-500'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )

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
          <div className="grid gap-6">
            {goals.map((goal, index) => (
              <motion.div
                key={index}
                variants={listItemVariants}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{goal.title}</h4>
                    <p className="text-sm text-gray-500">{goal.target}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-pink-500" />
                    <span className="text-sm font-medium">{goal.streak} days</span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${goal.progress}%` }}
                    transition={{
                      duration: 1,
                      ease: [0.645, 0.045, 0.355, 1]
                    }}
                    className="h-full bg-gradient-to-r from-pink-500 to-purple-600"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-pink-100/20 dark:border-pink-900/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full blur-lg opacity-20 animate-pulse" />
                <Heart className="h-8 w-8 text-pink-500 relative" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Parent Dashboard
              </h1>
            </motion.div>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-500"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-500 relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-pink-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.645, 0.045, 0.355, 1]
            }}
            className="flex space-x-1 p-1 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-lg border border-pink-100/20 dark:border-pink-900/20"
          >
            {[
              'overview',
              'health',
              'cycle',
              'medications',
              'activities',
              'goals',
              'education',
              'emergency'
            ].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                    : "text-gray-600 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-pink-900/20"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
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
              {activeTab === 'overview' && renderOverviewCards()}
              {activeTab === 'health' && renderHealthCards()}
              {activeTab === 'cycle' && renderCycleTracking()}
              {activeTab === 'medications' && renderMedications()}
              {activeTab === 'activities' && renderActivities()}
              {activeTab === 'goals' && renderGoals()}
              {activeTab === 'education' && renderEducationResources()}
              {activeTab === 'emergency' && renderEmergencyContacts()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}