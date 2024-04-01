import { Form,Col } from "react-bootstrap";
import { ButtonComponent } from "../../common/button/button.component";
import { useForm } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import * as Yup from "yup";

const PasswordSetComponent=({SubmitEvent})=>{
     const yupSchema=Yup.object({
          password: Yup.string().min(8).max(25).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/,
               "password must contain at least one small letter,one capital,number and special character").required(),
         
               confirmPassword:Yup.string().oneOf(
                    [
               Yup.ref('password'),null
          ],"password not match")
     })
     const {register,handleSubmit,formState:{errors}}=useForm({
          resolver:yupResolver(yupSchema)
     });
     console.log(errors);
     
     return(<>
     
            <Form onSubmit={handleSubmit(SubmitEvent)}>
              <Form.Group className="row mb-3">
                <Form.Label className="col-sm-4">Password:</Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="password"
                    size="sm"
                 { ...register("password",{required:true})}
                    placeholder="Enter your Password"
                  ></Form.Control>
                  <span className="text-danger">
                    <em>{errors.password?.message}</em>
                  </span>
                </Col>
              </Form.Group>

              <Form.Group className="row mb-3">
                <Form.Label className="col-sm-4">Confirm Password:</Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="password"
                    size="sm"
                    { ...register("confirmpassword",{required:true})}
                    placeholder="Confirm Password"
                  ></Form.Control>
                  <span className="text-danger">
                    <em>{errors.confirmPassword?.message}</em>
                  </span>
                </Col>
             </Form.Group>
              <Form.Group className="row mb-3">
               <Col sm={{offset:3,span:9}}>
          <ButtonComponent className="btn btn-danger m-3" type='reset' label="cancel" >
                    </ButtonComponent>
           <ButtonComponent className="btn btn-success" type='submit' label="Login">
                    </ButtonComponent>
               </Col>
              </Form.Group>

            </Form>
            
     </>)
}
 export default PasswordSetComponent;