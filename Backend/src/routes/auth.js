const express = require('express');
const router = express.Router();
const { googleLogin, googleCallback, logout, getMe } = require('../controllers/authController');
const {authMiddleware }= require('../middleware/authMiddleware');

router.get('/google', googleLogin);

router.get('/google/callback', googleCallback);

router.get('/logout', logout);

router.get('/getMe', authMiddleware ,getMe);

module.exports = router;
