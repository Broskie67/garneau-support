const { authController } = require('../controllers/authController');
const signupValidation = require('../middleware/signupValidation');
const signinValidation = require('../middleware/signinValidation');
const express = require('express');
const router = express.Router();

router.post('/signup', signupValidation, authController.signup);
router.post('/signin', signinValidation, authController.signin);

module.exports = router;