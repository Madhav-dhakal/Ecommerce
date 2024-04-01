const{z}=require('zod')
const ProductValidatorSchema = z.object({
     title:z.string().min(3),
     summary: z.string().nullable(),
     description:z.string().nullable(),
     category:z.string().nullable(),
     price: z.string().regex(/^\d+$/).min(1),
     discount: z.string().regex(/^\d+$/).min(0).max(99).nullable(), 
     brand:z.string().nullable(),
     attributes:z.array(z.object({
          key:z.string(),
          value:z.array(z.string())
     })).nullable(),
     tag:z.string().nullable(),
     sellerId:z.string().nullable(),
     status:z.string().regex(/active|inactive/).default("inactive")
})

module.exports = {ProductValidatorSchema}