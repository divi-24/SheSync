import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  ClipboardList,
  Send,
  Moon,
  Sun,
  Home,
  Trash2,
  LayoutDashboard,
  AppWindowMac,
  ActivitySquare,
  Gamepad2,
  Loader,
  GraduationCap,
  Bot,
  MessageSquare,
  HeartPulse,
  Paperclip,
  Smile,
  Volume2,
  VolumeX,
  HelpCircle,
  BookOpen,
  ShoppingBag,
  Activity,
  Stethoscope,
  MessageCircle,
  HeartHandshake,
  Handshake,
  ChevronRight,
  X
} from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import SideBar from "./SideBar";
import useScreenSize from "../hooks/useScreenSize";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI("AIzaSyDC_nwnZggf8CYID3qvJfazEE8KBnqd9Ro");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const popularEmojis = ["😊", "😂", "❤️", "😍", "🥰", "😭", "😘", "🥺", "✨", "😅", "🙏", "🔥", "😊", "💕", "😌", "💜", "😩", "😤", "🥳", "💪"];

export function Chatbot() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const { width } = useScreenSize();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setIsTyping(true);

    try {
      const result = await model.generateContent(input);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: result.response.text() },
      ]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I couldn't generate a response. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const formatMessage = (text) => {
    return text.split('**').map((part, index) => {
      return index % 2 === 1 ? (
        <strong key={index} className="text-pink-600 dark:text-pink-400">
          {part}
        </strong>
      ) : (
        part
      );
    });
  };

  const clearChat = () => {
    setMessages([]);
  };

  const speakMessage = (text) => {
    if ("speechSynthesis" in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

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
          transform: translateX(${sidebarVisible ? '0' : '-100%'});
          transition: transform 0.3s ease;
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
        left: ${sidebarVisible ? '280px' : '0'};
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
    <div className={`main-container ${darkMode ? 'dark' : ''}`}>
      <div className="sidebar-container">
        <SideBar 
          sidebarVisible={sidebarVisible} 
          setSidebarVisible={setSidebarVisible} 
          activeLink={7} 
          darkMode={darkMode}
        />
      </div>

      <button
        onClick={toggleSidebar}
        className="sidebar-toggle"
        aria-label={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
      >
        <ChevronRight
          size={16}
          className={`transition-transform duration-300 ${
            sidebarVisible ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div className="chat-content">
        <div className="chat-header">
          <div className="flex items-center">
            {width <= 816 && (
              <button
                onClick={toggleSidebar}
                className="mobile-menu-button mr-4 p-2"
              >
                <LayoutDashboard size={20} />
              </button>
            )}
            <h2 className="text-2xl font-bold">SheSync Chatbot</h2>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={clearChat}
              className="p-2"
              aria-label="Clear chat"
            >
              <Trash2 size={20} />
            </button>
            <button
              onClick={() => alert("This chatbot provides support and information for young women aged 13-20.")}
              className="p-2"
              aria-label="Help"
            >
              <HelpCircle size={20} />
            </button>
          </div>
        </div>

        <div className="messages-container">
          {messages.length === 0 ? (
            <div className="empty-state w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center flex-col justify-center min-h-screen py-12">
              <div className="empty-state-icon mb-8 relative">
                <div className="absolute inset-0 bg-pink-400/30 rounded-full blur-xl animate-pulse"></div>
                <Bot 
                  size={90} 
                  className="relative text-pink-400 hover:text-pink-500 dark:text-pink-300 hover:scale-110 transition-all duration-300 drop-shadow-2xl" 
                />
              </div>

              <div className="text-center mb-12">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
                  Hey there! 👋
                </h3>
                <p className="text-gray-700 dark:text-gray-300 max-w-md sm:max-w-lg lg:max-w-xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed">
                  I'm your SheSync AI companion, here to chat about anything on your mind. 
                  Whether it's school, relationships, health, or just life in general - let's talk!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl">
                <div className="group p-6 bg-gradient-to-br from-pink-300 to-pink-400 dark:from-gray-800/90 dark:to-gray-700/90 backdrop-blur-sm rounded-2xl border border-pink-200/50 dark:border-gray-600/50 hover:bg-gradient-to-br hover:from-pink-100 hover:to-pink-200 dark:hover:from-gray-700/95 dark:hover:to-gray-600/95 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/25 shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="mb-4 p-2 bg-pink-200/50 dark:bg-pink-900/30 rounded-xl w-fit">
                      <HeartPulse className="text-pink-500 hover:text-pink-600 transition-colors duration-300" size={28} />
                    </div>
                    <p className="font-semibold text-black dark:text-gray-200 group-hover:text-pink-700 dark:group-hover:text-pink-300 transition-colors duration-300">
                      Health & Wellness
                    </p>
                    <p className="text-sm text-black dark:text-gray-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Physical and mental wellbeing support
                    </p>
                  </div>
                </div>

                <div className="group p-6 bg-gradient-to-br from-purple-300 to-purple-400 dark:from-gray-800/90 dark:to-gray-700/90 backdrop-blur-sm rounded-2xl border border-purple-200/50 dark:border-gray-600/50 hover:bg-gradient-to-br hover:from-purple-100 hover:to-purple-200 dark:hover:from-gray-700/95 dark:hover:to-gray-600/95 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="mb-4 p-2 bg-purple-200/50 dark:bg-purple-900/30 rounded-xl w-fit">
                      <MessageSquare className="text-purple-500 hover:text-purple-600 transition-colors duration-300" size={28} />
                    </div>
                    <p className="text-base font-semibold text-gray-800 dark:text-gray-200 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300">
                      Supportive Chat
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Friendly conversations and emotional support
                    </p>
                  </div>
                </div>

                <div className="group p-6 bg-gradient-to-br from-indigo-300 to-indigo-400 dark:from-gray-800/90 dark:to-gray-700/90 backdrop-blur-sm rounded-2xl border border-indigo-200/50 dark:border-gray-600/50 hover:bg-gradient-to-br hover:from-indigo-100 hover:to-indigo-200 dark:hover:from-gray-700/95 dark:hover:to-gray-600/95 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/25 shadow-lg relative overflow-hidden sm:col-span-2 lg:col-span-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="mb-4 p-2 bg-indigo-200/50 dark:bg-indigo-900/30 rounded-xl w-fit">
                      <BookOpen className="text-indigo-500 hover:text-indigo-600 transition-colors duration-300" size={28} />
                    </div>
                    <p className="text-base font-semibold text-gray-800 dark:text-gray-200 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-300">
                      Learning & Growth
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Educational support and personal development
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message-wrapper ${message.role}`}
                >
                  <div className={`message-bubble ${message.role}`}>
                    {formatMessage(message.content)}
                    {message.role === "assistant" && (
                      <button
                        onClick={() => isSpeaking ? stopSpeaking() : speakMessage(message.content)}
                        className="speak-button"
                      >
                        {isSpeaking ? (
                          <>
                            <VolumeX size={14} />
                            <span>Stop</span>
                          </>
                        ) : (
                          <>
                            <Volume2 size={14} />
                            <span>Listen</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}

          {isTyping && (
            <div className="typing-indicator">
              <Bot size={16} className="text-pink-500" />
              <span>SheSync AI is thinking</span>
              <div className="typing-dots">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-container">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-500"
            />
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileUpload}
            />
            <label
              htmlFor="file-upload"
              className="p-3 rounded-lg bg-pink-500 hover:bg-pink-600 text-white cursor-pointer"
            >
              <Paperclip size={20} />
            </label>
            <button
              type="button"
              onClick={toggleEmojiPicker}
              className="p-3 rounded-lg bg-pink-500 hover:bg-pink-600 text-white"
              aria-label="Add emoji"
            >
              <Smile size={20} />
            </button>
            <button
              type="submit"
              className="p-3 rounded-lg bg-pink-500 hover:bg-pink-600 text-white"
              aria-label="Send message"
            >
              <Send size={20} />
            </button>
          </form>

          {showEmojiPicker && (
            <div className="mt-2 p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg">
              <div className="grid grid-cols-5 gap-2">
                {popularEmojis.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => addEmoji(emoji)}
                    className="text-xl hover:bg-pink-100 dark:hover:bg-gray-700 rounded p-1 transition-colors"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
