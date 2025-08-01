//ovulation calc
import React, { useState, useEffect } from "react";
import { addDays, format } from "date-fns";
import { ChevronRight } from "lucide-react";
import SideBar from "./SideBar";
import OvulationImg from '../../public/ovulationsecimg.png';
import useScreenSize from "../hooks/useScreenSize";
import { useTheme } from "../context/ThemeContext"; // Import the useTheme hook

const OvulationCalculator = () => {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [startDate, setStartDate] = useState("");
    const [gestationInfo, setGestationInfo] = useState(null);
    const [cycleLength, setCycleLength] = useState(28);
    const [results, setResults] = useState(null);

    // Use the global theme context instead
    const { theme, toggleTheme } = useTheme();

    const { width } = useScreenSize();

    const toggleSidebar = () => {
        setSidebarVisible((prev) => !prev);
    };

    const calculateOvulation = () => {
        if (!startDate || isNaN(new Date(startDate))) {
            alert("Please select a valid start date.");
            return;
        }

        const today = new Date();
        const start = new Date(startDate);
        const fiveYearsAgo = addDays(today, -365 * 5);

        if (start > today || start < fiveYearsAgo) {
            alert("Start date must be within the past 5 years and not in the future.");
            return;
        }

        if (isNaN(cycleLength) || cycleLength < 20 || cycleLength > 40) {
            alert("Cycle length must be between 20 and 40 days.");
            return;
        }

        const ovulationDate = addDays(start, cycleLength - 14);
        const fertileStart = addDays(ovulationDate, -4);
        const fertileEnd = addDays(ovulationDate, 1);
        const nextPeriod = addDays(start, cycleLength);

        setResults({
            ovulationDate: format(ovulationDate, "EEE MMM dd yyyy"),
            fertileWindow: `${format(fertileStart, "EEE MMM dd yyyy")} - ${format(
                fertileEnd,
                "EEE MMM dd yyyy"
            )}`,
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
    };

    return (
        <div className="flex min-h-screen">
            <div className="fixed top-0 left-0 z-50">
                <SideBar
                    sidebarVisible={sidebarVisible}
                    setSidebarVisible={setSidebarVisible}
                    activeLink={5}
                    toggleDarkMode={toggleTheme} // Use the global toggleTheme
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
                        className={`transition-transform duration-300 block m-auto ${
                            sidebarVisible ? "rotate-180" : "rotate-0"
                        }`}
                    />
                </button>
            )}

            {/* Main Content */}
            <div
                className={`flex-1 p-4 sm:p-8 bg-white dark:bg-gray-900 text-black dark:text-gray-100 transition-all duration-300 overflow-y-auto ${
                    width > 816 && sidebarVisible ? "ml-64" : "ml-0"
                }`}
            >
                <div className="text-center mb-10 max-w-4xl mx-auto">
                    <h2 className="text-5xl font-bold mb-7 text-purple-900 dark:text-purple-300 mt-5">
                        Determine Your{" "}
                        <span className="text-pink-700 dark:text-pink-400">Ovulation Cycle</span>
                    </h2>
                    <p className="text-m text-gray-700 dark:text-gray-300 pl-4 pr-4">
                        Use this calculator to pinpoint your most fertile days by identifying when you're likely ovulating. Menstrual cycles can vary from person to person and even from month to month, so this tool helps you better understand your unique cycle. <br/> If conception occurs, the calculator will also provide estimated pregnancy milestones such as your gestational age, trimester dates, and expected due date, so you can track your pregnancy journey right from the start.
                    </p>
                </div>

                {/* Form */}
                <div className="bg-pink-50 dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-xl mx-auto mb-20">
                    <div className="flex justify-center mb-10">
                        <img
                            src={OvulationImg}
                            alt="Ovulation illustration"
                            className="w-80 h-auto"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-semibold">
                            Last Period Start Date
                        </label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            max={format(new Date(), "yyyy-MM-dd")}
                            min={format(addDays(new Date(), -365 * 5), "yyyy-MM-dd")}
                            className="w-full p-2 rounded bg-white text-black dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-semibold">
                            Cycle Length (in days)
                        </label>
                        <input
                            type="number"
                            min={20}
                            max={40}
                            value={cycleLength}
                            onChange={(e) => setCycleLength(parseInt(e.target.value))}
                            className="w-full p-2 rounded bg-white text-black dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600"
                        />
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

                {/* Results */}
                {results && (
                    <>
                        <h2 className="text-3xl font-extrabold text-pink-700 mb-6 text-center mt-12">
                            Ovulation Dates
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            <div className="bg-pink-100 dark:bg-gray-700 text-black dark:text-white p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-2">Fertile Window</h2>
                                <p className="bg-pink-300 dark:bg-pink-600 inline-block px-3 py-1 rounded mb-2">
                                    {results.fertileWindow}
                                </p>
                                <p className="text-sm">
                                    The most fertile days in your cycle where conception is most
                                    likely.
                                </p>
                            </div>

                            <div className="bg-pink-100 dark:bg-gray-700 text-black dark:text-white p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-2">Ovulation Date</h2>
                                <p className="bg-pink-300 dark:bg-pink-600 inline-block px-3 py-1 rounded mb-2">
                                    {results.ovulationDate}
                                </p>
                                <p className="text-sm">
                                    Estimated date of ovulation when the egg is released.
                                </p>
                            </div>

                            <div className="bg-pink-100 dark:bg-gray-700 text-black dark:text-white p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-2">Next Period Date</h2>
                                <p className="bg-pink-300 dark:bg-pink-600 inline-block px-3 py-1 rounded mb-2">
                                    {results.nextPeriod}
                                </p>
                                <p className="text-sm">
                                    Your next period is expected around this date based on your
                                    cycle.
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
                        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-10 ">
                            {/* Gestational Age */}
                            <div className="bg-pink-100 dark:bg-gray-700 text-black dark:text-white p-6 rounded-lg shadow-md">
                                <h2 className="text-lg font-bold mb-2">
                                    Your Gestational Age is {gestationInfo.gestationalAge}. You are expected to meet your baby around {gestationInfo.dueDate}.
                                </h2>
                                <p className="text-sm mt-2">
                                    Gestational age is the age of pregnancy and is counted from the first day of your last menstrual period.
                                </p>
                            </div>

                            {/* First Trimester */}
                            <div className="bg-pink-100 dark:bg-gray-700 text-black dark:text-white p-6 rounded-lg shadow-md">
                                <h2 className="text-lg font-bold mb-2">First Trimester</h2>
                                <p className="bg-pink-300 dark:bg-pink-600 inline-block px-3 py-1 rounded mb-2 font-semibold">
                                    {gestationInfo.firstTrimester}
                                </p>
                                <p className="text-sm">
                                    In this trimester, the baby’s organs, spine, and nervous system begin to form. By the end, the baby has a heartbeat and facial features. Many women experience morning sickness and fatigue.
                                </p>
                            </div>

                            {/* Second Trimester */}
                            <div className="bg-pink-100 dark:bg-gray-700 text-black dark:text-white p-6 rounded-lg shadow-md">
                                <h2 className="text-lg font-bold mb-2">Second Trimester Ends On</h2>
                                <p className="bg-pink-300 dark:bg-pink-600 inline-block px-3 py-1 rounded mb-2 font-semibold">
                                    {gestationInfo.secondTrimesterEnd}
                                </p>
                                <p className="text-sm">
                                    This is often called the "growth" phase. The baby’s organs mature, movement may be felt, bones develop, and mothers may notice increased energy and a visible baby bump.
                                </p>
                            </div>

                            {/* Third Trimester */}
                            <div className="bg-pink-100 dark:bg-gray-700 text-black dark:text-white p-6 rounded-lg shadow-md">
                                <h2 className="text-lg font-bold mb-2">Third Trimester Ends On</h2>
                                <p className="bg-pink-300 dark:bg-pink-600 inline-block px-3 py-1 rounded mb-2 font-semibold">
                                    {gestationInfo.thirdTrimesterEnd}
                                </p>
                                <p className="text-sm">
                                    The baby gains weight rapidly, and organs like lungs and brain prepare for life outside. Movements like kicking and sucking begin. Physical discomfort increases as labor approaches.
                                </p>
                            </div>
                        </div>
                    </>
                )}
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-12 max-w-2xl mx-auto">
                    <strong>Note:</strong> This tool is a general calculator and should not replace professional medical advice. Results may vary from person to person. It is recommended to consult with a qualified healthcare provider for personalized guidance.
                </p>

            </div>
        </div>
    );
};

export default OvulationCalculator;
