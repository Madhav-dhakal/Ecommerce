const { deleteFile } = require("../../config/helpers");
const bannerSvc = require("./banner.service");
const fs = require("fs")
class BannerController {
     
     bannerCreate = async (req,res,next)=>{
          //DB operation
          try{
const payload = bannerSvc.transformCreateRequest(req)
const created = await bannerSvc.storeBanner(payload)
          res.json({
               result:created,
               message:"Banner created successfully",
               meta:null
          })
          }
          catch(except){
               next(except)
          }
     }
     ListAllBanner=async (req,res,next)=>{
          //list all banners
          try{
          //  search,sort,paginate
          let filter = {};
          if(req.query['search']){
               filter = {
                    //title,url,status
                    $or:[
                   {title:new RegExp(req.query['search'],'i')},
                   {url:new RegExp(req.query['search'],'i')},
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
          
          let total = await bannerSvc.countData(filter)
          // total data =100, page=7
          //1p = 0-14,2ndp=15-29,3rdp=30-44
          let skip = (page-1)*limit;

          let list = await bannerSvc.listAllData(filter,{offset:skip,limit:limit});
          // offset" refers to the number of items or records that are skipped or 
          // omitted from the beginning of a dataset before fetching a specific set of records
          res.json({
               result:list,
               message:"Banner fetched successfully",
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
            let data = await bannerSvc.getById({
               _id:id,
               createdBy:req.authUser._id
            })
            res.json({
               result:data,
               message:"banner fetched",
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
              // update op.by id for banner
          const bannerId = req.params.id;
          const banner = await bannerSvc.getById({
               _id:bannerId,
               createdBy:req.authUser._id
          })
          // update op.
          const payload = await bannerSvc.transformEditRequest(req)
          let oldImage= payload.image;
          if(!oldImage||oldImage ===''){
               oldImage= banner.image
          }
          const oldBanner = await bannerSvc.updateById(bannerId,{...payload,image:oldImage})
          if(payload.image){
               // delete old image
               deleteFile('./publc/uploads/banner',oldBanner.image)
          }
          res.json({
               result:oldBanner,
               message:"Banner Updated Successfully",
               meta:null

          })
          }
          catch(except){
               next(except)
          }
     }
     deleteById = async (req,res,next)=>{
          try{
         let bannerId = req.params.id
         await bannerSvc.getById({
          _id:bannerId,
          createdBy:req.authUser._id

         })
         let deleteBanner = await bannerSvc.deleteByid(bannerId)
         if(deleteBanner.image){
          deleteFile("./public/uploads/banner/",deleteBanner.image)
         }
         res.json({
          result:deleteBanner,
          message:"banner deleted successfully",
          meta:null
         })
          }
          catch(except){
               next(except)
          }
     }
     listHome = async(req,res,next)=>{
          try{
          let response =await bannerSvc.listAllData({
               status:"active",
               // startDate:{$lte:new Date()},
               // endDate:{$gte:new Date()}
           }, 
           {offset:0,limit:10},
           {
               sort:{_id:"DESC"}
          })
          res.json({
               result:response,
               message:"banner fetched",
               meta:null
          })
          }
          catch(except){
               next(except)
          }
     }
}

const bannerCtrl = new BannerController();
module.exports = bannerCtrl;