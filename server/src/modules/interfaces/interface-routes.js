const router = require('express').Router();
const InterfaceController = require('./interface-controller');

const interfaceController = new InterfaceController();

router
  .get('/test', interfaceController.home)
  .get('/chatbot', interfaceController.chatbot);

module.exports = router;
