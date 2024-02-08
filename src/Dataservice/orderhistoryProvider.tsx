import axiosInstance from "./Configs/axiosInstance";

export function getOrdersByPhoneNumber(Data: any) {
  return axiosInstance.get(
    `PosOrder/getOrdersByPhoneNumber?phoneNumber=${Data}`
  );
}

export function getOrdersItems(Data: any) {
  return axiosInstance.get(`PosOrder/getOrdersItems?id=${Data}`);
}
