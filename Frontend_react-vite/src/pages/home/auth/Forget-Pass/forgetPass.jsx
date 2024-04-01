import { Container, Col, Row, Form } from "react-bootstrap";
import { ButtonComponent } from "../../../../component/common/button/button.component";
import styled from "styled-components";
import { toast } from "react-toastify";

const LoginTitle = styled.h1`
  color: #001900;
  text-align: center;
`;
const Divider = styled.hr`
border-color:#001900
`;

const ForgetPass=()=>{

  const handleSubmit=(e)=>{
    e.preventDefault()
    //API call
    try{
    toast.success("An email has been sent to registered user")

    }catch(exception){
      toast.error("sorry!your request cannot be processed!!")
    }
  }
     return(
          <>
           <Container className="login-wrapper3 m-5">
        <Row className="my-1 pb-2">
          <Col sm={12} md={{ offset: 3, span: 6 }}>
            <LoginTitle>Password Reset</LoginTitle>
          </Col>
        </Row>
        <Divider></Divider>
        <Row>
        <Col sm={12} md={{ offset: 3, span: 6 }}>
          <p className="text-center m-3 pb-3" >Enter your email address, to receive a link to  create a new password</p>
          <Form onSubmit={handleSubmit}>

          <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Email:</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="email"
                    size="sm"
                    required
                    placeholder="Enter your Email"
                  ></Form.Control>
                  <span className="text-danger">
                    <em></em>
                  </span>
                </Col>
              </Form.Group>

              <Form.Group className="row mb-3">
               <Col sm={{offset:3,span:9}}>
           <ButtonComponent className="btn btn-success m-3" type='submit' label="reset">
                    </ButtonComponent>
                    <a href="/login">back to login</a>
               </Col>
              </Form.Group>
          </Form>
          </Col>
        </Row>
        </Container>
          </>
     )
}

  export default ForgetPass