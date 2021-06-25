const router = require('express').Router();
const ChatbotController = require('./chatbot-controller');

const chatbotController = new ChatbotController();

router
.get('/get-view-chatbot', chatbotController.view)
.get('/get-all-chatbot', chatbotController.index)
.get('/getid-chatbot', chatbotController.show)
.post('/store-chatbot', chatbotController.store)
.put('/update-chatbot', chatbotController.update); 

module.exports = router;
