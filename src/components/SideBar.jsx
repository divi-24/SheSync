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
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useScreenSize from "../hooks/useScreenSize";
import { useEffect, useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton, SignUpButton } from "@clerk/clerk-react";
import { useTheme } from "../context/ThemeContext";

export default function SideBar({
  sidebarVisible,
  setSidebarVisible,
  activeLink,
}) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { width } = useScreenSize();

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

  useEffect(() => {
    if (width < 816) {
      setSidebarVisible(false);
    } else {
      setSidebarVisible(true);
    }
  }, [width, setSidebarVisible]);

  let active = new Array(15).fill(false);
  if (activeLink !== undefined) active[activeLink] = true;

  return (
    <div className={`${width < 816 ? 'fixed' : 'relative'} z-50`}>
      {/* Mobile menu button when sidebar is hidden */}
      {!sidebarVisible && width < 816 && (
        <div className="fixed top-4 left-4 p-2 bg-pink-100 dark:bg-gray-700 rounded-full z-50 shadow-md">
          <Menu
            size={24}
            className="text-black dark:text-white"
            onClick={() => setSidebarVisible(true)}
          />
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={`bg-pink-100 dark:bg-gray-800 w-64 max-h-screen overflow-y-auto p-4 transition-all duration-300 ease-in-out ${
          sidebarVisible ? "translate-x-0" : "-translate-x-full"
        } ${width < 816 ? 'fixed' : 'relative'} shadow-lg`}
      >
        <div className="px-4 py-4 flex flex-col space-y-2">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-pink-600 dark:text-pink-400">
              SheSync
            </h1>
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </motion.button>
              <SignedIn>
                <UserButton />
              </SignedIn>
              {width < 816 && (
                <button
                  onClick={() => setSidebarVisible(false)}
                  className="p-1 rounded-full hover:bg-pink-200 dark:hover:bg-gray-700"
                >
                  <X size={20} className="text-black dark:text-white" />
                </button>
              )}
            </div>
          </div>

          <SignedOut>
            <div className="flex my-4">
              <SignInButton className="text-black dark:text-white dark:bg-pink-900 rounded-2xl py-2 w-[40%] block m-auto text-[0.8em]" mode="modal"/>
              <SignUpButton className="text-black dark:text-white dark:bg-pink-900 rounded-2xl py-2 w-[40%] block m-auto text-[0.8em]" mode="modal"/>
            </div>
          </SignedOut>

          <SidebarLink
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            onClick={() => navigate("/dashboard")}
            active={active[0]}
          />
          <SidebarLink
            icon={<Home size={20} />}
            label="Home"
            onClick={() => navigate("/")}
            active={active[1]}
          />
          <SidebarLink
            icon={<GraduationCap size={20} />}
            label="Education"
            onClick={() => navigate("/blogs")}
            active={active[2]}
          />
          <SidebarLink
            icon={<ShoppingBag size={20} />}
            label="Shop"
            onClick={() => navigate("/Ecom")}
            active={active[3]}
          />
          <SidebarLink
            icon={<ActivitySquare size={20} />}
            label="Track Your Health"
            onClick={() => navigate("/tracker")}
            active={active[4]}
          />
          <SidebarLink
            icon={<HeartPulse size={20} />}
            label="Ovulation Calculator"
            onClick={() => navigate("/ovulationcalculator")}
            active={active[5]}
          />
          <SidebarLink
            icon={<ClipboardList size={20} />}
            label="PCOS Diagnosis"
            onClick={() => navigate("/partner")}
            active={active[6]}
          />
          <SidebarLink
            icon={<Stethoscope size={20} />}
            label="Expert Consultation"
            onClick={() => navigate("/consultations")}
            active={active[7]}
          />
          <SidebarLink
            icon={<Bot size={20} />}
            label="Eve"
            onClick={() => navigate("/ChatBot")}
            active={active[8]}
          />
          <SidebarLink
            icon={<HeartPulse size={20} />}
            label="HealthLens"
            onClick={() => navigate("/symptomsanalyzer")}
            active={active[9]}
          />
          <SidebarLink
            icon={<AppWindowMac size={20} />}
            label="Parent's Dashboard"
            onClick={() => navigate("/parents")}
            active={active[10]}
          />
          <SidebarLink
            icon={<MessageSquare size={20} />}
            label="Forums"
            onClick={() => navigate("/forums")}
            active={active[11]}
          />
          <SidebarLink
            icon={<HeartHandshake size={20} />}
            label="ShareJoy"
            onClick={() => window.open("https://thepadproject.org/donate/")}
            active={active[12]}
          />
          <SidebarLink
            icon={<Gamepad2 size={20} />}
            label="Bliss"
            onClick={() => window.open("https://she-syncgame.vercel.app/", "_blank")}
            active={active[13]}
          />
          <SidebarLink
            icon={<Handshake size={20} />}
            label="NGO's"
            onClick={() => window.open("https://www.hercircle.in/engage/wellness/reproductive-health/5-organisations-working-towards-eradicating-period-poverty-2239.html", "_blank")}
            active={active[14]}
          />
        </div>
      </aside>
    </div>
  );
}
