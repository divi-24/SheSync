"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
import { ChevronRight } from "lucide-react";
import SideBar from "./SideBar";
import useScreenSize from "../hooks/useScreenSize";

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

export function TermsOfService() {
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
              SheSync Terms of Service
            </h1>
          </motion.div>

          <Card className="border border-pink-600">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              1. Acceptance of Terms
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              By accessing and using SheSync, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to all the terms and conditions of this agreement, you are not authorized to use our services.
            </p>
          </Card>

          <Card className="border border-pink-600">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              2. User Accounts and Responsibilities
            </h2>
            <p className="text-lg mb-2 text-gray-700 dark:text-gray-300">
              You are responsible for maintaining the confidentiality of your account and password. You must be at least 13 years old to use our services. Users under 18 must be linked to a parent's dashboard to ensure proper supervision.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                You agree to provide accurate and complete information during registration.
              </li>
              <li>
                You will not share your password with anyone else.
              </li>
              <li>
                You are responsible for all activity that occurs under your account.
              </li>
            </ul>
          </Card>

          <Card className="border border-pink-600">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              3. Use of the Service
            </h2>
            <p className="text-lg mb-2 text-gray-700 dark:text-gray-300">
              You agree not to use the service for any unlawful or prohibited activities.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                You will not post inappropriate or harmful content on our forums.
              </li>
              <li>
                You will respect other users and maintain a positive, supportive community environment.
              </li>
              <li>
                You acknowledge that content on our Education Hub is for informational purposes only and is not a substitute for professional medical advice.
              </li>
            </ul>
          </Card>

          <Card className="border border-pink-600">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              4. Disclaimer of Medical Advice
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              The content provided on SheSync, including information from our AI tools, blogs, and expert consultations, is for informational and educational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified health professional with any questions you may have regarding a medical condition.
            </p>
          </Card>

          <Card className="border border-pink-600">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              5. Limitation of Liability
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              SheSync will not be liable for any damages, whether direct, indirect, incidental, or consequential, resulting from your use of the service. We do not guarantee the accuracy, completeness, or usefulness of any information on the platform.
            </p>
          </Card>

          <Card className="border border-pink-600">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              6. Intellectual Property
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              All content on SheSync, including text, graphics, logos, and software, is the property of SheSync or its content suppliers and is protected by international copyright laws.
            </p>
          </Card>

          <Card className="border border-pink-600">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              7. Changes to Terms
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on our website. Your continued use of the service after such changes constitutes your acceptance of the new Terms.
            </p>
          </Card>

          <Card className="border border-pink-600">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              8. Contact Information
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="font-semibold text-lg text-pink-600 dark:text-pink-400">
              support@shesync.com
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
                    <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
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