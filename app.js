const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();
app.use(express.json()); // middleware for sending request
app.use(morgan('dev'));

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

const createAdmin = (req,res) => {
    res.status(500).json({
        status: 'err',
        message: 'This route is not yet defined'
    })
}

const getAdmin = (req,res) => {
    res.status(500).json({
        status: 'err',
        message: 'This route is not yet defined'
    })
}

///// ROUTER /////
const articleRouter = express.Router();
const adminRouter = express.Router();

// Get and post article
articleRouter
    .route('/')
    .get(getAllArticles)
    .post(createArticle);

// Get one, patch and delete article
articleRouter
    .route('/:title')
    .get(getOneArticle)
    .patch(updateArticle)
    .delete(deleteArticle);

// admin
adminRouter
    .route('/')
    .get(getAdmin)
    .post(createAdmin)

app.use('/articles', articleRouter);
app.use('/admin', adminRouter);

// Listen to server
const port = 3001;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
