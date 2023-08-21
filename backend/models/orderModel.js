import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    orderItems: [{
        name: {type: String, required: true},
        image: {type: String, required: true},
        price: {type: String, required: true},
        qty: {type: String, required: true},
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
    }],
    shipping: {
        name: String,
        phone: String,
        address: String,
        city: String,
        note: String
    },
    payment: String,
    itemsPrice: Number,
    shipPrice: Number,
    totalPrice: Number,
}, {
    timestamps: true,
});

const Order = mongoose.model('Order', orderSchema)

export default Order;
