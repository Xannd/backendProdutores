const productModel = require('../models/productModels');

const isError = (result) => result && typeof result === 'object' && result.status;

const getProducts = async (_req, res) => {
    const products = await productModel.getProducts();

    if (isError(products)) {
        return res.status(products.status).json({ message: products.message });
    }

    return res.status(200).json(products);
};

module.exports = {
    getProducts
};