const express = require('express');
const res = require('express/lib/response');
const userController = require('../controllers/users')
const jwt =require('jsonwebtoken');
require('dotenv').config();


const router = express.Router();


router.route('/login')
    .post(userController.getUserLogin)

router.route('/token')
    .post(userController.getToken);

router.route('/logout')
    .delete(userController.getUserLogout);

module.exports = router