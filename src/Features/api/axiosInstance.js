import axios from "axios";
import { BASE_URL } from "../../Constants/constant.js";
import { toast } from 'sonner'

const createApiInstance = (baseURL) => {
  const api = axios.create({
    baseURL,
    withCredentials: true,
  });

  
  api.interceptors.request.use(
    (config) => {
      
      return config;
    },
    (error) => Promise.reject(error)
  );

  
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      
      console.log(error)
      if (error.response && error.response.status === 403) {
        console.error("Access Denied: 403 Forbidden");
     
       if(error.response.data.user.length == 1 && error.response.data.user[0] == "Admin"){
        localStorage.removeItem("adminInfo")
        toast.error(`${error.response.data.user} Session Expired`)
        window.location.href = "/admin/login";
       }else{
        localStorage.removeItem("adminInfo")
        localStorage.removeItem("userInfo")
        toast.error(`${error.response.data.user[0]} Session Expired`)
        window.location.href = "/login"

       }
      }
      return Promise.reject(error);
    }
  );

  return api;
};

export const userApi = createApiInstance(`${BASE_URL}/`);
export const adminApi = createApiInstance(`${BASE_URL}/admin`);
