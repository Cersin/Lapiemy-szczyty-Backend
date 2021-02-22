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

module.exports = Article;
