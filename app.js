const express = require('express');
const morgan = require('morgan');

const articleRouter = require('./routes/articlesRoutes');
const adminRouter = require('./routes/adminRoutes');

const app = express();

if (process.env.NODE_ENV === 'development nodemon server') {
    app.use(morgan('dev'));
}

app.use(express.json()); // middleware for sending request

// use routes
app.use('/articles', articleRouter);
app.use('/admin', adminRouter);

app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `Nie można znaleźć ${req.originalUrl}`
    });
});

module.exports = app;
