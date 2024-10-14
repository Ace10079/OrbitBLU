const express = require('express');
const router = express.Router();
const enquiriesController = require('../Controllers/enquiriesController');

router.post('/post', enquiriesController.createEnquiry);
router.get('/get', enquiriesController.getAllEnquiries);

module.exports = router;
