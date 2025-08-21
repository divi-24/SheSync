import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, Moon, Sun } from "react-feather";
import { SignUp } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";

export function Signup() {
  const { isSignedIn, user } = useUser(); // Call hook at the top level
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      {/* Glow animation keyframes */}
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 10px rgba(236, 72, 153, 0.6), 0 0 20px rgba(139, 92, 246, 0.4), 0 0 30px rgba(79, 70, 229, 0.3); }
          50% { box-shadow: 0 0 20px rgba(236, 72, 153, 0.8), 0 0 30px rgba(139, 92, 246, 0.6), 0 0 40px rgba(79, 70, 229, 0.5); }
        }
        .glow-animate {
          animation: pulse-glow 2s infinite;
        }
      `}</style>

      {/* Top left buttons */}
      <div className="absolute top-4 left-4 flex space-x-4">
        <Link
          to="/"
          className="text-white-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
        >
          <Home className="w-6 h-6" />
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
          className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white p-2 rounded-lg shadow-md hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all duration-300 glow-animate"
        >
          {darkMode ? (
            <Sun className="w-6 h-6" />
          ) : (
            <Moon className="w-6 h-6" />
          )}
          <span className="sr-only">Toggle dark mode</span>
        </button>
      </div>

      {/* Signup Card */}
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Create your account
          </h2>
        </div>
        <SignUp
          routing="path"
          path="/signup"
          signInUrl="/login"
          redirectUrl="/dashboard"
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 glow-animate",
              card: "bg-white dark:bg-gray-800",
              headerTitle: "text-gray-900 dark:text-white",
              headerSubtitle: "text-gray-600 dark:text-gray-400",
              formFieldLabel: "text-gray-700 dark:text-gray-300",
              formFieldInput:
                "bg-white dark:bg-gray-700 text-gray-900 dark:text-white",
              footerActionLink:
                "text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300",
            },
          }}
        />
      </div>

      {/* Footer text */}
      <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
        By signing up, you agree to our{" "}
        <a
          href="#"
          className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="#"
          className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
}
