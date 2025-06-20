import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Stethoscope,
  Search,
  Utensils,
  Leaf,
  Clock,
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
    title: (
      <a
        className="text-pink-600"
        href="https://youtu.be/7HlHGLr1hTA?si=mP2SIqz85Emga8od"
      >
        "Understanding Your Menstrual Cycle"
      </a>
    ),
    excerpt:
      "Learn about the phases of your menstrual cycle and how they affect your body.",
    author: "Dr. Janvi Gupta",
    date: "2024-03-15",
    readingTime: "5 min",
    icon: <Calendar className="h-12 w-12 text-pink-500" />,
    category: "Health",
    content:
      "The menstrual cycle is typically 28 days long, but can range from 21 to 35 days. It consists of four main phases: menstruation, the follicular phase, ovulation, and the luteal phase. Each phase is characterized by different hormonal changes that affect your body and mood. Understanding these phases can help you better manage your health and well-being throughout your cycle.",
  },
  {
    id: 2,
    title: (
      <a
        className="text-pink-600"
        href="https://youtu.be/kQyByK9XaQg?si=fz0az0Hz4fizD3_B"
      >
        "How long does the menstrual cycle and period last?"
      </a>
    ),
    excerpt:
      "Discover the best foods to eat during your menstrual cycle for optimal health.",
    author: "Nutritionist Sachin Rai",
    date: "2024-03-10",
    readingTime: "4 min",
    icon: <Utensils className="h-12 w-12 text-green-500" />,
    category: "Nutrition",
    content:
      "Your menstrual cycle takes around 28 days to complete, but this is a good time to point out that EVERYONE is different! Just like your fingerprints are unique, so is your bloody brilliant body and how you experience periods. So, while we say 28 days it might be a little longer, it might be a little shorter, there really aren’t any set rules here. Of those 28 days, you could expect to bleed for anywhere between 3-8 days. Again, everyone is different, and your periods are likely to change. Your body can take some time to get into its own flow, so cut it a bit of slack - it’s learning what to do while you’re getting used to things too!",
  },
  {
    id: 3,
    title: (
      <a
        className="text-pink-600"
        href="https://youtu.be/kQyByK9XaQg?si=fz0az0Hz4fizD3_B"
      >
        "What are the signs that my period is coming?"
      </a>
    ),
    excerpt:
      "Explore natural remedies and lifestyle changes to alleviate PMS symptoms.",
    author: "Holistic Health Coach Namita Arora",
    date: "2024-03-05",
    readingTime: "6 min",
    icon: <Leaf className="h-12 w-12 text-purple-500" />,
    category: "Wellness",
    content:
      "If you’ve never had a period before, there are some signs which might indicate your period is coming and they’re all natural parts of growing up. If you’ve noticed your boobs are beginning to develop, and you’ve started to grow pubic hair, then you could expect to get your period about two years later. A more immediate sign for some people is if you notice discharge in your pants. Discharge is a white or yellowish fluid which usually shows up a few months before your first period. There are lots of other signs your period is coming and these can be both physical and emotional. We call these signs PMS (premenstrual syndrome). Not everyone gets PMS and we all experience it differently. It usually happens just before and during your period, and it’s basically the reason you might find yourself wanting to eat your body weight in chocolate or burst into tears at the smallest of things…lost sock, bad hair day, burnt toast…trust me, we all have those days! PMS brings with it all kinds of symptoms such as headaches, bloating, cramps, mood swings, feeling tired and having trouble concentrating. We’ve got a great blog all about PMS with top tips on how to help with these symptoms and many more, so go and take a look. It will finally explain some of those weird and wonderful feelings that you never knew were thanks to your bloody brilliant period!",
    className: "blog-post-3",
  },
  {
    id: 4,
    title: (
      <a
        className="text-pink-600"
        href="https://youtu.be/NM2fnDJf_RA?si=1bfSJA_GNW8LCktL"
      >
        "Why does the colour vary so much?"
      </a>
    ),
    excerpt:
      "A journey through time exploring the evolution of menstrual products.",
    author: "Historian Dr. Ayesha Khan",
    date: "2024-02-28",
    readingTime: "7 min",
    icon: <Clock className="h-12 w-12 text-blue-500" />,
    category: "History",
    content:
      "Like we just said, there’s lots of other things going on in there besides blood, that’s why it doesn’t always come out bright red like you might expect. But it’s not just what your period is made up of that determines the colour. The colour of your period can be a great tool for knowing what’s going on in your body. It can highlight signs of a poor diet, possible infections or other health conditions. In most cases a variety of shades is totally normal, with oxygen and hormones (there they are again) also playing a role in the shade of your flow (which is COMPLETELY NATURAL!).We’ve got a handy diagram and more information on the different colours of your period here.",
  },
  {
    id: 5,
    title: (
      <a
        className="text-pink-600"
        href="https://youtube.com/watch?v=5u6Y6ZP2_Wg&t=0&feature=shared"
      >
        "Pain and WHAT IS NORMAL?"
      </a>
    ),
    excerpt:
      "Learn how to optimize your workouts based on your menstrual cycle phases.",
    author: "Fitness Expert Vaibhavi Jain",
    date: "2024-03-20",
    readingTime: "5 min",
    icon: <Dumbbell className="h-12 w-12 text-orange-500" />,
    category: "Fitness",
    content:
      "A not-so-fun part about getting your period is period pains, or menstrual cramps, as they’re also called. It’s worth pointing out that not everyone gets period cramps. Most women, girls and people who have periods do, but if you don’t, then that’s absolutely nothing to worry about – just embrace the fact you can enjoy your bloody brilliant period cramp free. So, what is period pain? Period pain is mainly caused by your uterus contracting (tensing up like the other muscles in your body) to help get rid of the lining which we spoke about earlier. You can get pains in your stomach, but it can also spread into your back and thighs. We’ve got a whole heap more information on period pain and what you can do to help here. Hopefully by now you’ll be getting the idea that there’s all kinds of normal when it comes to your period: your normal, your mates’ normal, your next-door neighbours’ normal! What we’re trying to say is we’re all unique, but periods themselves are a normal part of life. After all, half the population will have periods at some point in their lives, so we should all be able to support each other. It’s important to have conversations about periods, as it’s something so many of us have in common! Getting to know your body, your feelings, your health and your flow is really important. If you notice changes in your normal, or if you find it difficult to cope with any aspect of your period, ask for support. There’s no shame in asking for advice, like our team of Bloody Brilliant experts - your local doctor or nurse has all the skills and experience needed to help you. Only you know how you feel, so it’s important you get help if you need it! ",
  },
  {
    id: 6,
    title: (
      <a
        className="text-pink-600"
        href="https://youtube.com/watch?v=5u6Y6ZP2_Wg&feature=shared"
      >
        "Hormones and Mental Health"
      </a>
    ),
    excerpt:
      "Understand the connection between hormonal changes and mental well-being.",
    author: "Psychologist Dr. Richa Malhotra",
    date: "2024-03-25",
    readingTime: "6 min",
    icon: <Brain className="h-12 w-12 text-indigo-500" />,
    category: "Mental Health",
    content:
      "Hormonal fluctuations during the menstrual cycle can significantly impact mental health. Many women experience mood swings, anxiety, or depression, especially during the premenstrual phase. Understanding these changes can help in managing symptoms. Techniques such as cognitive-behavioral therapy, mindfulness, and in some cases, medication, can be effective in addressing hormone-related mental health concerns.",
  },
  {
    id: 7,
    title: (
      <a
        className="text-pink-600"
        href="https://youtu.be/GVRDGQhoEYQ?si=lCe3rA71seWpGjd_"
      >
        "Menstrual Hygiene Best Practices"
      </a>
    ),
    excerpt:
      "Essential tips for maintaining proper menstrual hygiene and preventing infections.",
    author: "Gynecologist Dr. Siya Choudhary",
    date: "2024-03-30",
    readingTime: "4 min",
    icon: <Droplet className="h-12 w-12 text-cyan-500" />,
    category: "Hygiene",
    content:
      "Proper menstrual hygiene is crucial for preventing infections and ensuring comfort. Change your menstrual product regularly, at least every 4-8 hours for pads and tampons. Wash your hands before and after changing products. If using reusable products like menstrual cups or cloth pads, ensure they are thoroughly cleaned and sterilized between uses. Avoid scented products as they can disrupt your natural pH balance.",
  },
  {
    id: 8,
    title: (
      <a
        className="text-pink-600"
        href="https://youtu.be/UBhiwkM8MIY?si=GsACG7mZKkQ2VPYP"
      >
        "Hormonal Birth Control Options"
      </a>
    ),
    excerpt:
      "An overview of different hormonal contraceptive methods and their effects on your cycle.",
    author: " Dr. Manisha Agarwal ",
    date: "2024-04-05",
    readingTime: "7 min",
    icon: <Pill className="h-12 w-12 text-red-500" />,
    category: "Contraception",
    content:
      "Hormonal birth control methods include pills, patches, injections, and intrauterine devices (IUDs). These work by altering your hormone levels to prevent ovulation or fertilization. While effective for contraception, they can also affect your menstrual cycle, often making periods lighter or more regular. Some methods may even stop periods altogether. It's important to discuss the pros and cons of each method with your healthcare provider to find the best option for you.",
  },
  {
    id: 9,
    title: (
      <a
        className="text-pink-600"
        href="https://youtu.be/C3ttfI5YxvE?si=1wF58Pj_cmgLXf-7"
      >
        "Menstrual Disorders: When to Seek Help"
      </a>
    ),
    excerpt:
      "Learn about common menstrual disorders and signs that indicate you should consult a doctor.",
    author: "Obstetrician Dr. Hazel ",
    date: "2024-04-10",
    readingTime: "6 min",
    icon: <Stethoscope className="h-12 w-12 text-teal-500" />,
    category: "Health",
    content:
      "While some variation in menstrual cycles is normal, certain symptoms may indicate a disorder. Heavy bleeding, severe pain, irregular cycles, or bleeding between periods could be signs of conditions like endometriosis, PCOS, or fibroids. If you experience these symptoms, or if your period significantly impacts your daily life, it's important to consult with a healthcare provider for proper diagnosis and treatment.",
  },
];
const womenHealthTopics = [
  {
    id: 1,
    question: "What is a period?",
    answer:
      "Your period or menstruation (that’s the ‘sciencey’ name) is part of your menstrual cycle. This cycle is ultimately your body’s way of preparing itself for a possible pregnancy. During your menstrual cycle, there is an increase and decrease in a number of different hormones such as oestrogen and progesterone which control different aspects of this cycle, you’ll be hearing a lot about these hormones, so sit tight.During your cycle your body releases an egg from your ovaries – we’re talking teeny tiny eggs here - you can’t see them with the naked eye, they’re that small! In order for the egg to be released it has to be matured, which is a job for our hormones.These hormones are also responsible for making the lining of your uterus thick. Should one day an egg get fertilised by sperm, it would land on the thick cosy lining and that’s where a pregnancy would start. However, if the egg doesn’t get fertilised your body no longer needs the lining, so (here comes the hormones again!) your hormones instruct your body to break the lining down and remove it from the uterus via your vagina.",
  },
  {
    id: 2,
    question: "Breast Health and Self-Examination",
    answer:
      "Regular breast self-examinations are crucial for early detection of any abnormalities. Perform a self-exam once a month, preferably a few days after your period ends. Look for changes in size, shape, or color, and feel for lumps or thickening. If you notice any changes or have concerns, consult with your healthcare provider promptly.",
  },
  {
    id: 3,
    question: "Reproductive Health and Fertility",
    answer:
      "Reproductive health encompasses various aspects, including fertility, contraception, and sexual health. Understanding your fertile window, typically the 5 days before ovulation and the day of ovulation, is crucial for both achieving and avoiding pregnancy. Regular check-ups with a gynecologist can help monitor your reproductive health and address any concerns.",
  },
  {
    id: 4,
    question: "Menopause and Hormonal Changes",
    answer:
      "Menopause is a natural biological process marking the end of menstrual cycles, typically occurring in your 40s or 50s. It's preceded by perimenopause, which can last several years. Common symptoms include irregular periods, hot flashes, mood changes, and sleep disturbances. Hormone replacement therapy and lifestyle changes can help manage symptoms. Regular check-ups during this transition are important for maintaining overall health.",
  },
  {
    id: 5,
    question: "Women's Nutrition and Bone Health",
    answer:
      "A balanced diet is crucial for women's health, particularly for maintaining strong bones and preventing osteoporosis. Ensure adequate intake of calcium, vitamin D, and other essential nutrients. Weight-bearing exercises and strength training can also help maintain bone density. As women are at higher risk for osteoporosis, especially after menopause, it's important to prioritize bone health throughout your life.",
  },
];

export function Blogs() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(null);
  const [readSections, setReadSections] = useState(
    Array(womenHealthTopics.length).fill(false)
  );
  const [completedBlogs, setCompletedBlogs] = useState(0);
  const [completedTopics, setCompletedTopics] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [savedPosts, setSavedPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [allSectionsRead, setAllSectionsRead] = useState(false);
  const [quizScore, setQuizScore] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleAccordion = (id) => {
    setActiveItem((prev) => (prev === id ? null : id));
  };

  const handleRead = (index) => {
    const updatedReadSections = [...readSections];
    updatedReadSections[index] = true;
    setReadSections(updatedReadSections);
    setCompletedTopics(updatedReadSections.filter(Boolean).length);

    // Check if all sections are read
    if (updatedReadSections.every(Boolean)) {
      setAllSectionsRead(true);
    }
  };

  const handleSavePost = (postId) => {
    setSavedPosts((prev) => {
      if (prev.includes(postId)) {
        return prev.filter((id) => id !== postId);
      } else {
        return [...prev, postId];
      }
    });
  };

  const handleShare = (postId) => {
    // Implement sharing functionality here
    console.log(`Sharing post ${postId}`);
  };

  const handleCardClick = (post) => {
    setSelectedPost(post);
    if (!savedPosts.includes(post.id)) {
      setCompletedBlogs((prev) => prev + 1);
    }
  };

  const handleQuizComplete = (score) => {
    setQuizScore(score);
  };
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const filteredPosts =
    selectedCategory === "All"
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
          className="fixed left-0 top-0 w-10 z-10 p-2 bg-pink-600 text-white rounded-r-md  transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
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
          sidebarVisible && width > 816 ? "ml-64" : "ml-0"
        } w-full max-w-full`}
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
                <h3 className="text-xl font-semibold text-black dark:text-white">
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
                className="w-full px-4 py-2 text-white bg-[#db2777] placeholder:text-white rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:bg-[#111827] dark:text-white transition-all duration-300 focus:shadow-lg"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-white" />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 text-white rounded-full border bg-[#db2777] border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:bg-[#111827] dark:text-white transition-all duration-300 focus:shadow-lg"
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
          {/* Trophy System */}
          {/*<div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg transform hover:scale-105 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-400 mb-4">
              Your Learning Journey
            </h2>
            <div className="flex flex-col space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Articles Read
                </h3>
                <div className="flex justify-center gap-4">
                  {[...Array(9)].map((_, index) => (
                    <BookOpen
                      key={index}
                      className={`h-8 w-8 transition-all duration-300 ${
                        index < completedBlogs
                          ? "text-pink-500 scale-110"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                      fill={index < completedBlogs ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <p className="mt-2 text-gray-800 dark:text-gray-300">
                  {completedBlogs} out of 9 articles read
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Topics Completed
                </h3>
                <div className="flex justify-center gap-4">
                  {[...Array(5)].map((_, index) => (
                    <GraduationCap
                      key={index}
                      className={`h-8 w-8 transition-all duration-300 ${
                        index < completedTopics
                          ? "text-purple-500 scale-110"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                      fill={index < completedTopics ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <p className="mt-2 text-gray-800 dark:text-gray-300">
                  {completedTopics} out of 5 topics completed
                </p>
              </div>
              {quizScore !== null && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Quiz Score
                  </h3>
                  <div className="flex justify-center items-center">
                    <Award
                      className={`h-12 w-12 ${
                        quizScore === 3
                          ? "text-yellow-500"
                          : quizScore === 2
                          ? "text-gray-400"
                          : "text-bronze-500"
                      }`}
                    />
                    <span className="ml-2 text-2xl font-bold">
                      {quizScore}/3
                    </span>
                  </div>
                  <p className="mt-2 text-gray-800 dark:text-gray-300">
                    {quizScore === 3
                      ? "Perfect score!"
                      : quizScore === 2
                      ? "Great job!"
                      : "Keep learning!"}
                  </p>
                </div>
              )}
            </div>
          </div> */}
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

// function Quiz() {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [score, setScore] = useState(0);
//   const [showScore, setShowScore] = useState(false);
//   const props = {}; // Added to avoid error in handleAnswerClick

//   const questions = [
//     {
//       questionText: "What is the average length of a menstrual cycle?",
//       answerOptions: [
//         { answerText: "14 days", isCorrect: false },
//         { answerText: "28 days", isCorrect: true },
//         { answerText: "45 days", isCorrect: false },
//         { answerText: "60 days", isCorrect: false },
//       ],
//     },
//     {
//       questionText: "Which of these is NOT a phase of the menstrual cycle?",
//       answerOptions: [
//         { answerText: "Follicular phase", isCorrect: false },
//         { answerText: "Ovulation", isCorrect: false },
//         { answerText: "Luteal phase", isCorrect: false },
//         { answerText: "Gestation phase", isCorrect: true },
//       ],
//     },
//     {
//       questionText: "What hormone is responsible for the thickening of the uterine lining?",
//       answerOptions: [
//         { answerText: "Estrogen", isCorrect: true },
//         { answerText: "Testosterone", isCorrect: false },
//         { answerText: "Adrenaline", isCorrect: false },
//         { answerText: "Insulin", isCorrect: false },
//       ],
//     },
//   ];

//   const handleAnswerClick = (isCorrect) => {
//     if (isCorrect) {
//       setScore(score + 1);
//     }

//     const nextQuestion = currentQuestion + 1;
//     if (nextQuestion < questions.length) {
//       setCurrentQuestion(nextQuestion);
//     } else {
//       setShowScore(true);
//       props.onQuizComplete(score);
//     }
//   };

//   return (
//     <div className="quiz">
//       {showScore ? (
//         <div className="score-section text-xl font-semibold text-center p-4">
//           You scored {score} out of {questions.length}
//         </div>
//       ) : (
//         <>
//           <div className="question-section mb-6">
//             <div className="question-count text-lg font-medium mb-2">
//               <span>Question {currentQuestion + 1}</span>/{questions.length}
//             </div>
//             <div className="question-text text-xl font-semibold">{questions[currentQuestion].questionText}</div>
//           </div>
//           <div className="answer-section grid grid-cols-1 gap-4">
//             {questions[currentQuestion].answerOptions.map((answerOption, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleAnswerClick(answerOption.isCorrect)}
//                 className="px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-300"
//               >
//                 {answerOption.answerText}
//               </button>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Blogs;
