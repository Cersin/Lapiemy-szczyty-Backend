const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');

const createTokenCookie = (token, res) => {
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + process.env.JWT_COOKIER_EXPIRES_IN * 24 * 60 * 60 * 1000),
        secure: false, // true to https
        httpOnly: true
    });
}

exports.signup = async (req, res) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            role: req.body.role
        });

        const token = await jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        newUser.password = undefined;

        createTokenCookie(token, res);

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

        createTokenCookie(token, res);

        user.password = undefined;

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

exports.protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            throw new Error('Nie jesteś zalogowany. Zaloguj się!');
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            throw new Error('Nie jesteś zalogowany. Zaloguj się!');
        }
        req.user = currentUser
        next();
        // req.user = currectUser;
    } catch (err) {
        res.status(401).json({
            status: 'failed',
            message: err.message
        });
    }
}

exports.verify = async (req, res) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            throw new Error('Nie jesteś zalogowany. Zaloguj się!');
        }
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

exports.restrictRoles = (...roles) => {
    return (req, res, next) => {
        try {
            if (!roles.includes(req.user.role)) {
                throw new Error('Nie masz uprawnień do wykonania tej akcji');
            }
            next();
        } catch (e) {
            res.status(403).json({
                status: 'failed',
                message: e.message
            });
        }
    }
}
