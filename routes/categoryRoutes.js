const express = require('express');
const router = express.Router();
const categoryController = require('./../controllers/categoryController');
const authController = require('./../controllers/authController');

router
    .route('/')
    .get(categoryController.getAllCategories)
    .post(authController.protect, authController.restrictRoles('admin'), categoryController.addCategory);

module.exports = router;
