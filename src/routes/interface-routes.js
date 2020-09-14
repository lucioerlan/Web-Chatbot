const express = require('express');
const router = express.Router();

const interfaceController = require('../controllers/interfaces-controller');

router
.get('/', interfaceController.inicioInterface)
.get('/admin', interfaceController.adminInterface)
.get('/index', interfaceController.dashboardInterface)
.get('/chatbot', interfaceController.chatbotInterface)

.get('/teste', interfaceController.testeInterface);

module.exports = router;
