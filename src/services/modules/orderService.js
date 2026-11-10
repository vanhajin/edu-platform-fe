import { orderApiClient } from '../apiClient.js';
export const orderService = {
    getMyOrders: () => orderApiClient.get('/orders/my-orders'),
    createOrder: (cartItems) => orderApiClient.post('/orders/checkout', { items: cartItems })
};
