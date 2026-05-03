const authController = require('../controllers/authController');

const {signinValidation, signupValidation} = require('../middleware/formValidation');
const express = require('express');
const router = express.Router();

router.post('/signup', signupValidation, authController.signup);
router.post('/signin', signinValidation, authController.signin);

module.exports = router;