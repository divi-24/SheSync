// src/components/VoiceAgent.jsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import { Mic, PhoneOff, Bot, MessageSquare, ChevronRight } from "lucide-react";
import Vapi from "@vapi-ai/web";

import SideBar from "./SideBar";
import useScreenSize from "../hooks/useScreenSize";
import { useTheme } from "../context/ThemeContext";

// Avatar – drop any file at src/assets/SheAgent.jpeg
import defaultAvatar from "../assets/SheAgent.jpeg";

let vapiInstance = null;
const getVapiInstance = () => {
  if (!vapiInstance) vapiInstance = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY);
  return vapiInstance;
};

/* ---------- Pure-CSS voice wave ---------- */
const VoiceWave = ({ isSpeaking }) => {
  if (!isSpeaking) return null;
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute inset-0 rounded-full border-2 border-pink-500/60 animate-ping"
          style={{
            animationDuration: `${1.2 + i * 0.3}s`,
            animationDelay: `${i * 0.15}s`,
            transform: `scale(${1 + i * 0.2})`,
          }}
        />
      ))}
    </div>
  );
};
/* ----------------------------------------- */

export default function VoiceAgent() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isCalling, setIsCalling] = useState(false);
  const [callStatus, setCallStatus] = useState("Tap to start speaking with SheSync");
  const [transcript, setTranscript] = useState([]);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false);

  const { width } = useScreenSize();
  const { theme } = useTheme();

  // Unique message id helper
  const messageId = useRef(0);

  useEffect(() => {
    const vapi = getVapiInstance();

    const handleCallStart = () => {
      setIsCalling(true);
      setCallStatus("Listening…");
      setTranscript([]);
    };

    const handleCallEnd = () => {
      setIsCalling(false);
      setCallStatus("Ready to chat again");
      setIsAgentSpeaking(false);
    };

    const handleMessage = (msg) => {
      if (msg.type === "transcript" && msg.transcript) {
        setIsAgentSpeaking(msg.role === "assistant");

        setTranscript((prev) => {
          const next = [...prev];

          // update existing interim line
          const idx = next.findIndex(
            (t) => t.role === msg.role && !t.isFinal
          );
          if (idx !== -1) {
            next[idx] = {
              ...next[idx],
              text: msg.transcript,
              isFinal: msg.transcriptType === "final",
            };
            return next;
          }

          // new line
          return [
            ...next,
            {
              id: ++messageId.current,
              role: msg.role,
              text: msg.transcript,
              isFinal: msg.transcriptType === "final",
            },
          ];
        });
      }
    };

    vapi.on("call-start", handleCallStart);
    vapi.on("call-end", handleCallEnd);
    vapi.on("message", handleMessage);

    return () => {
      vapi.off("call-start", handleCallStart);
      vapi.off("call-end", handleCallEnd);
      vapi.off("message", handleMessage);
      vapi.stop();
      // fully reset singleton so Fast-Refresh works
      vapiInstance = null;
    };
  }, []);

  const startCall = () => {
    setCallStatus("Connecting…");
    getVapiInstance().start(import.meta.env.VITE_VAPI_ASSISTANT_ID);
  };
  const endCall = () => getVapiInstance().stop();
  const toggleTranscript = () => setShowTranscript(!showTranscript);
  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  return (
    <div
      className={`flex w-screen h-screen overflow-hidden
        ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-20 h-full transition-transform duration-300
        ${width <= 816 && !sidebarVisible ? "-translate-x-full" : "translate-x-0"}`}
      >
        <SideBar
          sidebarVisible={sidebarVisible}
          setSidebarVisible={setSidebarVisible}
          activeLink={10}
        />
      </div>

      {width > 816 && (
        <button
          onClick={toggleSidebar}
          className={`fixed top-1/2 -translate-y-1/2 z-30 bg-pink-500 text-white rounded-r-lg p-2 cursor-pointer transition-all duration-300
          ${sidebarVisible ? "left-64" : "left-0"}`}
          aria-label={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
        >
          <ChevronRight
            size={16}
            className={`transition-transform ${sidebarVisible ? "rotate-180" : ""}`}
          />
        </button>
      )}

      {/* Main area */}
      <main
        className={`flex-1 flex flex-col h-screen transition-all duration-300
        ${width > 816 && sidebarVisible ? "ml-64" : "ml-0"}`}
      >
        {/* Header */}
        <header
          className={`flex justify-between items-center p-4
          ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}
        >
          <div className="flex items-center">
            {width <= 816 && (
              <button
                onClick={() => setSidebarVisible(true)}
                className="mr-4 p-2"
                aria-label="Open sidebar"
              >
                <MessageSquare size={20} />
              </button>
            )}
            <h2 className="text-xl font-bold">SheSync Voice</h2>
          </div>
          <button
            onClick={toggleTranscript}
            className={`p-2 rounded-lg transition-colors 
  ${theme === "dark" ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-gray-200 text-gray-900 hover:bg-white/90"}`}
            aria-label="Toggle transcript"
          >
            <MessageSquare size={20} />
          </button>
        </header>

        {/* Avatar */}
        <section className="flex-1 flex flex-col items-center justify-center">
          <div className="relative">
            <VoiceWave isSpeaking={isAgentSpeaking} />
            <div
              className={`relative w-48 h-48 md:w-64 md:h-64 rounded-full
                bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-2xl
                transition-transform ${isAgentSpeaking ? "scale-105" : "scale-100"}`}
            >
              {/* Avatar image with fallback */}
              <img
                src={defaultAvatar}
                alt="SheSync"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextElementSibling.style.display = "block";
                }}
              />
              <Bot
                size={80}
                className="text-white drop-shadow-2xl hidden"
                aria-hidden
              />
            </div>
          </div>

          <p className="text-gray-300 text-lg mt-6">{callStatus}</p>

          <button
            onClick={isCalling ? endCall : startCall}
            className={`flex items-center gap-3 mt-6 px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition-transform hover:scale-105
            ${isCalling
                ? "bg-red-600 hover:bg-red-700"
                : "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
              } text-white`}
            aria-label={isCalling ? "End call" : "Start speaking"}
          >
            {isCalling ? <PhoneOff size={24} /> : <Mic size={24} />}
            {isCalling ? "End Call" : "Start Speaking"}
          </button>
        </section>

        {/* Transcript panel */}
        <div
          className={`fixed bottom-0 left-0 right-0 h-80 backdrop-blur-sm
          transition-transform duration-300
          ${theme === "dark" ? "bg-gray-800/95" : "bg-white/95"}
          ${showTranscript ? "translate-y-0" : "translate-y-full"}`}
          style={{
            // shrink when sidebar is open on desktop
            left: width > 816 && sidebarVisible ? "16rem" : 0,
          }}
        >
          <div className="p-4 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Conversation</h3>
              <button
                onClick={toggleTranscript}
                className={`text-gray-600 hover:text-white 
  ${theme === "dark" ? "bg-transparent hover:bg-gray-700" : "bg-transparent hover:bg-white/10"}`}
                aria-label="Close transcript"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              {transcript.length === 0 && (
                <p className="text-center mt-8">No conversation yet</p>
              )}
              {transcript.map((t) => (
                <div
                  key={t.id}
                  className={`flex ${t.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-2 rounded-lg text-sm
                    ${t.role === "user"
                        ? "bg-pink-600 text-white"
                        : theme === "dark"
                          ? "bg-gray-700 text-white"
                          : "bg-gray-200 text-gray-900"
                      }`}
                  >
                    {t.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}