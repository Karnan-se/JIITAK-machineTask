import { adminApi, userApi } from "./axiosInstance.js";

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
        console.log(response.data.formattedPolls , "get Polls")
        
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

export const updatevote = async(userInfo ,pollId , pollDetails)=>{ 
   try {
    console.log(pollId , pollDetails , "poll.id and poll details ")
    const updatedVotes = await userApi.post("/updateVote" , { userInfo ,pollId , pollDetails})
    console.log(updatedVotes.data.updatedVotes)
    return updatedVotes.data.updatedVotes
    
   } catch (error) {
    console.log(error)
    throw error;
    
   }

}


export const fetchVote = async(userId)=>{
    try {
        const response = await userApi.get("/fetchVote",{params:{userId}})
        
        return response.data.VotedUser
        
    } catch (error) {
        console.log(error)
        throw error
        
    }
}

