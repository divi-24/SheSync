import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, Moon, Sun } from "react-feather";
import { FaLinkedin, FaTwitter, FaInstagram, FaFacebookF } from "react-icons/fa";

export default function AboutUs() {
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
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col justify-between">
      {/* Glow animation keyframes */}
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 10px rgba(236, 72, 153, 0.6), 0 0 20px rgba(139, 92, 246, 0.4), 0 0 30px rgba(79, 70, 229, 0.3); }
          50% { box-shadow: 0 0 20px rgba(236, 72, 153, 0.8), 0 0 30px rgba(139, 92, 246, 0.6), 0 0 40px rgba(79, 70, 229, 0.5); }
        }
        .glow-animate {
          animation: pulse-glow 2s infinite;
        }
        .hover-bounce:hover {
          transform: translateY(-4px);
          transition: transform 0.3s ease;
        }
        .fade-in {
          animation: fadeIn 1s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header */}
      <header className="p-6 flex justify-between items-center bg-white dark:bg-gray-800 shadow">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
          <Home className="w-6 h-6" /> <span>HealthMate</span>
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
          {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          <span className="sr-only">Toggle dark mode</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold mb-8 text-center">About Us</h1>

        {/* Mission Section */}
        <section className="mb-16 fade-in">
          <div className="max-w-3xl mx-auto p-8 rounded-2xl shadow-lg bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 dark:from-pink-600 dark:via-purple-700 dark:to-indigo-800 text-center hover:shadow-2xl transition duration-300">
            <h2 className="text-3xl font-bold mb-4 relative inline-block">
              Our Mission
              <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-1 w-24 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full"></span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-700 dark:text-gray-200">
              At <span className="font-semibold text-pink-600 dark:text-pink-300">HealthMate</span>, 
              our mission is to empower individuals to take charge of their health 
              with <span className="font-semibold">cutting-edge tools</span>, 
              <span className="font-semibold"> personalized insights</span>, and 
              <span className="font-semibold"> comprehensive support</span>. 
              We believe in building a healthier tomorrow, one step at a time.
            </p>
          </div>
        </section>

        {/* Comprehensive Health Management */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Comprehensive Health Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Fitness Tracking", desc: "Monitor your workouts, calories, and progress effortlessly." },
              { title: "Diet & Nutrition", desc: "Get personalized diet plans and track your daily nutrition." },
              { title: "Mental Wellness", desc: "Access mindfulness tools and resources for stress management." },
              { title: "Sleep Analysis", desc: "Improve your rest with detailed sleep tracking and tips." },
              { title: "Medical Records", desc: "Securely store and access your health records anywhere." },
              { title: "Doctor Consultations", desc: "Book online appointments and connect with healthcare providers." },
            ].map((item, index) => (
              <div
                key={index}
                className="gradient-card-light dark:gradient-card-dark p-6 rounded-2xl shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl"
              >
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-700 dark:text-gray-200">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What Users Say */}
        <section className="mb-16 fade-in">
          <h2 className="text-2xl font-bold mb-6 text-center">What Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sophia", feedback: "HealthMate completely changed how I track my fitness. The insights are spot on!", rating: 5 },
              { name: "Aarav", feedback: "I love the nutrition tracking feature. It's simple and effective!", rating: 4 },
              { name: "Emily", feedback: "The sleep analysis helped me improve my bedtime routine. Feeling more energetic now!", rating: 5 },
            ].map((user, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-2xl transform transition duration-300 hover:scale-105 text-center"
              >
                {/* Avatar Circle with Initials */}
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center text-white text-xl font-bold glow-animate mb-4">
                  {user.name[0]}
                </div>
                <p className="text-gray-700 dark:text-gray-200 mb-4 italic">“{user.feedback}”</p>
                {/* Star Ratings */}
                <div className="flex justify-center mb-2">
                  {Array(user.rating)
                    .fill("⭐")
                    .map((star, i) => (
                      <span key={i} className="text-yellow-400">{star}</span>
                    ))}
                </div>
                <h4 className="font-semibold text-lg">{user.name}</h4>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-pink-100 to-purple-100 dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-indigo-500">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-500">Careers</a></li>
              <li><a href="#" className="hover:text-indigo-500">Press</a></li>
              <li><a href="#" className="hover:text-indigo-500">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-indigo-500">Help Center</a></li>
              <li><a href="#" className="hover:text-indigo-500">Community</a></li>
              <li><a href="#" className="hover:text-indigo-500">Events</a></li>
              <li><a href="#" className="hover:text-indigo-500">Guides</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-indigo-500">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-500">Terms of Service</a></li>
              <li><a href="#" className="hover:text-indigo-500">Disclaimer</a></li>
              <li><a href="#" className="hover:text-indigo-500">Security</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="https://linkedin.com" className="w-10 h-10 flex items-center justify-center rounded-full text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 glow-animate hover-bounce transition-all"><FaLinkedin /></a>
              <a href="https://twitter.com" className="w-10 h-10 flex items-center justify-center rounded-full text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 glow-animate hover-bounce transition-all"><FaTwitter /></a>
              <a href="https://instagram.com" className="w-10 h-10 flex items-center justify-center rounded-full text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 glow-animate hover-bounce transition-all"><FaInstagram /></a>
              <a href="https://facebook.com" className="w-10 h-10 flex items-center justify-center rounded-full text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 glow-animate hover-bounce transition-all"><FaFacebookF /></a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} HealthMate. All rights reserved. <br />
          Empowering healthier lives every day.
        </div>
      </footer>
    </div>
  );
}
