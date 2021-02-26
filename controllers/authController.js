const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
        });

        const token = await jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: newUser
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        });
    }
}

exports.login = async (req, res) => {
    try {
        const {name, password} = req.body;
        if (!name || !password) {
            throw new Error('You must input name and password');
        }
        const user = await User.findOne({name}).select('+password');
        if (!user || !(await user.correctPassword(password, user.password))) {
            throw new Error('Incorrect email or password');
        }

        const token = await jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        res.status(200).json({
            status: 'success',
            token
        });

    } catch (err) {
        res.status(201).json({
            status: 'failed',
            message: err.message
        });
    }
}

exports.verify = async (req, res) => {
    try {
        const {token} = req.body;
        await jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({
            status: 'success',
            logged: true
        })
    } catch (err) {
        res.status(401).json({
            status: 'failed',
            logged: false
        });
    }
}
