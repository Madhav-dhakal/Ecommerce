import { Outlet } from "react-router-dom"
import HomeHeader from "../../../component/home/header/home-header"

const HomeLayout=()=>{
     return(
          <>
          <HomeHeader/>
          <Outlet/>
          </>
     )
}

  export default HomeLayout