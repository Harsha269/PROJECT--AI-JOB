const mongoose = require("mongoose")
const env = require("../env")
const createDatabaseConnection = async ()=>{
    try{
        const res = await mongoose.connect(env.mongo_url ,{

            dbName : "user1"
        });
        console.log("Database connected successfuly:" , res.connection.db.databaseName);
        
    }
    catch(error){
        return process.exit(1)

    }
    
}
module.exports = createDatabaseConnection;