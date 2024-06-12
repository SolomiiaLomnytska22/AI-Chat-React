require('dotenv').config();
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  }  = require("@google/generative-ai");
  
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


function startNewChat() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ];

    const chat = model.startChat({
        history: [], 
        generationConfig: {
            maxOutputTokens: 1000,
        },
        safetySettings
    });

    return chat;
}

module.exports = startNewChat;