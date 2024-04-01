require('dotenv').config()
const jwt= require('jsonwebtoken');
const authSvc = require('../app/auth/auth.service');
const { getTokenFromHeader } = require('../config/helpers');
const checkLogin =async (req,res,next)=>{
     try{
          let token =  getTokenFromHeader(req);
          // token==>null,"Bearer token", "token"
          if(token===null){
               next({code:401,message:"login required"}) 
     
     }
     else{
          //token=>"Bearer token","token"
          //"Bearer token"=>["Bearer","token"]
          //"token"=>["token"]
          token = (token.split(" ")).pop();
          if(!token){
               next({code:401,message:"token required"})
          }
          else{
               let patData = await authSvc.getPatByToken(token);
               if(patData){
                    // TOKEN/"random string"
               let data = jwt.verify(token,process.env.JWT_SECRET)
               let userDetail = await authSvc.getUserByFilter({
                    _id:data.userId
               })
               // //{userId:,iat,exp} 
               // console.log(data);
               // let userDetail={
               //      _id:"md1234",
               //      name: "satishdhakal",
               //      email: "satish12@gmail.com",
               //      role: "customer",
               //      status: "active",
               //      token:null,
               //        }

               if(userDetail){
                    req.authUser = userDetail;
                    next()
               }
               else{
                    next({code:401,message:"user doesnot exist in DB anymore"})
               }
               }
               else{
                    next({code:401,message:"token already expired or invalid"})
               }
          }

     }
     }
     catch(exception){
          console.log(exception);
          // DB clean up
     next({code:401,message:exception.message})

}
}


module.exports = checkLogin

