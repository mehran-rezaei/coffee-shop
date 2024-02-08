import axiosInstance from "./Configs/axiosInstance";

export function AddSaleDocument(data: any) {
  return axiosInstance.post(
    `/api/v2/Document/AddSaleDocumentForRestaurant`,
    data
  );
}
