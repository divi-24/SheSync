"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Star,
  Clock,
  HeartHandshake,
  DollarSign,
  ChevronDown,
  Sun,
  Moon,
  LayoutDashboard,
  MessageSquare,
  HeartPulse,
  Home,
  GraduationCap,
  ShoppingBag,
  ActivitySquare,
  Stethoscope,
  Bot,
  Handshake,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const specializations = [
  "Gynecology",
  "Obstetrics",
  "Reproductive Endocrinology",
  "Hormonal Therapy",
  "Fertility Specialist",
  "Nutrition & Dietetics",
  "Menstrual Health Specialist",
  "Endometriosis Specialist",
  "Postpartum Care",
];

const doctors = [
  {
    id: 1,
    name: "Dr. Vipasha",
    specialization: "Gynecology",
    rating: 4.8,
    reviewCount: 124,
    availableDate: "2024-02-15",
    price: 150,
    image: "/public/images/women.jpeg",
  },
  {
    id: 2,
    name: "Dr. Chhavi ",
    specialization: "Obstetrics",
    rating: 4.9,
    reviewCount: 98,
    availableDate: "2025-02-16",
    price: 180,
    image: "/public/images/women.jpeg",
  },
  {
    id: 3,
    name: "Dr. Nandini",
    specialization: "Reproductive Endocrinology",
    rating: 4.7,
    reviewCount: 86,
    availableDate: "2025-02-17",
    price: 200,
    image: "/public/images/women.jpeg",
  },
  {
    id: 4,
    name: "Dr. Anjali Mehta",
    specialization: "Obstetrics",
    rating: 4.7,
    reviewCount: 98,
    availableDate: "2025-03-10",
    price: 180,
    image: "/public/images/women.jpeg",
  },
  {
    id: 5,
    name: "Dr. Priya Shah",
    specialization: "Reproductive Endocrinology",
    rating: 4.9,
    reviewCount: 150,
    availableDate: "2025-01-25",
    price: 200,
    image: "/public/images/women.jpeg",
  },
  {
    id: 6,
    name: "Dr. Kavita Iyer",
    specialization: "Nutrition & Dietetics",
    rating: 4.6,
    reviewCount: 110,
    availableDate: "2025-02-05",
    price: 120,
    image: "/public/images/women.jpeg",
  },
  {
    id: 7,
    name: "Dr. Sneha Kapoor",
    specialization: "Menstrual Health Specialist",
    rating: 4.7,
    reviewCount: 102,
    availableDate: "2025-02-20",
    price: 140,
    image: "/public/images/women.jpeg",
  },
  {
    id: 8,
    name: "Dr. Radhika Menon",
    specialization: "Pelvic Floor Therapy",
    rating: 4.5,
    reviewCount: 90,
    availableDate: "2025-03-01",
    price: 170,
    image: "/public/images/women.jpeg",
  },
  {
    id: 9,
    name: "Dr. Aditi Singh",
    specialization: "Fertility Specialist",
    rating: 4.8,
    reviewCount: 140,
    availableDate: "2025-01-30",
    price: 220,
    image: "/public/images/women.jpeg",
  },
  {
    id: 10,
    name: "Dr. Nidhi Patel",
    specialization: "Endometriosis Specialist",
    rating: 4.6,
    reviewCount: 86,
    availableDate: "2025-02-18",
    price: 160,
    image: "/public/images/women.jpeg",
  },
  {
    id: 11,
    name: "Dr. Pooja Verma",
    specialization: "Hormonal Therapy",
    rating: 4.5,
    reviewCount: 75,
    availableDate: "2025-02-22",
    price: 130,
    image: "/public/images/women.jpeg",
  },
  {
    id: 12,
    name: "Dr. Meera Joshi",
    specialization: "Postpartum Care",
    rating: 4.7,
    reviewCount: 92,
    availableDate: "2025-03-05",
    price: 180,
    image: "/public/images/women.jpeg",
  },
];

export function Consultations() {
  const navigate = useNavigate();
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );
  const [sidebarVisible, setSidebarVisible] = useState(true);

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

  const SidebarLink = ({ icon, label, path, active = false }) => {
    return (
      <button
        onClick={() => navigate(path)}
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

  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <aside
        className={`bg-pink-100 dark:bg-gray-800 w-64 min-h-screen p-4 fixed transition-all duration-300 ease-in-out ${
          sidebarVisible ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ zIndex: 40 }}
      >
        <div className="px-4 py-4 flex flex-col space-y-2">
          <h1 className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-4">
            SheSync
          </h1>
          <SidebarLink
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            path="/dashboard"
          />
          <SidebarLink icon={<Home size={20} />} label="Home" path="/" />
          <SidebarLink
            icon={<GraduationCap size={20} />}
            label="Education"
            path="/blogs"
          />
          <SidebarLink
            icon={<ShoppingBag size={20} />}
            label="Shop"
            path="/Ecom"
          />
          <SidebarLink
            icon={<ActivitySquare size={20} />}
            label="Track Your Health"
            path="/tracker"
          />
          <SidebarLink
            icon={<Stethoscope size={20} />}
            label="Expert Consultation"
            path="/consultations"
            active
          />
          <SidebarLink icon={<Bot size={20} />} label="Eve" path="/ChatBot" />
          <SidebarLink
            icon={<HeartPulse size={20} />}
            label="HealthLens"
            path="/symptomsanalyzer"
          />
          <SidebarLink
            icon={<MessageSquare size={20} />}
            label="Forums"
            path="/forums"
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
      </aside>

      <button
        onClick={toggleSidebar}
        className="fixed left-0 top-4 z-50 p-2 bg-pink-600 text-white rounded-r-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
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
        className={`flex-1 p-8 overflow-auto bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out ${
          sidebarVisible ? "ml-64" : "ml-0"
        }`}
      >
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-8">
            <motion.h1
              className="text-4xl font-bold text-center text-pink-600 dark:text-pink-400"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Expert Consultations
            </motion.h1>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>

          <motion.div
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">
              Find a Specialist
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Search for women's health experts in your area
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Location
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    id="location"
                    type="text"
                    placeholder="Enter your location"
                    className="w-full pl-10 pr-3 py-2 text-white border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <div className="flex-1 relative">
                <label
                  htmlFor="specialization"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Specialization
                </label>
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full text-left pl-3 pr-10 py-2 text-white border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white dark:bg-gray-700 dark:text-white"
                  >
                    {selectedSpecialization || "Select specialization"}
                    <ChevronDown
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white-400"
                      size={18}
                    />
                  </button>
                  {isDropdownOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg"
                    >
                      {specializations.map((spec) => (
                        <li
                          key={spec}
                          onClick={() => {
                            setSelectedSpecialization(spec);
                            setIsDropdownOpen(false);
                          }}
                          className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer dark:text-white"
                        >
                          {spec}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </div>
              </div>
            </div>
            <button className="w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition-colors duration-300">
              Search Doctors
            </button>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.03 }}
                className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold dark:text-white">
                        {doctor.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {doctor.specialization}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <Star className="h-4 w-4 fill-current text-yellow-400" />
                    <span>{doctor.rating}</span>
                    <span>({doctor.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <Clock className="h-4 w-4" />
                    <span>
                      Next available:{" "}
                      {new Date(doctor.availableDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                    <DollarSign className="h-4 w-4" />
                    <span>${doctor.price} per consultation</span>
                  </div>
                  <button className="w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition-colors duration-300">
                    Book Appointment
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
