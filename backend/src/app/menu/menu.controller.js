const { deleteFile } = require("../../config/helpers")
const ProductSvc = require("../products/product.service")
const MenuSvc = require("./menu.service")
const menuRequest = require("./menu.request")

class MenuController{
     createMenu = async (req,res,next)=>{  
    try{
    let payload = (new menuRequest(req)).createTransform()
    const createdCat = await MenuSvc.create(payload)
    res.json({
     result:createdCat,
     message:"menu created successfully",
     meta:null
    })
    }
    catch(exception){
     next(exception)
    }
     }
     listForHome = async(req,res,next)=>{
          try{
               let {filter,pagination:{page,limit,skip}}=MenuSvc.getFilter(req.query,req.authUser)
               //filter
               // delete filter["$and"]["createdBy"]
               filter={
                    $and:[
                         ...filter['$and'],
                         {status:"active"}
                    ]
               }
               console.log(filter);
               const count = await MenuSvc.countData(filter)
               const data = await MenuSvc.getData(filter,{limit,skip})
               res.json({
                    result:data,
                    message:"menu fetched successfully",
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
         const {filter,pagination:{page,limit,skip}}=MenuSvc.getFilter(req.query,req.authUser)
          const count = await MenuSvc.countData(filter)
          const data = await MenuSvc.getData(filter,{limit,skip})
          res.json({
               result:data,
               message:"menu fetched successfully",
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
  
   let detail = await MenuSvc.getBySlugWithProduct(filter)
   let Prodfilter=[{
     menu:{$in:[detail[0]._id],$nin:null}},
     {status:"active"}
   ]
   if(req.query.search){
     Prodfilter ={
          $and:[
               ...Prodfilter,
               {$or:[
                    {title:new RegExp(req.query.search,"i")},
                    {summary:new RegExp(req.query.search,"i")},
                    {menu:new RegExp(req.query.search,"i")},
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
     message:"menu detail fetched ",
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
        let detail = await MenuSvc.getById(filter)
        res.json({
          result:detail,
          message:"menu detail fetched ",
          meta:null
        })
      }
      catch(except){
          next(except)
      }
     }
     updateById = async(req,res,next)=>{
     try{
    const menu=req.content;
    const payload= (new menuRequest(req).updateTransform(menu))
    const update = await MenuSvc.updateById(req.params.id,payload)
    if(payload.image && updated.image && update.image!==payload.image){
     deleteFile("./public/uploads/menu",update.image)

     }
     res.json({
          result:update,
          message:"menu updated",
          meta:null
     })
    }
    catch(except){
   next(except)
 }
     }

     deleteById = async(req,res,next)=>{
        try{
          let deleted = await MenuSvc.deleteById(req.params.id)
          if(deleted.image){
               deleteFile("./publc/uploads/menu",deleted.image)
          }
          res.json({
               
               result:deleted,
               message:"menu deleted successfully",
               meta:null
          })
        }
        catch(except){
          next(except)
        }
     }
     }

   const menuCtrl= new MenuController()
   module.exports=menuCtrl