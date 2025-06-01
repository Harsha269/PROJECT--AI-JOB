const {Router} = require("express")
const controller = require("../Controllers/auth.controller")
const Auth = require("../Middleware/Auth")
const router = Router();
router.post("/signup" , controller.signup)
router.post("/login" , controller.login)
router.get("/check",Auth,controller.checkUser)
module.exports = router;
 