const profileController = require('../controllers/profileController');
const isAuth = require('../middleware/isAuth');
const express = require('express');
const { profileValidation, updatePasswordValidation } = require('../middleware/formValidation');
const router = express.Router();

router.get('/profile', isAuth, profileController.getProfile)
router.put('/profile', isAuth, profileValidation, profileController.updateProfile)
router.put('/profile/password', isAuth, updatePasswordValidation, profileController.updatePassword)

module.exports = router