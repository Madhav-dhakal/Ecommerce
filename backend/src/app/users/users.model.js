const mongoose =require('mongoose');  // for defining model str.


// datatypes available/provided by mongoose:string,number,array,object,bjectId,date
// we use this datatypes in this object fields.
const userSchemaDefn =new mongoose.Schema({
     name:{
          type:String,
          required:true,
          min:2,
          max:5
     },
     email:{
          type:String,
          required:true,
          unique:true
     },
     password:{
          type:String,
          default:true
     },
     status:{
          type:String,
          enum:['active','inactive'],
          default:"inactive"
     },
     image:['String'],
     address:{ 
          shipping:{
               type:String
          //  state:{},
          //  district:{},
          //  localbody:{},
          //  wardNo:{},
          //  data:{}
          },
          billing:{
               type:String
               // state:{},
               // district:{},
               // localbody:{},
               // wardNo:{},
               // data:{}
          }
     },
     role:{
          type:String,
          enum:['admin','seller','customer'],
          default:'customer'
     },
     phone:String,
     token:String,
     resetToken:String,
     resetExpiry:Date
},{
     // Atcreate Atupdate
     timestamps:true,
     autoCreate:true,
     autoIndex:true
});

//by default 3rd para=users but if we want to ponit to next table then define in 3rd para
const userModel = mongoose.model('User',userSchemaDefn)
module.exports = userModel
