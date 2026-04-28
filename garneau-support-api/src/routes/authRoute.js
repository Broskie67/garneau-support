const { authController } = require('../controllers/authController');
const signupValidation = require('../middleware/authValidation');
const signinValidation = require('../middleware/authValidation');
const express = require('express');
const router = express.Router();

router.post('/signup', signupValidation, authController.signup);
router.post('/signin', signinValidation, authController.signin);

module.exports = router;