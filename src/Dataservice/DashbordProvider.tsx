import axiosInstance from "./Configs/axiosInstance";

export function GetProductGroup() {
  return axiosInstance.get(`ProductGroup/GetDeadEndProductGroups`);
}
export function GetStockByProductGroupId(URL: number) {
  return axiosInstance.get(`/Stock/GetStockByProductGroupId?Id=${URL}`);
}
//////order page
export function getAllOrders() {
  return axiosInstance.get(`/PosOrder/getAllOrders`);
}
export function getOrdersItems(URL: number) {
  return axiosInstance.get(`/PosOrder/getOrdersItems?Id=${URL}`);
}
export function ChangeOrderStatus(data: any) {
  return axiosInstance.post(`/PosOrder/ChangeOrderStatus`, data);
}
