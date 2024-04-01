const { generateRandomStr} = require("../../config/helpers");

class AuthRequest {
     body;
     file;
     files;
     constructor(req){
          this.body = req.body
          this.file = req.file
          this.files =  req.files
     }
     transformRequestData = ()=>{
          let payload =this.body;
          //{name:"",email:"",role:""}
          // console.log(payload);
     
          if(this.file){  //req.files for array of files
          payload.image=this.file.filename;
          }
          else if(this.files){
               payload.image= this.files.map((item)=>item.filename)
          }
          //TODO:DB store
          payload.status="inactive";
          payload.token = generateRandomStr();// we can pass require para for digits
      return payload
     }
}

      module.exports = AuthRequest;