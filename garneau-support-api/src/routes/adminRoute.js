const { adminController } = require('../controllers/adminController')
const isAuth = require('../middleware/isAuth')
const { isAdmin } = require('../middleware/roleValidation')
const express = require('express');
const router = express.Router()

router.get('/users', isAuth, isAdmin, adminController.getUsers)
router.patch('/users/:id/status', isAuth, isAdmin, adminController.updateUserActiveStatus)

module.exports = router