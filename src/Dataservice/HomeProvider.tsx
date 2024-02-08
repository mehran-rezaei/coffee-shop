import axiosInstance from "./Configs/axiosInstance";

export function MenuRequest() {
  return axiosInstance
    .get(`ProductGroup/GetDeadEndProductGroups`)
    .then((response) => response);
}
export function MenuItemRequest(URL: any) {
  return axiosInstance
    .get(`ProductGroup/GetProductGroupItem?Id=${URL}`)
    .then((response) => response);
}

export function GetOptionsOfProduct(Data: any) {
  return axiosInstance.get(
    `ProductOptions/GetOptionsOfProduct?ProductId=${Data}`
  );
}
