const checkAccess=(svc)=>{
     return async(req,res,next)=>{
          try{
         let id =req.params.id;
         let data =await svc.getById({
          _id:id
         })
         if(!data){
          throw {code:404,message:"category doesnot exists"}
         }
         else if(!data.createdBy._id.equals(req.authUser._id)){
          throw {code:403,message:"content doesnot belongs to you"}
         }
         else{
          req.content = data
          next();
         }
          }
          catch(except){
               next(except)
          }
     }
     }
     module.exports = checkAccess