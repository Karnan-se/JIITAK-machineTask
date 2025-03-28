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
      
      // toast("befbh")
      if (error.response && error.response.status === 403) {
        console.error("Access Denied: 403 Forbidden");
        toast()
       
      }
      return Promise.reject(error);
    }
  );

  return api;
};

export const userApi = createApiInstance(`${BASE_URL}/`);
export const adminApi = createApiInstance(`${BASE_URL}/admin`);
