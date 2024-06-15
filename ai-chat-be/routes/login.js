const express = require('express');
const router = express.Router();
const LoginController = require('../login/handleLogin.js');

router.post('/', LoginController.handleLogin);
module.exports = router;