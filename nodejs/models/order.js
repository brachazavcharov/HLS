const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
    orderDate: {
        type: Date,
        required: true
    },
    quantity: {
        type: Number,
        min: 1,
        required: true
    },
    customerId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Customer",
        required: true
    },
    productId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Product",
        required: true
    }
})
const Order = mongoose.model("Order", orderSchema,"order");
module.exports = Order;