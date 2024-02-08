import axios from "axios";
import Cookies from "js-cookie";
export function refreshAccessToken() {
  const refreshToken = Cookies.get("refreshToken");
  return axios
    .post(`Secuirty/RefreshTokenForCustomer?RefreshToken=${refreshToken}`)
    .then((response) => {
      const { token } = response.data;
      Cookies.set("token", token);
      return Promise.resolve();
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject(error);
    });
}
