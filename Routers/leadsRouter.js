const express = require('express');
const router = express.Router();
const leadsController = require('../Controllers/leadsController');

router.post('/post', leadsController.createLead);
router.get('/get', leadsController.getAllLeads);

module.exports = router;
