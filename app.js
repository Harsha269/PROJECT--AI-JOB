const express = require("express")
const cors = require("cors")
require("dotenv").config();

const authRouter = require("./Routes/auth.route")
const jobRouter = require("./Routes/job.route")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/auth" , authRouter)
app.use("/job" , jobRouter)

const PORT = process.env.PORT||8082
app.listen(PORT ,()=>{
    console.log(`Server running on port ${PORT}`);
    
})
