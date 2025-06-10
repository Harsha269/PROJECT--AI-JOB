const express = require("express")
const router = express.Router()
const controller = require("../Controllers/application.controller")

const Auth = require("../Middleware/Auth")
// const { route } = require("./auth.route")

router.post("/apply" , Auth ,controller.applyToJob )
router.get("/user" , Auth,controller.getUserApplications)
router.get("/job/:jobId" ,Auth,controller.getJobApplications)
router.put("/status/:applicationId" ,Auth,controller.updateJobApplication)

module.exports = router;