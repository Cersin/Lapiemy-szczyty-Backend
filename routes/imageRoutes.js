const express = require('express');
const imageController = require('../controllers/imageController');
const authController = require('../controllers/authController');
const router = express.Router();

router.patch('/send',
    authController.protect,
    authController.restrictRoles('admin'),
    imageController.uploadImage,
    imageController.responseImage);

module.exports = router;
