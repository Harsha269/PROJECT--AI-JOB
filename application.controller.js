const AppliedJob = require("../models/application.model")
const Job = require("../models/job.model")

const applyToJob = async (req , res)=>{
    const {jobId} = req.body;
    try{
        const existing = await AppliedJob.findOne({user:req.user._id , job:jobId})

   
    if(existing){
        return res.status(400).send({
            message : "Job already applied"
        })
    }
    const app = await AppliedJob.create ({
        user:req.user._id,
        job:jobId
    })
    await Job.findByIdAndUpdate(jobId ,{$addToSet:{applicants : req.user._id}})

    return res.status(200).send({
        message :"Job applied successfuly",
        app
    })
 } catch(error){
        return res.status(500).send({
            message:error.message || "Internal server error"
        })
    }}

    const getUserApplications = async (req , res)=>{
        try {
            const apps = await AppliedJob.find({user : req.user._id}).populate("job")
            return res.status(200).send(apps)

}catch(error){
    return res.status(500).send({
        message :error.message || "Internal server error"
    })
}
    }

    const getJobApplications = async (req , res)=>{
        const {jobId} = req.params
        try {
            const apps = await AppliedJob.find({job :jobId}).populate("user")
            return res.status(200).send(apps)
        } catch (error) {
            return res.status(500).send({
                message : error.message || "Internal server error"
            })
            
        }
    }

    const updateJobApplication = async(req , res)=>{
        const {applicationId} = req.params;
        const {status} = req.body
        try {
            const updated = await AppliedJob.findByIdAndUpdate(applicationId , {status},{new : true})
             if (!updated) {
      return res.status(404).send({ message: "Application not found" });
    }
            return res.status(200).send({
                message :"status updated",
                updated
            })
            
        } catch (error) {
            return res.status(500).send({
                message : error.message || "internal server error"
            })
            
        }
    }

module.exports = {applyToJob , getUserApplications , getJobApplications , updateJobApplication}