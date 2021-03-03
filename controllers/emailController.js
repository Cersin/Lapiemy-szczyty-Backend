const sendEmail = require('./../utils/email');

exports.sendEmail = async (req, res) => {
    try {
        await sendEmail({
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.text
        });

        res.status(200).json({
            status: 'success',
            message: 'Email sent'
        });
    } catch (e) {
        res.status(500).json({
            status: 'failed',
            message: e.message
        })
    }
}
