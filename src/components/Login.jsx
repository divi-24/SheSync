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
          className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
        >
          {darkMode ? (
            <Sun className="w-6 h-6" />
          ) : (
            <Moon className="w-6 h-6" />
          )}
          <span className="sr-only">Toggle dark mode</span>
        </button>
      </div>
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Log in to your account
          </h2>
        </div>
        <SignIn
          routing="path"
          path="/login"
          signUpUrl="/signup"
          redirectUrl="/dashboard"
          appearance={{
            elements: {
              formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-sm",
              card: "bg-white dark:bg-gray-800",
              headerTitle: "text-gray-900 dark:text-white",
              headerSubtitle: "text-gray-600 dark:text-gray-400",
              formFieldLabel: "text-gray-700 dark:text-gray-300",
              formFieldInput: "bg-white dark:bg-gray-700 text-gray-900 dark:text-white",
              footerActionLink: "text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300",
            },
          }}
        />
      </div>
      <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
        By logging in, you agree to our{" "}
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
