const Article = require('./../models/articleModel');
const APIFeatures = require('./../utils/apiFeatures');

exports.getAllArticles = async (req, res) => {
    try {
        const features = new APIFeatures(Article.find(), req.query)
            .pagination()
            .category();
        const articles = await features.articles;

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
        const article = await Article.findOne({title: req.params.title});
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
            message: err
        })
    }

}

exports.updateArticle = async (req, res) => {
    try {
        const article = await Article.findOneAndUpdate({title: req.params.title}, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                article
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err
        })
    }
}

exports.deleteArticle = async (req, res) => {
    try {
        await Article.findOneAndRemove({title: req.params.title});
        res.status(204).json({
            status: 'success',
            data: null
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err
        })
    }
}

exports.getArticlesStats = async (req, res) => {
    try {
        const stats = await Article.aggregate([
            {
                $group: {
                    _id: null,
                    trips: {$sum: 1},
                    distance: {$sum: '$distance'},
                    duration: {$sum: '$duration'}
                }
            },
            {
                $project: { // no visible - 0, visible - 1
                    _id: 0
                }
            }
        ]);

        res.status(200).json({
            status: 'success',
            data: {
                stats
            }
        })

    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err
        })
    }
}
