import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Title,Divider } from "../../../../component/common/heading/heading.component";
import PasswordSetComponent from "../../../../component/home/auth/password-set.component";
import { useParams } from "react-router-dom";
import authSvc from "../auth.service";
import { toast } from "react-toastify";

const SetPassPage=()=>{
  const params=useParams()
  const [loading,setLoading]=useState(true)

  const verifyToken = async()=>{
    try{
      const verified=await authSvc.getActivationTokenVerify(params.token)
    setLoading(false)
    }catch(exception){
      toast.error(exception.message)
    }
  }
  useEffect(()=>{
    verifyToken()
  },[params])
     
     const SubmitEvent=async (data)=>{
          console.log(data);
          try{
     let response = await authSvc.activateUser(params.token.data)
     toast.success(response.message)
     navigate("/login")
          }catch(exception){
  toast.error(exception.message)
  navigate("/")
          }
     }

     return(<>
      <Container className="login-wrapper my-4">
        <Row>
          <Col sm={12} md={{ offset: 3, span: 6 }}>
            <Title>Set Password Page</Title>
          </Col>
        </Row>
        <Divider></Divider>
        <Row className="my-3 pb-5">
          <Col sm={12} md={{ offset: 3, span: 6 }}>
            {
           (loading)?<>
           <div className="text-center">
            <Spinner variant="dark"/>
           </div>
           </>: <PasswordSetComponent SubmitEvent={SubmitEvent}/>
            
            }
            </Col>

        </Row>
        </Container>

     </>)
}
  export default SetPassPage;
   