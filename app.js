const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json()); // middleware for sending request

const articles = JSON.parse(
    fs.readFileSync(`${__dirname}/data/articles.json`)
);

// Get all articles
app.get('/articles', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: articles.length,
        data: {
            articles
        }
    })
});

// Get one article
app.get('/articles/:title', (req, res) => {
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
})

// Post article
app.post('/articles', (req, res) => {
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
})

const port = 3001;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
