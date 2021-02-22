const Article = require('./../models/articleModel');

exports.getAllArticles = (req, res) => {
    res.status(200).json({
        status: 'success',
        // results: articles.length,
        // data: {
        //     articles
        // }
    })
}

exports.getOneArticle = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            // article
        }
    });
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
