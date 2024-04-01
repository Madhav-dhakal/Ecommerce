const { default: slugify } = require("slugify");

class productRequest{
     data;
     files;
     user;
     constructor(req){
          this.data = req.body;
          this.files =req.files;
          this.user = req.authUser;
         
     }
     createTransform = () => {
      let payload = {
          ...this.data
      }

      if(this.files){
          payload.images = this.files.map((item)=>item.filename);
      } else {
          payload.images = null
      }
      if(payload.category && payload.category!=="null"){
        payload.category= payload.category.split(",")
      }
      else{
        payload.category =null;
      }
      if(!payload.brand || payload.brand=="null"){
        payload.brand=null;
      }

      if(!payload.sellerId || payload.sellerId=="null"){
        payload.sellerId=null;
      }
      
     payload.afterDisc= payload.price-payload.price*payload.discount/100;

      payload.slug = slugify(this.data.title, {lower: true})
      

      payload.createdBy = this.user._id;
      return payload
  }
  
     updateTransform =(product)=>{
    let payload = {
      ...this.data

    }
    
    if(this.files){
      payload.images = this.files.map((item)=>item.filename);
  } 
  
  payload.images = [...payload.images,...product.image]
  if(payload.delimages){
      let images= payload.images.filter((img)=>!payload.delimages.includes(img))
      payload.images=images;
  }
  if(payload.category && payload.category!=="null"){
    payload.category= payload.category.split(",")
  }
  else{
    payload.category =null;
  }
  if(!payload.brand || payload.brand=="null"){
    payload.brand=null;
  }

  if(!payload.sellerId || payload.sellerId=="null"){
    payload.sellerId=null;
  }
  
 payload.afterDisc= payload.price-payload.price*payload.discount/100;

  return payload
}
}
   module.exports=productRequest