const mongoose = require('mongoose');
const BannerSchemaDef = new mongoose.Schema({
     title:{
        type:String,
        required:true,
        min:3
     },
     url:String,
     image:{
          type:String,
          // required:true
     },
     status:{
          type:String,
          enum:['active','inactive'],
          default:'inactive'
     },
     createdBy:{
          type:mongoose.Types.ObjectId,
          ref:"User",
          default:null
     }
          },{
               autoCreate:true,
               autoIndex:true,
               timestamps:true
          }) 
        
          const BannerModel=mongoose.model('Banner',BannerSchemaDef)
          module.exports= BannerModel;