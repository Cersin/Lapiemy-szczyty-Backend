const express = require('express');
const imageController = require('../controllers/imageController');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/', imageController.getImages);

router.post('/send',
    authController.protect,
    authController.restrictRoles('admin'),
    imageController.uploadImage,
    imageController.responseImage);

module.exports = router;
