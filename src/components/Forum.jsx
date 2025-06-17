import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  HeartPulse,
  Home,
  GraduationCap,
  ShoppingBag,
  ActivitySquare,
  ClipboardList,
  Stethoscope,
  Bot,
  ChevronRight,
  Calendar,
  Heart,
  Moon,
  Sun,
  Users,
  MessageSquare,
  Search,
  Filter,
  TrendingUp,
  HeartHandshake,
  Gamepad2,
  Handshake,
  Bookmark,
  Bell,
  CheckCircle,
  AlertCircle,
  User,
  XCircle,
  ChevronDown,
  AppWindowMac,
  Plus,
  Flame,
  Star,
  Trophy,
  Flower,
  Dumbbell,
  Brain,
  Baby,
  BookOpen,
  Shield,
  Mail,
  Lock,
  HelpCircle,
  Share2,
  MessageCircleMore,
  ThumbsUp,
  ThumbsDown,
  Reply,
  Flag,
  Edit,
  Trash2,
  Image as ImageIcon,
  Link as LinkIcon,
  Smile,
  PlusCircle,
  Tag,
  Eye
} from "lucide-react";
import CommunityChat from './CommunityChat';

// Add post tags for categorization
const postTags = [
  "PCOS", "Menstruation", "Hormones", "Wellness", "Diet", "Exercise",
  "Mental Health", "Support", "Q&A", "Experience", "Tips", "Research"
];

// Add reaction types with emojis and labels
const reactionTypes = [
  { emoji: "👍", label: "Helpful", count: 0 },
  { emoji: "❤️", label: "Support", count: 0 },
  { emoji: "🤗", label: "Hug", count: 0 },
  { emoji: "💡", label: "Insightful", count: 0 },
  { emoji: "🙏", label: "Thanks", count: 0 }
];

// Update CreatePost component to receive forumCategories as a prop
const CreatePost = ({ isOpen, onClose, onSubmit, forumCategories }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: [],
    visibility: 'public',
    image: null
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagToggle = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (!formData.title.trim() || !formData.content.trim() || !formData.category) {
        throw new Error('Please fill in all required fields');
      }

      await onSubmit(formData);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">
              Create New Post
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XCircle className="h-6 w-6" />
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl border border-red-100">
              {error}
            </div>
          )}

          <input
            type="text"
            name="title"
            placeholder="Post Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border border-pink-100 rounded-xl 
                     bg-white text-gray-700 
                     placeholder-gray-400
                     focus:ring-2 focus:ring-pink-200 focus:border-transparent
                     transition-all duration-200"
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border border-pink-100 rounded-xl 
                     bg-white text-gray-700
                     focus:ring-2 focus:ring-pink-200 focus:border-transparent
                     transition-all duration-200"
            required
          >
            <option value="" className="text-gray-400">Select Category</option>
            {forumCategories.map(category => (
              <option 
                key={category.id} 
                value={category.name}
                className="text-gray-700"
              >
                {category.name}
              </option>
            ))}
          </select>

          <div className="flex flex-wrap gap-2">
            {postTags.map(tag => (
              <button
                type="button"
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                  ${formData.tags.includes(tag)
                    ? 'bg-pink-100 text-pink-600 hover:bg-pink-200'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
              >
                #{tag}
              </button>
            ))}
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => document.getElementById('image-upload').click()}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl
                       bg-pink-50 hover:bg-pink-100
                       text-pink-600 transition-all duration-200"
            >
              <ImageIcon className="h-5 w-5" />
              <span>Add Image</span>
            </button>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <select
              name="visibility"
              value={formData.visibility}
              onChange={handleChange}
              className="px-4 py-2 rounded-xl
                       bg-pink-50 text-pink-600
                       border border-pink-100
                       focus:ring-2 focus:ring-pink-200 focus:border-transparent
                       transition-all duration-200"
            >
              <option value="public" className="text-gray-700 bg-white">Public</option>
              <option value="private" className="text-gray-700 bg-white">Private</option>
              <option value="anonymous" className="text-gray-700 bg-white">Anonymous</option>
            </select>
          </div>

          {imagePreview && (
            <div className="relative w-full h-48">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover rounded-xl"
              />
              <button
                type="button"
                onClick={() => {
                  setImagePreview(null);
                  setFormData(prev => ({ ...prev, image: null }));
                }}
                className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-white 
                         text-gray-600 rounded-full transition-all duration-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <textarea
            name="content"
            placeholder="Write your post content..."
            value={formData.content}
            onChange={handleChange}
            className="w-full p-4 min-h-[200px] border border-pink-100 rounded-xl 
                     bg-white text-gray-700 
                     placeholder-gray-400
                     focus:ring-2 focus:ring-pink-200 focus:border-transparent
                     transition-all duration-200
                     resize-none"
            required
          />

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-gray-50 hover:bg-gray-100
                       text-gray-600 font-medium
                       transition-all duration-200"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-400 to-pink-300 
                       text-white font-medium shadow-sm
                       hover:shadow-md hover:scale-[1.02]
                       transition-all duration-200 disabled:opacity-50
                       flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin">⌛</span>
                  <span>Posting...</span>
                </>
              ) : (
                <>
                  <PlusCircle className="h-5 w-5" />
                  <span>Post</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export function Forum() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [activeTab, setActiveTab] = useState("forums");
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New reply on your post", read: false },
    { id: 2, text: "3 new messages in Women's Health", read: false },
  ]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [filterBy, setFilterBy] = useState("all");
  const [solvedPosts, setSolvedPosts] = useState([1]);
  const [bookmarks, setBookmarks] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const postsPerPage = 5;
  const [selectedTags, setSelectedTags] = useState([]);
  const [postReactions, setPostReactions] = useState({});
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [editingPost, setEditingPost] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [postVisibility, setPostVisibility] = useState("public");
  const [postError, setPostError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [showCommunityChat, setShowCommunityChat] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode.toString());
      return newMode;
    });
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLike = (postId) => {
    setRecentPosts(posts =>
      posts.map(post =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleBookmark = (postId) => {
    setBookmarks(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const markNotificationRead = (id) => {
    setNotifications(notifications =>
      notifications.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const toggleSolved = (postId) => {
    setSolvedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleCreatePost = async (postData) => {
    const newPostData = {
      id: recentPosts.length + 1,
      title: postData.title,
      content: postData.content,
      author: "You",
      likes: 0,
      comments: 0,
      category: postData.category,
      timestamp: new Date().toISOString(),
      tags: postData.tags,
      image: postData.image,
      visibility: postData.visibility,
      reactions: {},
      views: 0
    };

    setRecentPosts(prev => [newPostData, ...prev]);
  };

  const handleReaction = (postId, reactionType) => {
    setPostReactions(prev => {
      const postReactions = prev[postId] || {};
      return {
        ...prev,
        [postId]: {
          ...postReactions,
          [reactionType]: (postReactions[reactionType] || 0) + 1
        }
      };
    });
  };

  const forumCategories = [
    { id: 1, name: "Women's Health", icon: <Flower />, color: "bg-white-100", members: 1200, posts: 5600 },
    { id: 2, name: "Fitness & Nutrition", icon: <Dumbbell />, color: "bg-white-100", members: 980, posts: 4200 },
    { id: 3, name: "Mental Wellness", icon: <Brain />, color: "bg-white-100", members: 850, posts: 3800 },
    { id: 4, name: "Reproductive Health", icon: <Baby />, color: "bg-white-100", members: 720, posts: 3100 },
    { id: 5, name: "Sexual Health", icon: <Shield />, color: "bg-white-100", members: 650, posts: 2800 },
    { id: 6, name: "Menopause Support", icon: <BookOpen />, color: "bg-white-100", members: 590, posts: 2400 },
  ];

  const [recentPosts, setRecentPosts] = useState([
    {
      id: 1,
      title: "My PCOS Journey",
      content: "Sharing my experience with PCOS diagnosis and management...",
      author: "Ariza Khan",
      likes: 45,
      comments: 12,
      category: "Women's Health",
      timestamp: "2024-03-10T14:30:00Z"
    },
    {
      id: 2,
      title: "Best Foods for Hormonal Balance",
      content: "Here are my top 10 nutrition tips for hormonal health...",
      author: "Riya Patel",
      likes: 38,
      comments: 9,
      category: "Fitness & Nutrition",
      timestamp: "2024-03-09T09:15:00Z"
    },
    {
      id: 3,
      title: "Coping with Endometriosis",
      content: "Looking for support and sharing my pain management strategies...",
      author: "Ishita Roy",
      likes: 52,
      comments: 17,
      category: "Reproductive Health",
      timestamp: "2024-03-08T16:45:00Z"
    },
  ]);

  const trendingTopics = [
    { title: "Menstrual Cup Usage", icon: <Flame />, posts: 234 },
    { title: "Hormone Balancing Foods", icon: <Star />, posts: 189 },
    { title: "Endometriosis Awareness", icon: <Trophy />, posts: 156 },
    { title: "Fertility Tracking Apps", icon: <TrendingUp />, posts: 142 },
    { title: "Menopause Symptoms", icon: <HelpCircle />, posts: 128 },
  ];

  const filteredForums = forumCategories.filter(forum => {
    if (filterBy === "large") return forum.members > 1000;
    if (filterBy === "active") return forum.posts > 5000;
    return true;
  });

  const filteredPosts = [...recentPosts]
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "likes") return b.likes - a.likes;
      if (sortBy === "comments") return b.comments - a.comments;
      return new Date(b.timestamp) - new Date(a.timestamp);
    });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const ProfileMenu = () => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1"
    >
      <button className="flex items-center w-full px-4 py-2  text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
        <User className="mr-3 h-5 w-5" /> Profile
      </button>
      <button className="flex items-center w-full px-4 py-2  text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
        <Bookmark className="mr-3 h-5 w-5" /> Bookmarks
      </button>
      <button className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
        <CheckCircle className="mr-3 h-5 w-5" /> My Solutions
      </button>
      <button className="flex items-center w-full px-4 py-2  text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
        <Mail className="mr-3 h-5 w-5" /> Messages
      </button>
      <button className="flex items-center w-full px-4 py-2  text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
        <Lock className="mr-3 h-5 w-5" /> Privacy Settings
      </button>
      <button className="flex items-center w-full px-4 py-2  text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
        <XCircle className="mr-3 h-5 w-5" /> Logout
      </button>
    </motion.div>
  );

  const renderPost = (post) => (
    <motion.div
      key={post.id}
      variants={cardVariants}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md relative group"
    >
      <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => toggleSolved(post.id)}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {solvedPosts.includes(post.id) ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <AlertCircle className="h-5 w-5 text-yellow-500" />
          )}
        </button>
        <button
          onClick={() => handleBookmark(post.id)}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Bookmark
            className={`h-5 w-5 ${
              bookmarks.includes(post.id)
                ? "text-pink-600 fill-current"
                : "text-gray-400"
            }`}
          />
        </button>
        {post.author === "You" && (
          <>
            <button
              onClick={() => setEditingPost(post)}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Edit className="h-5 w-5 text-gray-400" />
            </button>
            <button
              onClick={() => handleDeletePost(post.id)}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Trash2 className="h-5 w-5 text-red-400" />
            </button>
          </>
        )}
      </div>

      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
        <img
          src="/images/women.jpeg"
          alt={post.author}
          className="w-8 h-8 rounded-full mr-2"
        />
        <span className="font-medium">{post.author}</span>
        <span className="mx-2">•</span>
        <span>{new Date(post.timestamp).toLocaleDateString()}</span>
        <span className="mx-2">•</span>
        <span className="bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 px-2 py-1 rounded-full text-xs">
          {post.category}
        </span>
        {post.visibility === "anonymous" && (
          <span className="ml-2 text-xs text-gray-500">• Posted anonymously</span>
        )}
      </div>

      <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">{post.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{post.content}</p>

      {post.image && (
        <div className="mb-4">
          <img
            src={post.image}
            alt="Post attachment"
            className="rounded-lg max-h-96 w-full object-cover"
          />
        </div>
      )}

      {post.tags && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleLike(post.id)}
            className="flex items-center hover:text-pink-600 transition-colors"
          >
            <Heart
              className={`h-5 w-5 mr-1 ${
                post.likes > 0 ? "text-pink-600 fill-current" : ""
              }`}
            />
            {post.likes} likes
          </button>
          <button className="flex items-center text-gray-500 hover:text-gray-700">
            <MessageSquare className="h-5 w-5 mr-1" />
            {post.comments} comments
          </button>
          <div className="flex items-center space-x-1">
            {Object.entries(postReactions[post.id] || {}).map(([type, count]) => (
              <span key={type} className="text-sm">
                {type} {count}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <Share2 className="h-4 w-4" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <Flag className="h-4 w-4" />
          </button>
          <span className="flex items-center text-sm text-gray-500">
            <Eye className="h-4 w-4 mr-1" />
            {post.views || 0}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center space-x-2">
        {reactionTypes.map(reaction => (
          <button
            key={reaction.emoji}
            onClick={() => handleReaction(post.id, reaction.emoji)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            title={reaction.label}
          >
            <span className="text-lg">{reaction.emoji}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""}`}>
      <aside
        className={`bg-pink-100 dark:bg-gray-800 w-64 min-h-screen p-4 fixed transition-all duration-300 ease-in-out ${
          sidebarVisible ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ zIndex: 40 }}
      >
          <div className="px-4 py-4 flex flex-col space-y-2">
            <h1 className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-4">
              SheSync
            </h1>
            <SidebarLink
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              onClick={() => navigate("/dashboard")}
            />
            <SidebarLink
              icon={<Home size={20} />}
              label="Home"
              onClick={() => navigate("/")}
            />
            <SidebarLink
              icon={<GraduationCap size={20} />}
              label="Education"
              onClick={() => navigate("/blogs")}
            />
            <SidebarLink
              icon={<ShoppingBag size={20} />}
              label="Shop"
              onClick={() => navigate("/Ecom")}
            />
            <SidebarLink
              icon={<ActivitySquare size={20} />}
              label="Track Your Health"
              onClick={() => navigate("/tracker")}
            />
            <SidebarLink
                                  icon={<ClipboardList size={20} />}
                                  label="PCOS Diagnosis"
                                  onClick={() => navigate("/partner")}
                                />
            <SidebarLink
              icon={<Stethoscope size={20} />}
              label="Expert Consultation"
              onClick={() => navigate("/consultations")}
            />
            <SidebarLink
              icon={<Bot size={20} />}
              label="Eve"
              onClick={() => navigate("/ChatBot")}
            />
            <SidebarLink
              icon={<HeartPulse size={20} />}
              label="HealthLens"
              onClick={() => navigate("/symptomsanalyzer")}
            />
            <SidebarLink
            icon={<AppWindowMac size={20} />}
            label="Parent's Dashboard"
            onClick={() => navigate("/parents")}
            />
            <SidebarLink
              icon={<MessageSquare size={20} />}
              label="Forums"
              onClick={() => navigate("/forums")}
              active
            />
            <SidebarLink
              icon={<HeartHandshake size={20} />}
              label="ShareJoy"
              onClick={() => window.open("https://thepadproject.org/donate/", "_blank")}
            />
            <SidebarLink
              icon={<Gamepad2 size={20} />}
              label="Bliss"
              onClick={() =>
                window.open(
                  "https://she-syncgame.vercel.app/",
                  "_blank"
                )
              }
            />
            <SidebarLink
              icon={<Handshake size={20} />}
              label="NGO's"
              onClick={() =>
                window.open(
                  "https://www.hercircle.in/engage/wellness/reproductive-health/5-organisations-working-towards-eradicating-period-poverty-2239.html",
                  "_blank"
                )
              }
            />
          </div>
      </aside>

      <button
        onClick={toggleSidebar}
        className="fixed left-0 top-0 z-10 p-2 bg-pink-600 text-white rounded-r-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
        style={{
          transform: sidebarVisible ? "translateX(256px)" : "translateX(0)",
        }}
      >
        <ChevronRight
          size={14}
          className={`transition-transform duration-300 ${
            sidebarVisible ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <main
        className={`flex-1 p-6 overflow-auto bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out ${
          sidebarVisible ? "ml-64" : "ml-0"
        }`}
      >
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-pink-600 dark:text-pink-400">
              Community Forums
            </h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowNewPostModal(true)}
                className="flex items-center bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700"
              >
                <Plus className="mr-2 h-5 w-5" />
                New Post
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-full bg-white-100 dark:bg-gray-600 "
                >
                  <Bell className="h-6 w-6" />
                  {notifications.some(n => !n.read) && (
                    <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full" />
                  )}
                </button>
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2  text-gray-700 dark:text-gray-100"
                    >
                      <div className="px-4 py-2 font-semibold border-b dark:border-gray-700">
                        Notifications
                      </div>
                      {notifications.map(notification => (
                        <div
                          key={notification.id}
                          className={`px-4 py-2 text-sm flex items-center justify-between ${
                            !notification.read ? "bg-pink-50 dark:bg-gray-600" : ""
                          }`}
                        >
                          <span>{notification.text}</span>
                          {!notification.read && (
                            <button
                              onClick={() => markNotificationRead(notification.id)}
                              className="text-pink-600 hover:text-pink-700"
                            >
                              Mark read
                            </button>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 p-0.5 rounded-full bg-white-100 dark:bg-gray-600"
                >
                  <img
                    src="/images/women.jpeg"
                    alt="Profile"
                    className="h-10 w-10 rounded-full"
                  />
                </button>
                <AnimatePresence>
                  {showProfileMenu && <ProfileMenu />}
                </AnimatePresence>
              </div>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700"
              >
                {darkMode ? (
                  <Sun className="h-5 w-5 text-gray-800 dark:text-gray-200" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveTab("forums")}
                className={`px-6 py-2 rounded-md ${
                  activeTab === "forums"
                    ? "bg-pink-600 text-white"
                    : "bg-gray-200 text-gray-800"
                } dark:bg-gray-800 dark:text-gray-100  border border-pink-200
                 hover:bg-pink-500 `}
              >
                Forums
              </button>
              <button
                onClick={() => setActiveTab("posts")}
                className={`px-4 py-2 rounded-md ${
                  activeTab === "posts"
                    ? "bg-pink-600 text-white"
                    : "bg-gray-200 text-gray-700"
                } dark:bg-gray-800 dark:text-gray-100 border border-pink-300
                hover:bg-gray-300`}>
                Recent Posts
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center px-4 py-2 rounded-md bg-gray-200 
                   text-gray-800 dark:bg-gray-800 dark:text-gray-100 
                    hover:bg-gray-300 border border-pink-300
">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>
                {showFilters && (
                  <div className=" border border-pink-300 pl-10 pr-4 py-2 w-64 border absolute z-10 mt-2 w-48 bg-gray-200 dark:bg-gray-600 rounded-md shadow-lg p-2  hover:bg-gray-300">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full bg-transparent p-2 text-sm"
                    >
                      <option value="newest">Newest First</option>
                      <option value="likes">Most Likes</option>
                      <option value="comments">Most Comments</option>
                    </select>
                    <select
                      value={filterBy}
                      onChange={(e) => setFilterBy(e.target.value)}
                      className="w-full bg-transparent p-2 text-sm mt-2"
                    >
                      <option value="all">All Forums</option>
                      <option value="large">Large Communities</option>
                      <option value="active">Active Communities</option>
                    </select>
                  </div>
                )}
              </div>
              <div className=" flex items-center space-x-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className=" border border-pink-300
                 bg-gray-200 dark:bg-gray-800  hover:bg-gray-300 text-gray-700 dark:text-gray-100 px-1 py-2 rounded-md"
                >
                  <option value="all">All Categories</option>
                  {forumCategories.map(category => (
                    <option key={category.id} value={category.name}>{category.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-2 pl-10">
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 "
                />
                <input
                  type="text"
                  placeholder="Search Forums"
                  className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>

          {activeTab === "forums" && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } }}}
            >
              {filteredForums.map((forum) => (
                <motion.div
                  key={forum.id}
                  variants={cardVariants}
                  className={`${forum.color} dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all`}
                >
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-white rounded-lg">{forum.icon}</div>
                    <h3 className="text-xl font-semibold ml-3 dark:text-gray-100">{forum.name}</h3>
                  </div>
                  <div className="flex justify-between text-sm dark:text-gray-400">
                    <span className="flex items-center">
                      <Users className="mr-1" /> {forum.members.toLocaleString()} members
                    </span>
                    <span className="flex items-center">
                      <MessageSquare className="mr-1" /> {forum.posts.toLocaleString()} posts
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedCommunity(forum);
                      setShowCommunityChat(true);
                    }}
                    className="w-full mt-4 bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700"
                  >
                    Join Community
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "posts" && (
            <motion.div
              className="space-y-6"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } }}}
            >
              {currentPosts.map((post) => (
                <motion.div
                  key={post.id}
                  variants={cardVariants}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md relative group"
                >
                  {renderPost(post)}
                </motion.div>
              ))}
              
              <div className="flex justify-center space-x-2">
                {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === index + 1
                        ? "bg-pink-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-4 dark:text-gray-100">Trending Topics</h3>
            <ul className="space-y-2">
              {trendingTopics.map((topic, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-md cursor-pointer transition-colors"
                >
                  {topic.icon}
                  <span className="ml-2">{topic.title}</span>
                  <span className="ml-auto text-sm text-gray-500">{topic.posts} posts</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </main>

      <AnimatePresence>
        {showNewPostModal && (
          <CreatePost
            isOpen={showNewPostModal}
            onClose={() => setShowNewPostModal(false)}
            onSubmit={handleCreatePost}
            forumCategories={forumCategories}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCommunityChat && selectedCommunity && (
          <CommunityChat
            isOpen={showCommunityChat}
            onClose={() => setShowCommunityChat(false)}
            community={selectedCommunity}
            currentUser="You"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

const SidebarLink = ({ icon, label, onClick, active = false }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 w-full px-2 py-2 rounded-lg transition-colors ${
        active
          ? "bg-pink-200 dark:bg-pink-900 text-pink-800 dark:text-pink-200"
          : "text-gray-900 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-gray-700"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};