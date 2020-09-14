const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin-controller');

router
.post('/admin/search', adminController.adminSearch);

module.exports = router;
