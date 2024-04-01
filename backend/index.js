const http= require('http'); 
const app =require('./src/config/express.config') // for custom configuration  
     const server =http.createServer(app)
     //      (request,response)=>{
     //      response.end("hello world");
     // })
     const {Server} = require("socket.io")
     const io = new Server(server)

     io.emit("eventName",{})
     io.on("connection",(socket)=>{
          //socket
          io.on("eventName",(s)=>{
               console.log("i am here");
          })
     })

server.listen('3000','localhost',(err)=>{
     console.log("server is running on port 3000");
     console.log("press ctrl+c to disconnect your server");
     console.log("user http://localhost:3000/ to browse your server");
});
 // now our server is set up;
 
