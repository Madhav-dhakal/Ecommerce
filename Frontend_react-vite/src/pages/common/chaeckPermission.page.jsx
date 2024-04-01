import { useState } from "react";
import { Navigate } from "react-router-dom";

const PermissionCheck=({
     accessBy,
     Component
})=>{
//Logic
//If LoggeIN and has accessBy role
const [user,setUser]=useState({
     name:"Sandesh Bhattarai",
     role:"seller"
})
  if(user.role===accessBy){
     return Component
  }else{
     return <Navigate to={"/" +user.role}/>
  }
}

export default PermissionCheck;