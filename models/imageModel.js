const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: [true, 'Zdjęcie musi posiadać ciąg do dostępu'],
        trim: true,
        unique: true
    }
});

const Image = mongoose.model('Image', imageSchema);
module.exports = Image;
