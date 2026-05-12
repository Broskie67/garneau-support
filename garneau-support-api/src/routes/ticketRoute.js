const ticketController = require('../controllers/ticketController');
const isAuth = require('../middleware/isAuth');
const { isClient, isTechnician, isAdmin } = require('../middleware/roleValidation')
const { ticketValidation } = require('../middleware/formValidation')
const express = require('express');
const router = express.Router();

router.post('/tickets', isAuth, isClient, ticketValidation, ticketController.createTicket)
router.get('/tickets/client', isAuth, isClient, ticketController.getClientTickets)
router.get('/tickets/technician', isAuth, isTechnician, ticketController.getTechnicianTickets)
router.get('/tickets/admin', isAuth, isAdmin, ticketController.getAllTickets)
router.get('/tickets/:id', isAuth, ticketController.getTicket)
router.patch('/tickets/:id', isAuth, ticketController.updateTicket)
router.patch('/tickets/:id/assign/me', isAuth, isTechnician, ticketController.patchSelfAssignTicket)

module.exports = router