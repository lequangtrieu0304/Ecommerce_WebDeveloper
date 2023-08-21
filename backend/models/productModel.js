import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    name: { type: String, require: true },
    rating: { type: Number, require: true, default: 0, min: 0, max: 5 },
    comment: { type: String, require: true }
}, {
    timestamps: true,
});

const productSchema = new mongoose.Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    image: { type: String, require: true },
    category: { type: String, require: true },
    countInStock: { type: Number, require: true },
    sold: { type: Number, require: true },
    price: { type: String, require: true, default: 0.0 },
    rating: { type: String, default: 0.0, require: true },
    numReviews: { type: Number, default: 0, require: true },
    reviews: [reviewSchema],
}, {
    timestamps: true,
})

const Product = mongoose.model('Product', productSchema);
export default Product;