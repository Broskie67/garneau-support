const ticketController = require('../controllers/ticketController');
const isAuth = require('../middleware/isAuth');
const express = require('express');
const router = express.Router();

router.get('/', isAuth, ticketController.getTickets)

module.exports = router