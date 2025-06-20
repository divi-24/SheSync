import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI("AIzaSyDC_nwnZggf8CYID3qvJfazEE8KBnqd9Ro");

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
};