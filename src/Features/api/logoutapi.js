import { adminApi } from "./axiosInstance";
import { userApi } from "./axiosInstance";

const logout = (api) => {
  return async () => {
    const response = await api.patch("/logout");
    console.log(response.data.logout);
    return response.data.logout;
  };
};

export const adminLogoutApi = logout(adminApi); 
export const userLogoutApi = logout(userApi);   
