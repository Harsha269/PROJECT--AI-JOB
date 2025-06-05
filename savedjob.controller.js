const SavedJob = require("../models/savedjob.model")
const Job = require("../models/job.model")


const saveJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    
    const existing = await SavedJob.findOne({
      user: req.user._id,
      job: jobId,
    });

    if (existing) {
      return res.status(400).send({ message: "Job already saved." });
    }

    const savedJob = new SavedJob({
      user: req.user._id,
      job: jobId,
    });

    await savedJob.save();

    return res.status(201).send({
      message: "Job saved successfully",
      savedJob,
    })
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}


const getSavedJobs = async (req, res) => {
  try {
    const savedJobs = await SavedJob.find({ user: req.user._id }).populate("job");
    return res.status(200).send(savedJobs);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}


const unsaveJob = async (req, res) => {
  try {
    const { jobId } = req.params;
     console.log("JobId from params:", jobId);
    console.log("User from auth middleware:", req.user._id);

    const deleted = await SavedJob.findOneAndDelete({
      user: req.user._id,
      job: jobId,
    })

    if (!deleted) {
      return res.status(404).send({ message: "Saved job not found" });
    }

    return res.status(200).send({ message: "Job unsaved successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { saveJob, getSavedJobs, unsaveJob };
