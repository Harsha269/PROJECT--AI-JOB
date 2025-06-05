const express = require("express")
const cors = require("cors")
require("dotenv").config();
const createDatabaseConnection=require('./configure/db')
const env = require("./env")
const authRouter = require("./Routes/auth.route")
const userRouter = require("./Routes/user.route")
const jobRouter = require("./Routes/job.route");
const savedJobRouter = require("./Routes/savedjob.route")

createDatabaseConnection();


const app = express()

app.use(cors())
app.use(express.json())

app.use("/auth" , authRouter)
app.use("/api/users" ,userRouter)
app.use("/api/jobs" , jobRouter)
app.use("/savedjob" ,savedJobRouter)

const PORT = process.env.PORT||8082
app.listen(PORT ,()=>{
    console.log(`Server running on port ${PORT}`);
    
})
 