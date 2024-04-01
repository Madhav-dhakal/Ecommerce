import axiosInsatance from "./axios.config";

class HttpService{
     headers;
     getHeader=(config)=>{
          this.headers={}
          if(config && config.file){
               this.headers={
                    ...this.headers,
                    "Content-Type":"multipart/form-data"
               }

          }
          if(config && config.auth){
               this.headers={
                    ...this.headers,
                    "Authorization":"Bearer"
               }
          }
     }
postRequest=async(url,data={},config=null)=>{
     
     try{
     this.getHeader(config)
          let response= await axiosInsatance.post(url,"data",{
     headers:this.headers
})
return response;
     }catch(exception){
          console.log("PostReq:",exception);
          throw exception
     }
}

getRequest=async(url,config=null)=>{
     
     try{
     this.getHeader(config)
          let response= await axiosInsatance.get(url,{
     headers:this.headers
})
return response;
     }catch(exception){
          console.log("getReq:",exception);
          throw exception
     }
}
}
export default HttpService