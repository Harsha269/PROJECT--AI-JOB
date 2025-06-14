const express = require('express')
const router = express.Router()

const controller = require("../Controllers/admin.controller")
const Auth = require("../Middleware/Auth")
const authorizeRoles = require("../Middleware/authorizeRoles")

router.get("/user" , Auth , authorizeRoles, controller.getAllUsers)
router.delete("/user/:id" , Auth,authorizeRoles ,controller.deleteUsers)
router.get("/job" , Auth ,authorizeRoles ,controller.getAllJobs)
router.delete("/job/:id" , Auth,authorizeRoles ,controller.deleteJobs)
router.get("/resume",Auth,authorizeRoles ,controller.getAllResume)
router.get("/notification" ,Auth,authorizeRoles ,controller.getAllNotification)
router.post("/message" ,Auth,authorizeRoles ,controller.sendAdminMessage)
router.get("/chat" ,Auth,authorizeRoles ,controller.getAdminChat)
router.get("/analytics" ,Auth,authorizeRoles ,controller.getAnalytics)
router.post("/create" , Auth,authorizeRoles ,controller.createNotification)



module.exports = router;
