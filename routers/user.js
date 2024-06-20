const express = require('express');
const userController = require('../controllers/users')
require('dotenv').config();
const router = express.Router();



router.route('/login')
    .post(userController.getUserLogin)

router.route('/token')
    .post(userController.getToken);

router.route('/logout')
    .delete(userController.getUserLogout);

router.route('/signup')
    .post(userController.getUserSignup)

module.exports = router