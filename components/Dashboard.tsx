'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  MessageSquare,
  HeartHandshake,
  HeartPulse,
  GraduationCap,
  ShoppingBag,
  ActivitySquare,
  ClipboardList,
  Stethoscope,
  Bot,
  ChevronRight,
  Bell,
  Calendar,
  Heart,
  Moon,
  Sun,
  Droplet,
  Handshake,
  Utensils,
  Smile,
  Frown,
  Meh,
  ThermometerSun,
  Gamepad2,
  Zap,
  Coffee,
  Dumbbell,
  BookOpen,
  AlertCircle,
  CheckCircle,
  X,
  ToggleLeft,
  ToggleRight,
  Lock,
  Unlock,
  AlertTriangle,
  AppWindowMac,
  RefreshCw,
  Clock,
} from "lucide-react";
import { apiWithFallback } from "../utils/api";
import { PrivacyForm } from "./PrivacyForm";
import { useAuth, useUser } from '@clerk/nextjs';
import SideBar from "./SideBar";
import useScreenSize from "../hooks/useScreenSize";

// Try multiple server URLs in case one is down
const render_url = "https://shesync.onrender.com/";
const server_url = process.env.NEXT_PUBLIC_SERVER_URL || render_url;
const local_url = "http://localhost:3000/";

export function Dashboard() {
  const router = useRouter();
  
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/login");
    }
  }, [isSignedIn, router]);

  const [waterIntake, setWaterIntake] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showMythModal, setShowMythModal] = useState(false);
  const [currentMyth, setCurrentMyth] = useState<any>(null);
  const [periodData, setPeriodData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [selectedData, setSelectedData] = useState({
    cycleInfo: true,
    moodData: true,
    sleepData: true,
    symptomsData: true,
    wellnessData: true,
  });
  const [showPrivacyForm, setShowPrivacyForm] = useState(false);

  const fallbackData = {
    cycleDuration: 28,
    lastPeriodStart: new Date(
      Date.now() - 15 * 24 * 60 * 60 * 1000
    ).toISOString(),
    lastPeriodDuration: 5,
    moodTypes: ["Happy", "Anxious", "Irritable"],
    moodSeverity: "Moderate",
    moodDate: new Date().toISOString(),
    symptoms: ["Cramps", "Bloating", "Headache"],
    symptomSeverities: {
      Cramps: "Severe",
      Bloating: "Moderate",
      Headache: "Mild",
    },
    symptomDate: new Date().toISOString(),
    sleepDuration: 7.5,
    sleepQuality: "Good",
    nextPeriodPrediction: new Date(
      Date.now() + 13 * 24 * 60 * 60 * 1000
    ).toISOString(),
    currentPhase: "Luteal",
  };

  const fetchPeriodData = async () => {
    if (!isSignedIn || !user) {
      setError("You must be signed in to view this page.");
      setLoading(false);
      return;
    }

    setLoading(true);
    const userId = user.id;

    try {
      const response = await apiWithFallback(`/api/period/periodtracking/${userId}`, {
        method: 'GET',
      });
      
      console.log("Data received:", response.data);
      setPeriodData(response.data.periodTrackingData);
      setWaterIntake(response.data.periodTrackingData.waterIntakeCount || 0);
      setError(null);
    } catch (error: any) {
      console.error("Error fetching period data:", error);
      setPeriodData(fallbackData);
      setWaterIntake(0);
      setError("Unable to connect to the server. Using sample data for demonstration purposes. Please check your internet connection and try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeriodData();
  }, [isSignedIn, user]);

  useEffect(() => {
    const notificationInterval = setInterval(() => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    }, 30000);
    return () => clearInterval(notificationInterval);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarVisible(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleWaterIntake = async () => {
    if (!isSignedIn || !user) return;
    
    if (waterIntake < 8) {
      setWaterIntake((prev) => Math.min(prev + 1, 8));
      try {
        await apiWithFallback(`/api/period/waterupdate/${user.id}`, {
          method: 'GET',
        });
        console.log("Water intake logged");
      } catch (error) {
        console.error("Error updating water intake:", error);
      }
    }
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const toggleDataSelection = (dataType: string) => {
    setSelectedData((prev) => ({
      ...prev,
      [dataType]: !prev[dataType],
    }));
  };

  const handleSavePrivacySettings = (settings: any) => {
    console.log("Privacy settings saved:", settings);
    setShowPrivacyForm(false);
  };

  const sendSOSEmails = async () => {
    const formspreeEndpoints = [
      "https://formspree.io/f/mqaagdkg",
      "https://formspree.io/f/xyzzbdzo",
      "https://formspree.io/f/mbllpado",
    ];

    const emailBody = {
      subject: "SOS Alert",
      message: `This is an SOS alert generated by ${user?.fullName || 'a user'} from the SheSync app.`,
    };

    try {
      const promises = formspreeEndpoints.map((endpoint) =>
        fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailBody),
        })
      );

      await Promise.all(promises);
      alert("SOS alerts sent successfully!");
    } catch (error) {
      console.error("Error sending SOS alerts:", error);
      alert("Failed to send SOS alerts. Please try again.");
    }
  };

  const myths = [
    {
      myth: "You can't get pregnant during your period.",
      fact: "While it's less likely, you can still get pregnant during your period, especially if you have a shorter menstrual cycle.",
    },
    {
      myth: "PMS is all in your head.",
      fact: "PMS is a real medical condition caused by hormonal changes during the menstrual cycle.",
    },
    {
      myth: "Irregular periods always indicate a serious problem.",
      fact: "While irregular periods can sometimes signal health issues, they can also be caused by stress, diet, or exercise changes.",
    },
    {
      myth: "You shouldn't exercise during your period.",
      fact: "Exercise can actually help alleviate period symptoms like cramps and mood swings.",
    },
    {
      myth: "Using tampons can cause you to lose your virginity.",
      fact: "Using tampons does not affect virginity, which is about sexual intercourse, not physical changes to the body.",
    },
  ];

  const openMythModal = (myth: any) => {
    setCurrentMyth(myth);
    setShowMythModal(true);
  };

  if (loading) {
    return <div>Fetching your Data...</div>;
  }

  if (!isSignedIn) {
    return <div>Sign in Required</div>;
  }

  if (!periodData) {
    return <div>No period data found. Please complete your profile.</div>;
  }

  const cycleDay =
    (Math.floor(
      (new Date().getTime() - new Date(periodData.lastPeriodStart).getTime()) /
        (1000 * 60 * 60 * 24)
    ) %
      periodData.cycleDuration) +
    1;
  const daysUntilNextPeriod = periodData.cycleDuration - cycleDay;
  const fertileWindow = cycleDay >= 11 && cycleDay <= 17;
  const pmsLikely = periodData.currentPhase === "Luteal" && cycleDay > 21;
  const wellRested =
    periodData.sleepQuality === "Good" && periodData.sleepDuration >= 7;

  const getHealthTips = () => {
    const tips = [
      "Stay hydrated! Aim for 8 glasses of water a day.",
      "Practice deep breathing exercises for stress relief.",
      "Incorporate more leafy greens into your diet for iron.",
      "Try a warm compress for cramp relief.",
      "Get moving with light exercise like yoga or walking.",
    ];
    return tips.slice(0, 3);
  };

  const healthTips = getHealthTips();
  const { width } = useScreenSize();

  return (
    <div className={`flex h-screen`}>
      <style jsx global>{`
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes slideIn {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(0);
          }
        }
        @keyframes slideOut {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-100%);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        :root {
          --background: 255, 255, 255;
          --foreground: 33, 33, 33;
          --primary: 255, 105, 180;
          --primary-foreground: 0, 0, 0;
          --card: 255, 255, 255;
          --card-foreground: 0, 0, 0;
          --muted: 240, 240, 240;
          --muted-foreground: 75, 75, 75;
        }
        .dark {
          --background: 23, 23, 23;
          --foreground: 255, 255, 255;
          --primary: 255, 105, 180;
          --primary-foreground: 255, 255, 255;
          --card: 38, 38, 38;
          --card-foreground: 255, 255, 255;
          --muted: 50, 50, 50;
          --muted-foreground: 150, 150, 150;
        }
        body {
          background-color: rgb(var(--background));
          color: rgb(var(--foreground));
        }
      `}</style>
      
      <SideBar
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        activeLink={0}
      />
      
      {width > 816 && (
        <button
          onClick={toggleSidebar}
          className="fixed left-0 top-0 w-10 z-10 p-2 bg-pink-600 text-white rounded-r-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
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
          sidebarVisible ? "md:ml-[240px]" : "ml-0"
        }`}
      >
        <div className="max-w-6xl mx-auto space-y-6">
          {error && (
            <div className="border-l-4 p-4 mb-4 rounded shadow-md bg-yellow-100 border-yellow-500 text-yellow-700" role="alert">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <p className="font-bold">Connection Status</p>
                </div>
                <button 
                  onClick={() => {
                    setLoading(true);
                    setError(null);
                    fetchPeriodData();
                  }}
                  className="px-3 py-1 bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors flex items-center"
                >
                  <RefreshCw size={16} className="mr-1" /> Retry Connection
                </button>
              </div>
              <p className="mt-2">{error}</p>
            </div>
          )}
          
          <div className="flex items-center justify-between p-4 bg-pink-100 shadow-md">
            <h2 className="text-lg text-pink-600 font-bold">Dashboard</h2>
            <div className="flex items-center gap-4">
              <Bell className="h-5 w-5 text-gray-600" />
              <button
                onClick={() => setShowPrivacyForm(!showPrivacyForm)}
                className="p-2 rounded-full bg-gray-100 text-gray-600 transition-transform hover:scale-110"
              >
                {showPrivacyForm ? <Unlock size={20} /> : <Lock size={20} />}
              </button>
              <button
                onClick={sendSOSEmails}
                className="p-2 rounded-full bg-red-500 text-white transition-transform hover:scale-110"
              >
                <AlertTriangle size={20} />
              </button>
            </div>
          </div>

          <div className="flex space-x-2 mb-4">
            <TabButton
              active={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </TabButton>
            <TabButton
              active={activeTab === "insights"}
              onClick={() => setActiveTab("insights")}
            >
              Insights
            </TabButton>
            <TabButton
              active={activeTab === "mythbusters"}
              onClick={() => setActiveTab("mythbusters")}
            >
              MythBusters
            </TabButton>
          </div>

          {showPrivacyForm && (
            <Card className="mb-6">
              <PrivacyForm onSave={handleSavePrivacySettings} />
            </Card>
          )}

          {activeTab === "overview" && (
            <>
              <Card className="overflow-hidden">
                <div className="relative h-32 bg-gradient-to-r from-pink-300 to-purple-400 dark:from-pink-600 dark:to-purple-700">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-3xl font-bold text-white">
                      Cycle Day {cycleDay}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-lg font-semibold mb-2">
                    Current Phase: {periodData.currentPhase}
                  </p>
                  <p className="text-sm text-gray-600">
                    {daysUntilNextPeriod} days until next period
                  </p>
                  <div className="mt-4 h-2 bg-pink-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-pink-500"
                      style={{
                        width: `${
                          (cycleDay / periodData.cycleDuration) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatedCard
                  title="Mood"
                  value={periodData.moodTypes[0]}
                  icon={getMoodIcon(periodData.moodTypes[0])}
                />
                <AnimatedCard
                  title="Sleep Quality"
                  value={periodData.sleepQuality}
                  icon={<Moon className="h-6 w-6" />}
                />
                <AnimatedCard
                  title="Active Symptoms"
                  value={periodData.symptoms.length}
                  icon={<ThermometerSun className="h-6 w-6" />}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <h3 className="font-semibold mb-4">Daily Health Tips</h3>
                  <ul className="space-y-2">
                    {healthTips.map((tip, index) => (
                      <li
                        key={index}
                        className="flex items-start animate-float"
                        style={{ animationDelay: `${index * 0.2}s` }}
                      >
                        <Utensils className="h-5 w-5 text-pink-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
                <Card>
                  <h3 className="font-semibold mb-4">Water Intake Tracker</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span>Goal: 8 glasses</span>
                    <span>{waterIntake} / 8</span>
                  </div>
                  <div className="h-4 bg-pink-200 rounded-full overflow-hidden mb-4">
                    <div
                      className="h-full bg-pink-500"
                      style={{ width: `${(waterIntake / 8) * 100}%` }}
                    ></div>
                  </div>
                  <button
                    onClick={handleWaterIntake}
                    className="w-full py-2 px-4 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
                  >
                    Log Water Intake
                  </button>
                </Card>
              </div>

              <Card>
                <h3 className="font-semibold mb-4">Wellness Tracker</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <WellnessItem
                    title="Energy"
                    value={periodData.moodSeverity}
                    icon={<Zap className="h-5 w-5" />}
                  />
                  <WellnessItem
                    title="Stress"
                    value={
                      periodData.moodSeverity === "Moderate"
                        ? "Low"
                        : "Moderate"
                    }
                    icon={<Coffee className="h-5 w-5" />}
                  />
                  <WellnessItem
                    title="Exercise"
                    value="30 min"
                    icon={<Dumbbell className="h-5 w-5" />}
                  />
                </div>
              </Card>

              <Card>
                <h3 className="font-semibold mb-4">Upcoming Events</h3>
                <ul className="space-y-2">
                  <EventItem
                    title="Doctor's Appointment"
                    date="Tomorrow, 10:00 AM"
                  />
                  <EventItem title="Yoga Class" date="Wednesday, 6:00 PM" />
                  <EventItem
                    title="Period Start Date"
                    date={`In ${daysUntilNextPeriod} days`}
                  />
                </ul>
              </Card>
            </>
          )}

          {activeTab === "insights" && (
            <>
              <Card>
                <h3 className="font-semibold mb-4">Health Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InsightItem
                    title="Fertility Window"
                    value={fertileWindow ? "Active" : "Inactive"}
                    icon={<Calendar className="h-5 w-5 text-pink-500" />}
                  />
                  <InsightItem
                    title="PMS Likelihood"
                    value={pmsLikely ? "High" : "Low"}
                    icon={<ActivitySquare className="h-5 w-5 text-pink-500" />}
                  />
                  <InsightItem
                    title="Rest Status"
                    value={wellRested ? "Well Rested" : "Need More Rest"}
                    icon={<Moon className="h-5 w-5 text-pink-500" />}
                  />
                </div>
              </Card>

              <Card>
                <h3 className="font-semibold mb-4">Cycle Analysis</h3>
                <div className="space-y-4">
                  <p>Your cycle length: {periodData.cycleDuration} days</p>
                  <p>Average cycle length: 28 days</p>
                  <p>Your current phase: {periodData.currentPhase}</p>
                  <p>Days until next period: {daysUntilNextPeriod}</p>
                </div>
              </Card>

              <Card>
                <h3 className="font-semibold mb-4">Symptom Trends</h3>
                <ul className="space-y-2">
                  {periodData.symptoms.map((symptom: string, index: number) => (
                    <li
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span>{symptom}</span>
                      <span className="text-gray-600">
                        {periodData.symptomSeverities instanceof Map
                          ? periodData.symptomSeverities.get(symptom)
                          : periodData.symptomSeverities[symptom]}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card>
                <h3 className="font-semibold mb-4">Data Sharing Settings</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Select the data you want to share with the Parent's Dashboard:
                </p>
                <div className="space-y-4">
                  <DataToggle
                    label="Cycle Information"
                    isSelected={selectedData.cycleInfo}
                    onToggle={() => toggleDataSelection("cycleInfo")}
                  />
                  <DataToggle
                    label="Mood Data"
                    isSelected={selectedData.moodData}
                    onToggle={() => toggleDataSelection("moodData")}
                  />
                  <DataToggle
                    label="Sleep Data"
                    isSelected={selectedData.sleepData}
                    onToggle={() => toggleDataSelection("sleepData")}
                  />
                  <DataToggle
                    label="Symptoms Data"
                    isSelected={selectedData.symptomsData}
                    onToggle={() => toggleDataSelection("symptomsData")}
                  />
                  <DataToggle
                    label="Wellness Data"
                    isSelected={selectedData.wellnessData}
                    onToggle={() => toggleDataSelection("wellnessData")}
                  />
                </div>
              </Card>
            </>
          )}

          {activeTab === "mythbusters" && (
            <Card>
              <h3 className="font-semibold mb-4">
                Menstrual Health MythBusters
              </h3>
              <div className="space-y-4">
                {myths.map((myth, index) => (
                  <div
                    key={index}
                    className="p-4 bg-pink-100 rounded-lg"
                  >
                    <p className="font-medium mb-2">{myth.myth}</p>
                    <button
                      onClick={() => openMythModal(myth)}
                      className="text-pink-600 hover:underline"
                    >
                      Reveal the truth
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </main>

      {showNotification && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white p-4 rounded-b-lg shadow-lg animate-slideIn">
          Don't forget to log your symptoms today!
        </div>
      )}

      {showMythModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h4 className="font-semibold mb-2">Myth: {currentMyth.myth}</h4>
            <p className="mb-4">Fact: {currentMyth.fact}</p>
            <button
              onClick={() => setShowMythModal(false)}
              className="w-full py-2 px-4 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`bg-white rounded-lg p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
};

const AnimatedCard = ({ title, value, icon }: { title: string; value: any; icon: React.ReactNode }) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-md hover:scale-105">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <h3 className="text-2xl font-semibold mt-1">{value}</h3>
        </div>
        <div className="p-2 bg-pink-100 rounded-full">
          {icon}
        </div>
      </div>
    </Card>
  );
};

const getMoodIcon = (mood: string) => {
  if (typeof mood === "string") {
    switch (mood.toLowerCase()) {
      case "happy":
        return <Smile className="h-6 w-6 text-green-500" />;
      case "sad":
        return <Frown className="h-6 w-6 text-blue-500" />;
      default:
        return <Meh className="h-6 w-6 text-yellow-500" />;
    }
  }
};

const InsightItem = ({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) => {
  return (
    <div className="flex items-center space-x-3 p-3 bg-pink-100 rounded-lg transition-all duration-300 hover:bg-pink-200">
      {icon}
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
};

const WellnessItem = ({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) => {
  return (
    <div className="flex items-center space-x-3 p-3 bg-pink-100 rounded-lg">
      <div className="p-2 bg-pink-200 rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
};

const EventItem = ({ title, date }: { title: string; date: string }) => {
  return (
    <li className="flex items-center space-x-3">
      <Calendar className="h-5 w-5 text-pink-500" />
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-600">{date}</p>
      </div>
    </li>
  );
};

const TabButton = ({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md transition-colors ${
        active
          ? "bg-pink-500 text-white"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {children}
    </button>
  );
};

const DataToggle = ({ label, isSelected, onToggle }: { label: string; isSelected: boolean; onToggle: () => void }) => {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <button
        onClick={onToggle}
        className="focus:outline-none"
        aria-label={`Toggle ${label}`}
      >
        {isSelected ? (
          <ToggleRight className="h-6 w-6 text-pink-500" />
        ) : (
          <ToggleLeft className="h-6 w-6 text-gray-400" />
        )}
      </button>
    </div>
  );
};