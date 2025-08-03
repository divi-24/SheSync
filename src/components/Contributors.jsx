//contributor.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import { ChevronRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import useScreenSize from "../hooks/useScreenSize";


const Contributors = () => {
    const [contributors, setContributors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const { width } = useScreenSize();
    const { theme, toggleTheme } = useTheme();

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    useEffect(() => {
        const fetchAllContributors = async () => {
            let allContributors = [];
            let page = 1;
            const perPage = 100;

            try {
                while (true) {
                    const res = await axios.get(
                        `https://api.github.com/repos/divi-24/SheSync/contributors`,
                        {
                            params: {
                                per_page: perPage,
                                page: page,
                            },
                            headers: {
                                Accept: "application/vnd.github+json",
                            },
                        }
                    );

                    if (res.data.length === 0) break;
                    allContributors = [...allContributors, ...res.data];
                    page++;
                }

                setContributors(allContributors);
            } catch (err) {
                console.error("Error fetching contributors:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllContributors();

        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
            <SideBar
                sidebarVisible={sidebarVisible}
                setSidebarVisible={setSidebarVisible}
                activeLink={16}
                toggleDarkMode={toggleTheme}
            />

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

            <div
                className={`flex-1 p-4 sm:p-8 bg-white dark:bg-gray-900 text-black dark:text-gray-100 transition-all duration-300 overflow-y-auto ${
                    width > 816 && sidebarVisible ? "ml-64" : "ml-0"
                }`}
            >
                {loading ? (
                    <div className="text-center py-10">
                        <p className="text-gray-500 dark:text-gray-400">Loading contributors...</p>
                    </div>
                ) : (
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-4xl font-extrabold mb-10 text-center">
                            <span className="inline-block mr-2 text-black dark:text-white">🚀</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-pink-400 to-pink-600">
                                Meet the Contributors
                            </span>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                            {contributors.map((contributor) => (
                                <a
                                    key={contributor.id}
                                    href={contributor.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-xl bg-white dark:bg-gray-800 border border-pink-200 dark:border-pink-700 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-[1.03]"
                                >
                                    <div className="flex flex-col items-center p-4 space-y-3">
                                        <div className="w-20 h-20 rounded-full overflow-hidden bg-white">
                                            <img
                                                src={contributor.avatar_url}
                                                alt={contributor.login}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-lg font-semibold text-pink-700 dark:text-pink-300">
                                                {contributor.login}
                                            </p>
                                            <p className="text-sm text-pink-600 dark:text-pink-400 bg-pink-100 dark:bg-pink-800/30 px-3 py-1 mt-1 rounded-full">
                                                🌟 {contributor.contributions} contributions
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Contributors;
