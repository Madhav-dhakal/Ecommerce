import { Navbar,Nav,NavDropdown,Container,Form, FormControl } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import {FaMicrochip, FaMobile} from "react-icons/fa"
import { useTheme } from "../../../config/theme.context"

const HomeHeader =()=>{
     const {theme,toggleTheme} = useTheme()
  
     const switchTheme=(e)=>{
    e.preventDefault()
    toggleTheme(theme)
     }
     
     return(
          <>
          <Navbar expand="lg" 
          className="bg-body-tertiary"
           bg={theme} data-bs-theme={theme}>
      <Container>
        <Navbar.Brand href=".">Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to ={"/"}>Home</NavLink>
            <Nav.Link href="#link">Product</Nav.Link>
            <NavDropdown title="Category" id="basic-nav-dropdown">
              <NavLink to={"/category/electronic"} className={"dropdown-item"}><FaMicrochip/> Electronic
              </NavLink> 
              <NavLink to={"/category/smart-phones"} className={"dropdown-item"}>
                <FaMobile/> SmartPhones
              </NavLink> 
              <NavDropdown.Item href="#action/3.2">
                Category 2
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Category 3</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Others
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          
        </Navbar.Collapse>
        <Form >
          <FormControl
          type="search"
           size="sm" placeholder="Enter your search"/>
          
        </Form>
        <Nav>
               <button onClick={switchTheme}>{theme}</button>

          </Nav>
          <Nav>
               <Nav.Link href="#cart">Cart</Nav.Link>
               <NavLink className={"nav-link"} to={"/register"}>signup</NavLink>
               <NavLink className={"nav-link"} to={"/login"}>Login</NavLink>
          </Nav>
          
      </Container>
    </Navbar>
          </>
     )
}
    export default HomeHeader