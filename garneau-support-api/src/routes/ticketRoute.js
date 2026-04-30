const ticketController = require('../controllers/ticketController');
const isAuth = require('../middleware/isAuth');
const { isClient, isTechnician, isAdmin } = require('../middleware/roleValidation')
const express = require('express');
const router = express.Router();

router.get('/client', isAuth, isClient, ticketController.getClientTickets)
router.get('/technician', isAuth, isTechnician, ticketController.getTechnicianTickets)

module.exports = router