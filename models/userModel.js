const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Proszę wprowadź nazwę użytkownika!'],
        unique: true,
        trim: true,
        minlength: [4, 'Wprowadź przynajmniej 4 litery'],
        maxlength: [15, 'Nazwa może mieć maksymalnie 15 liter']
    },
    password: {
        type: String,
        required: [true, 'Nie wpisałeś hasła'],
        validate: [validator.isStrongPassword, 'Twoje hasło powinno mieć: 8 liter, 1 z małej, 1 z dużej, 1 liczbę, 1 symbol'],
        select: false
    },
    role: {
        type: String,
        enum: ['user'],
        default: 'user'
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Prosze potwierdź hasło'],
        validate: {
            validator: function (val) {
                return val === this.password;
            },
            message: 'Twoje hasła nie są takie same'
        }
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    // Hash password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Delete passwordConfirm
    this.passwordConfirm = undefined;

    next();
});

userSchema.methods.correctPassword = async function(hashedPassword, userPassword) {
    return await bcrypt.compare(hashedPassword, userPassword);
}

const User = mongoose.model('User', userSchema);
module.exports = User;
