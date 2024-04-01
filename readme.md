 # ecommerce projects
 ## ecommerce features list out
 -Frontend 
     -landing page 
          -sliders/banner
          -category list
          -brands list 
          -products list
-category/brands/search products list page
     -products details page
     -static page (about us,contact us,review)
     -Auth and authorizations
     -cart page
     -checkout payment
     -offers
-CMS (content management system)
     -banner crud
     -category crud
     -brand crud
     -user crud
     -products crud
     -order view 
     -offers crud
     -transactions 

Category 
name/title 
slug 
descritpion 
parentId ---> Foreign Key 
ref - self 
parentId: { type: mongoose.Types.ObjectId, ref: 'Category', nullable: true }
 status 
 brands [ { type: mongoose.Types.ObjectId, ref: "Brand" } ] 
 image 
 createdBy
   
ctrl+shift+l to select all resp. content

// event/queue
// cron job (automated system)