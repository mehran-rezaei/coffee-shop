import { notify } from "@/helpers/toust";
import axiosInstance from "./Configs/axiosInstance";

export function Getsmscode(Data: number) {
  return axiosInstance.get(`Secuirty/GetSmsCode?PhoneNumber=${Data}`);
}
export function CreateTokenForCustomer(Phonenumber: any, code: any) {
  return axiosInstance.post(
    `Secuirty/CreateTokenForCustomer?PhoneNumber=${Phonenumber}&Code=${code}`
  );
}
export function checkIfTheCustomerIsNew(Phonenumber: number) {
  return axiosInstance.get(
    `Secuirty/checkIfTheCustomerIsNew?PhoneNumber=${Phonenumber}`
  );
}
export function GetCustomerByPhoneNumber(Phonenumber: number) {
  return axiosInstance.get(
    `Customer/GetCustomerByPhoneNumber?PhoneNumber=${Phonenumber}`
  );
}
export function EditCustomer(data: any) {
  return axiosInstance.post(`Customer/EditCustomerMainInfo`, data);
}
