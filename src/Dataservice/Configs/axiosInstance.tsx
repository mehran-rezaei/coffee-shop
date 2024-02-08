// import dependencies
import axios from 'axios';
import Cookies from 'js-cookie';

// create a new instance of axios
const axiosInstance = axios.create({
  baseURL: "http://etokco.ir/",
});

// add a request interceptor
axiosInstance.interceptors.request.use((config) => {
  // add the token to the request headers
  const token = Cookies.get('token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// add a response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // redirect the user to the login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// export the axios instance
export default axiosInstance;
