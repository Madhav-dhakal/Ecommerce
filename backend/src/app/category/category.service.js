const CategoryModel = require("./category.model")

class CategoryService{
 create =async(payload)=>{
     try{
       let category = new CategoryModel(payload)
       return await category.save()
     }
     catch(exception){
          if(exception.code===11000){
               exception={code:400,message:"category name should be unique"}
          }
          throw exception
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
      let count = await CategoryModel.count(filter)
      return count
     }
     catch(except){
          throw except
     }
 }
  getData = async(filter,{limit=15,skip=0})=>{
     try{
      let data =await CategoryModel.find(filter)
           .populate("parentId",['_id','title','slug','status'])
           .populate("createdBy",['_id','name'])
           .sort({_id:"DESC"})
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
          let data = await CategoryModel.aggregate(pipeline);
            
            if(!data){
                throw{code:404,message:"category doesnot exist"}
            }
            return data;
           }catch(except){
                throw except
           }
         }

   getById=async(filter)=>{
     try{
    let data = await CategoryModel.findOne(filter)
      .populate("parentId",['_id','title','slug','status'])
      .populate("createdBy",['_id','name'])
      
      if(!data){
          throw{code:404,message:"category doesnot exist"}
      }
      return data;
     }catch(except){
          throw except
     }
   }
   updateById = async(id,data)=>{
     try{
      const update = await CategoryModel.findByIdAndUpdate(id,{$set:data})
      return update
     }catch(except){
     throw except
     }

   }
   deleteById =async(id)=>{
     try{
    let deleted = await CategoryModel.findByIdAndDelete(id)
    if(!deleted){
     throw {code:404,message:"category doesnot exists"}
    }
    return deleted
     }catch(except){
          throw except
     }
   }
}
     const CategorySvc = new CategoryService()
     module.exports = CategorySvc;