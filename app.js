const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
// const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const history = require('connect-history-api-fallback');
const compression = require('compression');
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const appError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const articleRouter = require('./routes/articlesRoutes');
const adminRouter = require('./routes/adminRoutes');
const emailRouter = require('./routes/emailRoutes');
const imageRouter = require('./routes/imageRoutes');
const categoryRouter = require('./routes/categoryRoutes');

const app = express();

const corsOptions = {
    origin: "http://localhost:3001"
};

app.use(cors());

// history mode to work
app.use(history());
app.use(express.static('public'));

// Set security HTTP Headers
app.use(helmet());

// enable JSON compression fetch
app.use(compression());

if (process.env.NODE_ENV === 'development nodemon server') {
    app.use(morgan('dev'));
}

// rate limit
const limit = rateLimit({
    max: 100,
    windowsMs: 60 * 60 * 1000,
    message: 'Za dużo połączeń, wróc za godzinkę'
});
app.use('/', limit);

app.use(express.json()); // middleware for sending request

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// // Data sanitization against XSS - cross site scripting hack
// app.use(xss());

// Prevent parameter pollution - duplicate query - sort etc
app.use(hpp());

// serve static files
app.use(express.static(`${__dirname}/public`));

const path = __dirname + '/public';
app.use(express.static(path));

// use routes
app.use('/articles', articleRouter);
app.use('/admin', adminRouter);
app.use('/email', emailRouter);
app.use('/image', imageRouter);
app.use('/category', categoryRouter);

// Wrong path handler
app.all('*', (req, res, next) => {
    next(new appError(`Nie można znaleźć ${req.originalUrl}`, 404));
});

// Global error handler
app.use(globalErrorHandler);


process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);
    console.log('UNCAUGHT EXCEPTION! Shutting down.');
    server.close(() => {
        process.exit(1);
    });
});

dotenv.config({path: './config.env'});

const DB = process.env.DATABASE_ATLAS;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log('Połączono z bazą danych');
});

// console.log(process.env.NODE_ENV);
// Listen to server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    console.log('Błąd servera! Zamykam serwer.');
    server.close(() => {
        process.exit(1);
    });
});
