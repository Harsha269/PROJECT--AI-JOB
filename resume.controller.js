// const {  mongoose } = require("mongoose");
const Resume = require ("../models/resume.model")
const createResume = async (req , res)=>{
    try {
        const existingResume = await Resume.findOne({user : req.user.id})
        if(existingResume){
            return res.status(400).send({
                message :"Resume already exists for this user"
            })
        }
     const {fullName , email ,phone , summary , education , experience ,skills , highlights , resumeFile }  = req.body;
     const newResume = new Resume ({
     user : req.user.id ,
     fullName ,
     email ,
     phone , 
    summary ,
     education ,
    experience , 
    skills , 
    highlights,
   resumeFile
     })
     await newResume.save()
     return res.status(200).send({
        message : "Resume created successfuly" ,
        data : newResume
     })
         } catch (error) {
            console.log(error);
            
        return res.status(500).send({
            message : "Failed to create Resume" ,
            // error : error.message
        })
         }
        }

        const getResumeByUser = async(req , res)=>{
            try {
                // const {userId} = req.params;
                const resume = await Resume.findOne({user:req.user.id})
                if(!resume){
                    return res.status(404).send({
                        message : "Resume not found"
                    })
                }
                return res.send(resume)
} catch (error) {
    return res.status(500).send({
        message : "Failed to get resume"
    })
                
 }
}
const updateResume = async (req , res)=>{
    try {
        const {id} = req.params  
        const updateData = req.body
        const updatedResume = await Resume.findByIdAndUpdate(id,{$set : updateData},
            {new : true , runValidators : true}
        )
        if(!updatedResume){
            return res.status(404).send({
                message : "Resume not found"
            })
        }
        return res.status(200).send({
            message : "Resume updated successfuly" ,
            data :updatedResume,
        })

    } catch (error) {
        return res.status(500).send({
            message : "Failed to update Resume"
        })
        
    }
}
const deleteResume = async(req , res)=>{
    try {
        // const {userId}= req.params
        const deleted = await Resume.findOneAndDelete({user :req.user.id })
        console.log(deleted);
        
        if(!deleted){
            return res.status(404).send({
                message : "Resume not found"
            }) }
          return res.status(200).send({
            message : "Resume deleted successfuly",
            data : deleted
          })
        
    } catch (error) {
        console.log(error);
        
        return res.status(500).send({
            message : "Failed to deleted resume"
        })
        
    }

}
const getResumeById = async (req , res)=>{
    try {
        const{id} = req.params
        const resume = await Resume.findById(id)
        
        
        if(!resume){
            return res.status(404).send({
                message : "Resume not found"
            })
        }
        return res.status(200).send({
            message : "Resume fetched successfuly",
            data :resume
        })
    } catch (error) {
        return res.status(500).send({
            message : "Failed to fetch Resume"
        })
        
    }
}
const parsedResume = async (req , res)=>{
    try{
        const{userId} = req.params;
            const resume = await Resume.findOne({ user: userId });
            console.log(resume);
            
            if(!resume){
                return res.status(404).send({
                    message : "resume not found"
     })
     }

     const parsedResumers = {
        contact: {
        fullName: resume.fullName,
        email: resume.email,
        phone: resume.phone,
      },
      summary: resume.summary,
      education: resume.education.map((edu) => ({
        degree: edu.degree,
        institution: edu.institution,
        year: edu.year,
      })),
      experience: resume.experience.map((exp) => ({
        role: exp.role,
        company: exp.company,
        year: exp.year,
      })),
      skills: resume.skills,
      highlights: resume.highlights,
    }
    return res.status(200).send({
        message : "parsed resume for employer view" ,
        data : parsedResumers

    })

     }catch(error){
        console.log(error);
        
        return res.status(500).send({
            message :"Failed to parse resume"
        })

     }
    
}
const uploadResumeFile = async(req , res)=>{
    try{
    if(!req.file){
        return res.status(400).send({
            message : "No File  uploaded"
        })
    }
    const resume = await Resume.findOne({user : req.user.id})
    if(!resume){
        return res.status(400).send({
    message : "No file uploaded"
})
    }
    resume.resumeFile = req.file.filename
    await resume.save()
    return res.status(200).send({
        message : "Resume uploaded successfuly" ,
        filename : req.file.filename ,
        path : req.file.path ,
       originalname: req.file.originalname,
mimetype: req.file.mimetype,

        size : req.file.size
    })
}catch(error){
    console.log(error);
    
    return res.status(500).send({
        message : "Failed to upload resume file"
    })
}
}
 module.exports = {createResume , getResumeByUser ,updateResume ,deleteResume,getResumeById,
    parsedResume , uploadResumeFile }