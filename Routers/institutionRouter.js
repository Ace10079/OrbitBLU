const express = require('express');
const router = express.Router();
const institutionController = require('../Controllers/institutionController');

router.post('/post', institutionController.createInstitution);
router.get('/get', institutionController.getAllInstitutions);

module.exports = router;
