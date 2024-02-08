import axiosInstance from "./Configs/axiosInstance";

export function GetCustomerByPhoneNumber(Data: any) {
  return axiosInstance.get(
    `/Customer/GetCustomerByPhoneNumber?PhoneNumber=${Data}`
  );
}
export function EditCustomerByPhoneNumber(Data: any) {
  return axiosInstance.post(`/Customer/EditCustomerMainInfo`, Data);
}
