import axios from "axios"

const url = `${process.env.NEXT_PUBLIC_API_URL}/dashboard/`

export const dashboardApi=async(token)=>{
    const response=await axios.get(url,{headers:{'Authorization':token}})     
    return response;                 
}