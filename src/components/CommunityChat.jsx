import { db } from '../firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore';


import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  X,
  Users,
  MessageSquare,
  Bot,
  Image as ImageIcon,
  Smile,
  PlusCircle,
  ArrowLeft,
  Heart,
  Share2,
  Bookmark,
  MoreHorizontal,
  HelpCircle,
  Sparkles,
  Camera,
  Mic,
  Paperclip,
  Sticker,
  GalleryHorizontalEnd,
  Gift,
  Star,
  ThumbsUp,
  Reply,
  Bell
} from 'lucide-react';
import { generateChatResponse, getCommunityPrompts } from '../utils/gemini';

// Add SVG components at the top of the file
const BotAvatar = () => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <circle cx="20" cy="20" r="20" fill="#FDF2F8" />
    <circle cx="20" cy="20" r="18" fill="#FCE7F3" />
    <path
      d="M13 16C13 14.3431 14.3431 13 16 13H24C25.6569 13 27 14.3431 27 16V21C27 22.6569 25.6569 24 24 24H16C14.3431 24 13 22.6569 13 21V16Z"
      fill="#EC4899"
    />
    <circle cx="17.5" cy="18.5" r="1.5" fill="white" />
    <circle cx="22.5" cy="18.5" r="1.5" fill="white" />
    <path
      d="M16 26C16 25.4477 16.4477 25 17 25H23C23.5523 25 24 25.4477 24 26C24 26.5523 23.5523 27 23 27H17C16.4477 27 16 26.5523 16 26Z"
      fill="#EC4899"
    />
  </svg>
);

const UserAvatar = () => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <circle cx="20" cy="20" r="20" fill="#FDF2F8" />
    <circle cx="20" cy="20" r="18" fill="#FCE7F3" />
    <circle cx="20" cy="16" r="6" fill="#EC4899" />
    <path
      d="M10 30C10 25.5817 13.5817 22 18 22H22C26.4183 22 30 25.5817 30 30V32H10V30Z"
      fill="#EC4899"
    />
  </svg>
);

const CommunityAvatar = () => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <circle cx="20" cy="20" r="20" fill="#FDF2F8" />
    <circle cx="20" cy="20" r="18" fill="#FCE7F3" />
    <path
      d="M15 14C15 12.3431 16.3431 11 18 11H22C23.6569 11 25 12.3431 25 14V18C25 19.6569 23.6569 21 22 21H18C16.3431 21 15 19.6569 15 18V14Z"
      fill="#EC4899"
    />
    <path
      d="M13 22C13 20.3431 14.3431 19 16 19H24C25.6569 19 27 20.3431 27 22V26C27 27.6569 25.6569 29 24 29H16C14.3431 29 13 27.6569 13 26V22Z"
      fill="#EC4899"
      fillOpacity="0.8"
    />
    <circle cx="20" cy="24" r="2" fill="white" />
  </svg>
);

const formatMessage = (text) => {
  // Format numbered lists with improved spacing and bullets
  const formattedText = text.replace(
    /(\d+\.\s.*?)(?=\d+\.|$)/gs,
    '<div class="mb-3 flex items-start"><span class="mr-2 text-pink-300">•</span><div>$1</div></div>'
  );

  // Format bold text between ** ** with a gradient effect
  return formattedText.split('**').map((part, index) => {
    return index % 2 === 1 ? (
      <strong key={index} className="font-semibold bg-gradient-to-r from-pink-300 to-pink-400 bg-clip-text text-transparent">
        {part}
      </strong>
    ) : (
      <span key={index} dangerouslySetInnerHTML={{ __html: part }} />
    );
  });
};

const CommunityChat = ({ isOpen, onClose, community, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState('');
  const [showPrompts, setShowPrompts] = useState(true);
  const chatEndRef = useRef(null);
  const [participants, setParticipants] = useState([
    { id: 1, name: 'AI Assistant', isBot: true },
    { id: 2, name: currentUser || 'You' }
  ]);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Add welcome message when chat opens
useEffect(() => {
  if (!community?.id) return;

  const q = query(
    collection(db, 'communities', community.id, 'messages'),
    orderBy('timestamp', 'asc')
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const fetchedMessages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setMessages(fetchedMessages);
  });

  return () => unsubscribe();
}, [community?.id]);


  // Generate AI response using Gemini
  const generateAIResponse = async (userMessage) => {
    setIsTyping(true);
    setError('');
    
    try {
      const response = await generateChatResponse(userMessage, community.name);

      setMessages(prev => [...prev, {
        id: Date.now(),
        text: response,
        sender: 'AI Assistant',
        isBot: true,
        timestamp: new Date().toISOString()
      }]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      setError("I apologize, but I'm having trouble responding right now. Please try again.");
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: "I apologize, but I'm having trouble responding right now. Please try again.",
        sender: 'AI Assistant',
        isBot: true,
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

const handleSendMessage = async (e) => {
  e.preventDefault();
  if (!newMessage.trim()) return;

  setShowPrompts(false);

  const message = {
    text: newMessage,
    sender: currentUser || 'You',
    isBot: false,
    timestamp: serverTimestamp()
  };

try {
  await addDoc(collection(db, 'communities', community.id, 'messages'), message);
  setNewMessage('');

  // ✅ Only trigger AI in specific community (e.g., AI Bot Room)
  if (community.name === 'AI Bot Room') {
    generateAIResponse(newMessage);
  }
} catch (err) {
  setError('Failed to send message.');
  console.error(err);
}
};

  const handlePromptClick = (prompt) => {
    setNewMessage(prompt);
    setShowPrompts(false);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col shadow-xl"
      >
        {/* Header */}
        <div className="p-4 border-b border-pink-100 bg-pink-50 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="text-pink-400 hover:text-pink-500 transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="relative h-10 w-10">
                <CommunityAvatar />
                <div className="absolute -bottom-1 -right-1 bg-green-400 rounded-full w-3 h-3 border-2 border-white"></div>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  {community.name}
                  <Star className="h-4 w-4 text-pink-400 fill-pink-400" />
                </h2>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {participants.length} participants • 
                  <MessageSquare className="h-4 w-4" />
                  {messages.length} messages
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="text-pink-400 hover:text-pink-500 transition-colors p-2 hover:bg-pink-50 rounded-full">
              <Bell className="h-5 w-5" />
            </button>
            <button className="text-pink-400 hover:text-pink-500 transition-colors p-2 hover:bg-pink-50 rounded-full">
              <Users className="h-5 w-5" />
            </button>
            <button 
              className="text-pink-400 hover:text-pink-500 transition-colors p-2 hover:bg-pink-50 rounded-full"
              onClick={() => setShowPrompts(!showPrompts)}
            >
              <HelpCircle className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-pink-50 to-white">
          {messages.map(message => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`flex max-w-[80%] ${message.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="relative h-10 w-10">
                  {message.isBot ? <BotAvatar /> : <UserAvatar />}
                  {message.isBot && (
                    <div className="absolute -bottom-1 -right-1 bg-pink-300 rounded-full p-1">
                      <Sparkles className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                <div className={`mx-3 space-y-2 ${message.isBot ? 'items-start' : 'items-end'}`}>
                  <div className={`px-5 py-3 rounded-2xl shadow-sm transform transition-all duration-200 hover:scale-[1.02] ${
                    message.isBot 
                      ? 'bg-white text-gray-800 border border-pink-100' 
                      : 'bg-gradient-to-r from-pink-400 to-pink-300 text-white'
                  }`}>
                    <div className="prose max-w-none leading-relaxed">
                      {formatMessage(message.text)}
                    </div>
                  </div>
                  <div className={`flex items-center space-x-3 text-xs ${
                    message.isBot ? 'justify-start' : 'justify-end'
                  }`}>
                    <span className="font-semibold text-gray-600">{message.sender}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    {message.isBot && (
                      <div className="flex items-center space-x-2 ml-2">
                        <button className="hover:text-pink-400 transition-colors text-gray-400 p-1 hover:bg-pink-50 rounded-full">
                          <ThumbsUp className="h-4 w-4" />
                        </button>
                        <button className="hover:text-pink-400 transition-colors text-gray-400 p-1 hover:bg-pink-50 rounded-full">
                          <Reply className="h-4 w-4" />
                        </button>
                        <button className="hover:text-pink-400 transition-colors text-gray-400 p-1 hover:bg-pink-50 rounded-full">
                          <Share2 className="h-4 w-4" />
                        </button>
                        <button className="hover:text-pink-400 transition-colors text-gray-400 p-1 hover:bg-pink-50 rounded-full">
                          <Bookmark className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-3 text-gray-600 bg-white p-4 rounded-2xl w-fit shadow-sm border border-pink-100"
            >
              <Bot className="h-5 w-5 text-pink-400" />
              <span className="font-medium">AI Assistant is thinking</span>
              <div className="flex space-x-1">
                <motion.span
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="h-2 w-2 bg-pink-300 rounded-full"
                />
                <motion.span
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1, delay: 0.2, repeat: Infinity }}
                  className="h-2 w-2 bg-pink-200 rounded-full"
                />
                <motion.span
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1, delay: 0.4, repeat: Infinity }}
                  className="h-2 w-2 bg-pink-100 rounded-full"
                />
              </div>
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 shadow-sm flex items-center space-x-2"
            >
              <X className="h-5 w-5 text-red-400" />
              <span>{error}</span>
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Conversation Starters */}
        <AnimatePresence>
          {showPrompts && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="p-4 border-t border-pink-100 bg-pink-50"
            >
              <h4 className="text-sm font-medium text-gray-600 mb-3">Suggested Topics:</h4>
              <div className="flex flex-wrap gap-2">
                {getCommunityPrompts(community.name).map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handlePromptClick(prompt)}
                    className="px-4 py-2 text-sm bg-white text-gray-700 rounded-full hover:bg-pink-100 transition-colors duration-200 border border-pink-100"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-pink-100 bg-pink-50/80 backdrop-blur-sm rounded-b-lg">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <button
                type="button"
                className="p-2 text-pink-400 hover:text-pink-500 transition-colors rounded-full hover:bg-white"
              >
                <Paperclip className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="p-2 text-pink-400 hover:text-pink-500 transition-colors rounded-full hover:bg-white"
              >
                <Camera className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="p-2 text-pink-400 hover:text-pink-500 transition-colors rounded-full hover:bg-white"
              >
                <Mic className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full bg-white text-gray-700 placeholder-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-200"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                <button
                  type="button"
                  className="p-1.5 text-pink-400 hover:text-pink-500 transition-colors rounded-lg hover:bg-pink-50"
                >
                  <Sticker className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="p-1.5 text-pink-400 hover:text-pink-500 transition-colors rounded-lg hover:bg-pink-50"
                >
                  <Gift className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="p-1.5 text-pink-400 hover:text-pink-500 transition-colors rounded-lg hover:bg-pink-50"
                  onClick={() => setShowPrompts(!showPrompts)}
                >
                  <HelpCircle className="h-5 w-5" />
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="p-2.5 bg-gradient-to-r from-pink-400 to-pink-300 text-white rounded-xl transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CommunityChat; 