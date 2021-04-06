const Image = require('./../models/imageModel');
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

exports.getImages = async (req, res) => {
    try {
        const images = await Image.find().skip(+req.query.skip).limit(+req.query.limit);
        res.status(200).json({
            status: 'success',
            results: images.length,
            data: {
                images
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        });
    }
}

exports.responseImage = async (req, res) => {
    const imageUrl = req.file.path.replace(/\\/g, "/").substring("public".length);
    try {
        const urlGallery = `${imageUrl}`;
        Image.create({url: urlGallery}).then(r => console.log(r)).catch((e) => {
            console.log("jest juz takie zdj");
        })
        res.status(200).json({
            url: `http://${req.hostname}:${process.env.PORT}${imageUrl}`
        });
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        });
    }
}
