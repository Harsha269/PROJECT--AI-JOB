const express = require('express')
const router = express.Router()
const controller = require("../Controllers/resume.controller")
const Auth = require("../Middleware/Auth")
const Upload = require("../Middleware/Upload")

router.post("/create" ,Auth ,controller.createResume)
router.get("/get" , Auth,controller.getResumeByUser)
router.put("/update/:id" , Auth , controller.updateResume)
router.delete("/delete/:userid",Auth ,controller.deleteResume)
router.get("/get/:id" , Auth,controller.getResumeById)

router.get("/parsed", Auth, controller.parsedResume)
router.post("/upload" ,Auth ,Upload.single('resume'),controller.uploadResumeFile)
 
module.exports = router