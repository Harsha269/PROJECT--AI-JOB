const express = require("express")
const router = express.Router()
const controller = require("../Controllers/notification.controller")
router.post("/create" , controller.createNotification)
router.get("/get/:userId" , controller.getNotification)
router.patch("/read/:id" ,controller.markAsRead)

module.exports= router;