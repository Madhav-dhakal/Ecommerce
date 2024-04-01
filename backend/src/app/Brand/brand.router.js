const router = require('express').Router()
const brandCtrl = require('./brand.controller')
const checkLogin = require('../../middlewares/auth.middleware')
const checkPermission = require('../../middlewares/rbac.middleware')
const uploader = require('../../middlewares/uploaders.middleware')
const validateRequest = require('../../middlewares/validate-request.middleware')
const { brandRequestSchema } = require('./brand.validator')

 // brand crud operations
         // validate
              // permission
              //file upload 
              // data validate
const dirSet = (req,res,next)=>{
        req.uploadDir = './public/uploads/brand'
        next()
}
router.get('/:slug/slug',brandCtrl.getDetailBySlug)
router.get("/home",brandCtrl.listHome)
 router.route('/')
 .get( checkLogin,
        checkPermission('admin'),
        brandCtrl.ListAllBrand
        )

.post(checkLogin,
        checkPermission('admin'),
        dirSet,
        uploader.single('image'),
        validateRequest(brandRequestSchema),
        brandCtrl.brandCreate)

router.route('/:id')
 .get( checkLogin,
        checkPermission('admin'),
        brandCtrl.getDataById
        )
        .put(
                checkLogin,
                checkPermission('admin'),
                dirSet,
                uploader.single('image'),
                validateRequest(brandRequestSchema),
                brandCtrl.updateById
        )
        .delete(
                checkLogin,
                checkPermission('admin'),
                brandCtrl.deleteById  
        )





 

module.exports=router;