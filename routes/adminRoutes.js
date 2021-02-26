const express = require('express');
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/verify', authController.verify);

// admin
router
    .route('/')
    .get(adminController.getAdmin)
    .post(adminController.createAdmin)

module.exports = router;
