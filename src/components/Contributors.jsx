import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import { ChevronRight } from "lucide-react";

const Contributors = () => {
    const [contributors, setContributors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [width, setWidth] = useState(window.innerWidth);

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
        <div className="flex h-screen overflow-hidden">
            <SideBar
                sidebarVisible={sidebarVisible}
                setSidebarVisible={setSidebarVisible}
                activeLink={7}
            />

            {width > 816 && (
                <button
                    onClick={toggleSidebar}
                    className="fixed left-0 top-0 w-10 z-10 p-2 bg-pink-600 text-white rounded-r-md transition-all duration-300 ease-in-out focus:outline-none"
                    style={{
                        transform: sidebarVisible ? "translateX(256px)" : "translateX(0)",
                    }}
                    aria-label={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
                >
                    <ChevronRight
                        size={14}
                        className={`transition-transform duration-300 block m-auto ${sidebarVisible ? "rotate-180" : "rotate-0"
                            }`}
                    />
                </button>
            )}

            <div
                className={`flex-1 overflow-y-auto px-4 py-10 transition-all duration-300 ${sidebarVisible ? "ml-64" : "ml-0"
                    }`}
            >
                {loading ? (
                    <div className="text-center py-10">
                        <p className="text-zinc-500">Loading contributors...</p>
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
                                    className="relative group rounded-xl bg-gradient-to-br from-pink-50 via-white to-pink-100 dark:from-pink-900/30 dark:via-pink-950/20 dark:to-zinc-900 border border-pink-200 dark:border-pink-800 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-[1.03] hover:border-pink-600"
                                >
                                    <div className="flex flex-col items-center p-4 space-y-3">
                                        <div className="w-20 h-20 rounded-full border-4 border-pink-500 group-hover:border-white transition-all duration-300 overflow-hidden shadow-lg">
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
                                            <p className="text-sm text-pink-600 dark:text-pink-400 bg-pink-100 dark:bg-pink-800/30 px-3 py-1 mt-1 rounded-full shadow-inner">
                                                🌟 {contributor.contributions} contributions
                                            </p>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 rounded-xl ring-pink-500 ring-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></div>
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
