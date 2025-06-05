// const { Router } = require("express");
const { Router } = require("express");

const controller = require('../Controllers/job.controller');
const Auth = require('../Middleware/Auth');
// const {Auth }  = require("../Middleware/Auth")



const router = Router();

router.post("/",Auth , controller.createJob);
router.get("/", controller.getJobs);
router.get("/:id", controller.getJobById);

router.post("/:id/apply", Auth, controller.applyJob);
router.put("/:id", Auth, controller.updateJob);
router.delete("/:id", Auth, controller.deleteJob);

module.exports = router;
