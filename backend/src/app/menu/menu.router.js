     const router =require('express').Router()
     const checkAccess = require('../../middlewares/access-check.middleware')
     const checkLogin = require('../../middlewares/auth.middleware')
     const CheckLogin = require("../../middlewares/auth.middleware")
     const CheckPermission = require("../../middlewares/rbac.middleware")
     const uploaders = require('../../middlewares/uploaders.middleware')
     const validateRequest = require('../../middlewares/validate-request.middleware')
     const menuCtrl = require("./menu.controller")
     const MenuSvc = require('./menu.service')
     const { MenuValidatorSchema } = require('./menu.validators')

     const dirSetUp= (req,res,next)=>{
          req.uploadDir = './public/uploads/menu'
          next()
     }
     
     router.route('/')
     .get(
          checkLogin,
          CheckPermission("admin"),
          menuCtrl.listAllCategories

     )
     .post(
     CheckLogin,
     CheckPermission('admin'),
     dirSetUp,
     uploaders.single('image'),
     validateRequest(MenuValidatorSchema),
     menuCtrl.createMenu
     )  

     router.route('/:id')
     .get(
          checkLogin,
          CheckPermission("admin"),
          menuCtrl.getById
     )
     .put(
          checkLogin,
          CheckPermission('admin'),
          //edit content
          checkAccess(MenuSvc),
          dirSetUp,
          uploaders.single('image'),
          validateRequest(MenuValidatorSchema),
          menuCtrl.updateById
     )
     .delete(
          checkLogin,
          CheckPermission("admin"),
          checkAccess(MenuSvc),
          menuCtrl.deleteById
     )


     module.exports =router