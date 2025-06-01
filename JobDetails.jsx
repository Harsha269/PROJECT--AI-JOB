import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Jobdetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const allJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const foundJob = allJobs.find((j) => j.id === parseInt(id));
    if (foundJob) {
      foundJob.viewCount += 1;
      localStorage.setItem("jobs", JSON.stringify(allJobs));
    }
    setJob(foundJob);
  }, [id]);

  if (!job) {
    return (
      <div className="container mt-4">
        <p className="text-danger">Job not found.</p>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3>{job.title}</h3>
      <h5 className="text-muted">{job.company}</h5>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Experience:</strong> {job.experience}</p>
      <p><strong>Remote:</strong> {job.remote}</p>
      <p><strong>Views:</strong> {job.viewCount}</p>
      <p><strong>Saved:</strong> {job.savedCount}</p>
      <p><strong>Applied:</strong> {job.applicationCount}</p>
      <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>Back to Feed</button>
    </div>
  );
};

export default Jobdetails;
