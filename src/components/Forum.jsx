import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  HeartPulse,
  Home,
  GraduationCap,
  ShoppingBag,
  ActivitySquare,
  Stethoscope,
  Bot,
  ChevronRight,
  Calendar,
  Heart,
  Moon,
  Sun,
  Users,
  MessageSquare,
  Search,
  Filter,
  TrendingUp,
  HeartHandshake,
  Handshake,
} from "lucide-react";

export function Forum() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [activeTab, setActiveTab] = useState("forums");
  const [searchTerm, setSearchTerm] = useState("");

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

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Implement search logic here
  };

  const forums = [
    { id: 1, name: "Women's Health", members: 1200, posts: 5600 },
    { id: 2, name: "Fitness & Nutrition", members: 980, posts: 4200 },
    { id: 3, name: "Mental Wellness", members: 850, posts: 3800 },
    { id: 4, name: "Reproductive Health", members: 720, posts: 3100 },
  ];

  const recentPosts = [
    {
      id: 1,
      title: "My PCOS Journey",
      author: "Ariza Khan",
      likes: 45,
      comments: 12,
    },
    {
      id: 2,
      title: "Best Foods for Hormonal Balance",
      author: "Riya Patel",
      likes: 38,
      comments: 9,
    },
    {
      id: 3,
      title: "Coping with Endometriosis",
      author: "Ishita Roy",
      likes: 52,
      comments: 17,
    },
  ];

  const trendingTopics = [
    "Menstrual Cup Usage",
    "Hormone Balancing Foods",
    "Endometriosis Awareness",
    "Fertility Tracking Apps",
    "Menopause Symptoms",
  ];

  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <aside
        className={`bg-pink-100 dark:bg-gray-800 w-64 min-h-screen p-4 fixed transition-all duration-300 ease-in-out ${
          sidebarVisible ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ zIndex: 40 }}
      >
        <nav className="mt-8">
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
              active
            />
            <SidebarLink
              icon={<HeartHandshake size={20} />}
              label="ShareJoy"
              onClick={() => window.open("https://padforward.us/", "_blank")}
            />
            <SidebarLink
              icon={<Handshake size={20} />}
              label="NGO's"
              onClick={() =>
                window.open(
                  "https://www.hercircle.in/engage/wellness/reproductive-health/5-organisations-working-towards-eradicating-period-poverty-2239.html",
                  "_blank"
                )
              }
            />
          </div>
        </nav>
      </aside>

      <button
        onClick={toggleSidebar}
        className="fixed left-0 top-4 z-10 p-2 bg-pink-600 text-white rounded-r-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
        style={{
          transform: sidebarVisible ? "translateX(256px)" : "translateX(0)",
        }}
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
      <main
        className={`flex-1 p-6 overflow-auto bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out ${
          sidebarVisible ? "ml-64" : "ml-0"
        }`}
      >
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-pink-600 dark:text-pink-400">
              Community Forums
            </h2>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-gray-800 dark:text-gray-200" />
              ) : (
                <Moon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
              )}
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveTab("forums")}
                className={`px-4 py-2 rounded-full ${
                  activeTab === "forums"
                    ? "bg-pink-600 text-white"
                    : "bg-gray-200 text-gray-700"
                } dark:bg-gray-800 dark:text-gray-100`}
              >
                Forums
              </button>
              <button
                onClick={() => setActiveTab("posts")}
                className={`px-4 py-2 rounded-full ${
                  activeTab === "posts"
                    ? "bg-pink-600 text-white"
                    : "bg-gray-200 text-gray-700"
                } dark:bg-gray-800 dark:text-gray-100`}
              >
                Recent Posts
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                />
                <input
                  type="text"
                  placeholder="Search forums..."
                  className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">
                <Filter size={20} />
              </button>
            </div>
          </div>

          {/* Forums List */}
          {activeTab === "forums" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {forums.map((forum) => (
                <div
                  key={forum.id}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    {forum.name}
                  </h3>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center">
                      <Users size={16} className="mr-1" /> {forum.members}{" "}
                      members
                    </span>
                    <span className="flex items-center">
                      <MessageSquare size={16} className="mr-1" /> {forum.posts}{" "}
                      posts
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Recent Posts */}
          {activeTab === "posts" && (
            <div className="space-y-6">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    By {post.author}
                  </p>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center">
                      <Heart size={16} className="mr-1" /> {post.likes} likes
                    </span>
                    <span className="flex items-center">
                      <MessageSquare size={16} className="mr-1" />{" "}
                      {post.comments} comments
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Trending Topics */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Trending Topics
            </h3>
            <ul className="space-y-2">
              {trendingTopics.map((topic, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-700 dark:text-gray-300"
                >
                  <TrendingUp
                    size={16}
                    className="mr-2 text-pink-600 dark:text-pink-400"
                  />
                  {topic}
                </li>
              ))}
            </ul>
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
