const { profileController } = require('../controllers/profileController');
const isAuth = require('../middleware/isAuth');
const express = require('express');
const profileValidation = require('../middleware/profileValidation');
const router = express.Router();

router.get('/', isAuth, profileController.getProfile)
router.put('/', isAuth, profileValidation, profileController.updateProfile)

module.exports = router