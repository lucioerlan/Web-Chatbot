const express = require('express');
const router = express.Router();

const chatbotController = require('../controllers/chatbot-controller');

router
.get('/chatbot/question', chatbotController.chatbotQuestion)
.post('/chatbot/find/id', chatbotController.chatbotFindId)
.post('/chatbot/find', chatbotController.chatbotFind)
.post('/chatbot/insert', chatbotController.chatbotInsert)
.post('/chatbot/update', chatbotController.chatbotUpdate)
.post('/chatbot/delete', chatbotController.chatbotDelete);

module.exports = router;
