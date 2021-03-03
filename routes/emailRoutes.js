const express = require('express');
const emailController = require('../controllers/emailController');
const router = express.Router();

// Send email
router.post('/send', emailController.sendEmail);

module.exports = router;
