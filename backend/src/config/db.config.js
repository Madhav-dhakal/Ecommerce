require('dotenv').config();
const mongoose =require('mongoose')
mongoose.connect(process.env.MONGODB_URL,{
     dbName:process.env.MONGODB_NAME,
     autoCreate:true,
     autoIndex:true
}).then((success)=>{
     console.log("db server connected");
})
.catch((exception)=>{
     console.log("error estabblishing db connection");
     process.exit(1)
})