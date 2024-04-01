import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import HomePage from '../pages/home/landing/home.page'
import  {Error404}  from "../pages/common/error.page";
import CategoryDetail from "../pages/home/category/category-detail.page";
import CategoryDetailLayout from "../pages/home/category/category-detail.layout.page";
import AdminDashboard from "../pages/cms/dashboard/dashboard.page";
import BannerLayout from "../pages/cms/banner/banner.layout";
import BannerList from "../pages/cms/banner/banner-list.page";
import PermissionCheck from "../pages/common/chaeckPermission.page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css"
import {ForgetPass,LoginPage,SetPassPage,RegisterPage} from "../pages/home/auth"
import * as Layout from "../pages/layout";
const Routing =()=>{

     return(
                 <>

                 <ToastContainer theme="colored"/>

       <BrowserRouter>
       <Routes>
       <Route path='/' element={<Layout.HomeLayout/>}>
          <Route index element={<HomePage/>}/>
          <Route path="login" element={<LoginPage/>}/>
          <Route path="register" element={<RegisterPage/>}/>

          <Route path='activate/:token'element={<SetPassPage/>} />

          <Route path="forget-password" element={<ForgetPass/>}/>

          <Route path="category/:slug" element={<CategoryDetailLayout/>}>
          <Route index element={<CategoryDetail/>}/>
          <Route path=":childCat" element={<CategoryDetail/>}/>
 </Route>
             <Route path='*' element={<Error404/>}/>
       </Route>

          
 <Route path="/admin" element={<PermissionCheck accessBy={"admin"} Component={<Layout.CMSlayout/>}/>}>
    <Route index element={<AdminDashboard/>}></Route>
    <Route path="banner" element={<BannerLayout/>}>
    <Route index element={<BannerList/>}></Route>
    <Route path="create" element={<>create component </>}></Route>
     </Route>
     </Route>
       </Routes>
       </BrowserRouter>
            </>

     );
}

   export default Routing;