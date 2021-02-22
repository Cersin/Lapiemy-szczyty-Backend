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

exports.createArticle = (req, res) => {
        res.status(201).json({
            status: 'success',
            data: {
                // article: newArticle
            }
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
