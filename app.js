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

module.exports = app;
