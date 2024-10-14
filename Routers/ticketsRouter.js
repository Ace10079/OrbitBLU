const express = require('express');
const router = express.Router();
const ticketsController = require('../Controllers/ticketsController');

router.post('/post', ticketsController.createTicket);
router.get('/get', ticketsController.getAllTickets);

module.exports = router;
