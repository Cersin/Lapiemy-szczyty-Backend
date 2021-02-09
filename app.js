const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json()); // middleware for sending request

const articles = JSON.parse(
    fs.readFileSync(`${__dirname}/data/articles.json`)
);

const getAllArticles = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: articles.length,
        data: {
            articles
        }
    })
}

const getOneArticle = (req, res) => {
    console.log(req.params);

    const article = articles.find(article => article.title === req.params.title);

    if (!article) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid title'
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            article
        }
    });
}

const createArticle = (req, res) => {
    const newId = JSON.stringify((articles.length -1) + 1);
    console.log(articles.length);
    const newArticle = Object.assign({ id: newId }, req.body);

    articles.push(newArticle);

    fs.writeFile(`${__dirname}/data/articles.json`, JSON.stringify(articles), err => {
        res.status(201).json({
            status: 'success',
            data: {
                article: newArticle
            }
        });
    });
}

const updateArticle = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here>'
        }
    })
}

const deleteArticle = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null
    })
}

// Get and post article
app
    .route('/articles')
    .get(getAllArticles)
    .post(createArticle);

// Get one, patch and delete article
app
    .route('/articles/:title')
    .get(getOneArticle)
    .patch(updateArticle)
    .delete(deleteArticle);


// Listen to server
const port = 3001;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
