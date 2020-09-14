const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller');

router
.post('/user/find', userController.userFind)
.post('/user/find/id', userController.userFindId)
.post('/user/search', userController.userSearch)
.post('/user/insert', userController.userInsert)
.post('/user/update', userController.updateUser)
.post('/user/delete', userController.deleteUser);

module.exports = router;
