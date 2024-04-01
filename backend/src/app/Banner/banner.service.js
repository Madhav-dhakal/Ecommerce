const BannerModel = require('./banner.model')
class BannerService{
 transformCreateRequest = (request,isEdit =false)=>{
     let data = {
          ... request.body
     }
     if(!request.file && !isEdit){
          throw {code:400,message:"Image is required",result:data}
     }
     else{
          if(request.file){
          data.image = request.file.filename
          }
     }
     if(!isEdit){
     data.createdBy = request.authUser._id;
     }
     return data;
 }

 transformEditRequest = (request)=>{
     let data = {
          ... request.body
     }
     if(request.file&&request.file!==undefined){
          data.image = request.file.filename
     }
     return data;
 }

          storeBanner = async (payload)=>{
               try{

                    let banner = new BannerModel(payload)
                    return await banner.save();
                    
               }
               catch(except){
                    throw except
               }
          }
          listAllData =async(filter = {},paging={offset:0,limit:15})=>{
               try{
          let list = await BannerModel.find(filter)
                     .populate("createdBy",['_id','name','email'])
                     .sort({_id:1})
                     .skip(paging.offset)
                     .limit(paging.limit)
          return list;
               }
               catch(except){
                    throw except
               }
          }

          countData =async(filter = {})=>{
               try{
          let count = await BannerModel.count(filter)
          return count;

               }
               catch(except){
                    throw except
               }
          }
          getById = async(filter)=>{
       try{
       let data = await BannerModel.findOne(filter)
           .populate("createdBy",['_id','name','email'])
           if(data){
               return data;
           }
           else{
               throw{code:404,message:"banner doesnot exist"}
           }
       }
       catch(except){
          console.log("getByIdSVC:",except);
          throw except
       }
          }
          updateById = async (bannerId,payload)=>{
           try{
           let response = await BannerModel.findByIdAndUpdate(bannerId,{
               $set:payload
           })
           return response 
           }
           catch(except){
               throw except
           }
          }
          deleteByid=async(bannerId)=>{
               try{

            let response = await BannerModel.findByIdAndDelete(bannerId)
            if(response){
               return response
            }
            else{
               throw{code:404,message:"Banner already deleted or doesnot exists"}
            }
               }
               catch(except){
                    throw except
               }
          }
     } 
const bannerSvc = new BannerService()
module.exports = bannerSvc;