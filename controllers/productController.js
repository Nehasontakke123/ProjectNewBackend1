import mongoose from "mongoose";
import * as productService from "../services/productService.js";
import Product from "../models/productModel.js";




export const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        if (!productData.name || !productData.productCode || !productData.category || !productData.metalType) {
            return res.status(400).json({ success: false, message: "Missing required fields!" });
        }
        
        if (req.files && req.files.length > 0) {
            productData.images = req.files.map(file => file.path);
        }
        
        const newProduct = await Product.create(productData);
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};



export const getAllProducts = async (req, res) => {
    try {
        console.log("Fetching products..."); // 👈 Debug log
        const products = await Product.find();
        console.log("Products Fetched:", products); // 👈 Data print 

        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Error fetching products" });
    }
};



export const getProductsByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const products = await Product.find({ category });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products by category", error });
    }
};



// export const getProductsByCategory = async (req, res) => {
//     try {
//         let category = req.params.category;

//         // ✅ Remove hyphens & make case-insensitive
//         category = category.replace(/-/g, " ").toLowerCase();

//         const products = await Product.find({
//             category: { $regex: new RegExp("^" + category + "$", "i") }
//         });

//         if (!products.length) {
//             return res.status(404).json({ message: "No products found!" });
//         }

//         res.json({ success: true, data: products });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//     }
// };




export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid Product ID" });
        }
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error("Get Product By ID Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};




export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ Check if ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid Product ID" });
        }

        let updateData = req.body;
        delete updateData.productCode;

        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

        res.status(200).json({ success: true, message: "Product updated successfully", data: updatedProduct });
    } catch (error) {
        console.error("Update Product Error:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};





export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ Check if ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid Product ID" });
        }

        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error("Delete Product Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

