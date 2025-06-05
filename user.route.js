const express = require("express")
const{getProfile , updateProfile} = require("../Controllers/user.controller")
// const {Auth} = require("../Middleware/Auth")
const Auth = require("../Middleware/Auth")
const router = express.Router();
router.get("/profile" , Auth,getProfile)
router.put("/profile" , Auth,updateProfile)

module.exports= router  