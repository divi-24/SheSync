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
  Bookmark,
  Share2,
  Brain,
  Dumbbell,
  Pill,
  Droplet,
  X,
  ChevronRight,
  Heart,
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import SideBar from "./SideBar";
import useScreenSize from "../hooks/useScreenSize";
import BackToTop from './BackToTop';
const blogposts = [
  {
    id: 1,
    title: <a className="text-pink-600">Understanding Your Menstrual Cycle</a>,
    excerpt: "Learn about the phases of your menstrual cycle and how they affect your body.",
    author: "Dr. Ananya Mehta",
    date: "2024-03-15",
    readingTime: "5 min",
    icon: <Calendar className="h-12 w-12 text-red-500" />,
    category: "Health",
    content: `The menstrual cycle is a natural process that prepares the body for pregnancy each month. It consists of four main phases: menstruation, follicular, ovulation, and luteal. Each phase involves distinct hormonal changes that affect physical and emotional well-being.

Tracking your cycle helps you understand patterns in your body, including mood swings, energy levels, and appetite changes. Awareness of these patterns can help you plan activities and manage symptoms more effectively.

During the follicular phase, the body prepares for ovulation by producing follicles in the ovaries. Ovulation is the release of an egg, which is the most fertile period. The luteal phase follows, where progesterone prepares the uterus for possible pregnancy. Menstruation occurs if fertilization does not happen, marking the start of a new cycle.

By observing and tracking your menstrual cycle, you can optimize diet, exercise, and lifestyle choices to better suit your body’s needs throughout the month. This awareness can also alert you to any irregularities that may require medical attention.`
  },
  {
    id: 2,
    title: <a className="text-pink-600">How Long Does the Menstrual Cycle and Period Last?</a>,
    excerpt: "Discover the best foods to eat during your menstrual cycle for optimal health.",
    author: "Nutritionist Priya Sharma",
    date: "2024-03-10",
    readingTime: "4 min",
    icon: <Utensils className="h-12 w-12 text-green-500" />,
    category: "Nutrition",
    content: `The menstrual cycle typically lasts around 28 days, though it can range from 21 to 35 days. Menstruation itself generally lasts between 3 to 8 days, with variations depending on individual hormonal balance and health conditions.

Nutrition plays a key role in managing menstrual symptoms. Consuming iron-rich foods, leafy greens, and maintaining proper hydration can help reduce fatigue and bloating. Adequate protein intake supports overall energy levels and hormone regulation.

It’s also important to include foods rich in magnesium and vitamin B6, which can help alleviate premenstrual syndrome (PMS) symptoms such as mood swings and cramps. Healthy fats from sources like nuts and seeds aid hormone production.

By understanding the length of your cycle and period, you can tailor your nutrition and lifestyle choices to support overall well-being and comfort during menstruation. Paying attention to dietary needs can make a significant difference in daily energy and mood.`
  },
  {
    id: 3,
    title: <a className="text-pink-600">What Are the Signs That My Period is Coming?</a>,
    excerpt: "Explore natural remedies and lifestyle changes to alleviate PMS symptoms.",
    author: "Holistic Coach Naina Kapoor",
    date: "2024-03-05",
    readingTime: "6 min",
    icon: <Leaf className="h-12 w-12 text-purple-500" />,
    category: "Wellness",
    content: `Premenstrual signs often appear a few days before menstruation and can include mood swings, bloating, headaches, cravings, and mild cramps. Awareness of these early signs helps prepare for changes in energy and focus.

Lifestyle adjustments can significantly reduce discomfort. Regular exercise, a balanced diet, and stress management techniques like meditation or yoga can improve physical and emotional well-being during PMS.

Natural remedies such as herbal teas, warm baths, and heat therapy may also relieve symptoms. Ensuring adequate sleep and hydration supports hormonal balance and reduces fatigue.

Tracking premenstrual signs over time can help identify patterns, allowing individuals to anticipate symptoms and take proactive steps to maintain comfort and wellness throughout their cycle.`
  },
  {
    id: 4,
    title: <a className="text-pink-600">Why Does the Colour Vary So Much?</a>,
    excerpt: "The colour of your period can reveal insights about your health.",
    author: "Dr. Meera Nair",
    date: "2024-02-28",
    readingTime: "7 min",
    icon: <Droplet className="h-12 w-12 text-red-400" />,
    category: "Health",
    content: `The color of menstrual blood can vary from bright red to dark brown. Bright red blood is usually fresh and indicates a healthy flow, while darker shades may result from older blood leaving the uterus more slowly.

Unusual colors like very pale pink, grey, or black could signal underlying health issues or hormonal imbalances. Consulting a healthcare provider is advisable if abnormal colors persist.

Changes in period color can also be influenced by diet, hydration, and lifestyle factors. Being aware of these variations helps individuals understand their menstrual health better.

Observing period color along with other symptoms like flow consistency and pain can provide important insights into reproductive health, enabling timely medical guidance when needed.`
  },
  {
    id: 5,
    title: <a className="text-pink-600">Pain and WHAT IS NORMAL?</a>,
    excerpt: "Learn how to manage menstrual pain and understand what’s normal.",
    author: "Fitness Expert Radhika Iyer",
    date: "2024-03-20",
    readingTime: "5 min",
    icon: <Dumbbell className="h-12 w-12 text-orange-500" />,
    category: "Fitness",
    content: `Menstrual cramps are caused by uterine contractions, which help shed the uterine lining during menstruation. Mild discomfort is common and considered normal for most individuals.

Several strategies can help manage pain. Heat therapy, such as heating pads or warm baths, relaxes muscles and eases cramps. Gentle exercise, including yoga and stretching, can improve blood flow and reduce tension.

Staying hydrated and using over-the-counter pain relief medications when necessary can further alleviate discomfort. Tracking the severity and frequency of pain is important to determine if medical consultation is needed.

Understanding what is normal versus concerning pain empowers individuals to take appropriate measures and seek help when necessary, ensuring menstrual health is well managed.`
  },
  {
    id: 6,
    title: <a className="text-pink-600">Hormones and Mental Health</a>,
    excerpt: "Understand the connection between hormonal changes and mental well-being.",
    author: "Psychologist Ritu Verma",
    date: "2024-03-25",
    readingTime: "6 min",
    icon: <Brain className="h-12 w-12 text-indigo-500" />,
    category: "Mental Health",
    content: `Hormonal fluctuations during the menstrual cycle can significantly impact mood, energy levels, and mental health. Common experiences include anxiety, irritability, and low motivation, particularly during the luteal phase.

Cognitive-behavioral therapy (CBT), mindfulness practices, and journaling are effective ways to manage mood changes and maintain emotional balance. Regular exercise and proper sleep also play critical roles in mental well-being.

Understanding the relationship between hormones and mental health helps individuals identify triggers and implement coping strategies. This awareness can reduce stress and enhance resilience during hormonal shifts.

Monitoring patterns over time allows for better preparation and preventive measures, ensuring emotional and psychological well-being throughout the menstrual cycle.`
  },
  {
    id: 7,
    title: <a className="text-pink-600">Menstrual Hygiene Best Practices</a>,
    excerpt: "Tips for maintaining proper menstrual hygiene and preventing infections.",
    author: "Gynecologist Dr. Shalini Rao",
    date: "2024-03-30",
    readingTime: "4 min",
    icon: <Droplet className="h-12 w-12 text-cyan-500" />,
    category: "Hygiene",
    content: `Maintaining menstrual hygiene is essential to prevent infections and discomfort. Regularly changing pads or tampons every 4-8 hours is recommended depending on flow intensity.

Washing hands before and after changing menstrual products reduces the risk of introducing bacteria. Reusable products should be sterilized properly, and scented products should be avoided to maintain natural pH balance.

Wearing breathable, clean clothing and ensuring proper disposal of sanitary products also contributes to hygiene and comfort. Proper education about hygiene practices ensures safe and healthy menstruation.

Being proactive about menstrual hygiene fosters confidence, reduces the risk of infections, and supports overall reproductive health.`
  },
  {
    id: 8,
    title: <a className="text-pink-600">Hormonal Birth Control Options</a>,
    excerpt: "Overview of different hormonal contraceptives and their effects.",
    author: "Dr. Manisha Agarwal",
    date: "2024-04-05",
    readingTime: "7 min",
    icon: <Pill className="h-12 w-12 text-red-500" />,
    category: "Contraception",
    content: `Hormonal contraceptives are designed to regulate hormones to prevent ovulation and pregnancy. Options include oral pills, patches, injections, and intrauterine devices (IUDs).

Each method works differently and may have distinct side effects. It’s important to consult a healthcare provider to determine the most suitable contraceptive based on individual health, lifestyle, and reproductive goals.

Hormonal contraception can also help manage menstrual irregularities, reduce cramps, and control heavy bleeding. Awareness of potential benefits and risks allows for informed decision-making.

Monitoring effects and communicating with a doctor ensures safe and effective use of hormonal contraceptives, supporting overall reproductive health and well-being.`
  },
  {
    id: 9,
    title: <a className="text-pink-600">Menstrual Disorders: When to Seek Help</a>,
    excerpt: "Learn about common menstrual disorders and signs to consult a doctor.",
    author: "Obstetrician Dr. Hazel Kapoor",
    date: "2024-04-10",
    readingTime: "6 min",
    icon: <Stethoscope className="h-12 w-12 text-teal-500" />,
    category: "Health",
    content: `Certain menstrual symptoms may indicate disorders that require medical attention. Heavy bleeding, severe cramps, irregular cycles, or spotting outside of the usual period may signal conditions like PCOS, fibroids, or endometriosis.

Tracking symptoms such as pain intensity, flow duration, and cycle regularity helps in identifying patterns and potential abnormalities. Early recognition enables timely medical intervention.

Treatment options vary depending on the disorder and may include lifestyle changes, medication, or surgical procedures. Consulting a healthcare provider ensures accurate diagnosis and effective management.

Being informed about menstrual disorders empowers individuals to seek help promptly, maintain reproductive health, and improve overall quality of life.`
  },
  {
    id: 10,
    title: <a className="text-pink-600">Exercise During Your Period</a>,
    excerpt: "Tips for safe and effective workouts during menstruation.",
    author: "Fitness Trainer Kavya Joshi",
    date: "2024-04-15",
    readingTime: "5 min",
    icon: <Dumbbell className="h-12 w-12 text-orange-500" />,
    category: "Fitness",
    content: `Exercise during menstruation can help reduce cramps, improve mood, and support overall health. Light to moderate activities like yoga, walking, or stretching are recommended.

It is important to listen to your body and avoid intense workouts if experiencing heavy flow or significant discomfort. Modifying routines during certain days of the cycle helps maintain comfort and safety.

Regular physical activity can also help balance hormones, reduce bloating, and enhance energy levels. Hydration and proper nutrition play supportive roles in optimizing exercise benefits during periods.

Adopting a flexible exercise routine during menstruation allows individuals to maintain fitness, improve mental well-being, and manage menstrual symptoms effectively.`
  }
];

const categoryIcons = {
  Health: <Calendar className="h-12 w-12 text-red-500" />,
  Nutrition: <Utensils className="h-12 w-12 text-green-500" />,
  Wellness: <Leaf className="h-12 w-12 text-purple-500" />,
  Hygiene: <Droplet className="h-12 w-12 text-cyan-500" />,
  Fitness: <Dumbbell className="h-12 w-12 text-orange-500" />,
  "Mental Health": <Brain className="h-12 w-12 text-indigo-500" />,
  Contraception: <Pill className="h-12 w-12 text-red-500" />,
  Default: <Stethoscope className="h-12 w-12 text-teal-500" />
};

export function Blogs() {
  const navigate = useNavigate();
  const [completedBlogs, setCompletedBlogs] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [savedPosts, setSavedPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [blogPosts, setBlogPosts] = useState(blogposts);
  const [likes, setLikes] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    content: ""
  });
  

    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const handleAddBlog = (e) => {
    e.preventDefault();
    const { title, author, category, content } = formData;

    if (!title || !author || !category || !content) {
        alert("Please fill in all fields");
        return;
    }

    const newBlog = {
        id: blogPosts.length + 1,
        title: title, // store as string
        author,
        category,
        content,
        excerpt: content.split(" ").slice(0, 25).join(" ") + "...",
        date: new Date().toISOString().split("T")[0],
        readingTime: `${Math.ceil(content.split(" ").length / 200)} min`,
        icon: categoryIcons[category.trim()] || categoryIcons["Default"]
    };

    setBlogPosts([newBlog, ...blogPosts]); // Add to state
    setFormData({ title: "", author: "", category: "", content: "" });
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
    const articleUrl = `${window.location.origin}/blogs`;

    if (navigator.share) {
      navigator
        .share({
          title: 'Check out this article!',
          text: 'Here’s something interesting I found:',
          url: articleUrl,
        })
        .then(() => console.log('Article shared successfully!'))
        .catch((error) => console.error('Error sharing article:', error));
    } else {
      navigator.clipboard.writeText(articleUrl)
        .then(() => {
          console.log('Link copied to clipboard!');
        })
        .catch((err) => {
          console.error('Clipboard write failed:', err);
        });
    }
  };

  const handleCardClick = (post) => {
    setSelectedPost(post);
    if (!savedPosts.includes(post.id)) {
      setCompletedBlogs((prev) => prev + 1);
    }
  };

  const handleLikePost = (postId) => {
    setLikes((prev) => ({
        ...prev,
        [postId]: prev[postId] ? prev[postId] + 1 : 1,
    }));
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
        activeLink={3}
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
            className={`transition-transform duration-300 block m-auto ${sidebarVisible ? "rotate-180" : "rotate-0"
              }`}
          />
        </button>
      )}

      {/* Main Content */}
      <main
        className={`flex-1 p-6 overflow-auto bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out ${sidebarVisible && width > 816 ? "ml-64" : "ml-0"} w-full max-w-full`}
      >
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-400 ${sidebarVisible && width > 816 ? "pl-0" : "pl-10"}`}>
              Thoughts, Tips & Tutorials
            </h2>
            {/*Create blog modal*/}
            <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className="btn">Create Blog</button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                <Dialog.Content
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                            bg-white p-8 rounded-lg w-[800px] max-w-[95%] max-h-[90%] overflow-y-auto shadow-xl"
                >
                <div className="flex justify-between items-center mb-6">
                    <Dialog.Title className="text-3xl font-bold text-black">
                    Add a Blog
                    </Dialog.Title>
                    <Dialog.Close
                    className="text-white text-2xl font-bold hover:text-pink-600 cursor-pointer py-1 px-2"
                    aria-label="Close"
                    >
                    &times;
                    </Dialog.Close>
                </div>
                <form onSubmit={handleAddBlog} className="flex flex-col gap-5">
                    <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="border p-3 w-full text-lg rounded-md focus:ring-2 focus:ring-pink-300 outline-none"
                    required
                    />
                    <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    value={formData.author}
                    onChange={handleChange}
                    className="border p-3 w-full text-lg rounded-md focus:ring-2 focus:ring-pink-300 outline-none"
                    required
                    />
                    <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    className="border p-3 w-full text-lg rounded-md focus:ring-2 focus:ring-pink-300 outline-none"
                    required
                    />
                    <textarea
                    name="content"
                    placeholder="Content"
                    value={formData.content}
                    onChange={handleChange}
                    className="border p-3 w-full h-48 text-lg resize-y rounded-md focus:ring-2 focus:ring-pink-300 outline-none"
                    required
                    />
                    <button
                    type="submit"
                    className="bg-pink-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-pink-600 transition duration-300"
                    >
                    Save Blog
                    </button>
                </form>
                </Dialog.Content>
            </Dialog.Portal>
            </Dialog.Root>
          </div>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 w-full items-stretch ">
            {/* Search Input */}
            <div className="w-full sm:w-[70%]  flex ">
              <div className="relative w-full pt-4 flex items-center">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full h-11 px-4 pr-10 text-white rounded-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-300 focus:shadow-lg"
                />
                <Search className="absolute  right-3  h-5 w-5 text-white pointer-events-none" />
              </div>
            </div>

            {/* Category Dropdown */}
            <div className="w-30 sm:w-[30%]  flex items-center" >
              <div className="relative w-full mt-1 pt-0.1 h-11 ">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-full  px-4 text-white rounded-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-300 focus:shadow-lg "
                 style={{ lineHeight: '3rem' }}
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
           </div>
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
                        className={`p-2 rounded-full ${savedPosts.includes(post.id)
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
                      <button
                        onClick={(e) => {
                        e.stopPropagation();
                        handleLikePost(post.id);
                        }}
                        className="p-2 rounded-full bg-gray-100 text-red-500 hover:bg-pink-200 transition-colors duration-300 flex items-center"
                    >
                        <Heart className="h-5 w-5 mr-1" />
                        {likes[post.id] || 0}
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
        </div>
        <BackToTop />
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
                className="p-2 rounded-md bg-black/80 hover:bg-black/90 dark:bg-white/10 dark:hover:bg-white/20 transition-colors"
              >
                <X className="h-5 w-5 text-white dark:text-white" />
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

export default Blogs;
