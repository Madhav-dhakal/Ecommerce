const userModel = require("./users.model")

class UserService{
 getFilter = (filter,query)=>{
       if(query.search){
         filter=
         {
          ...filter,
          $or:[
               {name:new RegExp(query.search)},
               {email:new RegExp(query.search)}
          ]
          
         }
       }
       const page=+query.page||1
       const limit= +query.limit||10
       let pagination ={
          page:page,
          limit:limit,
          skip:(page-1)*limit
       }
       return {filter,pagination}
 }
 getCount =async(filter)=>{
     try{
     let count = await userModel.countDocuments(filter)
     return count
     }
     catch(except){
          throw except
     }
}
     getAllDataByFilter = async (filter,{skip=0,limit=10})=>{
          try{
               let data = await userModel.find(filter)
               .skip(skip)
               .limit(limit)
               return data;
          }
          catch(except){
               throw except
          }
     }
    
 
}
const userSvc = new UserService()
module.exports = userSvc