const express = require("express")
const router = express.Router()
const controller = require("../Controllers/chat.controller")
router.post("/send" ,controller.sendMessage)
router.get("/get" , controller.getMessage)
module.exports = router;