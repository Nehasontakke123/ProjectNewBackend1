import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    productCode: { type: String, required: true, unique: true },
    category: { type: String, required: true, enum: [
         "All Jewellery", "Gold Pendants", "Diamond Pendants",
         "Gold Earrings", "Diamond Earrings", "Diamond Rings", "Gold Rings", "Diamond Bangles", "Gold Bangles",
        "Diamond Mangalsutra", "Gold Mangalsutra", "Men Jewellery", "Diamond Bracelets","Gold Bracelets","Diamond Necklace","Gold Necklace", "Baby"
    ] },
    metalType: { type: String, required: true, enum: ["Gold", "Silver", "Platinum"] },
    goldColor: { type: String, required: true, enum: ["Yellow", "White", "Rose","Two-Tone","Silver"] },
    weight: { type: Number, required: true },
    price: { type: Number, required: true },
    priceBreakup: {
        goldPrice: { type: Number, required: true },
        makingCharge: { type: Number, required: true },
        tax: { type: Number, required: true },
    },
    availability: { type: String, required: true, enum: ["In stock", "Out of stock", "Make To Order"] },
    images: [{ type: String, required: true }],
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);
export default Product;


