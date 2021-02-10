const fs = require('fs');

const articles = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/articles.json`)
);

exports.checkID = (req, res, next, val) => {
    console.log(`Tour id is: ${val}`);
    if (!articles.find(article => article.title === req.params.title)) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    next();
};

exports.getAllArticles = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: articles.length,
        data: {
            articles
        }
    })
}

exports.getOneArticle = (req, res) => {
    const article = articles.find(article => article.title === req.params.title);
    res.status(200).json({
        status: 'success',
        data: {
            article
        }
    });
}

exports.createArticle = (req, res) => {
    const newId = JSON.stringify((articles.length -1) + 1);
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

exports.updateArticle = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here>'
        }
    })
}

exports.deleteArticle = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null
    })
}
