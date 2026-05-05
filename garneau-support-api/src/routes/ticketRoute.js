const ticketController = require('../controllers/ticketController');
const isAuth = require('../middleware/isAuth');
const { isClient, isTechnician, isAdmin } = require('../middleware/roleValidation')
const { ticketValidation } = require('../middleware/formValidation')
const express = require('express');
const router = express.Router();

router.post('/', isAuth, isClient, ticketValidation, ticketController.createTicket)
router.get('/client', isAuth, isClient, ticketController.getClientTickets)
router.get('/technician', isAuth, isTechnician, ticketController.getTechnicianTickets)
router.get('/:id', isAuth, ticketController.getTicket)
router.patch('/:id', isAuth, ticketController.updateTicket)
router.patch('/:id/assign/me', isAuth, isTechnician, ticketController.patchSelfAssignTicket)

module.exports = router