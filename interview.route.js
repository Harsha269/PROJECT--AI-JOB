const express = require("express")
const router = express.Router()
const controller = require("../Controllers/interview.controller")

const Auth = require("../Middleware/Auth")

router.post("/schedule" ,Auth,controller.scheduledInterview)
router.get("/user" , Auth,controller.getUserInterview)
router.get("/employer" ,Auth,controller.getEmployerInterviews)
router.put("/updatestatus/:interviewID" , Auth,controller.updateInterviewStatus)

module.exports = router;