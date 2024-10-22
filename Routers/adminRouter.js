const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');

router.post('/create', adminController.createAdminUser);
router.get('/login', adminController.loginAdmin);

module.exports = router;