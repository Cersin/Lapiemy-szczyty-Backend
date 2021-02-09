const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json()); // middleware for sending request

const articles = JSON.parse(
    fs.readFileSync(`${__dirname}/data/articles.json`)
);

app.get('/articles', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: articles.length,
        data: {
            articles
        }
    })
});

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
