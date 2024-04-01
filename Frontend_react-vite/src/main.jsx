import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import "@fortawesome/fontawesome-free/css/all.min.css"
import './assets/css/main.css'
import "bootstrap"
import Routing from './router/routing.config'
import ThemeProvider from './config/theme.context'
const rootElem=ReactDOM.createRoot(document.getElementById('root'));
 rootElem.render(
  <ThemeProvider>
     <Routing/>
  </ThemeProvider>

 )

 
