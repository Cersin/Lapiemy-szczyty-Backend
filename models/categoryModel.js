const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Kategoria musi posiadać unikalną nazwę'],
        unique: true,
        trim: true
    }
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
