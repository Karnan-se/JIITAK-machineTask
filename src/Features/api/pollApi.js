import { adminApi } from "./axiosInstance.js";

export const createPoll = async(pollDetail)=>{
   try {
    const response = await adminApi.post("/createPoll" ,{pollDetail})
    const poll = response.data.poll;
    
    return poll
    
   } catch (error) {
    console.log(error)
    throw error;
    
   }
}

export const getPoll  = async()=>{
    try {
        const response = await adminApi.get("/getPolls")
        console.log(response.data.formattedPolls)
        
        return response.data.formattedPolls
        
    } catch (error) {
        console.log(error)
        throw error
        
    }
}

export const updatePolls = async(pollId , pollDetails)=>{
    try {
        console.log(pollId , pollDetails ,  "it is the poll Details")
        const response = await adminApi.post("/updatePolls" , {pollId,pollDetails})
        console.log(response , "response")
        return response.data.formattedPolls
        
    } catch (error) {
        console.log(error)
        throw error
    }
}