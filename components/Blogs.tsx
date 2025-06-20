'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  HeartPulse,
  MessageSquare,
  HeartHandshake,
  AppWindowMac,
  Frown,
  Smile,
  Angry,
  Coffee,
  Zap,
  Moon,
  Handshake,
  ChevronDown,
  Gamepad2,
  ChevronUp,
  Heart,
  Sun,
  LayoutDashboard,
  Home,
  GraduationCap,
  ShoppingBag,
  ActivitySquare,
  ClipboardList,
  Stethoscope,
  Bot,
  Search,
  BookOpen,
  Utensils,
  Leaf,
  Clock,
  Filter,
  Bookmark,
  Share2,
  Award,
  Sparkles,
  Brain,
  Dumbbell,
  Pill,
  Droplet,
  X,
  ChevronRight,
} from "lucide-react";
import { Quiz } from "./Quiz";
import SideBar from "./SideBar";
import useScreenSize from "../hooks/useScreenSize";

const blogPosts = [
  {
    id: 1,
    title: "Understanding Your Menstrual Cycle",
    excerpt: "Learn about the phases of your menstrual cycle and how they affect your body.",
    author: "Dr. Janvi Gupta",
    date: "2024-03-15",
    readingTime: "5 min",
    icon: <Calendar className="h-12 w-12 text-pink-500" />,
    category: "Health",
    content: "The menstrual cycle is typically 28 days long, but can range from 21 to 35 days. It consists of four main phases: menstruation, the follicular phase, ovulation, and the luteal phase. Each phase is characterized by different hormonal changes that affect your body and mood. Understanding these phases can help you better manage your health and well-being throughout your cycle.",
  },
  {
    id: 2,
    title: "How long does the menstrual cycle and period last?",
    excerpt: "Discover the best foods to eat during your menstrual cycle for optimal health.",
    author: "Nutritionist Sachin Rai",
    date: "2024-03-10",
    readingTime: "4 min",
    icon: <Utensils className="h-12 w-12 text-green-500" />,
    category: "Nutrition",
    content: "Your menstrual cycle takes around 28 days to complete, but this is a good time to point out that EVERYONE is different! Just like your fingerprints are unique, so is your bloody brilliant body and how you experience periods. So, while we say 28 days it might be a little longer, it might be a little shorter, there really aren't any set rules here. Of those 28 days, you could expect to bleed for anywhere between 3-8 days. Again, everyone is different, and your periods are likely to change. Your body can take some time to get into its own flow, so cut it a bit of slack - it's learning what to do while you're getting used to things too!",
  },
  // Add more blog posts here...
];

const womenHealthTopics = [
  {
    id: 1,
    question: "What is a period?",
    answer: "Your period or menstruation (that's the 'sciencey' name) is part of your menstrual cycle. This cycle is ultimately your body's way of preparing itself for a possible pregnancy. During your menstrual cycle, there is an increase and decrease in a number of different hormones such as oestrogen and progesterone which control different aspects of this cycle, you'll be hearing a lot about these hormones, so sit tight.During your cycle your body releases an egg from your ovaries – we're talking teeny tiny eggs here - you can't see them with the naked eye, they're that small! In order for the egg to be released it has to be matured, which is a job for our hormones.These hormones are also responsible for making the lining of your uterus thick. Should one day an egg get fertilised by sperm, it would land on the thick cosy lining and that's where a pregnancy would start. However, if the egg doesn't get fertilised your body no longer needs the lining, so (here comes the hormones again!) your hormones instruct your body to break the lining down and remove it from the uterus via your vagina.",
  },
  {
    id: 2,
    question: "Breast Health and Self-Examination",
    answer: "Regular breast self-examinations are crucial for early detection of any abnormalities. Perform a self-exam once a month, preferably a few days after your period ends. Look for changes in size, shape, or color, and feel for lumps or thickening. If you notice any changes or have concerns, consult with your healthcare provider promptly.",
  },
  // Add more topics here...
];

export function Blogs() {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [readSections, setReadSections] = useState(
    Array(womenHealthTopics.length).fill(false)
  );
  const [completedBlogs, setCompletedBlogs] = useState(0);
  const [completedTopics, setCompletedTopics] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [savedPosts, setSavedPosts] = useState<number[]>([]);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [allSectionsRead, setAllSectionsRead] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleAccordion = (id: number) => {
    setActiveItem((prev) => (prev === id ? null : id));
  };

  const handleRead = (index: number) => {
    const updatedReadSections = [...readSections];
    updatedReadSections[index] = true;
    setReadSections(updatedReadSections);
    setCompletedTopics(updatedReadSections.filter(Boolean).length);

    // Check if all sections are read
    if (updatedReadSections.every(Boolean)) {
      setAllSectionsRead(true);
    }
  };

  const handleSavePost = (postId: number) => {
    setSavedPosts((prev) => {
      if (prev.includes(postId)) {
        return prev.filter((id) => id !== postId);
      } else {
        return [...prev, postId];
      }
    });
  };

  const handleShare = (postId: number) => {
    console.log(`Sharing post ${postId}`);
  };

  const handleCardClick = (post: any) => {
    setSelectedPost(post);
    if (!savedPosts.includes(post.id)) {
      setCompletedBlogs((prev) => prev + 1);
    }
  };

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const filteredPosts = selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter((post) => post.category === selectedCategory);

  const { width } = useScreenSize();

  return (
    <div className={`flex h-screen`}>
      <SideBar
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        activeLink={2}
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

      {/* Main Content */}
      <main
        className={`flex-1 p-6 overflow-auto bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out ${
          sidebarVisible ? "ml-64" : "ml-0"
        }`}
      >
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-400">
              Education Hub
            </h2>
          </div>

          {/* Featured Article */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-pink-800 dark:text-pink-300 mb-2 flex items-center">
              <Sparkles className="h-6 w-6 mr-2 text-yellow-400" />
              Featured Article
            </h2>
            <div className="flex items-center space-x-4">
              <Award className="h-16 w-16 text-pink-500" />
              <div>
                <h3 className="text-xl font-semibold text-pink dark:text-gray-200">
                  Embracing Your Cycle: A Guide to Menstrual Wellness
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Discover how to work with your menstrual cycle for optimal
                  health and well-being.
                </p>
              </div>
            </div>
            <button className="mt-4 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors duration-300">
              Read More
            </button>
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-grow text-white">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full px-4 py-2 text-white rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:bg-gray-700 dark:text-white transition-all duration-300 focus:shadow-lg"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-white" />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 text-white rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:bg-gray-700 dark:text-white transition-all duration-300 focus:shadow-lg"
            >
              <option value="All">All Categories</option>
              <option value="Health">Health</option>
              <option value="Nutrition">Nutrition</option>
              <option value="Wellness">Wellness</option>
              <option value="History">History</option>
              <option value="Fitness">Fitness</option>
              <option value="Mental Health">Mental Health</option>
              <option value="Hygiene">Hygiene</option>
              <option value="Contraception">Contraception</option>
            </select>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => handleCardClick(post)}
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    {post.icon}
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSavePost(post.id);
                        }}
                        className={`p-2 rounded-full ${
                          savedPosts.includes(post.id)
                            ? "bg-pink-100 text-pink-500"
                            : "bg-gray-100 text-gray-500"
                        } hover:bg-pink-200 transition-colors duration-300`}
                      >
                        <Bookmark className="h-5 w-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(post.id);
                        }}
                        className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-pink-200 transition-colors duration-300"
                      >
                        <Share2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-400 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-400">
                    <span>{post.author}</span>
                    <span>{post.readingTime} read</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Women's Health Topics Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-400 mb-4">
              Women's Health 101
            </h2>
            <p className="text-gray-800 dark:text-gray-300 mb-6">
              Explore key topics in Women's health to deepen your understanding
              and take control of your well-being.
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6 dark:bg-gray-700 overflow-hidden">
              <div
                className="bg-gradient-to-r from-pink-500 to-purple-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${
                    (readSections.filter(Boolean).length /
                      readSections.length) *
                    100
                  }%`,
                }}
              ></div>
            </div>

            {/* Accordion */}
            <div className="space-y-4">
              {womenHealthTopics.map(({ id, question, answer }, index) => (
                <div
                  key={id}
                  className="border border-pink-200 dark:border-pink-800 rounded-lg overflow-hidden transition-all duration-300"
                >
                  <button
                    className="flex justify-between items-center w-full p-4 text-left bg-pink-50 dark:bg-gray-700 hover:bg-pink-100 dark:hover:bg-gray-600 transition-colors duration-300"
                    onClick={() => toggleAccordion(id)}
                  >
                    <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                      {question}
                    </span>
                    {activeItem === id ? (
                      <ChevronUp className="text-pink-500" />
                    ) : (
                      <ChevronDown className="text-pink-500" />
                    )}
                  </button>
                  {activeItem === id && (
                    <div className="p-4 bg-white dark:bg-gray-800">
                      <p className="text-gray-800 dark:text-gray-300">
                        {answer}
                      </p>
                      <div className="mt-4">
                        <label className="flex items-center space-x-2 text-gray-800 dark:text-gray-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={readSections[index]}
                            onChange={() => handleRead(index)}
                            className="form-checkbox text-pink-500 rounded focus:ring-pink-500 h-5 w-5 transition duration-150 ease-in-out"
                          />
                          <span>I've read this section</span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quiz Section */}
          {allSectionsRead && (
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-400 mb-4">
                Knowledge Check Quiz
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Test your knowledge on women's health topics. Answer the
                questions below and see how much you've learned!
              </p>
              <Quiz onQuizComplete={handleQuizComplete} />
            </div>
          )}
        </div>
      </main>

      {/* Modal for selected post */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {selectedPost.title}
              </h2>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mb-4">{selectedPost.icon}</div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {selectedPost.content}
            </p>
            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
              <span>{selectedPost.author}</span>
              <span>{selectedPost.date}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}