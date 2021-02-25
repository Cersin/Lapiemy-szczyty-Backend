const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);
    console.log('UNCAUGHT EXCEPTION! Shutting down.');
    server.close(() => {
        process.exit(1);
    });
});

const app = require('./app');

dotenv.config({path: './config.env'});

const DB = process.env.DATABESE_LOCAL;

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
