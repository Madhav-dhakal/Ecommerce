const router = require('express').Router();
const authCtrl = require('./auth.controller');
const uploaders =require("../../middlewares/uploaders.middleware")
const validateRequest=require("../../middlewares/validate-request.middleware")
const {registerSchema, passwordSchema, loginSchema, emailValidatonSchema} =require("./auth.validator")
const checkLogin =require('../../middlewares/auth.middleware'); 
const CheckPermission = require('../../middlewares/rbac.middleware');

const dirSetup = (req,res,next)=>{
     req.uploadDir='./public/uploads/users'; // inside auth.router jatini file upload hunxa yo dir ma 
              next()                               // basnu paryo;
}
// auth and authorization
router.post('/register',dirSetup,uploaders.array('image'),validateRequest(registerSchema),authCtrl.register)
router.get('/verify-token/:token',authCtrl.verifyToken)
router.post('/set-password/:token',validateRequest(passwordSchema),authCtrl.setPassword)

router.post('/login',validateRequest(loginSchema),authCtrl.login)

//loggedIn all users roles
router.get('/me',checkLogin,authCtrl.getLoggedInUser)
//only admin users
router.get('/admin',checkLogin,CheckPermission("admin"),(req,res,next)=>{
     res.json({
          result:"I am admin role"
     })
})
router.get('/admin-seller',checkLogin,CheckPermission(["admin",'seller']),(req,res,next)=>{
     res.json({
          result:"I am admin-seller role"
     })
})

router.get('/refresh-token',checkLogin,authCtrl.refreshToken)
//
router.post('/forget-password',validateRequest(emailValidatonSchema),authCtrl.forgetPass) 

router.post('/reset-password/:resetToken',validateRequest(passwordSchema),authCtrl.resetPass)

router.post('/logout',checkLogin,authCtrl.logout)

module.exports =router;