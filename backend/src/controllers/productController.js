const productModel = require('../models/productModel');

const getProducts = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 12;
        const offset = (page - 1) * limit;

        const { search, category, minPrice, maxPrice, sort } = req.query;

        const data = await productModel.getAllProducts({
            limit,
            offset,
            search,
            category,
            minPrice: minPrice ? parseFloat(minPrice) : undefined,
            maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
            sort
        });

        res.json({
            products: data.products,
            total: data.total,
            page,
            limit,
            totalPages: Math.ceil(data.total / limit)
        });
    } catch (err) {
        next(err);
    }
};

const getProduct = async (req, res, next) => {
    try {
        const product = await productModel.getProductBySlug(req.params.slug);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        next(err);
    }
};

const createProduct = async (req, res, next) => {
    try {
        const newProduct = await productModel.createProduct(req.body);
        res.status(201).json(newProduct);
    } catch (err) {
        next(err);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await productModel.updateProduct(req.params.id, req.body);
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (err) {
        next(err);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const result = await productModel.deleteProduct(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product removed' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
