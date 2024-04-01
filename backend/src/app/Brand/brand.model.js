const mongoose = require('mongoose');
const BrandSchemaDef = new mongoose.Schema({
     title:{
        type:String,
        required:true,
        unique:true,
        min:2
     },
     slug:{
          type:String,
          unique:true
     },
     description:String,
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
        
          const BrandModel=mongoose.model('Brand',BrandSchemaDef)
          module.exports= BrandModel;