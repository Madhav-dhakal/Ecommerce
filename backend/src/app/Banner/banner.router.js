const router = require('express').Router()
const bannerCtrl = require('./banner.controller')
const checkLogin = require('../../middlewares/auth.middleware')
const checkPermission = require('../../middlewares/rbac.middleware')
const uploader = require('../../middlewares/uploaders.middleware')
const validateRequest = require('../../middlewares/validate-request.middleware')
const { bannerRequestSchema } = require('./banner.validator')

 // banner crud operations
         // validate
              // permission
              //file upload 
              // data validate
const dirSet = (req,res,next)=>{
        req.uploadDir = './public/uploads/banner'
        next()
}
router.get("/home",bannerCtrl.listHome)
 router.route('/')
 .get( checkLogin,
        checkPermission('admin'),
        bannerCtrl.ListAllBanner
        )

.post(checkLogin,
        checkPermission('admin'),
        dirSet,
        uploader.single('image'),
        validateRequest(bannerRequestSchema),
        bannerCtrl.bannerCreate)

router.route('/:id')
 .get( checkLogin,
        checkPermission('admin'),
        bannerCtrl.getDataById
        )
        .put(
                checkLogin,
                checkPermission('admin'),
                dirSet,
                uploader.single('image'),
                validateRequest(bannerRequestSchema),
                bannerCtrl.updateById
        )
        .delete(
                checkLogin,
                checkPermission('admin'),
                bannerCtrl.deleteById  
        )

module.exports=router;