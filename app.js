const express = require('express');
const morgan = require('morgan');

const articleRouter = require('./routes/articlesRoutes');
const adminRouter = require('./routes/adminRoutes');

const app = express();
app.use(express.json()); // middleware for sending request
app.use(morgan('dev')); // middleware for status

// use routes
app.use('/articles', articleRouter);
app.use('/admin', adminRouter);

module.exports = app;
