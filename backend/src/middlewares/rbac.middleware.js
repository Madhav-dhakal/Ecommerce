const CheckPermission =(role)=>{
     return (req,res,next)=>{
let loggedInUser = req.authUser;
if(!loggedInUser){
     next({code:401,message:"unauthenticated"})
}
if((typeof role==="string"&&loggedInUser.role===role)||
(typeof role !=="string"&&role.includes(loggedInUser.role)))
{
     next()
}

else{
     next({code:403,message:"you dont have permission"})
}
     }
}

module.exports=CheckPermission;