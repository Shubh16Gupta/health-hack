const { generateAyurvedaResponse } = require("../config/gemini");
const Chat = require("../models/Chat"); 

exports.chatWithAI = async (req, res) => {

  try {

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required"
      });
    }

    // generate response from Gemini
    const aiResponse = await generateAyurvedaResponse(message);


    // SAVE CHAT IN DATABASE  ← VERY IMPORTANT
    const chatRecord = await Chat.create({

      userId: req.user?.id || null,  // if auth exists, else null

      message: message,

      response: aiResponse

    });


    res.status(200).json({

      success: true,

      reply: aiResponse,

      chatId: chatRecord._id

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

exports.getChatHistory = async (req, res) => {

  try {

    const chats = await Chat.find()
      .sort({ createdAt: -1 });

    res.status(200).json({

      success: true,

      chats

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};