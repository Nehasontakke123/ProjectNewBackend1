import Product from '../models/productModel.js';  // Product Model Import 

export const createProduct = async (productData) => {
    return await Product.create(productData);
};

export const getAllProducts = async (filter = {}) => {
    return await Product.find(filter);
};

export const getProductById = async (productId) => {
    return await Product.findById(productId);
};

export const updateProduct = async (productId, updateData) => {
    return await Product.findByIdAndUpdate(productId, updateData, { new: true });
};

export const deleteProduct = async (productId) => {
    return await Product.findByIdAndDelete(productId);
};
