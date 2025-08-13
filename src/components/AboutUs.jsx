"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import SideBar from "./SideBar";
import useScreenSize from "../hooks/useScreenSize";
import { FaLinkedin } from "react-icons/fa";

// Reusable Card component for consistent styling
const Card = ({ children, className, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02] ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export function AboutUs() {
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  
  const { width } = useScreenSize();

  return (
    <div className="flex h-screen">
      <SideBar
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        activeLink={-1}
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
        <div className="max-w-6xl mx-auto space-y-12">
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <h1 className={`text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent ${sidebarVisible && width > 816 ? "pl-0" : "pl-11"}`}>
              About Us
            </h1>
          </motion.div>

          <Card className="border border-pink-600">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Our Story
            </h2>
            <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
              SheSync was born from a simple belief: menstrual health should never be a taboo, an afterthought, or a source of confusion. We realized that countless women and menstruators face avoidable challenges every month — from tracking their cycles and understanding their bodies to accessing expert advice without judgment. So, we decided to create a space where technology meets empathy.
            </p>
          </Card>
          
          <Card className="border border-pink-600">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              To empower menstruators with the knowledge, tools, and community they deserve — so every cycle feels supported, informed, and in sync.
            </p>
          </Card>

          <Card className="border border-pink-600">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              What We Do
            </h2>
            <p className="text-lg mb-2 text-gray-700 dark:text-gray-300">
              SheSync is more than just a period tracker. We’re building an intelligent platform that helps you:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Track your cycle effortlessly with AI-powered predictions.</li>
              <li>Book appointments with nearby clinics in just a few clicks.</li>
              <li>Connect with menstrual health experts for personalized guidance.</li>
              <li>Learn & grow through credible, stigma-free resources.</li>
            </ul>
          </Card>

          <Card className="border border-pink-600">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Why SheSync?
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Personalized Experience: Every body is unique — so is your cycle.</li>
              <li>Expert-Backed: We work closely with healthcare professionals to ensure accuracy.</li>
              <li>Privacy First: Your health data stays yours. Always.</li>
              <li>Breaking Taboos: We’re here to normalize conversations about menstrual health.</li>
            </ul>
          </Card>

          <Card className="border border-pink-600">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Our Vision
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              A world where menstrual health is understood, respected, and supported — without whispers, shame, or misinformation.
            </p>
          </Card>

          <Card className="border border-pink-600">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Join the Movement
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              At SheSync, we’re not just creating an app — we’re creating a change. Together, we can make menstrual health easy to manage, openly discussed, and universally respected.
            </p>
          </Card>

          <footer className="bg-white dark:bg-gray-900 mt-12 pt-8 rounded border-t-2 border-pink-600 dark:border-pink-500 transition-colors">
            <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Company
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      onClick={() => navigate("/about-us")}
                      className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors cursor-pointer"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/company/shesync/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors cursor-pointer"
                    >
                      Careers
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Resources
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="/help-center" className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                      Community
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Legal
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a href="/privacy-policy" className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="/terms-of-service" className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="/cookie-policy" className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Connect
                </h4>
                <a
                  href="https://www.linkedin.com/company/shesync/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex items-center justify-center w-12 h-12 bg-pink-600 rounded-full text-white transition-all duration-300 transform hover:scale-110 shadow-md hover:bg-pink-700"
                >
                  <FaLinkedin size={24} className="text-white" />
                </a>
              </div>
            </div>
            <div className="w-full mt-8 p-4 border-t border-pink-800 dark:border-pink-500">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-gray-700 dark:text-gray-100 text-sm">
                  &copy; 2025 SheSync. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}