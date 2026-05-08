const commentController = require('../controllers/commentController')
const isAuth = require('../middleware/isAuth');
const express = require('express');
const router = express.Router();

router.get('/tickets/:id/comments', isAuth, commentController.getTicketComments)

module.exports = router