import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Moon, Sun } from "react-feather";
import { SignIn } from "@clerk/clerk-react";

export function Login() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="absolute top-4 left-4 flex items-center justify-between space-x-4">
        <Link
          to="/"
          className="p-2 rounded-full bg-[#DB2777] hover:bg-[#BE185D] transition-all duration-200 transform hover:scale-105 shadow-md"
        >
          <Home className="w-6 h-6" color="white" />
          <span className="sr-only">Back to Home</span>
        </Link>
        <button
          onClick={() => {
            setDarkMode((prevMode) => {
              const newMode = !prevMode;
              localStorage.setItem("darkMode", newMode);
              return newMode;
            });
          }}
          className="p-2 rounded-full bg-[#DB2777] hover:bg-[#BE185D] transition-all duration-200 transform hover:scale-105 shadow-md"
        >
          {darkMode ? (
            <Sun className="w-6 h-6" color="white" />
          ) : (
            <Moon className="w-6 h-6" color="white" />
          )}
          <span className="sr-only">Toggle dark mode</span>
        </button>
      </div>
      <div className="max-w-md w-full flex flex-col items-center space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg ">
        <div >
          <h1
            className={`text-3xl font-bold text-pink-600 dark:text-pink-400 
            `}
          >
            Welcome to SheSync
          </h1>
        </div>
        <SignIn
          routing="path"
          path="/login"
          signUpUrl="/signup"
          redirectUrl="/dashboard"
          appearance={{
            variables: {
              colorPrimary: '#DB2777',
              colorTextOnPrimaryBackground: '#ffffff',
              borderRadius: '10px',
              },
            elements: {

              formButtonPrimary: "bg-[#DB2777] hover:bg-[#BE185D] text-white [&>span]:text-white font-medium py-3 text-sm transition-colors border-0",
              card: "bg-white dark:bg-[#1b2230] shadow-black-100 ",
              headerTitle: "text-gray-900 dark:text-white text-xl font-semibold",
              headerSubtitle: "text-gray-600 dark:text-gray-400",
              formFieldLabel: "text-gray-700 dark:text-gray-300",
              formFieldInput: "bg-white  text-gray-900 dark:bg-[#1f2533] dark:text-white placeholder-gray-400 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#DB2777] focus:border-[#DB2777]",
              footerActionLink: "text-[#DB2777] hover:text-[#BE185D] dark:text-[#DB2777] dark:hover:text-[#BE185D",
              dividerLine: 'bg-[#e5e7eb] dark:bg-[#374151]',
              dividerText: 'text-gray-500 dark:text-gray-400 text-xs',
              socialButtonsBlockButton: 'border border-[#DB2777] rounded-lg transition-colors [&>span]:text-gray-900 dark:[&>span]:text-white [&>span]:font-medium',
              
            },
            
          }}
        />
      </div>
      <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
        By logging in, you agree to our{" "}
        <a
          href="#"
          className="font-medium text-[#DB2777] hover:text-[#BE185D] dark:text-[#DB2777] dark:hover:text-[#BE185D"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="#"
          className="font-medium text-[#DB2777] hover:text-[#BE185D] dark:text-[#DB2777] dark:hover:text-[#BE185D"
        >
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
}
