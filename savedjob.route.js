const express = require("express")
const router = express.Router()
const controller = require("../Controllers/savedjob.controller")
const Auth = require("../Middleware/Auth")
router.post("/save" , Auth,controller.saveJob)
router.get("/",Auth,controller.getSavedJobs)
router.delete("/:jobId" ,Auth,controller.unsaveJob)

module.exports = router