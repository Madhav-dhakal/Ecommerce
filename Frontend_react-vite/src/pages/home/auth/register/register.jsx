import { Container, Col, Row, Form,Image, Dropdown, DropdownButton } from "react-bootstrap";
import { ButtonComponent } from "../../../../component/common/button/button.component";
import { Title,Divider } from "../../../../component/common/heading/heading.component";
import { useForm } from "react-hook-form";
import * as Yup  from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import placeholder from "../../../../assets/image/placeholder.png"
import { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
// import axiosInsatance from "../../../../repository/axios.config";
import authSvc from "../auth.service";
import { useNavigate } from "react-router-dom";


const options = [
  { value: 'customer', label: 'Customer' },
  { value: 'seller', label: 'Seller' },
  { value: 'admin', label: 'Admin' }
]
const RegisterPage=()=>{
  const [thumb,setThumb]=useState();
  const [loading,setLoading]=useState();
  const navigate=useNavigate()
  const registerSchema=Yup.object({
    name:Yup.string().min(2).max(30).required(),
    email:Yup.string().email().required(),
    role:Yup.object({
      value:Yup.string().matches(/seller|customer/),
    label:Yup.string().matches(/Seller|Customer/)
  }).required()
  })
  const {register,handleSubmit,setValue,setError,formState:{errors}} = useForm({
    resolver:yupResolver(registerSchema)
  });

  const registerSubmit=async (data)=>{
   try{
     //submit
    //mapping or modeling
    setLoading(true)
    data.role=data.role.value;
 //API call
    const response= await authSvc.registerProcess(data)
    console.log(response);
    toast.success(response.msg)
    Navigate("/")
   }
    catch(exception){
    console.log(exception); 
    toast.error(exception.message)
    // exception.response.data.result.map((obj)=>{
    //   const keys = Object.keys(obj);
    //   setError(keys[0],obj[keys[0]])
    //   })
  }finally{
    setLoading(false)
   }
} 
     return(
          <>
          <Container className="login-wrapper2 m-5">
        <Row>
          <Col sm={12} md={{ offset: 2, span: 8 }}>
            <Title>Registration Page</Title>
          </Col>
        </Row>
        <Divider></Divider>
        <Row className="my-3 pb-5">
          <Col sm={12} md={{ offset: 3, span: 6 }}>
            <Form onSubmit={handleSubmit(registerSubmit)} >

            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Full Name:</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    size="sm"
                    { ...register("name",{required:true,disabled:loading})}
                    placeholder="Enter your FullName"
                  ></Form.Control>
                  <span className="text-danger">
                    <em>{errors?.name?.message}</em>
                  </span>
                </Col>
              </Form.Group>

              <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Email:</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="email"
                    size="sm"
                    { ...register("email",{required:true,disabled:loading})}
                    placeholder="Enter your Email"
                  ></Form.Control>
                  <span className="text-danger">
                    <em>{errors?.email?.message}</em>
                  </span>
                </Col>
              </Form.Group>
             
              <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Role:</Form.Label>
                <Col sm={9}>
                <Select options={options} 
               isDisabled={loading}
                onChange={(selOps)=>{
                  setValue("role",selOps)
                 
                 }} />
                  <span className="text-danger">
                    <em>{errors?.role?.message}</em>
                  </span>
                </Col>
              </Form.Group>

              <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Image:</Form.Label>
                <Col sm={7}>
                  <Form.Control
                    type="file"
                    size="sm"
                    disabled={loading}
                    onChange={(e)=>{
                      // const files = Object.values(e.target.files)
                      const image=e.target.files[0];
                      const ext=(image.name.split(".")).pop();
                      if(["jpg","png","jpeg","gif","svg","bmp","webp"].includes(ext.toLowerCase( ))){
                   if(image.size<=3000000){
                    setThumb(image)
                      setValue("image",image)
                   }else{
                    setError("image","File should be less than 3mb")
                   }

                  }else{
                    setError("image","file format not supported")
                  }
                    }}
                    placeholder="Enter your Role"
                  ></Form.Control>
                  <span className="text-danger">
                    <em>{errors?.image?.message}</em>
                  </span>
                </Col>
                <Col sm={2}>
                  <Image src={thumb?URL.createObjectURL(thumb):placeholder} fluid alt=""/>
                </Col>
              </Form.Group>


              <Form.Group className="row mb-3">
               <Col sm={{offset:3,span:9}}>
          <ButtonComponent loading={loading} className="btn btn-danger m-3" type='reset' label="cancel" >
                    </ButtonComponent>
           <ButtonComponent loading={loading} className="btn btn-success" type='submit' label="submit">
                    </ButtonComponent>
               </Col>
              </Form.Group>
              </Form>
              </Col>
              </Row>

        </Container>
          </>
     )
}

  export default RegisterPage;