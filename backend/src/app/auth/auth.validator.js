const {z}=require("zod")
const registerSchema = z.object({
     name:z.string().min(2).max(50),
     email:z.string().email(),
     role:z.string().regex(/admin|customer|seller/).default('customer')

   })

   const passwordSchema = z.object({
    password:z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/),
    confirmPassword:z.string()
   }).refine((data)=>data.password === data.confirmPassword,
    {
      message:"password and confirmPassword doesnt match",
      path: ["confirmPassword"]
   
  })

  const loginSchema = z.object({
    email:z.string().email().min(1),
    password:z.string().min(8)
  })

  const  emailValidatonSchema= z.object({              // for ForgetPassword
    email:z.string().email().min(1),
  })
module.exports ={registerSchema,passwordSchema,loginSchema,emailValidatonSchema}