const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');

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
