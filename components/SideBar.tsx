'use client';

import {
  LayoutDashboard,
  MessageSquare,
  HeartPulse,
  Gamepad2,
  AppWindowMac,
  Home,
  GraduationCap,
  ShoppingBag,
  ActivitySquare,
  ClipboardList,
  Stethoscope,
  Bot,
  HeartHandshake,
  Handshake,
  Menu,
  Sun,
  Moon,
  X,
  ChevronRight,
  User,
  LogIn,
  UserPlus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import useScreenSize from "../hooks/useScreenSize";
import { useEffect, useState } from "react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { useTheme } from "../context/ThemeContext";

interface SideBarProps {
  sidebarVisible: boolean;
  setSidebarVisible: (visible: boolean) => void;
  activeLink?: number;
}

export default function SideBar({
  sidebarVisible,
  setSidebarVisible,
  activeLink,
}: SideBarProps) {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { width } = useScreenSize();
  const [isHovering, setIsHovering] = useState(false);

  const navLinks = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/dashboard" },
    { icon: <Home size={20} />, label: "Home", path: "/" },
    { icon: <GraduationCap size={20} />, label: "Education", path: "/blogs" },
    { icon: <ShoppingBag size={20} />, label: "Shop", path: "/ecom" },
    { icon: <ActivitySquare size={20} />, label: "Track Your Health", path: "/tracker" },
    { icon: <ClipboardList size={20} />, label: "PCOS Diagnosis", path: "/partner" },
    { icon: <Stethoscope size={20} />, label: "Expert Consultation", path: "/consultations" },
    { icon: <Bot size={20} />, label: "Eve", path: "/chatbot" },
    { icon: <HeartPulse size={20} />, label: "HealthLens", path: "/symptomsanalyzer" },
    { icon: <AppWindowMac size={20} />, label: "Parent's Dashboard", path: "/parents" },
    { icon: <MessageSquare size={20} />, label: "Forums", path: "/forums" },
    { icon: <HeartHandshake size={20} />, label: "ShareJoy", path: "https://thepadproject.org/donate/", external: true },
    { icon: <Gamepad2 size={20} />, label: "Bliss", path: "https://she-syncgame.vercel.app/", external: true },
    { icon: <Handshake size={20} />, label: "NGO's", path: "https://www.hercircle.in/engage/wellness/reproductive-health/5-organisations-working-towards-eradicating-period-poverty-2239.html", external: true },
  ];

  const SidebarLink = ({ 
    icon, 
    label, 
    onClick, 
    active = false,
    external = false 
  }: {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    active?: boolean;
    external?: boolean;
  }) => {
    return (
      <motion.button
        onClick={onClick}
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.98 }}
        className={`flex items-center justify-between w-full px-3 py-3 rounded-lg transition-all ${
          active
            ? "bg-pink-200 dark:bg-pink-900 text-pink-800 dark:text-pink-200 font-medium"
            : "text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-gray-700"
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className={`${active ? 'text-pink-600 dark:text-pink-300' : 'text-gray-500 dark:text-gray-400'}`}>
            {icon}
          </div>
          <span>{label}</span>
        </div>
        {external && (
          <ChevronRight size={16} className="text-gray-400 dark:text-gray-500" />
        )}
      </motion.button>
    );
  };

  useEffect(() => {
    if (width < 816) {
      setSidebarVisible(false);
    } else {
      setSidebarVisible(true);
    }
  }, [width, setSidebarVisible]);

  const handleLinkClick = (link: typeof navLinks[0]) => {
    if (link.external) {
      window.open(link.path, "_blank");
    } else {
      router.push(link.path);
    }
    if (width < 816) {
      setSidebarVisible(false);
    }
  };

  // Add dark mode class to body when theme changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <>
      {/* Mobile menu button */}
      {!sidebarVisible && width < 816 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed top-4 left-4 z-50"
        >
          <button
            onClick={() => setSidebarVisible(true)}
            className="p-2 bg-pink-100 dark:bg-gray-700 rounded-full shadow-md hover:bg-pink-200 dark:hover:bg-gray-600 transition-colors"
          >
            <Menu size={24} className="text-black dark:text-white" />
          </button>
        </motion.div>
      )}

      {/* Sidebar overlay for mobile */}
      <AnimatePresence>
        {sidebarVisible && width < 816 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarVisible(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: '-100%' }}
        animate={{ x: sidebarVisible ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed md:relative z-50 h-screen w-64 bg-pink-50 dark:bg-gray-800 shadow-xl flex flex-col border-r border-pink-200 dark:border-gray-700`}
        onMouseEnter={() => width > 816 && setIsHovering(true)}
        onMouseLeave={() => width > 816 && setIsHovering(false)}
      >
        <div className="p-4 pb-2 flex flex-col h-full overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold">
                SS
              </div>
              <h1 className="text-xl font-bold text-pink-600 dark:text-pink-400">
                SheSync
              </h1>
            </motion.div>

            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow-sm"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </motion.button>

              {width < 816 && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSidebarVisible(false)}
                  className="p-2 rounded-full hover:bg-pink-200 dark:hover:bg-gray-700"
                  aria-label="Close sidebar"
                >
                  <X size={20} className="text-black dark:text-white" />
                </motion.button>
              )}
            </div>
          </div>

          {/* User section */}
          <div className="mb-6">
            <SignedIn>
              <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                <UserButton afterSignOutUrl="/" />
                <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  My Account
                </div>
              </div>
            </SignedIn>
            <SignedOut>
              <div className="grid grid-cols-2 gap-3">
                <SignInButton mode="modal">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center space-x-2 px-3 py-2 bg-pink-100 dark:bg-gray-700 rounded-lg text-sm font-medium text-pink-700 dark:text-pink-300"
                  >
                    <LogIn size={16} />
                    <span>Sign In</span>
                  </motion.button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center space-x-2 px-3 py-2 bg-pink-600 text-white rounded-lg text-sm font-medium"
                  >
                    <UserPlus size={16} />
                    <span>Sign Up</span>
                  </motion.button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>

          {/* Navigation links */}
          <nav className="flex-1 space-y-1">
            {navLinks.map((link, index) => (
              <SidebarLink
                key={index}
                icon={link.icon}
                label={link.label}
                onClick={() => handleLinkClick(link)}
                active={activeLink === index}
                external={link.external}
              />
            ))}
          </nav>

          {/* Footer */}
          <div className="mt-auto pt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
            <p>© {new Date().getFullYear()} SheSync</p>
            <p className="mt-1">All rights reserved</p>
          </div>
        </div>
      </motion.aside>
    </>
  );
}