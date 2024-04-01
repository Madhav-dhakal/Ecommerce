 import HttpService from "../../../repository/http.service";
 class AuthService extends HttpService{
     registerProcess = async (data)=>{
          try{
               let response=await this.postRequest(
                    "/v1/register",
                    data,
                    {file:true}
               )
           return response;
          }catch(exception){
               throw exception;
          }
     }

getActivationTokenVerify=async(token)=>{
          try{
let response=await this.getRequest(
     '/v1/verify-token/'+token 
)
return response;
          }catch(exception){
               throw exception;
          }
     }
     activateUser=async (token,data)=>{
          try{
   const response =await this.postRequest(
     "/v1/set-password/"+token,
     data

   )
   return response;
          }catch(exception){
               throw exception;
          }
     }
 }
 const authSvc = new AuthService();
 export default authSvc;