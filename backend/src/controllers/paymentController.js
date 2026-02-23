const Razorpay = require('razorpay');
const crypto = require('crypto');
const orderModel = require('../models/orderModel');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
    const { amount, currency = 'INR', receipt, notes } = req.body;

    try {
        const options = {
            amount: amount * 100, // amount in paise
            currency,
            receipt,
            notes,
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err });
    }
};

const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_id } = req.body;

    try {
        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature === razorpay_signature) {
            // Payment verified
            // Update order status in DB
            console.log(`Payment verified for order ${order_id}`);

            const updatedOrder = await orderModel.updateOrderStatus(order_id, 'paid', razorpay_payment_id);

            // TODO: Trigger Shiprocket shipment creation here or via separate endpoint

            res.json({ message: 'Payment verified successfully', order: updatedOrder });
        } else {
            res.status(400).json({ message: 'Invalid signature' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createOrder,
    verifyPayment,
};
