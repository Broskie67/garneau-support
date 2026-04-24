const { authController } = require('../controllers/authController');
const signupValidation = require('../middleware/signupValidation');
const loginValidation = require('../middleware/loginValidation');
const express = require('express');
const router = express.Router();

router.post('/signup', signupValidation, authController.signup);
router.post('/login', loginValidation, authController.login);

module.exports = router;