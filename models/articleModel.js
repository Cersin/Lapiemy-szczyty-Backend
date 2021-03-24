const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Artykuł musi posiadać nazwę'],
        unique: [true],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Artykuł musi posiadać opis'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Artykuł musi posiadać kategorię'],
        trim: true
    },
    mainPhoto: {
        type: String,
        required: [true, 'Artykuł musi posiadać główne zdjęcie']
    },
    content: {
        type: String,
        required: [true, 'Artykuł musi posiadać kontent'],
    },
    images: [String],
    tripDate: {
        type: Date,
        required: [true, 'Artykuł musi posiadać datę wycieczki'],
    },
    duration: {
        type: String
    },
    distance: {
        type: Number
    }
}, {
    timestamps: {createdAt: 'createdAt'}
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;
