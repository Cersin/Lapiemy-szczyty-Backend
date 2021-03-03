const express = require('express');
const morgan = require('morgan');

const appError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const articleRouter = require('./routes/articlesRoutes');
const adminRouter = require('./routes/adminRoutes');
const emailRouter = require('./routes/emailRoutes');

const app = express();

if (process.env.NODE_ENV === 'development nodemon server') {
    app.use(morgan('dev'));
}

app.use(express.json()); // middleware for sending request

// use routes
app.use('/articles', articleRouter);
app.use('/admin', adminRouter);
app.use('/email', emailRouter);

// Wrong path handler
app.all('*', (req, res, next) => {
    next(new appError(`Nie można znaleźć ${req.originalUrl}`, 404));
});

// Global error handler
app.use(globalErrorHandler);

module.exports = app;
