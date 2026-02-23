const shiprocketService = require('../services/shiprocketService');
const orderModel = require('../models/orderModel');

const createShipment = async (req, res) => {
    const { orderId } = req.body;

    try {
        // Fetch full order details including items and user
        // For now using simple update
        // In real scenario, we need full order data to pass to Shiprocket

        // Placeholder fetching logic
        // const order = await orderModel.getOrderById(orderId);

        const mockOrder = {
            id: orderId,
            total_amount: 1000,
            shipping_address: {
                street: '123 Main St',
                city: 'Delhi',
                state: 'Delhi',
                zip: '110001',
                country: 'India'
            }
        };

        const shipment = await shiprocketService.createShipment(mockOrder);

        // Update order with tracking ID
        await orderModel.updateOrderStatus(orderId, 'shipped', null, shipment.awb_code);

        res.json({ message: 'Shipment created', shipment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Logistics error', error: err.message });
    }
};

module.exports = {
    createShipment,
};
