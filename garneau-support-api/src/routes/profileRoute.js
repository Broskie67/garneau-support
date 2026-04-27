const { profileController } = require('../controllers/profileController');
const isAuth = require('../middleware/isAuth');
const express = require('express');
const router = express.Router();

router.get('/', isAuth, profileController.getProfile)

module.exports = router