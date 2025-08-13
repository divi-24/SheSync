"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import FAQItem from "./FAQItem";
import SideBar from "./SideBar";
import useScreenSize from "../hooks/useScreenSize";
import { FaLinkedin } from "react-icons/fa";
import { ChevronRight } from "lucide-react";

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

// FAQ data for the Help Center page
const helpCenterData = [
  {
    title: "Getting Started",
    faqs: [
      {
        question: "How do I create an account?",
        answer: "Click on the 'Sign Up' button on the top right corner and follow the on-screen instructions to create your profile.",
      },
      {
        question: "How do I log my cycle?",
        answer: "Navigate to the 'Health Tracker' page and log the start date of your period. The AI will learn your patterns over time.",
      },
      {
        question: "Can I use the app without a parent's dashboard?",
        answer: "Yes, you can use the app independently. The parent dashboard is an optional feature for users under 18.",
      },
    ],
  },
  {
    title: "Using Your Dashboard",
    faqs: [
      {
        question: "What information is on the dashboard?",
        answer: "Your dashboard provides a summary of your cycle predictions, symptom logs, and personalized health insights.",
      },
      {
        question: "How do I track symptoms and mood?",
        answer: "On the Health Tracker page, you can select from a list of common symptoms and moods to log them for each day of your cycle.",
      },
      {
        question: "What is Health Lens?",
        answer: "Health Lens is an AI-powered tool that analyzes your logged symptoms to provide personalized health advice and suggest possible next steps.",
      },
    ],
  },
  {
    title: "Connecting with Experts & Community",
    faqs: [
      {
        question: "How do I book an expert consultation?",
        answer: "Visit the 'Expert Consultations' page to browse certified professionals and book a virtual appointment at your convenience.",
      },
      {
        question: "How do the forums work?",
        answer: "The forums are a safe and anonymous space where you can ask questions, share experiences, and connect with other members of the SheSync community.",
      },
    ],
  },
];

export function HelpCenter() {
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [openFAQIndex, setOpenFAQIndex] = useState(null);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  
  const toggleFAQ = (index) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
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
              Help Center
            </h1>
          </motion.div>

          <Card className="border border-pink-600">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Welcome to SheSync's Help Center
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Find answers to your questions, learn how to use our features, and get the support you need to make the most of your SheSync journey.
            </p>
          </Card>
          
          {helpCenterData.map((section, sectionIndex) => (
            <Card key={sectionIndex} className="border border-pink-600">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
                {section.title}
              </h3>
              <div className="space-y-4">
                <AnimatePresence>
                  {section.faqs.map((faq, faqIndex) => (
                    <FAQItem
                      key={faqIndex}
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={openFAQIndex === `${sectionIndex}-${faqIndex}`}
                      onClick={() => toggleFAQ(openFAQIndex === `${sectionIndex}-${faqIndex}` ? null : `${sectionIndex}-${faqIndex}`)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </Card>
          ))}
          
          <Card className="border border-pink-600">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Didn't Find What You're Looking For?
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              If you need more help, please visit our <a href="#" className="text-pink-600 hover:underline">Community Forums</a> or contact our support team.
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