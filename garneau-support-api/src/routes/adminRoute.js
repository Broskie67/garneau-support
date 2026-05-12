const adminController = require('../controllers/adminController')
const isAuth = require('../middleware/isAuth')
const { isAdmin } = require('../middleware/roleValidation')
const { signupValidation } = require('../middleware/formValidation')
const express = require('express');
const router = express.Router()

router.get('/admin/users', isAuth, isAdmin, adminController.getUsers)
router.patch('/admin/users/:id/status', isAuth, isAdmin, adminController.updateUserActiveStatus)
router.post('/admin/technicians/create', isAuth, isAdmin, signupValidation, adminController.createTech)

module.exports = router