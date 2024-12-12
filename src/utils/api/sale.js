import makeRequest from "../make_request";

const BASE_URL = 'sale/';

export const getOngoingSales = async ({config,query}) => makeRequest(config,'get', BASE_URL+"ongoing", {}, query);
export const addProducts = async ({config,saleId,data}) => makeRequest(config,'post', BASE_URL+saleId+"/products", data);
export const cancelSale = async ({config,saleId}) => makeRequest(config,'post', BASE_URL+saleId+"/cancel");
export const createSale = async ({config,data}) => makeRequest(config,'post', BASE_URL,data);
export const getAllSales = async ({config,params}) => makeRequest(config,'get', BASE_URL,{},params);
export const getSaleStats = async ({config,params}) => makeRequest(config,'get', BASE_URL+"admin/sales/stats",{},params);
export const getSaleById = async ({config,saleId}) => makeRequest(config,'get', BASE_URL+saleId+"/sale");
export const removeProducts = async ({config,saleId,data}) => makeRequest(config,'post', BASE_URL+saleId+"/products",data);
export const updateProductDiscount = async ({config,saleId,productId,data}) => makeRequest(config,'patch', BASE_URL+saleId+"/products/"+productId+"/discount",data);
export const updateSale = async ({config,saleId,data}) => makeRequest(config,'patch', BASE_URL+saleId,data);



