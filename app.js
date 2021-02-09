const express = require('express');
const fs = require('fs');

const app = express();

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
})

const port = 3001;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
