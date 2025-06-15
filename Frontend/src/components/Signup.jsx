import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Home, Moon, Sun } from "react-feather";

const server_url = import.meta.env.VITE_SERVER_URL;

export function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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

  function handleName(e) {
    setName(e.target.value);
    setError("");
  }

  function handleEmail(e) {
    setEmail(e.target.value);
    setError("");
  }

  function handlePassword(e) {
    setPassword(e.target.value);
    setError("");
  }

  async function handleSignup() {
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    const userData = { name, email, password };

    try {
      try {
        const response = await axios.post(`${server_url}api/user/signup`, userData);
        console.log("Signup successful:", response.data);
        alert("You have signed up successfully");
        navigate("/login");
        return;
      } catch (primaryError) {
        console.warn(
          "Primary server failed, attempting local fallback:",
          primaryError
        );
      }

      const response = await axios.post(
        "http://localhost:3000/api/user/signup",
        userData
      );
      console.log("Signup successful via local server:", response.data);
      alert("You have signed up successfully");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);

      if (error.response) {
        setError(
          error.response.data.message || "Signup failed. Please try again."
        );
      } else if (error.request) {
        setError(
          "No response from server. Please check your network connection."
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  }

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
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none text-white rounded-none relative block w-full px-3 py-2 border 
                                border-gray-300 dark:border-gray-600 
                                text-white-700 dark:text-white 
                                placeholder-gray-500 dark:placeholder-gray-400 
                                bg-white dark:bg-gray-700 
                                focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 
                                sm:text-sm transition-colors duration-200"
                placeholder="Full Name"
                value={name}
                onChange={handleName}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="text-white appearance-none rounded-none relative block w-full px-3 py-2 border 
                                border-gray-300 dark:border-gray-600 
                                text-white-600 dark:text-white 
                                placeholder-gray-500 dark:placeholder-gray-400 
                                bg-white dark:bg-gray-700 
                                focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 
                                sm:text-sm transition-colors duration-200"
                placeholder="Email address"
                value={email}
                onChange={handleEmail}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border 
                                text-white border-gray-300 dark:border-gray-600 
                                 dark:text-white 
                                placeholder-gray-500 dark:placeholder-gray-400 
                                bg-white dark:bg-gray-700 
                                focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 
                                sm:text-sm transition-colors duration-200"
                placeholder="Password"
                value={password}
                onChange={handlePassword}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 dark:text-red-400 text-sm mt-2">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              onClick={handleSignup}
            >
              Sign up
            </button>
          </div>
        </form>

        <div className="text-sm text-center">
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200"
          >
            Already have an account? Log in
          </Link>
        </div>
      </div>
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
