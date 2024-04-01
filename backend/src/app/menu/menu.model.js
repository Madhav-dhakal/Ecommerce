const mongoose =require("mongoose")
const { string } = require("zod")
const categorySchema = new mongoose.Schema({
     items:{
          type:String,
          required:true,
          min:3,
          
     },
     description:String,
     slug:{
          type:String,
          unique:true,
          required:true
     },
     parentId: {
          type:mongoose.Types.ObjectId,
          ref:"Menu",
          required:false
     },
     image: {
          type: String,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
     price: {
          type: Number,
          required: true
     },
     createdBy:{
          type:mongoose.Types.ObjectId,
          ref:'User',
          default:null
     }

},{
     autoCreate:true,
     autoIndex:true,
     timestamps:true
})

// Create the Menu Item model
const MenuModel = mongoose.model("MenuItem", menuItemSchema)
module.exports =  MenuItem;


