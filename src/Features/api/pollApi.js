import { adminApi } from "./axiosInstance";

export const createPoll = async(pollDetail)=>{
   try {
    const response = await adminApi.post("/createPoll",{pollDetail})
    const poll = response.data.poll;
    console.log(poll)
    
   } catch (error) {
    console.log(error)
    throw error;
    
   }
}