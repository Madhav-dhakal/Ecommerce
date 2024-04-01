const{z}=require('zod')
const CategoryValidatorSchema = z.object({
     title:z.string().min(3),
     description:z.string().nullable(),
     parentId:z.string().nullable(),
     status:z.string().regex(/active|inactive/).default("inactive")
})

module.exports = {CategoryValidatorSchema}