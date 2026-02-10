const express = require("express");
const router = express.Router();
const { chatWithAI, getChatHistory } = require("../controllers/chatController");

router.post("/chat", chatWithAI);

router.get("/chat-history", getChatHistory);

module.exports = router;