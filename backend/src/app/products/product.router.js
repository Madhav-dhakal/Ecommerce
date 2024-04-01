     const router =require('express').Router()
     const checkAccess = require('../../middlewares/access-check.middleware')
     const checkLogin = require('../../middlewares/auth.middleware')
     const CheckLogin = require("../../middlewares/auth.middleware")
     const CheckPermission = require("../../middlewares/rbac.middleware")
     const uploaders = require('../../middlewares/uploaders.middleware')
     const validateRequest = require('../../middlewares/validate-request.middleware')
     const productCtrl = require("./product.controller")
     const ProductSvc = require('./product.service')
     const { ProductValidatorSchema } = require('./product.validators')

     const dirSetUp= (req,res,next)=>{
          req.uploadDir = './public/uploads/product'
          next()
     }
     router.get("/home",productCtrl.listForHome)
     //TODO:Update later
     router.get("/:slug/slug",productCtrl.getBySlug)
     // grouping routes as 
     router.route('/')
     .get(
          checkLogin,
          CheckPermission("admin"),
          productCtrl.listAllProducts

     )
     .post(
     CheckLogin,
     CheckPermission('admin'),
     dirSetUp,
     uploaders.array('images'),
     validateRequest(ProductValidatorSchema),
     productCtrl.createProduct
     )  

     
     router.route('/:id')
     .get(
          checkLogin,
          CheckPermission("admin"),
          productCtrl.getById
     )
     .put(
          checkLogin,
          CheckPermission('admin'),
          //edit content
          checkAccess(ProductSvc),
          dirSetUp,
          uploaders.array('images'),
          validateRequest(ProductValidatorSchema),
          productCtrl.updateById
     )
     .delete(
          checkLogin,
          CheckPermission("admin"),
          checkAccess(ProductSvc),
          productCtrl.deleteById
     )


     module.exports =router