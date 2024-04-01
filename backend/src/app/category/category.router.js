     const router =require('express').Router()
     const checkAccess = require('../../middlewares/access-check.middleware')
     const checkLogin = require('../../middlewares/auth.middleware')
     const CheckLogin = require("../../middlewares/auth.middleware")
     const CheckPermission = require("../../middlewares/rbac.middleware")
     const uploaders = require('../../middlewares/uploaders.middleware')
     const validateRequest = require('../../middlewares/validate-request.middleware')
     const categoryCtrl = require("./category.controller")
     const CategorySvc = require('./category.service')
     const { CategoryValidatorSchema } = require('./category.validators')

     const dirSetUp= (req,res,next)=>{
          req.uploadDir = './public/uploads/category'
          next()
     }
     router.get("/home",categoryCtrl.listForHome)
     //TODO:Update later
     router.get("/:slug/slug",categoryCtrl.getBySlug)
     // grouping routes as 
     router.route('/')
     .get(
          checkLogin,
          CheckPermission("admin"),
          categoryCtrl.listAllCategories

     )
     .post(
     CheckLogin,
     CheckPermission('admin'),
     dirSetUp,
     uploaders.single('image'),
     validateRequest(CategoryValidatorSchema),
     categoryCtrl.createCategory
     )  

     
     router.route('/:id')
     .get(
          checkLogin,
          CheckPermission("admin"),
          categoryCtrl.getById
     )
     .put(
          checkLogin,
          CheckPermission('admin'),
          //edit content
          checkAccess(CategorySvc),
          dirSetUp,
          uploaders.single('image'),
          validateRequest(CategoryValidatorSchema),
          categoryCtrl.updateById
     )
     .delete(
          checkLogin,
          CheckPermission("admin"),
          checkAccess(CategorySvc),
          categoryCtrl.deleteById
     )


     module.exports =router