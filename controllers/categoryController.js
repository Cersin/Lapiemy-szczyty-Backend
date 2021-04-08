const Category = require('./../models/categoryModel');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        if (!categories) {
            throw new Error('Nie ma żadnej kategorii');
        }

        res.status(200).json({
            status: 'success',
            data: {
                categories
            }
        });

    } catch (e) {
        res.status(400).json({
            status: 'failed',
            message: e.message
        })
    }
}

exports.addCategory = async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);

        res.status(201).json({
            status: 'success',
            category: newCategory
        })

    } catch (e) {
        res.status(400).json({
            status: 'failed',
            message: e.message
        })
    }
}
