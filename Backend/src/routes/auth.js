const express = require('express');
const router = express.Router();
const { googleLogin, googleCallback, logout } = require('../controllers/authController');


router.get('/google', googleLogin);

router.get('/google/callback', googleCallback);

router.get('/logout', logout);

module.exports = router;
