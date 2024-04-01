// this index.js is for writing routes
const authRouter= require('../app/auth/auth.router');
const catRouter =require("../app/category/category.router");
const router = require('express').Router(); // here,router is router/obj of class Router()
const bannerRouter = require('../app/Banner/banner.router')
const brandRouter = require('../app/Brand/brand.router')
const productRouter = require("../app/products/product.router")
const userRouter= require("../app/users/user.router")
router.use(authRouter);
router.use('/category',catRouter);
router.use('/banner',bannerRouter); 
router.use('/brand',brandRouter);  
router.use('/product',productRouter)  
router.use("/user",userRouter)   

// router.post('/category',(req,res,next)={})
// router.get('/category',(req,res,next)={})
// router.get('/category/:id',(req,res,next)={})
// router.put('/category',(req,res,next)={})
// router.delete('/category',(req,res,next))





module.exports =router;