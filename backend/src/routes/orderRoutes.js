const express = require('express');
const {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
} = require('../controllers/orderController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createOrder);
router.get('/myorders', authMiddleware, getMyOrders);
router.get('/', authMiddleware, adminMiddleware, getAllOrders);
router.put('/:id/status', authMiddleware, adminMiddleware, updateOrderStatus);

module.exports = router;
