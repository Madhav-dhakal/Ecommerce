// const { query } = require("express");
const userSvc = require("./user.service");

class UserController{
     getByStatus =async(req,res,next)=>{
          try{
       let status = req.params.status;
       const {filter,pagination}= userSvc.getFilter({
          status:status
       },req.query)
       let count = await userSvc.getCount(filter)
       let data= await userSvc.getAllDataByFilter(filter,{skip:pagination.skip,limit:pagination.limit})
       res.json({
          result:data,
          message:"user listed by status",
          meta:{
               page:pagination.page,
               limit:pagination.limit,
               total:count
          }
       })
          }
          catch(except){
               next(except)
          }
     }
     getByRole= async (req,res,next)=>{
          try{
               let role = req.params.role;
               const {filter,pagination}= userSvc.getFilter({
                  role:role
               },req.query)
               let count = await userSvc.getCount(filter)
               let data= await userSvc.getAllDataByFilter(filter,{skip:pagination.skip,limit:pagination.limit})
               res.json({
                  result:data,
                  message:"user listed by role",
                  meta:{
                       page:pagination.page,
                       limit:pagination.limit,
                       total:count
                  }
               })
          }
          catch(except){
               next(except)

          }
     }
     listAllUsers = async (req,res,next)=>{
          try{

          }
          catch(except){
               next(except)

          }
     }

}
const userCtrl = new UserController()
module.exports = userCtrl;