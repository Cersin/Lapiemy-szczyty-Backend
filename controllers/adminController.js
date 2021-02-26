const User = require('./../models/userModel');

exports.createAdmin = async (req, res) => {
    res.status(500).json({
        status: 'err',
        message: 'This route is not yet defined'
    })
}

exports.getAdmin = async (req, res) => {
    try {
        const users = await User.find();
        console.log('lol');
        res.status(200).json({
            status: 'success',
            data: {
                users
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: err
        })
    }
}
