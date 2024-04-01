const { deleteFile } = require("../../config/helpers");
const ProductSvc = require("../products/product.service");
const brandSvc = require("./brand.service");
const fs = require("fs")
class BrandController {
     
     brandCreate = async (req,res,next)=>{
          //DB operation
          try{
const payload = brandSvc.transformCreateRequest(req)
const created = await brandSvc.storeBrand(payload)
          res.json({
               result:created,
               message:"Brand created successfully",
               meta:null
          })
          }
          catch(except){
               next(except)
          }
     }
     ListAllBrand=async (req,res,next)=>{
          //list all brands
          try{
          //  search,sort,paginate
          let filter = {};
          if(req.query['search']){
               filter = {
                    //title,url,status
                    $or:[
                   {title:new RegExp(req.query['search'],'i')},
                   {status:new RegExp(req.query['search'],'i')}
                    ]
               }
          }
          filter = {
               $and:[
                    {createdBy:req.authUser._id},
                   { ...filter}
               ]
          }
          
          let page = req.query['page']||1;
          let limit =req.query['limit']||15
          
          let total = await brandSvc.countData(filter)
          // total data =100, page=7
          //1p = 0-14,2ndp=15-29,3rdp=30-44
          let skip = (page-1)*limit;

          let list = await brandSvc.listAllData(filter,{offset:skip,limit:limit});
          
          res.json({
               result:list,
               message:"Brand fetched successfully",
               meta:{
                   total:total,
                   currentPage:page,
                   limit:limit
               }
          })
          }
          catch(except){
               next(except)
          }
     }
     getDataById=async (req,res,next)=>{
          try{
            let id = req.params.id;
            let data = await brandSvc.getById({
               _id:id,
               createdBy:req.authUser._id
            })
            res.json({
               result:data,
               message:"brand fetched",
               meta:null
            })
          }
          catch(except)
          {
               console.log("getDataById",except);
               next(except)
          }
     }
     updateById = async(req,res,next)=>{
          try{
              // update op.by id for brand
          const brandId = req.params.id;
         const brandDetail= await brandSvc.getById({
               _id:brandId,
               createdBy:req.authUser._id
          }) 
          // update op.
          const payload = await brandSvc.transformEditRequest(req)
          if(!payload.image || payload.image === '')
            {
                delete payload.image
            }
          const oldBrand = await brandSvc.updateById(brandId,payload)
          if(payload.image){
               // delete old image
               deleteFile('./publc/uploads/brand',oldBrand.image)
          }
          res.json({
               result:oldBrand,
               message:"Brand Updated Successfully",
               meta:null

          })
          }
          catch(except){
               next(except)
          }
     }
     deleteById = async (req,res,next)=>{
          try{
         let brandId = req.params.id
         await brandSvc.getById({
          _id:brandId,
          createdBy:req.authUser._id

         })
         let deleteBrand = await brandSvc.deleteByid(brandId)
         if(deleteBrand.image){
          deleteFile("./public/uploads/brand/",deleteBrand.image)
         }
         res.json({
          result:deleteBrand,
          message:"brand deleted successfully",
          meta:null
         })
          }
          catch(except){
               next(except)
          }
     }
     listHome = async(req,res,next)=>{
          try{
               let filter = {};
          if(req.query['search']){
               filter = {
                    //title,url,status
                    $or:[
                   {title:new RegExp(req.query['search'],'i')},
                   {status:new RegExp(req.query['search'],'i')}
                    ]
               }
          }
          filter = {
               $and:[
                    {status: 'active'},
                   { ...filter}
               ]
          }
          
          let page = req.query['page']||1;
          let limit =req.query['limit']||15
          
          let total = await brandSvc.countData(filter)
          // total data =100, page=7
          //1p = 0-14,2ndp=15-29,3rdp=30-44
          let skip = (page-1)*limit;

           let  sort= {_id:"DESC"}
           if(req.query.sort){
               let split = req.query.sort.split(",");
               sort = {[split[0]]:split[1]}
           }
          let response =await brandSvc.listAllData(filter,{offset:skip,limit:limit},
           {
               sort:{title:"DESC"}
          })
          res.json({
               result:response,
               message:"brand fetched",
               meta:{
                    page:page,
                    total:total,
                    limit:limit
               }
          })
          }
          catch(except){
               next(except)
          }
     }
     getDetailBySlug = async(req,res,next)=>{
          try{
     let brandDetail = await brandSvc.getById({
          slug:req.params.slug,
          status:"active"
     })
     let filter={
          brand:brandDetail._id,
          status:"active"
     }
     const total =await ProductSvc.countData(filter)
     const limit = +req.query.limit||10
     const page= +req.query.page||1
     const skip =(page-1)*limit
     const products = await ProductSvc.getData(filter,{limit,skip})
     res.json({
          result:{
               detail:brandDetail,
               product:products,
          },
          message:"Brand detail from slug",
          meta:{
               total:total,
               page:page,
               limit:limit
          }
     })

          
   }   catch(except){
               next(except)
          }
     }
}

const brandCtrl = new BrandController();
module.exports = brandCtrl;