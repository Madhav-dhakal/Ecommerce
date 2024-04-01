import { createContext, useContext, useState } from "react";

export const ThemeContext=createContext()

export const useTheme=()=>{
     return useContext(ThemeContext)
}
const ThemeProvider=({children})=>{
     const [theme,setTheme]=useState("dark")

     const toggleTheme=()=>{
        let newtheme=(theme=='dark')?"light":"dark";
       localStorage.setItem("theme",newtheme);
       sessionStorage.setItem("theme",newtheme);
       document.cookie="theme="+newtheme;
       setTheme(newtheme);
     }
     return(

          <ThemeContext.Provider value={{theme:theme,toggleTheme:toggleTheme}}>
         {children}
          </ThemeContext.Provider>
     )
}

   export default ThemeProvider;