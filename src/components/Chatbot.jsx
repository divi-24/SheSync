import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Send,
  Moon,
  Sun,
  Trash2,
  LayoutDashboard,
  Bot,
  MessageSquare,
  HeartPulse,
  Paperclip,
  Smile,
  Volume2,
  VolumeX,
  HelpCircle,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import SideBar from "./SideBar";
import useScreenSize from "../hooks/useScreenSize";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const TAB_CHOICES = [
  {
    title: "Health & Wellness",
    desc: "Physical and mental wellbeing support",
    icon: <HeartPulse className="text-pink-500 hover:text-pink-600" size={28} />,
    key: "health",
    intro:
      "You're in the Health & Wellness tab. Feel free to ask about periods, cycle tracking, body changes, or mental health.",
  },
  {
    title: "Supportive Chat",
    desc: "Friendly conversations and emotional support",
    icon: <MessageSquare className="text-purple-500 hover:text-purple-600" size={28} />,
    key: "support",
    intro:
      "You're in Supportive Chat. Need to talk, vent, or share how you feel? I'm here for emotional support.",
  },
  {
    title: "Learning & Growth",
    desc: "Educational support and personal development",
    icon: <BookOpen className="text-indigo-500 hover:text-indigo-600" size={28} />,
    key: "learning",
    intro:
      "You're in Learning & Growth. Ask about personal development, study tips, or learning about your body and mind.",
  },
];

const popularEmojis = [
  "😊", "😂", "❤️", "😍", "🥰", "😭", "😘", "🥺", "✨", "😅",
  "🙏", "🔥", "😊", "💕", "😌", "💜", "😩", "😤", "🥳", "💪",
];

function getTabByKey(key) {
  return TAB_CHOICES.find((t) => t.key === key);
}

export function Chatbot() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [selectedTab, setSelectedTab] = useState(() => {
    const storedTab = sessionStorage.getItem("shesync_selectedTab");
    return storedTab ? storedTab : null;
  });
  const [messages, setMessages] = useState(() => {
    const stored = sessionStorage.getItem("shesync_messages");
    return stored ? JSON.parse(stored) : [];
  });
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const { width } = useScreenSize();
  const [userName, setUserName] = useState(() => {
    const stored = sessionStorage.getItem("shesync_username");
    return stored ? stored : "";
  });

  // Sync state to sessionStorage
  useEffect(() => {
    sessionStorage.setItem("shesync_selectedTab", selectedTab ? selectedTab : "");
  }, [selectedTab]);
  useEffect(() => {
    sessionStorage.setItem("shesync_messages", JSON.stringify(messages));
  }, [messages]);
  useEffect(() => {
    sessionStorage.setItem("shesync_username", userName || "");
  }, [userName]);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Always focus the input bar after message sent or tab change
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [isTyping, messages, selectedTab]);

  // On mount, restore state from sessionStorage
  useEffect(() => {
    const storedTab = sessionStorage.getItem("shesync_selectedTab");
    const storedMsgs = sessionStorage.getItem("shesync_messages");
    const storedName = sessionStorage.getItem("shesync_username");
    if (storedTab) setSelectedTab(storedTab);
    if (storedMsgs) setMessages(JSON.parse(storedMsgs));
    if (storedName) setUserName(storedName);
  }, []);

  const handleTabSelect = (key) => {
    setSelectedTab(key);
    setMessages([
      {
        role: "assistant",
        content: getTabByKey(key).intro,
      },
    ]);
    sessionStorage.setItem("shesync_selectedTab", key);
    sessionStorage.setItem("shesync_messages", JSON.stringify([
      {
        role: "assistant",
        content: getTabByKey(key).intro,
      },
    ]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    setIsTyping(true);

    // Update userName context if user says "my name is"
    let updatedName = userName;
    if (!userName) {
      const match = userText.match(/my name is\s+([A-Za-z]{2,20})/i);
      if (match) updatedName = match[1];
    }

    const tab = getTabByKey(selectedTab);
    const lastMsgs = [
      ...(messages.length > 0 ? messages : [{ role: "assistant", content: tab?.intro || "" }]),
      { role: "user", content: userText },
    ].slice(-6);

    const systemPrompt = `
You are Eve, a warm, concise, and friendly AI assistant for the SheSync platform—a site for women and girls' health, wellness, and support.
You answer women's health, wellness, emotional support, personal development, periods, puberty, and related questions.
If the user asks about unrelated topics (like rocket science), politely decline and gently bring the conversation back to "${tab?.title || "General"}".
If the user asks about their name, or says "my name is...", you can recognize, use, or recall their name, but don't overuse it. It's okay to answer what's my name.
Your answers should be friendly, supportive, concise, and not repetitive. Do not repeat the user's name in every reply. Never refuse basic conversational questions (like "what's my name?")—answer them like a good human friend would, but do not indulge in off-topic conversations.
Do not answer personal, technical, or political questions unrelated to women health and welfare—politely steer back to women's health.
Always stay positive and non-judgmental.

Recent conversation:
${lastMsgs.map((m) => `${m.role === "user" ? "User" : "Eve"}: ${m.content}`).join("\n")}
Eve:`;

    try {
      const result = await model.generateContent(systemPrompt);
      let text = (result.response?.text() || "").trim();
      if (updatedName && text) {
        text = text.replace(new RegExp(`^(Hi,?\\s+)?(${updatedName}[,:\\s-]+)`, "i"), "");
      }
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: text },
      ]);
      setUserName(updatedName);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I couldn't generate a response. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 50);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setSelectedTab(null);
    setUserName("");
    sessionStorage.removeItem("shesync_messages");
    sessionStorage.removeItem("shesync_selectedTab");
    sessionStorage.removeItem("shesync_username");
  };

  const speakMessage = (text) => {
    if ("speechSynthesis" in window) {
      setIsSpeaking(true);
      const utterance = new window.SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  const toggleEmojiPicker = () => setShowEmojiPicker((prev) => !prev);

  const addEmoji = (emoji) => {
    setInput((prev) => prev + emoji);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: `Uploaded file: ${file.name}` },
      ]);
    }
  };

  const formatMessage = (text) => {
    return text.split("**").map((part, index) =>
      index % 2 === 1 ? (
        <strong key={index} className="text-pink-600 dark:text-pink-400">
          {part}
        </strong>
      ) : (
        part
      )
    );
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Inter:wght@400;500;600&display=swap');
      :root {
        --fc-bg-primary: #FFF5F7;
        --fc-bg-secondary: #FFFFFF;
        --fc-text-primary: #2D3748;
        --fc-text-secondary: #718096;
        --fc-accent: #F687B3;
        --fc-accent-dark: #FEC5D9;
        --fc-input-bg: #FFFFFF;
        --fc-input-text: #2D3748;
      }
      .dark {
        --fc-bg-primary: #1A1B26;
        --fc-bg-secondary: #24283B;
        --fc-text-primary: #E2E8F0;
        --fc-text-secondary: #A0AEC0;
        --fc-input-bg: #2D3748;
        --fc-input-text: #E2E8F0;
      }
      body {
        margin: 0;
        padding: 0;
        overflow: hidden;
      }
      .main-container {
        display: flex;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
      }
      .sidebar-container {
        width: 280px;
        height: 100vh;
        flex-shrink: 0;
        background: var(--fc-bg-secondary);
        border-right: 1px solid var(--fc-accent);
        position: fixed;
        left: 0;
        top: 0;
        z-index: 10;
        transition: transform 0.3s ease;
      }
      .chat-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 280px;
        width: calc(100vw - 280px);
        height: 100vh;
        transition: margin-left 0.3s ease;
      }
      @media (max-width: 816px) {
        .sidebar-container {
          transform: translateX(${sidebarVisible ? "0" : "-100%"});
        }
        .chat-content {
          margin-left: 0;
          width: 100vw;
        }
      }
      .messages-container {
        flex: 1;
        overflow-y: auto;
        padding: 1rem;
        background: var(--fc-bg-primary);
      }
      .message-wrapper {
        display: flex;
        margin-bottom: 1rem;
      }
      .message-wrapper.user {
        justify-content: flex-end;
      }
      .message-wrapper.assistant {
        justify-content: flex-start;
      }
      .message-bubble {
        max-width: 85%;
        padding: 0.75rem 1.25rem;
        border-radius: 1.25rem;
        line-height: 1.5;
      }
      .message-bubble.user {
        background: linear-gradient(135deg, #F687B3 0%, #FEC5D9 100%);
        color: white;
        border-bottom-right-radius: 0.25rem;
      }
      .message-bubble.assistant {
        background: var(--fc-bg-secondary);
        color: var(--fc-text-primary);
        border: 1px solid var(--fc-accent);
        border-bottom-left-radius: 0.25rem;
      }
      .input-container {
        padding: 1rem;
        background: var(--fc-bg-secondary);
        border-top: 1px solid var(--fc-accent);
      }
      .chat-header {
        padding: 1rem;
        background: var(--fc-accent);
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .typing-indicator {
        display: flex;
        align-items: center;
        padding: 0.5rem 1rem;
        color: var(--fc-text-secondary);
      }
      .sidebar-toggle {
        position: fixed;
        left: ${sidebarVisible ? "280px" : "0"};
        top: 50%;
        transform: translateY(-50%);
        z-index: 20;
        background: var(--fc-accent);
        color: white;
        border: none;
        border-radius: 0 0.5rem 0.5rem 0;
        padding: 0.75rem 0.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      .mobile-menu-button {
        display: none;
      }
      @media (max-width: 816px) {
        .mobile-menu-button {
          display: block;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, [sidebarVisible]);

  return (
    <div className="main-container min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 relative overflow-hidden">
      
     
      
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-400/10 to-purple-400/10 rounded-full blur-3xl animate-spin" style={{animationDuration: '20s'}}></div>
      </div>

      {/* Sidebar */}
      <div
        className={`sidebar-container fixed left-0 top-0 h-full w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-r border-pink-200/50 dark:border-gray-700/50 shadow-2xl z-40 transition-all duration-500 ease-in-out ${
          width <= 816 && !sidebarVisible ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        
        <div className="p-4 space-y-2">
           <SideBar
              sidebarVisible={sidebarVisible}
              setSidebarVisible={setSidebarVisible}
              activeLink={8}
            />
            
      
          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 border border-pink-200/50 dark:border-pink-700/30">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Active Chat</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">SheSync Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div
        className={`chat-content transition-all duration-500 ease-in-out ${
          width > 816 && sidebarVisible ? 'ml-80' : 'ml-0'
        }`}
      >
        {/* Header */}
        <div className="chat-header sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-pink-200/30 dark:border-gray-700/30 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {width <= 816 && (
                <button 
                  onClick={toggleSidebar} 
                  className="p-2 rounded-xl bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 hover:bg-pink-200 dark:hover:bg-pink-900/50 transition-all duration-300 hover:scale-110"
                >
                  <LayoutDashboard size={20} />
                </button>
              )}
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  SheSync Chatbot
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Your AI companion for life's journey</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={clearChat} 
                className="p-3 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-all duration-300 hover:scale-110 hover:shadow-lg" 
                aria-label="Clear chat"
              >
                <Trash2 size={20} />
              </button>
              <button
                onClick={() =>
                  alert("This chatbot provides support and information for young women aged 13-20.")
                }
                className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Help"
              >
                <HelpCircle size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Messages container */}
        <div className="messages-container flex-1 overflow-y-auto">
          {!selectedTab && (
            <div className="empty-state w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center flex-col justify-center min-h-screen py-12 relative">
              {/* Floating bot icon */}
              <div className="empty-state-icon mb-12 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400/40 to-purple-400/40 rounded-full blur-2xl animate-pulse"></div>
                <div className="relative p-8 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-2xl">
                  <Bot
                    size={80}
                    className="text-pink-500 dark:text-pink-400 hover:text-pink-600 dark:hover:text-pink-300 transition-all duration-500 hover:scale-110 drop-shadow-2xl animate-pulse"
                  />
                </div>
              </div>

              {/* Welcome message */}
              <div className="text-center mb-16 max-w-2xl">
                <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent drop-shadow-sm animate-pulse">
                  Hey there! 👋
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl leading-relaxed backdrop-blur-sm">
                  I'm your <span className="font-semibold text-pink-600 dark:text-pink-400">SheSync AI companion</span>, here to chat about anything on your mind.
                  Whether it's school, relationships, health, or just life in general - let's talk!
                </p>
              </div>

              {/* Enhanced topic cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {TAB_CHOICES.map((tab, index) => (
                  <div
                    key={tab.key}
                    className="group relative p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-gray-700/30 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl shadow-xl cursor-pointer overflow-hidden"
                    onClick={() => handleTabSelect(tab.key)}
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 via-purple-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    
                    <div className="relative z-10">
                      <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                        {tab.icon}
                      </div>
                      <h4 className="font-bold text-xl text-gray-800 dark:text-gray-100 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300 mb-3">
                        {tab.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-all duration-300 opacity-80 group-hover:opacity-100">
                        {tab.desc}
                      </p>
                    </div>

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((message, index) => (
            <div key={index} className={`message-wrapper flex items-end space-x-4 p-4 ${
              message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}>
              {message.role === "assistant" && (
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg animate-pulse">
                  AI
                </div>
              )}
              <div className={`message-bubble max-w-md lg:max-w-lg xl:max-w-xl p-4 rounded-2xl shadow-lg backdrop-blur-sm ${
                message.role === 'user' 
                  ? 'bg-gradient-to-br from-pink-500 to-purple-600 text-white ml-auto' 
                  : 'bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 border border-gray-200/50 dark:border-gray-700/50'
              }`}>
                <div className="prose prose-sm max-w-none">
                  {formatMessage(message.content)}
                </div>
                {message.role === "assistant" && (
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() =>
                        isSpeaking
                          ? stopSpeaking()
                          : speakMessage(message.content)
                      }
                      className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
                    >
                      {isSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
                      <span>{isSpeaking ? "Stop" : "Read"}</span>
                    </button>
                  </div>
                )}
              </div>
              {message.role === "user" && (
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  U
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="typing-indicator flex items-center space-x-3 p-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg animate-pulse">
                <Bot size={20} className="text-white" />
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">SheSync AI is thinking</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Enhanced input container */}
        <div className="input-container sticky bottom-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-pink-200/30 dark:border-gray-700/30 p-4 shadow-lg">
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <input
                type="text"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isTyping}
                placeholder={
                  selectedTab
                    ? "Type your message..."
                    : "Please select a topic above to start the conversation."
                }
                className="w-full p-4 pr-12 rounded-2xl border-2 border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-500 focus:border-transparent transition-all duration-300 shadow-lg hover:shadow-xl"
              />
              {input && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
              )}
            </div>
            
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileUpload}
            />
            <label
              htmlFor="file-upload"
              className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 shadow-md"
            >
              <Paperclip size={20} />
            </label>
            
            <button
              type="button"
              onClick={toggleEmojiPicker}
              className="relative p-4 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white transition-all duration-300 hover:shadow-lg hover:scale-105 shadow-md"
              aria-label="Add emoji"
            >
              <Smile size={20} />
              {showEmojiPicker && (
                <div className="absolute bottom-full right-0 mb-2 p-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
                  <div className="grid grid-cols-5 gap-2">
                    {popularEmojis.map((emoji, index) => (
                      <button
                        key={index}
                        onClick={() => addEmoji(emoji)}
                        className="text-2xl hover:bg-pink-100 dark:hover:bg-gray-700 rounded-xl p-2 transition-all duration-300 hover:scale-125"
                        tabIndex={-1}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </button>
            
            <button
              type="submit"
              className="p-4 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white transition-all duration-300 hover:shadow-lg hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send message"
              disabled={isTyping || !input.trim()}
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;