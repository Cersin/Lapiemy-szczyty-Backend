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

// Wrong path handler
app.all('*', (req, res, next) => {
    const err = new Error(`Nie można znaleźć ${req.originalUrl}`);
    err.status = 'fail';
    err.statusCode = 404;

    next(err);
});

// Global error handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });

    next();
})

module.exports = app;
