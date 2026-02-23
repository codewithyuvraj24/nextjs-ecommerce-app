const axios = require('axios');

let token = null;

const login = async () => {
    try {
        const response = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
            email: process.env.SHIPROCKET_EMAIL,
            password: process.env.SHIPROCKET_PASSWORD,
        });
        token = response.data.token;
        return token;
    } catch (err) {
        console.error('Shiprocket login error:', err.response?.data || err.message);
        throw err;
    }
};

const createShipment = async (order) => {
    if (!token) await login();

    const shipmentData = {
        order_id: order.id,
        order_date: new Date().toISOString(),
        pickup_location: 'Primary', // Needs to be configured in Shiprocket dashboard
        billing_customer_name: order.shipping_address.name || 'Customer', // Extract from address JSON
        billing_last_name: '',
        billing_address: order.shipping_address.street,
        billing_city: order.shipping_address.city,
        billing_pincode: order.shipping_address.zip,
        billing_state: order.shipping_address.state,
        billing_country: order.shipping_address.country,
        billing_email: 'customer@example.com', // Need user email
        billing_phone: '9999999999', // Need phone
        shipping_is_billing: true,
        order_items: [
            {
                name: 'Product Name', // Need from order items details
                sku: 'sku123',
                units: 1,
                selling_price: order.total_amount,
            },
        ],
        payment_method: 'Prepaid',
        sub_total: order.total_amount,
        length: 10,
        breadth: 10,
        height: 10,
        weight: 0.5,
    };

    try {
        const response = await axios.post(
            'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc',
            shipmentData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (err) {
        if (err.response?.status === 401) {
            await login();
            return createShipment(order); // Retry once
        }
        console.error('Shiprocket create shipment error:', err.response?.data || err.message);
        throw err;
    }
};

module.exports = {
    login,
    createShipment,
};
