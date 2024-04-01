const mongoose = require("mongoose");
const { string } = require("zod");
const PATschemaDef = new mongoose.Schema({
     userId:{
          type:mongoose.Types.ObjectId,
          ref:"user",
          require:true
     },
     token:{
          type:String,
          required:true
     },
     refreshToken:{
          type:String,
          required:true
     },

     },{
       timestamps:true,
       autoCreate:true,
       autoIndex:true   
     })

     const PATModel = mongoose.model('PAT',PATschemaDef);
     module.exports = PATModel;