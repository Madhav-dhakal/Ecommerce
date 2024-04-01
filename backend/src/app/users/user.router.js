     const router =require('express').Router()
     const checkAccess = require('../../middlewares/access-check.middleware')
     const checkLogin = require('../../middlewares/auth.middleware')
     const CheckLogin = require("../../middlewares/auth.middleware")
     const CheckPermission = require("../../middlewares/rbac.middleware")
     const uploaders = require('../../middlewares/uploaders.middleware')
     const validateRequest = require('../../middlewares/validate-request.middleware')
     const userCtrl = require("./user.controller")
     const UserSvc = require('./user.service')
     // const { UserValidatorSchema } = require('./user.validators')

     const dirSetUp= (req,res,next)=>{
          req.uploadDir = './public/uploads/user'
          next()
     }

     router.get("/by-status/:status",userCtrl.getByStatus)
     router.get("/by-role/:role",userCtrl.getByRole)

     router.route('/')
     router.route('/')
     .get(
          checkLogin,
          CheckPermission("admin"),
          userCtrl.listAllUsers

     )
     // .post(
     // CheckLogin,
     // CheckPermission('admin'),
     // dirSetUp,
     // uploaders.array('images'),
     // validateRequest(UserValidatorSchema),
     // userCtrl.createUser
     // )  

     // router.route('/:id')
     // .get(
     //      checkLogin,
     //      CheckPermission("admin"),
     //      userCtrl.getById
     // )
     // .put(
     //      checkLogin,
     //      CheckPermission('admin'),
     //      //edit content
     //      checkAccess(UserSvc),
     //      dirSetUp,
     //      uploaders.array('images'),
     //      validateRequest(UserValidatorSchema),
     //      userCtrl.updateById
     // )
     // .delete(
     //      checkLogin,
     //      CheckPermission("admin"),
     //      checkAccess(UserSvc),
     //      userCtrl.deleteById
     // )


     module.exports =router