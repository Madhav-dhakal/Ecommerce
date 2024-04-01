     const express =require('express');
     const app =express();  
     require('./db.config')
     const cors=  require("cors")
     app.use(cors());
     
     const router = require('../router');
     const { MulterError } = require('multer');
     const {ZodError}=require('zod');
     // const { MongooseError } = require('mongoose');
     //routing 
     //Routing refers to determining how an application responds to a client request to a particular endpoint,
     //   which is a URl (or path) and a specific HTTP request method (GET, POST, and so on)
     // routing syntax:
     //app.METHOD(PATH, HANDLER(callback))
     //Each route can have one or more handler functions, which are executed when the route is matched.
     // we can pass any no of params/no of middlewares in routes 
     //app.use()  // middleware
     //  app.post()  //post method route
     //app.put() // put method route
     //app.delete() // delete method route

     //category list  
     //CRUD op
     // writing routes to maintain category 

     //body parser(to accept data from client)

     const event = require("./event.config");
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLInt, GraphQLFloat } = require('graphql');
const { createHandler } = require('graphql-http/lib/use/express');
const CategorySvc = require('../app/category/category.service');

     app.use(express.json());
     app.use(express.urlencoded({
          extended:false  //uses qs string library otherwise query string library
     }))
     
     app.use("/health",(req,res,next)=>{
          res.send("success ok")
     })
     app.use(event)
     app.use('/api/v1',router) 
     
        //products
        const product = new GraphQLObjectType({
          name:"product",
          fields:{                  
              
               _id:{type:GraphQLID},                        
               title:{type:GraphQLString},
               description:{type:GraphQLString},
               summary:{type:GraphQLString},
               category:{type:GraphQLString},
               price:{type:GraphQLFloat},
               status:{type:GraphQLString}
               }
        })
      const productInputType =new GraphQLObjectType({
          name:"productInput",
          fields:{
               title:{type:GraphQLString},
               description:{type:GraphQLString},
               status:{type:GraphQLString}
          }
     })
     const querySchema =new GraphQLSchema({
          query: new GraphQLObjectType({
               name:"RootQuery",
               fields:{
              product:{                           // hello:{
            type:new GraphQLList(product),                                      
         resolve:async ()=>{
          let data =  await CategorySvc.getData({},{limit:10,skip:0})
          return data
          
               //     return [
               //      {
               //           _id:"123abc",
               //           title:"productOne",
               //           description:"TEst",
               //           summary:"test",
               //           category:"electrionic",
               //           price:200.00
               //      }
               //     ]
         }
              }                                    
               },
          }),
          
          mutation:new GraphQLObjectType({
               name:"mutation",
               fields:{
                    createProduct:{
                         // args:new GraphQLList(productInputType),
                         type:product,
                         resolve:(args)=>{
                              console.log(args);
                              return  {
                                   _id:"",
                                   title:"",
                                   status:"",
                                   description:""
                              }
                         }
                    }
               }

          })
     })
     app.use("/api/v1/graphql",createHandler({
          schema:querySchema
     }))

     // 404 or route handler for missed routes
     app.use((req,res,next)=>{
     next({code:404,message:"Not Found"})
     })

     //for other missed exception(validation error,async call,etc) we call error handler
     // garbage handler

     app.use((error,req,res,next)=>{
     console.log("garbage collector:",error);
     
          let code=error.code??500;
          let message=error.message??"Internal server error";
          let result = error.result??null;
          //TODO:handle different types of exception
          //multer exception/errors
          if(error instanceof MulterError){
               if(error.code === 'LIMIT_FILE_SIZE'){
                    code=400;
                    message=error.message;
               }
               // for othertypes of multer error writes here making if()
          }
          if(error instanceof ZodError){
          code = 400;
          let zodErrors = error.errors
          let msg ={}
          zodErrors.map((err)=>{
               // msg.push({
               //      [err.path[0]]:err.message
               // })
               msg[err.path[0]]=err.message
          })
          message="validation failures";
          result=msg;
          }
     
          
          if(error.code===11000){
               code=400;
               let uniqueKeys = Object.keys(error.keyPattern)
          let msgBody= uniqueKeys.map((key)=>{
               return {
               [key]: key+"should be unique"
               }
          })
               result=msgBody;
               message= "validation fail"
          }

     
          res.status(code).json({
               result:result,
               msg:message,
               meta:null
          })
     })

     module.exports= app //it is exports to index.js entry point file and added to server 

     //app.listen() 