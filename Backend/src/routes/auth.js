const express = require('express');
const router = express.Router();
const { signUp,googleLogin, googleCallback, logout, getMe, login } = require('../controllers/authController');
const {authMiddleware }= require('../middleware/authMiddleware');

router.get('/google', googleLogin);

router.get('/google/callback', googleCallback);

router.post('/login', login);

router.post('/', signUp);

router.get('/logout', authMiddleware,logout);

router.get('/getMe', authMiddleware ,getMe);



module.exports = router;
