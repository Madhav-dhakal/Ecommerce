const  slugify = require('slugify')
const BrandModel = require('./brand.model')
class BrandService{
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
     // generating slug
     data.slug = slugify(request.body.title,{
          replacement:"-",
          lower:true
     })

     if(!isEdit){
     data.createdBy = request.authUser._id;
     }
     return data;
 }

 transformEditRequest = (request)=>{
     let data = {
          ... request.body
     }
     if(request.file){
          data.image = request.file.filename
     }
     return data;
 }

          storeBrand = async (payload)=>{
               try{

                    let brand = new BrandModel(payload)
                    return await brand.save();
     
               }
               catch(except){
                    throw except
               }
          }
          listAllData =async(filter = {},paging={offset:0,limit:15})=>{
               try{
          let list = await BrandModel.find(filter)
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
          let count = await BrandModel.count(filter)
          return count;

               }
               catch(except){
                    throw except
               }
          }
          getById = async(filter)=>{
       try{
       let data = await BrandModel.findOne(filter)
           .populate("createdBy",['_id','name','email'])
           if(data){
               return data;
           }
           else{
               throw{code:404,message:"brand doesnot exist"}
           }
       }
       catch(except){
          console.log("getByIdSVC:",except);
          throw except
       }
          }
          updateById = async (brandId,payload)=>{
           try{
               let response = await BrandModel.findByIdAndUpdate(brandId, {
                    $set: payload
                })
                return response

           }
           catch(except){
               throw except
           }
          }
          deleteByid=async(brandId)=>{
               try{

            let response = await BrandModel.findByIdAndDelete(brandId)
            if(response){
               return response
            }
            else{
               throw{code:404,message:"Brand already deleted or doesnot exists"}
            }
               }
               catch(except){
                    throw except
               }
          }
     } 
const brandSvc = new BrandService()
module.exports = brandSvc;