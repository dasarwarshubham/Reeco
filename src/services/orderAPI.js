import { API_BASE_URL } from "../constants/routes";

export const getAllOrders = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/fixtures/orders.json`);
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    } catch (error) {
        // const errorMsg = error.message
        throw new Error(error?.response?.data);
    }
};

export const getOrderDetailsWithId = async (orderId) => {
    try {
        let response = await fetch(`${API_BASE_URL}/fixtures/orderDetails.json`);
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        response = await response.json();
        response = await response.filter((order) => order.id === orderId)[0]
        return response;
    } catch (error) {
        // const errorMsg = error.message
        throw new Error(error?.response?.data);
    }
}
