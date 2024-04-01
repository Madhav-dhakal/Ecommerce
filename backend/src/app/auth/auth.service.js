
const userModel = require('../users/users.model');
require('dotenv').config();
const PATModel = require('./personal-access-token.model')
class Authservice {
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

     passswordResetMessage(name,token){
          return `<b>Dear ${name}</b><br>
          <p>to reset your password,plz click the link below
          </p>
          <a href='${process.env.FRONTEND_URL}/reset-password/${token}'>
          '${process.env.FRONTEND_URL}/reset-password/${token}
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
          let user =new userModel(payload);
          let response = await user.save();
          // let response = await this.db.collection("users").insertOne(payload);
           return response;
         }
         catch(except){
          throw except
         }
     }
     getUserByFilter= async(filter)=>{
          try{
       let userDetail = await userModel.findOne(filter)
       return userDetail;
          }
          catch(except){
               throw except
          }
     }

     storePAT = async (data)=>{
          try{
       let patObj = new PATModel(data)
       return await patObj.save()
          }
          catch(except){
               throw except

          }
     }

     getPatByToken =  async(token)=>{
          try{
         let patData = await PATModel.findOne({
          $or: [
               { refreshToken: token },
               { token: token }
             ]
         })
        return patData
          }catch(exception){
               throw exception
          }
     }

        updateAccessToken = async (data, id) => {
          try {
            let update = await PATModel.findByIdAndUpdate(
              id,
              { $set: data },
              { new: true }
            )
            return update;
          }
          catch (exception) {
            throw { code: 400, message: "Error updating Access Token" }
          }
        }

     deletePatData = async (token)=>{
        try{
          let deleted = await PATModel.findOneAndDelete({
               token:token
          })
          if(deleted){
               return deleted;
          }
          else{
               throw {code:404,message:"token doesnot exists"}
          }
        }
     
     catch(except){
          throw except
     }
}
     updateUser = async (filter,data)=>{
     try{
      let response = await userModel.updateOne(filter,{
          $set:data
      })
      return response;
     }
     catch(except){
          throw except
     }
     }

     
}

               const authSvc = new Authservice();
               module.exports = authSvc;