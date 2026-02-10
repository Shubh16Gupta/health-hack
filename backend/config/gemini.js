const { GoogleGenAI } = require("@google/genai");


// initialize Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});


// main function
async function generateAyurvedaResponse(userMessage) {

  try {

    const response = await ai.models.generateContent({

      model: "gemini-3-flash-preview",

      contents: `
You are an expert Ayurvedic doctor.

User problem: ${userMessage}

Provide response strictly in this format:

Medicine:
Herbs:
Home Remedies:
Diet:
Explanation:

Rules:
- Give Ayurvedic remedies only
- Be clear and professional
- Be safe and practical
- Do not give harmful advice
`

    });


    // return clean text
    return response.text;


  } catch (error) {

    console.error("Gemini error:", error);

    throw new Error("Failed to generate Ayurveda response");

  }

}


module.exports = { generateAyurvedaResponse };