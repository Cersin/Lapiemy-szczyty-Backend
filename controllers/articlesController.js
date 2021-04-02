const Article = require('./../models/articleModel');
const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/appError');

exports.getAllArticles = async (req, res) => {
    try {
        const features = new APIFeatures(Article.find().sort({createdAt: -1}), req.query)
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
            message: err.message
        });
    }
}

exports.getOneArticle = async (req, res, next) => {
    try {
        const article = await Article.findOne({title: req.params.title});
        if (!article) {
            return next(new AppError(`Nie ma artykułu o nazwie: ${req.params.title} przepraszam.`));
        }
        res.status(200).json({
            status: 'success',
            data: {
                article
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
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
            message: err.message
        })
    }

}

exports.updateArticle = async (req, res, next) => {
    try {
        const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!article) {
            return next(new AppError(`Nie ma artykułu o id: ${req.params.id} przepraszam.`));
        }

        res.status(200).json({
            status: 'success',
            data: {
                article
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}

exports.deleteArticle = async (req, res, next) => {
    try {
        console.log(req.params.id);
        const article = await Article.findByIdAndDelete(req.params.id);
        if (!article) {
            return next(new AppError(`Nie ma artykułu o id: ${req.params.id} przepraszam.`));
        }
        res.status(204).json({
            status: 'success',
            data: null
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
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
            message: err.message
        });
    }
}
