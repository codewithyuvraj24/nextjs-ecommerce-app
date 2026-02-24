const orderModel = require('../models/orderModel');

const createOrder = async (req, res, next) => {
    const { totalAmount, shippingAddress, items, status } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ message: 'No items in order' });
    }

    try {
        const order = await orderModel.createOrder(req.user.id, totalAmount, shippingAddress, items, status || 'pending');
        res.status(201).json(order);
    } catch (err) {
        next(err);
    }
};

const getMyOrders = async (req, res, next) => {
    try {
        const orders = await orderModel.getOrdersByUser(req.user.id);
        res.json(orders);
    } catch (err) {
        next(err);
    }
};

const getAllOrders = async (req, res, next) => {
    try {
        const orders = await orderModel.getAllOrders();
        res.json(orders);
    } catch (err) {
        next(err);
    }
};

const updateOrderStatus = async (req, res, next) => {
    const { status, paymentId, trackingId } = req.body;
    try {
        const order = await orderModel.updateOrderStatus(req.params.id, status, paymentId, trackingId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
};
