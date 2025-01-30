import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Send,
  Moon,
  Sun,
  Home,
  Trash2,
  LayoutDashboard,
  ActivitySquare,
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
} from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI("AIzaSyAc1l4zjH_fiCzprd5pE77A9ikQtA-xZuc");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const popularEmojis = [
  "😊",
  "😂",
  "❤️",
  "😍",
  "🥰",
  "😭",
  "😘",
  "🥺",
  "✨",
  "😅",
  "🙏",
  "🔥",
  "😊",
  "💕",
  "😌",
  "💜",
  "😩",
  "😤",
  "🥳",
  "💪",
];

export function Chatbot() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Inter:wght@400;500;600&display=swap');
      
      .SheSync-chatbot {
        --fc-bg-primary: #1A1B26;
        --fc-bg-secondary: #24283B;
        --fc-text-primary: #FFFFFF;
        --fc-text-secondary: #A0AEC0;
        --fc-accent: #FEC5D9;
        --fc-accent-dark: #F687B3;
        --fc-input-bg: #1A1B26;
        --fc-input-text: #FFFFFF;
      }

      .SheSync-chatbot.light {
        --fc-bg-primary: #FFF5F7;
        --fc-bg-secondary: #FFFFFF;
        --fc-text-primary: #1A202C;
        --fc-text-secondary: #4A5568;
      }

      .SheSync-chatbot {
        font-family: 'Inter', sans-serif;
      }

      .header-button {
        padding: 0.5rem;
        color: var(--fc-text-primary);
        background-color: transparent;
      }

      .message-bubble {
        padding: 1rem;
        border-radius: 1rem;
        line-height: 1.5;
        transition: all 0.2s;
        white-space: pre-wrap;
        word-break: break-word;
        hyphens: auto;
      }

      .message-bubble:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .message-appear {
        animation: appearAnimation 0.3s ease-out;
      }

      .emoji-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 0.5rem;
        padding: 0.5rem;
      }

      .emoji-button {
        padding: 0.5rem;
        border-radius: 0.5rem;
        transition: all 0.2s;
        font-size: 1.25rem;
      }

      .emoji-button:hover {
        background-color: var(--fc-accent);
        transform: scale(1.1);
      }

      @keyframes appearAnimation {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      /* Scrollbar Styles */
      .scrollbar-thin::-webkit-scrollbar {
        width: 6px;
      }
      .scrollbar-thin::-webkit-scrollbar-track {
        background: var(--fc-bg-secondary);
      }
      .scrollbar-thin::-webkit-scrollbar-thumb {
        background-color: var(--fc-accent);
        border-radius: 3px;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const SidebarLink = ({ icon, label, onClick, active = false }) => (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 w-full px-4 py-2 rounded-lg transition-colors ${
        active
          ? "bg-pink-200 dark:bg-pink-900 text-pink-800 dark:text-pink-200"
          : "text-gray-600 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-gray-700"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div
      className={`SheSync-chatbot ${isDarkMode ? "" : "light"} flex h-screen`}
    >
      {/* Sidebar */}
      <aside className="bg-pink-100 w-64 p-4 border-r border-[var(--fc-accent)]">
        <nav className="mt-8">
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
              icon={<Stethoscope size={20} />}
              label="Expert Consultation"
              onClick={() => navigate("/consultations")}
            />
            <SidebarLink
              icon={<Bot size={20} />}
              label="Eve"
              onClick={() => navigate("/ChatBot")}
              active
            />
            <SidebarLink
              icon={<HeartPulse size={20} />}
              label="HealthLens"
              onClick={() => navigate("/symptomsanalyzer")}
            />
            <SidebarLink
              icon={<MessageSquare size={20} />}
              label="Forums"
              onClick={() => navigate("/forums")}
            />
            <SidebarLink
              icon={<HeartHandshake size={20} />}
              label="ShareJoy"
              onClick={() => window.open("https://padforward.us/", "_blank")}
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
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[var(--fc-bg-primary)] transition-colors duration-200">
        <div className="flex items-center justify-between p-4 bg-[var(--fc-accent)] shadow-md">
          <h2
            style={{ fontFamily: "Pacifico, cursive" }}
            className="text-2xl font-bold text-black"
          >
            SheSync Chatbot
          </h2>
          <div className="flex space-x-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-black"
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={clearChat}
              className="p-2 text-black"
              aria-label="Clear chat"
            >
              <Trash2 size={20} />
            </button>
            <button
              onClick={() =>
                alert(
                  "Help: This is an Eve designed to provide support and information for young girls aged 13-20."
                )
              }
              className="p-2 text-black"
              aria-label="Help"
            >
              <HelpCircle size={20} />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[var(--fc-accent)] scrollbar-track-[var(--fc-bg-secondary)]">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              } message-appear`}
            >
              {message.role === "assistant" && (
                <div className="shrink-0 w-10 h-10 rounded-full bg-[var(--fc-accent)] flex items-center justify-center text-black mr-2 text-lg font-medium">
                  AI
                </div>
              )}
              <div className="flex flex-col max-w-[70%]">
                <div
                  className={`message-bubble inline-block whitespace-pre-line text-base ${
                    message.role === "user"
                      ? "bg-[var(--fc-accent)] text-black"
                      : "bg-[var(--fc-bg-secondary)] text-[var(--fc-text-primary)] border border-[var(--fc-accent)]"
                  }`}
                >
                  {message.content}
                </div>
                {message.role === "assistant" && (
                  <div className="flex mt-2 space-x-2">
                    <button
                      onClick={() =>
                        isSpeaking
                          ? stopSpeaking()
                          : speakMessage(message.content)
                      }
                      className="flex items-center space-x-1 px-3 py-1 rounded-full bg-[var(--fc-accent)] hover:bg-[var(--fc-accent-dark)] transition-colors duration-200 text-black"
                    >
                      {isSpeaking ? (
                        <VolumeX size={16} />
                      ) : (
                        <Volume2 size={16} />
                      )}
                      <span>{isSpeaking ? "Stop" : "Read"}</span>
                    </button>
                  </div>
                )}
              </div>
              {message.role === "user" && (
                <div className="shrink-0 w-10 h-10 rounded-full bg-[var(--fc-accent-dark)] flex items-center justify-center text-black ml-2 text-lg font-medium">
                  U
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center text-[var(--fc-text-secondary)] message-appear">
              <Loader className="animate-spin mr-2" size={16} />
              <span>SheSync AI is typing...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 bg-[var(--fc-bg-secondary)] border-t border-[var(--fc-accent)] shadow-md">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-grow p-3 rounded-lg bg-[var(--fc-input-bg)] text-[var(--fc-input-text)] placeholder-[var(--fc-text-secondary)] border border-[var(--fc-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--fc-accent-dark)]"
            />
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileUpload}
            />
            <label
              htmlFor="file-upload"
              className="p-3 rounded-lg bg-[var(--fc-accent)] hover:bg-[var(--fc-accent-dark)] text-black transition-colors duration-200 cursor-pointer"
            >
              <Paperclip size={20} />
            </label>
            <button
              type="button"
              onClick={toggleEmojiPicker}
              className="p-3 rounded-lg bg-[var(--fc-accent)] hover:bg-[var(--fc-accent-dark)] text-black transition-colors duration-200"
              aria-label="Add emoji"
            >
              <Smile size={20} />
            </button>
            <button
              type="submit"
              className="p-3 rounded-lg bg-[var(--fc-accent)] hover:bg-[var(--fc-accent-dark)] text-black transition-colors duration-200"
              aria-label="Send message"
            >
              <Send size={20} />
            </button>
          </form>
          {showEmojiPicker && (
            <div className="mt-2 p-2 bg-[var(--fc-bg-secondary)] border border-[var(--fc-accent)] rounded-lg">
              <div className="emoji-grid">
                {popularEmojis.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => addEmoji(emoji)}
                    className="emoji-button"
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
