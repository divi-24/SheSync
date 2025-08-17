import { ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import SideBar from './SideBar';

const GlobalChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const chatEndRef = useRef(null);

  const handleSend = () => {
    if (input.trim() === '') return;

    const newMessage = {
      id: Date.now(),
      text: input,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-white overflow-hidden">
      <SideBar
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        // activeLink={}
      />

      {width > 816 && (
        <button
          onClick={toggleSidebar}
          className="fixed left-0 top-0 w-10 z-10 p-2 bg-pink-600 text-white rounded-r-lg transition-all duration-300 ease-in-out focus:outline-none shadow-md"
          style={{
            transform: sidebarVisible ? 'translateX(256px)' : 'translateX(0)',
          }}
          aria-label={sidebarVisible ? 'Hide sidebar' : 'Show sidebar'}
        >
          <ChevronRight
            size={16}
            className={`transition-transform duration-300 block m-auto ${
              sidebarVisible ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-6">
        <div className="w-full max-w-3xl h-[90vh] flex flex-col bg-white rounded-3xl shadow-xl border border-pink-200 overflow-hidden transition-all">

          {/* Header */}
          <div className="px-6 py-4 bg-pink-600">
            <h2 className="text-2xl font-bold text-white tracking-wide">Global Chat</h2>
            <p className="text-pink-100 text-sm">Only saved until the app is open</p>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-pink-50 custom-scrollbar">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-sm">No messages yet. Start the conversation!</p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className="flex items-start gap-3 animate-fade-in"
                >
                  <div className="text-pink-600 font-medium text-xs mt-1 min-w-[60px]">
                    {msg.timestamp}
                  </div>
                  <div className="bg-white border border-pink-200 text-gray-800 px-4 py-2 rounded-xl shadow-sm max-w-[80%]">
                    {msg.text}
                  </div>
                </div>
              ))
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-pink-200 bg-white p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                placeholder="Type a message..."
              />
              <button
                onClick={handleSend}
                className="bg-pink-600 hover:bg-pink-700 transition-all text-white px-5 py-2 rounded-lg shadow-md"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalChat;
