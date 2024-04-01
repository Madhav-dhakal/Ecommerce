const { MongoClient } = require("mongodb");
require('dotenv').config();
class DatabaseService{
     //after DBconn we recives two things
     client;
     db;

     constructor(){  // constructor cant be async it is sync always
         
          this.connect();
     }
          
     connect =async ()=>{
           //connection establish
           try{
          this.client=await MongoClient.connect(process.env.MONGODB_URL);
          this.db=this.client.db(process.env.MONGODB_NAME);
     
}

        catch(except){
          throw except
        }
     }
}
    const dbSvc =  new DatabaseService();
     module.exports = {dbSvc,DatabaseService}