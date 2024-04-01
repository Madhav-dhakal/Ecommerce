const { default: slugify } = require("slugify");

class menuRequest{
     data;
     file;
     user;
     constructor(req){
          this.data = req.body;
          this.file =req.file;
          this.user = req.authUser;
         
     }
     createTransform = () => {
      let payload = {
          ...this.data
      }

      if(this.file){
          payload.image = this.file.filename;
      } else {
          payload.image = null
      }

      payload.slug = slugify(this.data.title, {lower: true})
      // form-data
      // parentId => id, 'null'
      if(!this.data.parentId || this.data.parentId === 'null' || this.data.parentId === ''){
          payload.parentId = null
      }

      payload.createdBy = this.user._id;
      return payload
  }
  
     updateTransform =(menu)=>{
    let payload = {
      ...this.data

    }
    if(this.file){
      payload.image = this.file.filename;
    }
    else{
      payload.image =menu.image

   }
  //  payload.slug= menu.slug
   if(!this.data.parentId || this.data.parentId==='null' || this.data.parentId===''){
    payload.parentId = null;
   }
    // payload.createdBy=this.user._id;
    return payload;
     }

}
   module.exports=menuRequest