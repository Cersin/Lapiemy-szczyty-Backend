const Article = require('./../models/articleModel');

exports.getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).json({
            status: 'success',
            results: articles.length,
            data: {
                articles
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err
        });
    }

}

exports.getOneArticle = async (req, res) => {
    try {
        const article = await Article.findOne({ title: req.params.title});
        res.status(200).json({
            status: 'success',
            data: {
                article
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err
        });
    }
}

exports.createArticle = async (req, res) => {
    try {
        const newArticle = await Article.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                article: newArticle
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: 'Invalid data send!'
        })
    }

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
