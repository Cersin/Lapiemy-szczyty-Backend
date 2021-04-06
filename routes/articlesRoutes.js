const express = require('express');
const articlesController = require('../controllers/articlesController');
const authController = require('../controllers/authController');
const router = express.Router();

// Get stats
router.route('/stats').get(articlesController.getArticlesStats);

// Get and post article
router
    .route('/')
    .get(articlesController.getAllArticles)
    .post(authController.protect, authController.restrictRoles('admin'), articlesController.createArticle);

// Get all articles number
router
    .route('/number')
    .get(articlesController.getNumberOfArticles);

// Get one, patch and delete article
router
    .route('/:title')
    .get(articlesController.getOneArticle)

router
    .route('/:id')
    .patch(authController.protect, authController.restrictRoles('admin'), articlesController.updateArticle)
    .delete(authController.protect, authController.restrictRoles('admin'), articlesController.deleteArticle);

module.exports = router;
