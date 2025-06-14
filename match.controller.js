const Job = require("../models/job.model")
const Resume = require("../models/resume.model")
const User = require ("../models/user.model")
const matchUserToJobs = async(req , res)=>{
    try {
        const userId = req.user.id 
        const resume = await Resume.findOne({user :userId})
        if(!resume){
            return res.status(404).send({
                message : "Resume not found"
            })
        }
        const jobs = await Job.find({})
        const matches = jobs.map(job=>{
            const score = calculateMatchScore (resume.skills , job.skillsRequired)
            return{job , score}
        }).sort((a,b)=>b.score - a.score)
        return res.status(200).send({
            success : true ,
            matches
        })
    } catch (error) {
        return res.status(500).send({
            success:false ,
            error : error.message
        })
        
    }
}
const matchCandidateToJob = async(req , res)=>{
    try {
        const jobId = req.params
        const job = await Job.findById(jobId)
        if(!job){
            return res.status(400).send({
                message : "job not found"
            })
        }
        const resume = await Job.find({})
        const matches = resume.map(resume=>{
            const score = calculateMatchScore (resume.skills , job.skillsRequired)
            return {resume ,score}
        }).sort((a,b)=>b.score - a.sort)
        return res.status(200).send({
            success : true ,
            matches ,
        })
    } catch (error) {
        return res.status(500).send({
            message : false ,
            error : error.message
        })
        
    }
}

const getMatchScore = async (req , res)=>{
    try {
        const {resumeId , jobId} = req.params
        const resume  = await Resume.findById(resumeId)
      const job = await Resume.findById(jobId)
        if(! resume || !job){
            return res.status(400).send({
                message :"Resume or job not found"
            })
        }
        const score = calculateMatchScore(resume.skills , job.skillsRequired)
        return res.status(200).send({
            matchScore : score
        })
    } catch (error) {
        return res.status(500).send({
            message : "Failed to get match job"
        })
        
    }
}

const getMissingSkills = async (req , res)=>{
    try {
        const {resumeId , jobId } = req.params
        const resume = await Resume.findById(resumeId)
        const job = await Job.findById(jobId)
        if(!resume || !job){
            return res.status(400).send({
                message : "Resume or job not found"
            })
        }
        const missingSkills = job.skillsRequired.filter(
            (skill)=> !resume.skills.includes(skill)
        )
        return res.status(200).send({missingSkills})
    } catch (error) {
        return res.status(500).send({
            message : "Failed to get missing skills"
        })
        
    }
}
module.exports = {matchUserToJobs , matchCandidateToJob , getMatchScore ,getMissingSkills}