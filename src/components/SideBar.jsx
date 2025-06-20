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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useScreenSize from "../hooks/useScreenSize";
import { useEffect, useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  SignUpButton,
} from "@clerk/clerk-react";
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
            : "text-gray-900 dark:text-gray-300 hover:bg-pink-100 bg-white dark:bg-[#111827] dark:hover:bg-gray-700"
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
    <div className="h-screen">
      {/* Mobile menu button when sidebar is hidden */}
      {!sidebarVisible && width < 816 && (
        <button
          className="fixed top-4 left-4 p-3 bg-white dark:bg-gray-800 rounded-full z-50 shadow-lg border border-gray-200 dark:border-gray-700"
          onClick={() => setSidebarVisible(true)}
        >
          <Menu size={20} className="text-pink-600 dark:text-pink-400" />
        </button>
      )}
      {sidebarVisible && width < 816 && (
        <div
          className="fixed inset-0 bg-slate-400 bg-opacity-50 z-40"
          onClick={() => setSidebarVisible(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-white dark:bg-gray-900 w-64 h-screen  overflow-y-auto border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out ${
          sidebarVisible ? "translate-x-0" : "-translate-x-full"
        } fixed z-50 shadow-xl`}
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
                className="p-2 rounded-full bg-gray-200 dark:bg-white text-black dark:text-black"
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
                  className="p-1 rounded-full hover:bg-pink-200 dark:hover:bg-gray-700 bg-white dark:bg-black"
                >
                  <X size={20} className="text-black dark:text-white" />
                </button>
              )}
            </div>
          </div>

          <SignedOut>
            <div className="flex gap-2">
              <SignInButton mode="modal" asChild>
                <button
                  className="flex items-center gap-2 text-black dark:text-white
                   dark:bg-pink-900 bg-[#fbcfe8] rounded-2xl py-2 w-[50%] text-sm"
                >
                  <i className="fas fa-sign-in-alt"></i>
                  <span>Sign&nbsp;In</span>
                </button>
              </SignInButton>

              <SignUpButton mode="modal" asChild>
                <button
                  className="flex items-center gap-2 text-black dark:text-white
                   dark:bg-pink-900 bg-[#fbcfe8] rounded-2xl py-2 w-[50%] text-sm"
                >
                  <i className="fas fa-user-plus"></i>
                  <span>Sign&nbsp;Up</span>
                </button>
              </SignUpButton>
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
            onClick={() =>
              window.open("https://she-syncgame.vercel.app/", "_blank")
            }
            active={active[13]}
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
            active={active[14]}
          />
        </div>
      </aside>
    </div>
  );
}
