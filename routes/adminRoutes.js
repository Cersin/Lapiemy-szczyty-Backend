const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

// admin
router
    .route('/')
    .get(adminController.getAdmin)
    .post(adminController.createAdmin)
