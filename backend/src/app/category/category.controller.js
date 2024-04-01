const { deleteFile } = require("../../config/helpers")
const ProductSvc = require("../products/product.service")
const CategorySvc = require("./category.service")
const categoryRequest = require("./catgory.request")

class CategoryController{
     createCategory = async (req,res,next)=>{  
    try{
    let payload = (new categoryRequest(req)).createTransform()
    const createdCat = await CategorySvc.create(payload)
    res.json({
     result:createdCat,
     message:"category created successfully",
     meta:null
    })
    }
    catch(exception){
     next(exception)
    }
     }
     listForHome = async(req,res,next)=>{
          try{
               let {filter,pagination:{page,limit,skip}}=CategorySvc.getFilter(req.query,req.authUser)
               //filter
               // delete filter["$and"]["createdBy"]
               filter={
                    $and:[
                         ...filter['$and'],
                         {status:"active"}
                    ]
               }
               console.log(filter);
               const count = await CategorySvc.countData(filter)
               const data = await CategorySvc.getData(filter,{limit,skip})
               res.json({
                    result:data,
                    message:"category fetched successfully",
                    meta:{
                         page:page,
                         total:count,
                         limit:limit
                    }
               })
          }catch(exception){
               next(exception)
          }
     }
     listAllCategories=async(req,res,next)=>{
          try{
         const {filter,pagination:{page,limit,skip}}=CategorySvc.getFilter(req.query,req.authUser)
          const count = await CategorySvc.countData(filter)
          const data = await CategorySvc.getData(filter,{limit,skip})
          res.json({
               result:data,
               message:"category fetched successfully",
               meta:{
                    page:page,
                    total:count,
                    limit:limit
               }
          })
     }
          catch(exception){
               next(exception)
          }
     
}
getBySlug = async(req,res,next)=>{
     try{
  let filter= {
     slug:req.params.slug,
     status:"active"
  }
  
   let detail = await CategorySvc.getBySlugWithProduct(filter)
   let Prodfilter=[{
     category:{$in:[detail[0]._id],$nin:null}},
     {status:"active"}
   ]
   if(req.query.search){
     Prodfilter ={
          $and:[
               ...Prodfilter,
               {$or:[
                    {title:new RegExp(req.query.search,"i")},
                    {summary:new RegExp(req.query.search,"i")},
                    {category:new RegExp(req.query.search,"i")},
                    {description:new RegExp(req.query.search,"i")},
               ]
               }
          ]
     }
   }
   else{
     Prodfilter={
          $and:[
          ...Prodfilter,
          ]
     }
   }
   let sort = {_id:"DESC",title:"asc"}
     if(req.query.sort){
          //key,dire
          //price=>asc/desc
          let sortSplit = req.query.sort(".")
          sort = {[sortSplit[0]]:sortSplit[1]}
     }
 const total =await ProductSvc.countData(Prodfilter)
const limit = +req.query.limit||10
const page= +req.query.page||1
const skip =(page-1)*limit
const products = await ProductSvc.getData(Prodfilter,{limit,skip})

   res.json({
     result:{detail,products},
     message:"category detail fetched ",
     meta:{
          total:total,
          page:page,
          limit:limit
     }
   })
 }
 catch(except){
     next(except)
 }
}
      getById = async(req,res,next)=>{
          try{
       let filter= {
          _id:req.params.id
       }
        filter = {
          ...filter,
          createdBy:req.authUser._id
        }
        let detail = await CategorySvc.getById(filter)
        res.json({
          result:detail,
          message:"category detail fetched ",
          meta:null
        })
      }
      catch(except){
          next(except)
      }
     }
     updateById = async(req,res,next)=>{
     try{
    const category=req.content;
    const payload= (new categoryRequest(req).updateTransform(category))
    const update = await CategorySvc.updateById(req.params.id,payload)
    if(payload.image && updated.image && update.image!==payload.image){
     deleteFile("./public/uploads/category",update.image)

     }
     res.json({
          result:update,
          message:"category updated",
          meta:null
     })
    }
    catch(except){
   next(except)
 }
     }

     deleteById = async(req,res,next)=>{
        try{
          let deleted = await CategorySvc.deleteById(req.params.id)
          if(deleted.image){
               deleteFile("./publc/uploads/category",deleted.image)
          }
          res.json({
               
               result:deleted,
               message:"category deleted successfully",
               meta:null
          })
        }
        catch(except){
          next(except)
        }
     }
     }

   const categoryCtrl= new CategoryController()
   module.exports=categoryCtrl