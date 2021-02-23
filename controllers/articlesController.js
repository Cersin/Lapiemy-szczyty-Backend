const Article = require('./../models/articleModel');

exports.getAllArticles = async (req, res) => {
    try {
        let query = Article.find().skip(+req.query.skip).limit(4);

        // Pagination
        query = query.skip(+req.query.skip).limit(4);
        if (req.query.skip) {
            const numDoc = await Article.countDocuments();
            if (+req.query.skip >= numDoc) throw new Error('This page does not exist');
        }

        const articles = await query;
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
            message: err
        })
    }

}

exports.updateArticle = async (req, res) => {
    try {
        const article = await Article.findOneAndUpdate({ title: req.params.title }, req.body, {
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
        await Article.findOneAndRemove({ title: req.params.title });
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
