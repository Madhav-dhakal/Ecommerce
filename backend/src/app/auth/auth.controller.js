const dotenv = require('dotenv')
dotenv.config();
const {z}=require('zod');
const mailSvc = require('../../services/mail.service');
const authSvc = require('./auth.service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthRequest = require('./auth.request');
const { getTokenFromHeader, generateRandomStr } = require('../../config/helpers');

class AuthController{
register = async (req,res,next)=>{
     try{
          let payload = (new AuthRequest(req)).transformRequestData();
          //DB connection and selections
          // const client = await MongoClient.connect("mongodb://127.0.0.1:27017") //connection
          // const db = client.db("api-24") // selections

          //query operations in db
          // let response = await dbSvc.db.collection("users").insertOne(payload) //response=acknowledgement,insrtId
            let response = await authSvc.registerUser(payload)

          let mailMsg = authSvc.registerEmailMessage(payload.name,payload.token)
           const mailACK= await mailSvc.emailSend(  // this function returns a promises so if we make it await 
                                     // make the register funct async
               payload.email,
               "Activate your account",
               mailMsg
             )
             console.log(mailACK);

          res.json({
               result: response,
                    msg:"user registered successfuly",
                    meta:null
               
          })
     } 
     catch(except){
          next(except)
     }
}

verifyToken =async (req,res,next)=>{
     try{
          let token =req.params.token;
          //db conn and selection
          // const client = await  MongoClient.connect('mongodb://127.0.0.1:27017')
          // const db = client.db('api-24')
           
          //query
          let userDetail = await authSvc.getUserByFilter({
         token:token

          })
          
     
          if(userDetail){
          res.json({
               result:userDetail,
               msg:"token verified",
               meta:null
               
          })
     }else {
          next({code:400,message:"Token doesnot exist",result:{token}})
     }
     }
     
     catch(except){
          next(except)
     }
}

  setPassword =async (req,res,next)=>{
     try{
        let data = req.body;
        let token =req.params.token;
       let userDetail = await authSvc.getUserByFilter({
          token:token
       })

   if(userDetail){
     let encpass = bcrypt.hashSync(data.password,10);
     const updateData ={
          password:encpass,
          token:null,
          status:"active"
     }
     let updateResponse= await authSvc.updateUser({token:token},updateData)
     res.json({
          result:updateResponse,
          message:"user Activated Successfully",
          meta:null
     })
   }else{
     next({code:400,message:"user not exists or token expired/broken",result:data})
   }
      
     }
     catch(except){
          next(except)
     }
}

        login =async (req,res,next)=>{
       try{
          let credentials= req.body;

         let userDetail=await authSvc.getUserByFilter({
          email:credentials.email
         })
     //     {
     //    _id:"md1234",
     //    name: "satishdhakal",
     //    email: "satish12@gmail.com",
     //    role: "admin",
     //    status: "active",
     //    token:null,
     //    password:"$2a$10$/C8B1soBpsHIxmaTXQFq0.ddFU83yA6DVXuQqYBeYfl.SGykszzgy"
     //      }
          if(userDetail){

          if(userDetail.token===null &&userDetail.status==='active'){
          if(bcrypt.compareSync(credentials.password,userDetail.password)){
          }
          else{
               next({code:400,message:"credentials doesnot match"})
          }
     }
     else{
          next({next:401,message:"user not activated, check your email for activation."})
     }
}
      else{
          next({code:400,message:"user doesnot exist"})
       }

               // user login
               let token = jwt.sign({
                    userId:userDetail._id
               },process.env.JWT_SECRET,{
                    expiresIn:"1h"
               })
          
               let refreshToken = jwt.sign({
                    userId:userDetail._id
               },process.env.JWT_SECRET,{
                    expiresIn:"1d"
               })

               let patData = {
                    userId:userDetail._id,
                    token:token,
                    refreshToken:refreshToken
               }
              await authSvc.storePAT(patData);
              // emiting/creating event as:
               const myEvent = req.myEvent;
               myEvent.emit("eventName",{name:"Test"})

               res.json({
                    result:{
                         token:token,
                         refreshToken:refreshToken,
                         type:"Bearer"
                    }
               })
          
          
     }
     catch(except){
          next(except)
     }
}


forgetPass =async (req,res,next)=>{
     try{
          let body = req.body;
          let userDetail = await authSvc.getUserByFilter({
               email:body.email
          })
          if(userDetail.status === 'active'){
               // token
          let token = generateRandomStr(100)
          let expiry = Date.now() + 86400000

          let updateData = {
          resetToken:token,
          resetExpiry:expiry
          }
          
       // update
       let status =await authSvc.updateUser({
          _id: userDetail._id
       },updateData)
      console.log(status);
        let message=await authSvc.passswordResetMessage(userDetail.name, token)
       //email
       await mailSvc.emailSend(userDetail.email,"reset password",message);
       res.json({
          result:null,
       message:"check your email for the furthur processing", 
       meta:null
     })

          }
          else{
               next({code:400,message:"user not activated"})
          }

     }
     catch(except){
          next(except)
     }
}

  logout =async (req,res,next)=>{
     try{
          // let user = req.authUser
          let token = getTokenFromHeader(req);
          token = (token.split(" ")).pop();
          let loggedout = await authSvc.deletePatData(token)
          res.json({
               result:null,
               message:"loggedOut successfully",
               meta:null
          })
     }
     catch(except){
          next(except)
     }
}  
          getLoggedInUser =(req,res,next)=>{
         try{
          res.json({
               result:req.authUser
          })
         }
          catch(except){
          next(except)
       }
   }

   resetPass=async (req,res,next)=>{ 
     //token
     // let payload = req.body;
     //verify
     //exists,expired
     //Date <=  Date  (we can compare date)
     //string < = Date  (we cant compare date)
     // let userDetail = {resetExpiry:"2023-10-11 12:30:00 AM"}
     // let date = new Date(userDetail.resetExpiry)
     // let timestamp = date.getTime()
     // let TodaysTime = Date.now()

     // todaysTime>timestamp
     // validation error  throw token expired
     //false 
     // userUpdate {password:encpass,resetExpiry:null}
     //success send
     try{
     let payload = req.body;
     let token = req.params.resetToken
     let userDetail = await authSvc.getUserByFilter({
          resetToken:token
     })
     console.log(userDetail);
     if(!userDetail){
          throw {code:400,message:"Token not found",result:null}
     }
     else{
          // user exists 
          let todays=new Date();
          if(todays>userDetail.resetExpiry){
               throw {code:400,message:"token expired"}
          }
          else{
               let updateData = {
                    password:bcrypt.hashSync(payload.password,10),
                    resetExpiry:null,
                    resetToken:null
               }
               const updateRes = await authSvc.updateUser({
                    resetToken:token
               },updateData)
               res.json({
                    result:updateRes,
                    message:"your password has been reset successfully,plz login to continue",
                    meta:null
               })
          }
     }
     }catch(except){
          next(except)
     }
   }
   
     refreshToken = async (req, res, next) => {
          try {
            let id = req.authUser.id;
            let accesstoken = jwt.sign({
              id:id
            }, process.env.JWT_SECRET, { expiresIn: '1h' })
            let refreshToken = (req.headers['authorization'].split(" ")).pop();
      
            let pat = {
              userId: id,
              token: accesstoken,
              refreshToken: refreshToken
            }
            let patInfo = await authSvc.getPatByToken(refreshToken)
            let response = await authSvc.updateAccessToken(pat, patInfo._id)
          //   console.log(pat.token)
          //   console.log(response.token)
            res.json({
              data: response.accesstoken,
              status: true,
              msg: "Token Refreshed",
              meta: null
            })
          } catch (exception) {
            console.log(exception);
            next(exception);
          }
        }
  }

          const authCtrl =new AuthController();
          module.exports=authCtrl;

     //    module.exports=AuthController;