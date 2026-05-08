const authController = require('../controllers/authController');

const {signinValidation, signupValidation} = require('../middleware/formValidation');
const express = require('express');
const router = express.Router();

router.post('/auth/signup', signupValidation, authController.signup);
router.post('/auth/signin', signinValidation, authController.signin);
router.post('/auth/check-email', authController.checkEmail)

module.exports = router;