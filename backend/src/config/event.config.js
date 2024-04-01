const express = require("express")
const app = express();
const EventEmmiter = require("node:events")
     const myEvent = new EventEmmiter();
 app.use((req,res,next)=>{
     req.myEvent = myEvent
     next()
 })
     // listening event as:event creator is a event listener
     myEvent.on("EventName",(data)=>{
          console.log("Event:",data)
     })

      module.exports = app;
