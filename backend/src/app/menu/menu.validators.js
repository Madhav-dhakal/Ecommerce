const{z}=require('zod')
const MenuValidatorSchema = z.object({
     title:z.string().min(3),
     description:z.string().nullable(),
     parentId:z.string().nullable(),
     category:z.string().nullable,
     price: z.string().regex(/^\d+$/).min(1),
})

module.exports = {MenuValidatorSchema}