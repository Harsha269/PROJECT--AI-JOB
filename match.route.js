const express =  require ('express')
const router = express.Router();
const Auth = require('../Middleware/Auth')
const controller = require('../Controllers/match.controller')
router.get("/user" ,Auth ,controller.matchUserToJobs)
router.get("/employer/:jobId",Auth,controller.matchCandidateToJob )
router.get("/score/:resumeId/:jobId" , Auth,controller.getMatchScore)
router.get("/skills/:resumeId/:jobId",Auth,controller.getMissingSkills)
module.exports = router;