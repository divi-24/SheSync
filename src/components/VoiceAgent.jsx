import React, { useState, useEffect, useRef } from "react";
import { Mic, PhoneOff, Bot, LayoutDashboard, ChevronRight, HelpCircle, Trash2 } from "lucide-react";
import Vapi from '@vapi-ai/web';
import SideBar from "./SideBar";
import useScreenSize from "../hooks/useScreenSize";
import { useTheme } from "../context/ThemeContext";

// FIX 1: Create a true singleton instance of the Vapi SDK outside the component.
// This ensures that even with React's Strict Mode, only ONE instance is ever created.
// This will eliminate the "KrispSDK is duplicated" error.
let vapiInstance = null;
const getVapiInstance = () => {
  if (!vapiInstance) {
    vapiInstance = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY);
  }
  return vapiInstance;
};


export function VoiceAgent() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isCalling, setIsCalling] = useState(false);
  const [callStatus, setCallStatus] = useState("I'm your SheSync AI voice companion, ready to listen whenever you are.");
  const [transcript, setTranscript] = useState([]);
  const { width } = useScreenSize();
  const { theme } = useTheme();
  const transcriptEndRef = useRef(null);

  useEffect(() => {
    const vapi = getVapiInstance();

    const handleCallStart = () => {
      setIsCalling(true);
      setCallStatus('Connected. You can start speaking now.');
      setTranscript([]);
    };

    const handleCallEnd = () => {
      setIsCalling(false);
      setCallStatus('Call ended. Click the button below to start again.');
    };

    // FIX 2: A robust logic to handle the transcript stream correctly.
    const handleMessage = (message) => {
  if (message.type === 'transcript' && message.transcript) {
    setTranscript((prev) => {
      const newTranscript = [...prev];
      const isFinal = message.transcriptType === 'final';

      // Find last message for same role that is not final
      const lastIndex = [...newTranscript].reverse().findIndex(
        (m) => m.role === message.role && !m.isFinal
      );

      if (lastIndex !== -1) {
        // We found an unfinished message → update text
        const actualIndex = newTranscript.length - 1 - lastIndex;
        newTranscript[actualIndex] = {
          ...newTranscript[actualIndex],
          text: message.transcript,
          isFinal,
        };
      } else {
        // Start a new message
        newTranscript.push({
          role: message.role,
          text: message.transcript,
          isFinal,
        });
      }

      return newTranscript;
    });
  }
};


    vapi.on('call-start', handleCallStart);
    vapi.on('call-end', handleCallEnd);
    vapi.on('message', handleMessage);

    return () => {
      vapi.off('call-start', handleCallStart);
      vapi.off('call-end', handleCallEnd);
      vapi.off('message', handleMessage);
      // Do not destroy the singleton instance, just stop the call.
      vapi.stop();
    };
  }, []);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript]);

  const startCall = () => {
    setCallStatus('Connecting...');
    const vapi = getVapiInstance();
    vapi.start(import.meta.env.VITE_VAPI_ASSISTANT_ID);
  };

  const endCall = () => {
    const vapi = getVapiInstance();
    vapi.stop();
  };

  const clearTranscript = () => {
    setTranscript([]);
  };

  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  return (
    <div className={`flex w-screen h-screen overflow-hidden bg-white dark:bg-[#111827] ${theme}`}>
      <div
        className={`fixed top-0 left-0 z-10 h-full transition-transform duration-300 ease-in-out ${width <= 816 && !sidebarVisible ? "-translate-x-full" : "translate-x-0"}`}
      >
        <SideBar
          sidebarVisible={sidebarVisible}
          setSidebarVisible={setSidebarVisible}
          activeLink={18}
        />
      </div>

      {width > 816 && (
        <button onClick={toggleSidebar} className={`fixed top-1/2 -translate-y-1/2 z-20 bg-pink-500 text-white border-none rounded-r-lg p-2 cursor-pointer transition-all duration-300 ease-in-out ${sidebarVisible ? "left-64" : "left-0"}`} aria-label={sidebarVisible ? "Hide sidebar" : "Show sidebar"}>
          <ChevronRight size={16} className={`transition-transform duration-300 ${sidebarVisible ? "rotate-180" : "rotate-0"}`} />
        </button>
      )}

      <div className={`flex-1 flex flex-col h-screen transition-all duration-300 ease-in-out ${width > 816 && sidebarVisible ? "ml-64" : "ml-0"}`}>
        <div className="flex justify-between items-center p-4 bg-pink-500 text-white">
          <div className="flex items-center">
            {width <= 816 && (
              <button onClick={toggleSidebar} className="mr-4 p-2 text-white">
                <LayoutDashboard size={20} />
              </button>
            )}
            <h2 className="text-2xl font-bold">SheSync Voice Agent</h2>
          </div>
          <div className="flex space-x-2">
            <button onClick={clearTranscript} className="p-2 text-white" aria-label="Clear Transcript">
              <Trash2 size={20} />
            </button>
            <button onClick={() => alert("Start a voice conversation with your AI companion.")} className="p-2 text-white" aria-label="Help">
              <HelpCircle size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center p-4 overflow-y-auto bg-pink-50 dark:bg-gray-900">
          <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
            <div className="mb-6">
              <Bot size={80} className="text-pink-500 dark:text-pink-400 drop-shadow-lg" />
            </div>
            <h3 className="text-3xl font-bold mb-3 text-gray-800 dark:text-gray-100">
              Hey there! 👋
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto text-lg leading-relaxed mb-6">
              {callStatus}
            </p>

            {!isCalling ? (
              <button onClick={startCall} className="flex items-center gap-3 mx-auto px-8 py-4 bg-pink-600 rounded-full text-white text-lg font-semibold hover:bg-pink-700 transition-all transform hover:scale-105 shadow-lg">
                <Mic size={24} />
                Start Voice Chat
              </button>
            ) : (
              <button onClick={endCall} className="flex items-center gap-3 mx-auto px-8 py-4 bg-red-600 rounded-full text-white text-lg font-semibold hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg">
                <PhoneOff size={24} />
                End Call
              </button>
            )}

            <div className="mt-8 text-left p-4 bg-white dark:bg-gray-800/50 rounded-lg w-full max-w-2xl h-64 overflow-y-auto border border-gray-200 dark:border-gray-700 shadow-inner">
              <h3 className="font-semibold mb-3 text-pink-600 dark:text-pink-400">Live Transcript</h3>
              <div className="space-y-4">
                {transcript.length === 0 && <p className="text-gray-400 dark:text-gray-500">Transcript will appear here...</p>}
                {transcript.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <span className={`flex-shrink-0 font-bold capitalize w-24 ${item.role === 'user' ? 'text-pink-600 dark:text-pink-400' : 'text-purple-600 dark:text-purple-400'}`}>
                      {item.role === 'user' ? 'You:' : 'SheSync:'}
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">{item.text}</p>
                  </div>
                ))}
                <div ref={transcriptEndRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoiceAgent;
