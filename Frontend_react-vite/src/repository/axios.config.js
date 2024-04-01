import axios from "axios";
const axiosInsatance = axios.create({
     baseURL:import.meta.env.VITE_API_URL,
     timeout:30000,
     timeoutErrorMessage:"server Time out..",
    headers:{
     "content-Type":"application/json",
     Accept:"application/json"
    },
})  

 axiosInsatance.interceptors.response.use(
     (response)=>{
          return response.data;
     },
     ()=>{}
 )
export default axiosInsatance;