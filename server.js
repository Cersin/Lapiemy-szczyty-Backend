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
}).catch((err) => {
    console.log(err);
});

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    mainPhoto: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tripDate: {
        type: Date,
        required: true
    },
    distance: {
        type: Number
    }
}, {
    timestamps: { createdAt: 'createdAt'}
});

const Article = mongoose.model('Article', articleSchema);

// console.log(process.env.NODE_ENV);
// Listen to server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
