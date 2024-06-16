const express = require('express');
const router = express.Router();
const LogoutController = require('../login/handleLogout.js');

router.get('/', LogoutController.handleLogout);
module.exports = router;