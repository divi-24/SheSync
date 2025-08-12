"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import FAQItem from "./FAQItem";
import { FaSquareXTwitter, FaSquareInstagram } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
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

// FAQ Data array for a dynamic list
const faqData = [
  {
    question: "Is my data safe and private?",
    answer: "Yes, we take your privacy seriously. All your data is encrypted, and we never share your personal information with third parties.",
  },
  {
    question: "Can I use SheSync if I have irregular cycles?",
    answer: "SheSync is designed to accommodate all types of cycles, including irregular ones. Our AI adapts to your unique patterns over time.",
  },
  {
    question: "How often should I log my symptoms?",
    answer: "For the best results, we recommend logging your symptoms daily. However, even logging a few times a week can provide valuable insights.",
  },
  {
    question: "How does SheSync protect my privacy?",
    answer: "We use state-of-the-art encryption and follow strict data protection protocols. Your personal information is never sold or shared with third parties without your explicit consent.",
  },
  {
    question: "Can I use SheSync if I'm not menstruating?",
    answer: "SheSync offers features for all aspects of women's health, including general wellness tracking, nutritional guidance, and mental health support.",
  },
  {
    question: "Are the health articles on SheSync written by professionals?",
    answer: "Yes, all our educational content is created or reviewed by qualified healthcare professionals to ensure accuracy and relevance.",
  },
  {
    question: "Disclaimer:",
    answer: "This is a draft and not a legally binding document. For an official privacy policy, it is recommended to consult with a legal professional.",
  },
];

function PrivacyPolicy() {
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
              SheSync Privacy Policy
            </h1>
          </motion.div>

          <Card className="border border-pink-600">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Introduction
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Your privacy is our top priority. At **SheSync**, we are committed to protecting your personal information and sensitive health data. This Privacy Policy explains what information we collect, how we use it, and the steps we take to ensure its security. By using our services, you agree to the practices described in this policy.
            </p>
          </Card>
          <Card className="border border-pink-600">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Information We Collect
            </h2>
            <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
              We collect information to provide and improve our services. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-4 text-gray-700 dark:text-gray-300">
              <li>
                **Personal Information:** When you sign up, we collect your name,
                email address, date of birth, and an encrypted password. This
                allows us to create and manage your account.
              </li>
              <li>
                **Health Data:** This is the core of our service. You can choose to
                log your menstrual cycle dates, symptoms (mood, pain, etc.),
                PCOS-related data, and other health metrics. This data is highly
                sensitive and is always encrypted.
              </li>
              <li>
                **Usage Data:** We automatically collect information about how you
                use our services, such as your IP address, device type, browser,
                and pages you visit. This helps us improve the user experience
                and app functionality.
              </li>
              <li>
                **User-Generated Content:** Any information you post in our
                community forums or provide to our AI assistant, Eve, is stored.
                Remember that information shared in forums is public.
              </li>
              <li>
                **Transactional Data:** When you make a purchase in our curated
                shop, we collect payment information and shipping details to
                process your order.
              </li>
            </ul>
          </Card>
          <Card className="border border-pink-600">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              How We Use Your Information
            </h2>
            <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
              We use your information to:
            </p>
            <ul className="list-disc pl-5 space-y-4 text-gray-700 dark:text-gray-300">
              <li>
                **Provide and Personalize Our Services:** To offer personalized
                cycle predictions, health insights, and content from our Education
                Hub.
              </li>
              <li>
                **Facilitate Communication:** To allow you to connect with health
                experts and participate in our forums.
              </li>
              <li>
                **Improve the Platform:** We analyze usage data to understand
                trends, fix bugs, and develop new features, such as our AI
                symptom analyzer, Health Lens.
              </li>
              <li>
                **Process Transactions:** To fulfill orders from our curated shop.
              </li>
              <li>
                **Communicate with You:** To send important service-related
                updates, and with your consent, marketing and promotional
                communications.
              </li>
            </ul>
          </Card>
          <Card className="border border-pink-600">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Data Sharing and Disclosure
            </h2>
            <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
              We do not sell your personal data. We may share your information
              only in the following limited circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-4 text-gray-700 dark:text-gray-300">
              <li>
                **With Consent:** We may share your data with your explicit consent.
                For example, sharing limited cycle data with a linked Parent's
                Dashboard user.
              </li>
              <li>
                **Third-Party Service Providers:** We may use trusted third parties
                to perform services on our behalf, such as cloud hosting providers
                and payment processors. These providers are bound by strict
                confidentiality agreements.
              </li>
              <li>
                **Legal Requirements:** We may disclose your information if
                required by law or if we believe it's necessary to protect the
                rights, property, or safety of SheSync, our users, or the public.
              </li>
            </ul>
          </Card>
          <Card className="border border-pink-600">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Children's Privacy
            </h2>
            <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
              SheSync is designed for young menstruators with parental support.
              We require users under 18 to link their account to a parent's
              dashboard for supervision. This dual-dashboard approach is
              designed to promote open dialogue while respecting a child's
              privacy. Parents can access general cycle updates and AI-driven
              alerts, but not detailed symptom logs unless the child chooses
              to share them.
            </p>
          </Card>
          <Card className="border border-pink-600">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Data Security
            </h2>
            <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
              We employ a range of security measures, including encryption and
              access controls, to protect your data from unauthorized access,
              use, or disclosure. We constantly review our security practices
              to ensure your data remains safe.
            </p>
          </Card>
          <Card className="border border-pink-600">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Your Rights and Choices
            </h2>
            <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
              You have the right to access, correct, or delete your personal
              information at any time. You can manage your preferences and
              data directly within your account settings. If you wish to
              request a full data deletion, please contact us.
            </p>
          </Card>
          <Card className="border border-pink-600">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Changes to This Policy
            </h2>
            <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
              We may update this policy periodically to reflect changes in
              our practices. We will notify you of any significant changes by
              posting the new policy on our website.
            </p>
          </Card>
          <Card className="border border-pink-600">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Contact Us
            </h2>
            <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
              If you have any questions about this Privacy Policy, you can
              contact us at:
            </p>
            <p className="font-semibold text-lg text-pink-600 dark:text-pink-400">
              support@shesync.com
            </p>
          </Card>
          
          <Card className="border border-pink-600">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              <AnimatePresence>
                {faqData.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openFAQIndex === index}
                    onClick={() => toggleFAQ(index)}
                  />
                ))}
              </AnimatePresence>
            </div>
          </Card>
          <footer className="mt-12 pt-8 border-t-2 border-pink-600 rounded dark:border-pink-500">
            <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between gap-10">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Company
                </h4>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => navigate("/symptomsanalyzer")}
                      className="bg-pink-600 dark:bg-pink-500 text-white-700 dark:text-white dark:border-white hover:bg-pink-700 hover:text-white transform hover:scale-105 transition duration-200 ease-in-out"
                    >
                      About Us
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate("/parents")}
                      className="bg-pink-600 text-white-700 dark:text-white dark:border-white dark:bg-pink-500 hover:text-white hover:bg-pink-700 transform hover:scale-105 transition duration-200 ease-in-out"
                    >
                      Careers
                    </button>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="inline-block text-gray-700 dark:text-white hover:text-white transform hover:scale-105 transition duration-200 ease-in-out"
                    >
                      Press
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
                    <a
                      href="#"
                      className="inline-block text-gray-700 dark:text-white hover:text-white transform hover:scale-105 transition duration-200 ease-in-out"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="inline-block text-gray-700 dark:text-white hover:text-white transform hover:scale-105 transition duration-200 ease-in-out"
                    >
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="inline-block text-gray-700 dark:text-white hover:text-white transform hover:scale-105 transition duration-200 ease-in-out"
                    >
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
                    <a
                      href="/privacy-policy"
                      className="inline-block text-gray-700 dark:text-white hover:text-white transform hover:scale-105 transition duration-200 ease-in-out"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="inline-block text-gray-700 dark:text-white hover:text-white transform hover:scale-105 transition duration-200 ease-in-out"
                    >
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="inline-block text-gray-700 dark:text-white hover:text-white transform hover:scale-105 transition duration-200 ease-in-out"
                    >
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Connect
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="https://x.com"
                      className="inline-block text-gray-700 dark:text-white hover:text-white transform hover:scale-105 transition duration-200 ease-in-out"
                    >
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://facebook.com"
                      className="inline-block text-gray-700 dark:text-white hover:text-white transform hover:scale-105 transition duration-200 ease-in-out"
                    >
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://instagram.com"
                      className="inline-block text-gray-700 dark:text-white hover:text-white transform hover:scale-105 transition duration-200 ease-in-out"
                    >
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full mt-8 p-4 border-t-1 border-pink-800 dark:border-pink-500">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-gray-700 dark:text-gray-100 font-semibold">
                  TEAM: WEB PIONEERS
                </p>
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

export default PrivacyPolicy;