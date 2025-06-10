const Interview = require("../models/interview.model")
const Job = require("../models/job.model")
const scheduledInterview = async(req ,res)=>{
    const{jobId, applicantId, scheduledAt, note}= req.body;
    try {
        const interview = await Interview.create({
            job :jobId,
            employer:req.user._id,
            applicant:applicantId,
            scheduledAt,
            link,
            note

        })
        return res.status(201).send({
            message : "Interview scheduled successfuly" ,
            interview
        })
    } catch (error) {
        return res.status(500).send({
            message:error.message || "Internal server error"
        })
        
    }
}

const getUserInterview = async (req , res)=>{
    try {
        const interviews = await Interview.find({applicant : req.user._id}).populate("Job")
        .populate("employer" , "name email")
        return res.status(200).send(interviews)

    } catch (error) {
        return res.status(500).send({
            message:error.message || "Internal server error"
        })
        
    }
}

const getEmployerInterviews = async(req , res)=>{
    try {
        const interviews = await Interview.find({employer : req.user._id})
        .populate("Job")
        .populate("applicant" , "name email")
        return res.status(200).send(interviews)
    } catch (error) {
        return res.status(500).send({
            message:error.message || "Internal server error"
        })
        
    }
}

const updateInterviewStatus = async (req , res)=>{
    const{interviewID}= req.params;
    const{status}=req.body;

    const validStatuses = ["scheduled" ,"completed" ,"canceled"]
    if(!validStatuses.includes(status)){
        return res.status(400).send({
            message :"Invalid status"
        })
    }

    try {
        const updateInterview = await Interview.findByIdAndUpdate(
            
            interviewID,
            {status},
            {new : true}
        )
        if(!updateInterview){
            return res.status(404).send({
                message : "Interview not found"
            })
        }
        return res.status(200).send({
            message : "Interview status updated successfuly",
           interview: updateInterview
        })
    } catch (error) {
        return res.status(500).send({
            message : error.message || "Internal server error"
        })
        
    }
}
module.exports = {scheduledInterview , getUserInterview,getEmployerInterviews ,updateInterviewStatus}