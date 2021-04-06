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
    tripDate: {
        type: Date,
        required: [true, 'Artykuł musi posiadać datę wycieczki'],
    },
    duration: {
        type: Number
    },
    distance: {
        type: Number
    },
    country: {
        type: String,
        required: [true, 'Artykuł musi posiadać nazwę kraju'],
        trim: true
    },
    map: {
        type: String
    }
}, {
    timestamps: {createdAt: 'createdAt'}
});


const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
