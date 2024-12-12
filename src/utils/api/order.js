import makeRequest from "../make_request";

const BASE_URL = 'order/';

export const getOrders = async ({config,query}) => makeRequest(config,'get', BASE_URL+"admin/all", {}, query);
export const getMyOrders = async ({config,query}) => makeRequest(config,'get', BASE_URL+"my-orders", {}, query);
export const getOrderById = async ({config,orderId}) => makeRequest(config,'get', BASE_URL+orderId, {});
export const createOrder = async ({config,data}) => makeRequest(config,'post', BASE_URL, data);
export const cancelOrder = async ({config,orderId}) => makeRequest(config,'post', BASE_URL+orderId+"/cancel", {});
export const retryPayment = async ({config,orderId}) => makeRequest(config,'patch', BASE_URL+orderId+"/retry-payment", {});
export const updateOrderStatus = async ({config,orderId,data}) => makeRequest(config,'patch', BASE_URL+"admin/"+orderId+"/status", data);
export const getOrderStats = async ({config}) => makeRequest(config,'get', BASE_URL+"admin/stats");