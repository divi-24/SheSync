import React, { useState, useEffect } from "react";
import { addDays, format } from "date-fns";
import { ChevronRight } from "lucide-react";
import SideBar from "./SideBar";
import OvulationImg from '../../public/ovulationsecimg.png';
import useScreenSize from "../hooks/useScreenSize";

const OvulationCalculator = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [cycleLength, setCycleLength] = useState(28);
  const [results, setResults] = useState(null);
  const [gestationInfo, setGestationInfo] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [errors, setErrors] = useState({ startDate: "", cycleLength: "" });

  const { width } = useScreenSize();

  const toggleSidebar = () => setSidebarVisible((prev) => !prev);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const todayStr = new Date().toISOString().split("T")[0];
  const today = new Date();

  const calculateOvulation = () => {
    let newErrors = { startDate: "", cycleLength: "" };
    let valid = true;

    const start = new Date(startDate);

    if (!startDate || isNaN(start)) {
      newErrors.startDate = "Please select a valid start date.";
      valid = false;
    } else if (start > today) {
      newErrors.startDate = "Start date cannot be in the future.";
      valid = false;
    }

    if (cycleLength < 15 || cycleLength > 60) {
      newErrors.cycleLength = "Cycle length must be between 15 and 60 days.";
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) return;

    const ovulationDate = addDays(start, cycleLength - 14);
    const fertileStart = addDays(ovulationDate, -4);
    const fertileEnd = addDays(ovulationDate, 1);
    const nextPeriod = addDays(start, cycleLength);

    setResults({
      ovulationDate: format(ovulationDate, "EEE MMM dd yyyy"),
      fertileWindow: `${format(fertileStart, "EEE MMM dd yyyy")} - ${format(fertileEnd, "EEE MMM dd yyyy")}`,
      nextPeriod: format(nextPeriod, "EEE MMM dd yyyy"),
    });

    const gestationalAgeInDays = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    const gestationalWeeks = Math.floor(gestationalAgeInDays / 7);
    const gestationalDays = gestationalAgeInDays % 7;
    const dueDate = addDays(start, 280);

    const firstTrimesterEnd = addDays(start, 13 * 7);
    const secondTrimesterEnd = addDays(start, 27 * 7);
    const thirdTrimesterEnd = dueDate;

    setGestationInfo({
      gestationalAge: `${gestationalWeeks} weeks and ${gestationalDays} days`,
      dueDate: format(dueDate, "EEE MMM dd yyyy"),
      firstTrimester: `${format(start, "EEE MMM dd yyyy")} – ${format(firstTrimesterEnd, "EEE MMM dd yyyy")}`,
      secondTrimesterEnd: format(secondTrimesterEnd, "EEE MMM dd yyyy"),
      thirdTrimesterEnd: format(thirdTrimesterEnd, "EEE MMM dd yyyy"),
    });
  };

  const resetForm = () => {
    setStartDate("");
    setCycleLength(28);
    setResults(null);
    setGestationInfo(null);
    setErrors({ startDate: "", cycleLength: "" });
  };

  return (
    <div className={`flex min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="fixed top-0 left-0 z-50">
        <SideBar
          sidebarVisible={sidebarVisible}
          setSidebarVisible={setSidebarVisible}
          activeLink={5}
          toggleDarkMode={toggleDarkMode}
        />
      </div>

      {width > 816 && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 z-50 w-10 p-2 bg-pink-600 text-white rounded-r-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
          style={{
            left: sidebarVisible ? "256px" : "0px",
          }}
          aria-label={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
        >
          <ChevronRight
            size={14}
            className={`transition-transform duration-300 block m-auto ${sidebarVisible ? "rotate-180" : "rotate-0"}`}
          />
        </button>
      )}

      <div
        className={`flex-1 p-4 sm:p-8 bg-white dark:bg-gray-900 text-black dark:text-gray-100 transition-all duration-300 overflow-y-auto ${width > 816 && sidebarVisible ? "ml-64" : "ml-0"}`}
      >
        <div className="text-center mb-10 max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-7 text-purple-900 mt-5">
            Determine Your <span className="text-pink-700">Ovulation Cycle</span>
          </h2>
          <p className="text-m text-gray-700 dark:text-gray-300 px-4">
            Use this calculator to pinpoint your most fertile days by identifying when you're likely ovulating...
          </p>
        </div>

        <div className="bg-pink-50 dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-xl mx-auto mb-20">
          <div className="flex justify-center mb-10">
            <img
              src={OvulationImg}
              alt="Ovulation illustration"
              className="w-80 h-auto"
            />
          </div>

          {/* Date Input */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Last Period Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              max={todayStr}
              className={`w-full p-2 rounded bg-white text-black dark:bg-gray-500 dark:text-white border ${
                errors.startDate ? "border-pink-600" : "border-gray-300"
              }`}
            />
            {errors.startDate && (
              <p className="text-pink-600 text-sm mt-1 font-medium">{errors.startDate}</p>
            )}
          </div>

          {/* Cycle Length Input */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Cycle Length (in days)</label>
            <input
              type="number"
              value={cycleLength}
              min={15}
              max={60}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value)) setCycleLength(value);
              }}
              className={`w-full p-2 rounded bg-white text-black dark:bg-gray-500 dark:text-white border ${
                errors.cycleLength ? "border-pink-600" : "border-gray-300"
              }`}
            />
            {errors.cycleLength && (
              <p className="text-pink-600 text-sm mt-1 font-medium">{errors.cycleLength}</p>
            )}
          </div>

          <div className="flex gap-4 justify-center mt-4">
            <button
              onClick={calculateOvulation}
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-800"
            >
              Calculate
            </button>
            <button
              onClick={resetForm}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Results Section */}
        {results && (
          <>
            <h2 className="text-3xl font-extrabold text-pink-700 mb-6 text-center mt-12">
              Ovulation Dates
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="bg-pink-100 text-black p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Fertile Window</h2>
                <p className="bg-pink-300 inline-block px-3 py-1 rounded mb-2">
                  {results.fertileWindow}
                </p>
                <p className="text-sm">
                  The most fertile days in your cycle where conception is most likely.
                </p>
              </div>
              <div className="bg-pink-100 text-black p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Ovulation Date</h2>
                <p className="bg-pink-300 inline-block px-3 py-1 rounded mb-2">
                  {results.ovulationDate}
                </p>
                <p className="text-sm">
                  Estimated date of ovulation when the egg is released.
                </p>
              </div>
              <div className="bg-pink-100 text-black p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Next Period Date</h2>
                <p className="bg-pink-300 inline-block px-3 py-1 rounded mb-2">
                  {results.nextPeriod}
                </p>
                <p className="text-sm">
                  Your next period is expected around this date based on your cycle.
                </p>
              </div>
            </div>
          </>
        )}

        {gestationInfo && (
          <>
            <h2 className="text-3xl font-extrabold text-pink-700 mb-6 text-center mt-12">
              Pregnancy Milestones
            </h2>
            <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-10">
              <div className="bg-pink-100 text-black p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-2">
                  Your Gestational Age is {gestationInfo.gestationalAge}. You are expected to meet your baby around {gestationInfo.dueDate}.
                </h2>
              </div>
              <div className="bg-pink-100 text-black p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-2">First Trimester</h2>
                <p className="bg-pink-300 inline-block px-3 py-1 rounded mb-2 font-semibold">
                  {gestationInfo.firstTrimester}
                </p>
              </div>
              <div className="bg-pink-100 text-black p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-2">Second Trimester Ends On</h2>
                <p className="bg-pink-300 inline-block px-3 py-1 rounded mb-2 font-semibold">
                  {gestationInfo.secondTrimesterEnd}
                </p>
              </div>
              <div className="bg-pink-100 text-black p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-2">Third Trimester Ends On</h2>
                <p className="bg-pink-300 inline-block px-3 py-1 rounded mb-2 font-semibold">
                  {gestationInfo.thirdTrimesterEnd}
                </p>
              </div>
            </div>
          </>
        )}

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-12 max-w-2xl mx-auto">
          <strong>Note:</strong> This tool is a general calculator and should not replace professional medical advice.
        </p>
      </div>
    </div>
  );
};

export default OvulationCalculator;
