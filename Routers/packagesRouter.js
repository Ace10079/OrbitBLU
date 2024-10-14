const express = require('express');
const router = express.Router();
const packagesController = require('../Controllers/packagesController');

router.post('/post', packagesController.createPackage);
router.get('/get', packagesController.getAllPackages);

module.exports = router;
