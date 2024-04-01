const { DatabaseService } = require('../../services/db.service');

require('dotenv').config();
class Authservice extends DatabaseService{
     registerEmailMessage(name,token){
          return `<b>Dear ${name}</b><br>
          <p>your account has been successfully registered. please click the link below
          to activate your account </p>
          <a href='${process.env.FRONTEND_URL}/activate/${token}'>
          href='${process.env.FRONTEND_URL}/activate/${token}
          </a><br>
          <p>
          <b>Regards</b>
          </p>
          <p>
          <b>System Admin</b>
          </p>
          <p>
          <i><small>please donot reply to this email</small></i>
          </p>
          `  
     }
     registerUser =async (payload)=>{
         try{
          let response = await this.db.collection("users").insertOne(payload);
           return response;
         }
         catch(except){
          next(except)
         }
     }
     getUserByFilter= async(filter)=>{
          try{
       let userDetail = await this.db.collection('users').findOne(filter)
       return userDetail;
          }
          catch(except){
               next(except)
          }
     }
     updateUser = async (filter,data)=>{
     try{
      let response = await this.db.collection('users').updateOne(filter,{
          $set:data
      })
      return response;
     }
     catch(except){
          next(except)
     }
     }
}

               const authSvc = new Authservice();
               module.exports = authSvc;