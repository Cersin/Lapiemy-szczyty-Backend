const multer = require('multer');
const AppError = require('./../utils/appError');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/articles');
    },
    filename: (req, file, cb) => {
        // const ext = file.mimetype.split('/')[1];
        // cb(null, `mountains-${Date.now()}.${ext}`);
        cb(null, file.originalname);
    }
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadImage = upload.single('upload');

exports.responseImage = async (req, res) => {
    console.log(req.file);
    const imageUrl = req.file.path.replace(/\\/g, "/").substring("public".length);
    try {
        res.status(200).json({
            url: `${req.hostname}:${process.env.PORT}${imageUrl}`
        });
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        });
    }
}
