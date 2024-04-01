const { generateRandomNumber } = require("../../config/helpers")
const ProductModel = require("./product.model")

class ProductService{
 create =async(payload)=>{
     try{
       let product = new ProductModel(payload)
       return await product.save()
     }
     catch(exception){
          if(exception.code===11000){
               exception={code:400,message:"product name should be unique"}
          }
          throw exception
     }
 }
 checkSlug =async (slug)=>{

     try{
          let count = await ProductModel.countDocuments({slug:slug})
     
          if(count>0){
               let random = generateRandomNumber(1000)
               slug = slug+"-"+random;
              return await this.checkSlug(slug)
          }
          else{
               return slug
          }
          }catch(except){
               throw except
          }
     }
     
 

 getFilter = (query,user=null)=>{
     try{
          //  search,sort,paginate
          let filter = {};
          if(query.search){
               filter = {
                    //title,url,status
                    $or:[
                   {title:new RegExp(query.search,'i')},
                   {summary:new RegExp(query.search,'i')},
                   {description:new RegExp(query.search,'i')}
                    ]
               }
          }
          if(user){
               filter = {
                    $and:[
                         filter,
                         {createdBy:user._id},
                    
                    ]
          }
          }
          else{
               filter = {
                    $and:[
                         filter
                         
                    ]
          }  
          }
          
     let page = +query.page || 1;
     let limit =+query.limit||15
     const skip = (page-1)*limit
     return {filter,pagination:{page,limit,skip}}

 }
      catch(except){
          throw except
      }
 }

 countData = async(filter)=>{
     try{
      let count = await ProductModel.count(filter)
      return count
     }
     catch(except){
          throw except
     }
 }
  getData = async(filter,{limit=15,skip=0},sort ={_id:"DESC",title:"asc"})=>{
     try{
      let data =await ProductModel.find(filter)
           .populate("category",['_id','title','slug','status'])
           .populate("brand",['_id','title','slug','status'])
           .populate("sellerId",['_id','title'])
           .populate("createdBy",['_id','name'])
           .sort(sort)
           .skip(skip) 
           .limit(limit) 
           return data;
     }catch(except){
          throw except
     }
 }
  getBySlugWithProduct =async (filter)=>{

     try{
          let pipeline = [
               {
                    "$match":{
                         ...filter
                    }
               },
               {
                 '$lookup': {
                   'from': 'users', 
                   'localField': 'createdBy', 
                   'foreignField': '_id', 
                   'as': 'createdBy'
                 }
               }, {
                 '$lookup': {
                   'from': 'categories', 
                   'localField': 'parentId', 
                   'foreignField': '_id', 
                   'as': 'parentId'
                 }
               }, {
                 '$unwind': {
                   'path': '$parentId',
                   preserveNullAndEmptyArrays: true
                 }
               }, {
                 '$unwind': {
                   'path': '$createdBy',
                   preserveNullAndEmptyArrays: true
                 }
               }, {
                 '$project': {
                   '_id': '$_id', 
                   'title': '$title', 
                   'description': '$description', 
                   'slug': '$slug', 
                   'status': '$status', 
                   'parentId': '$parentId', 
                   'image': '$image', 
                   'createdAt': '$createdAt', 
                   'createdBy': {
                     '_id': '$createdBy._id', 
                     'name': '$createdBy.name'
                   }
                 }
               }
             ]
          let data = await ProductModel.aggregate(pipeline);
            
            if(!data){
                throw{code:404,message:"product doesnot exist"}
            }
            return data;
           }catch(except){
                throw except
           }
         }

   getById=async(filter)=>{
     try{
    let data = await ProductModel.findOne(filter)
    .populate("category",['_id','title','slug','status'])
    .populate("brand",['_id','title','slug','status'])
    .populate("sellerId",['_id','title'])
    .populate("createdBy",['_id','name'])
      
      if(!data){
          throw{code:404,message:"product doesnot exist"}
      }
      return data;
     }catch(except){
          throw except
     }
   }
   updateById = async(id,data)=>{
     try{
      const update = await ProductModel.findByIdAndUpdate(id,{$set:data})
      return update
     }catch(except){
     throw except
     }

   }
   deleteById =async(id)=>{
     try{
    let deleted = await ProductModel.findByIdAndDelete(id)
    if(!deleted){
     throw {code:404,message:"product doesnot exists"}
    }
    return deleted
     }catch(except){
          throw except
     }
   }
}
     const ProductSvc = new ProductService()
     module.exports = ProductSvc;