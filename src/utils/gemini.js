import { GoogleGenerativeAI } from "@google/generative-ai";

// Use API key from environment variable for security
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);


// Test function to verify API connection
export const testGeminiConnection = async() => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const chat = model.startChat();
        const result = await chat.sendMessage("Test connection");
        console.log("API Connection successful:", await result.response.text());
        return true;
    } catch (error) {
        console.error("API Connection failed:", error);
        return false;
    }
};

// Call test function on initialization
testGeminiConnection().then(success => {
    if (!success) {
        console.error("Failed to initialize Gemini API. Please check your configuration.");
    }
});

// Function to generate chat response based on community context
export const generateChatResponse = async(userMessage, communityContext) => {
    try {
        // Create the model with the same configuration as the working chatbot
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Create a context-aware prompt
        const prompt = `
      Context: You are an AI health assistant in the ${communityContext} community forum of SheSync, 
      a women's health platform. Provide accurate, empathetic, and helpful responses while maintaining medical ethics.
      
      Community Topic: ${communityContext}
      User Message: ${userMessage}
      
      Please provide a response that:
      1. Is medically accurate and evidence-based
      2. Shows empathy and understanding
      3. Encourages seeking professional medical advice when appropriate
      4. Maintains user privacy and confidentiality
      5. Provides relevant resources or suggestions
      6. Uses appropriate tone for the specific community
    `;

        // Generate content
        const result = await model.generateContent(prompt);
        const response = await result.response.text();

        return response;
    } catch (error) {
        console.error('Error generating AI response:', error);
        throw error;
    }

// Helper function to build a concise, focused prompt for Gemini
function buildPrompt(conversationHistory, communityContext = "General") {
  const systemPrompt = `
You are Eve, an AI health assistant in the "${communityContext}" community forum of SheSync.
Your role is to provide accurate, empathetic, and helpful responses in a conversational, supportive, and friendly manner.
Always refer to yourself as "Eve". If the user wants to call you something else, kindly accept the name but stay in the Eve persona.
Keep answers concise, relevant, and tailored to the selected community context.
Never repeat yourself. If the user gives you a name, use it to address them kindly.
If the user is just making jokes or being silly, you can be lightly playful but always supportive and positive.
`;

  const contextString = conversationHistory
    .slice(-6)
    .map(msg => `${msg.role === "user" ? "User" : "Eve"}: ${msg.content}`)
    .join("\n");

  return `${systemPrompt}\nConversation so far:\n${contextString}\nEve:`;
}

// Generate a chat response using Gemini, now with context
export const generateChatResponse = async (conversationHistory, communityContext = "General") => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = buildPrompt(conversationHistory, communityContext);

    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    if (!response || response.trim().length === 0) {
      throw new Error("No response generated from Gemini API.");
    }

    return response.trim();
  } catch (error) {
    let errorMsg = "Sorry, I couldn't generate a response.";
    if (error && error.message) {
      if (error.message.includes("429")) {
        errorMsg = "API limit reached. Please wait and try again later. (429 Quota Exceeded)";
      } else {
        errorMsg += `\n[Debug info: ${error.message}]`;
      }
    }
    console.error("Error generating AI response:", error);
    throw new Error(errorMsg);
  }

};

// Function to get community-specific conversation starters
export const getCommunityPrompts = (communityName) => {

    const prompts = {
        "Women's Health": [
            "What health topics would you like to discuss today?",
            "Have you noticed any changes in your health recently?",
            "What wellness goals are you working towards?"
        ],
        "Fitness & Nutrition": [
            "What are your current fitness goals?",
            "How can we help you with your nutrition journey?",
            "What challenges are you facing with your wellness routine?"
        ],
        "Mental Wellness": [
            "How are you feeling today?",
            "What self-care practices work best for you?",
            "Would you like to discuss any specific concerns?"
        ],
        "Reproductive Health": [
            "What questions do you have about reproductive health?",
            "Are you tracking your menstrual cycle?",
            "Would you like information about specific topics?"
        ],
        "Sexual Health": [
            "What sexual health topics would you like to learn more about?",
            "Do you have questions about safe practices?",
            "Would you like resources for sexual wellness?"
        ],
        "Menopause Support": [
            "How are you managing your menopause journey?",
            "What symptoms would you like to discuss?",
            "Are you looking for lifestyle management tips?"
        ]
    };

    return prompts[communityName] || [
        "How can I assist you today?",
        "What topics would you like to discuss?",
        "Do you have any specific questions?"
    ];

  const prompts = {
    "Health & Wellness": [
      "What health topics would you like to discuss today?",
      "Have you noticed any changes in your health recently?",
      "What wellness goals are you working towards?"
    ],
    "Supportive Chat": [
      "How are you feeling today?",
      "Is there something on your mind you'd like to talk about?",
      "Would a supportive ear help right now?"
    ],
    "Learning & Growth": [
      "What are your current learning goals?",
      "Is there a topic you'd like to explore together?",
      "Do you want advice about study or self-development?"
    ]
  };

  return prompts[communityName] || [
    "How can I support you today?",
    "Is there a specific topic or question on your mind?",
    "Would you like tips, resources, or just someone to listen?"
  ];

};