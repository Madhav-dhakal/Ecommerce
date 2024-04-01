import { Col, Container,Row } from "react-bootstrap"
import { NavLink } from "react-router-dom"

export const Error404 =()=>{
     return(
    <>
    <Container className="my-5" style={{background:"#ff000029"}}>
     <Row>
          <Col sm={12} className="p-3">
               <p className="">Oops! requested page doesnot exists</p>
               <p>Redirect 
                    <NavLink to={"/"} className="text-decoration-none">Back to Home</NavLink>
          </p>
          </Col>
     </Row>
    </Container>
    </>

     )
}