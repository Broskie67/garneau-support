const commentController = require('../controllers/commentController')
const isAuth = require('../middleware/isAuth');
const { validateComment } = require("../middleware/formValidation")
const express = require('express');
const router = express.Router();

router.get('/tickets/:id/comments', isAuth, commentController.getTicketComments)
router.post('/tickets/:id/comments/create', isAuth, validateComment, commentController.createComment)
module.exports = router