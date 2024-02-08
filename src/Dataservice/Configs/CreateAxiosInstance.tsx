import axios from "axios";
import Cookies from "js-cookie";

// export function createAxiosInstance() {
//   const token = Cookies.get("token");
//   const instance = axios.create({
//     baseURL: "http://etokco.ir/",
//     timeout: 5000,
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return instance;
// }
// const axiosInstance = createAxiosInstance();
// export default axiosInstance;

// // Update the Axios instance whenever the token is set or updated
// export function updateAxiosInstance() {
//   const instance = createAxiosInstance();
//   axiosInstance.defaults.headers = instance.defaults.headers;
// }

// Set the token in the cookie and update the Axios instance
// Cookies.set("token", "my-token");
// updateAxiosInstance();
