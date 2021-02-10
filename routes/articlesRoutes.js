const express = require('express');
const articlesController = require('../controllers/articlesController');
const router = express.Router();


// Get and post article
router
    .route('/')
    .get(articlesController.getAllArticles)
    .post(articlesController.createArticle);

// Get one, patch and delete article
router
    .route('/:title')
    .get(articlesController.getOneArticle)
    .patch(articlesController.updateArticle)
    .delete(articlesController.deleteArticle);

