const multer =require('multer')
const fs =require('fs')
const myStorage = multer.diskStorage({
     destination:(req,file,cb)=>{
     let path=req.uploadDir??"./public/uploads" //entrypoint file jaha xa tei folder vitra public folder banxa
     if(!fs.existsSync(path)){
          fs.mkdirSync(path,{recursive:true})
     }
     cb(null,path); //yes uploads file in this path 
     },
     filename:(req,file,cb)=>{
          // console.log(req.file);
          // console.log(file);
          let ext =(file.originalname.split('.')).pop();
          let random =Math.ceil(Math.random()*9999);
          let filename =Date.now()+'-'+random+'.'+ext;
          cb(null,filename)
     }
})

const imageFilter =(req,file,cb)=>{
     let ext =(file.originalname.split('.')).pop();
     let allowed=['jpg','jpeg','png','svg','gif','bmp','webp']
     if(allowed.includes(ext.toLowerCase())){
          cb(null,true);
     }
     else{
          cb({code:400,message:"File format type not supported"},null);
     }
}
const uploaders =multer({
     storage:myStorage,
     fileFilter:imageFilter,
     limits:{
          fileSize:3000000
     }
})
module.exports =uploaders;