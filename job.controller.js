const Job = require('../models/job.model');

const createJob = async (req, res) => {
  try {
    console.log("user from auth middleware" , req.user);
    
    const { title, description, company, location, salary } = req.body;
    const newJob = new Job({
      title,
      description,
      company,
      location,
      salary,
      employer: req.user._id,
    });
    await newJob.save();
    return res.status(201).send({
      message: "Job posted successfully",
      job: newJob
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Internal server error"
    });
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("employer", "name email");
    return res.status(200).send(jobs);
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Internal server error"
    })
  }
}

const applyJob = async (req, res) => {
  try {
    const jobDoc = await Job.findById(req.params.id);
    if (!jobDoc)
      return res.status(404).send({ message: "Job not found" });

    if (jobDoc.applicants.includes(req.user._id)) {
      return res.status(400).send({ message: "Already applied to the job" });
    }
    jobDoc.applicants.push(req.user._id);
    await jobDoc.save();
    return res.status(200).send({ message: "Applied to job successfully" });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Internal server error"
    })
  }
}

const getJobById = async (req, res) => {
  try {
    const jobDoc = await Job.findById(req.params.id).populate("employer", "name email");
    if (!jobDoc) {
      return res.status(404).send({ message: "Job not found" });
    }
    return res.status(200).send(jobDoc);
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Internal server error"
    })
  }
}

const updateJob = async (req, res) => {
  try {
    const jobDoc = await Job.findById(req.params.id);
    if (!jobDoc) {
      return res.status(404).send({ message: "Job not found" });
    }
       console.log("job posted by:", jobDoc.employer.toString());
    console.log("user trying to update:", req.user._id.toString());
    
    
    
    if (jobDoc.employer.toString() === req.user._id.toString()) {
      
      
    // if(String(jobDoc.employer)!==String(req.user._id)){
      return res.status(403).send({ message: "Not authorized to update this job" });
    }

    

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // const updatedJob = await Job.findByIdAndUpdate(req.params.id,updates,{new : true})

    return res.status(200).send({
      message: "Job updated successfully",
      job: updatedJob
    });
  } catch (error) {
    console.log(error);
    
    return res.status(500).send({
      message: error.message || "Internal server error"
    })
  }
}

const deleteJob = async (req, res) => {
  try {
    const jobDoc = await Job.findById(req.params.id);
    if (!jobDoc) {
      return res.status(404).send({ message: "Job not found" });
    }
     console.log("Job posted by:", jobDoc.employer.toString());
    console.log("User trying to delete:", req.user._id.toString());
    
    // if (jobDoc.employer.toString() === req.user._id.toString()) {
    if (jobDoc.employer.toString() === req.user._id.toString()) {
    
      return res.status(403).send({ message: "Not authorized to delete this job" });
    }
    await jobDoc.deleteOne();
    return res.status(200).send({ message: "Job deleted successfully" });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Internal server error"
    });
  }
};

module.exports = { createJob, getJobs, applyJob, getJobById, updateJob, deleteJob };
