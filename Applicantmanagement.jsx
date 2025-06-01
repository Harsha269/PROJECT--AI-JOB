import { useState } from "react";

const Appliantmanagement = () => {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: "",
    location: "",
    salary: "",
    status: "open",
  });
  const [edit, setEdit] = useState(null);
  const [filter, setFilter] = useState({
    status: "all",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    if (edit !== null) {
      setJobs((prev) =>
        prev.map((job) => (job.id === edit ? { ...job, ...formData } : job))
      );
      setEdit(null);
    } else {
      setJobs((prev) => [{ ...formData, id: Date.now() }, ...prev]);
    }
    setFormData({
      title: "",
      description: "",
      skills: "",
      location: "",
      salary: "",
      status: "open",
    });
  };

  const handleEdit = (job) => {
    setFormData(job);
    setEdit(job.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this job?")) {
      setJobs((prev) => prev.filter((job) => job.id !== id));
    }
  };

  
  const filteredJobs = jobs.filter((job) => {
    const statusCheck = filter.status === "all" || job.status === filter.status;
    const locationCheck = job.location
      .toLowerCase()
      .includes(filter.location.toLowerCase());
    return statusCheck && locationCheck;
  });

  return (
    <div className="container mt-4">
      <h4 className="mb-4 text-primary">Job Management</h4>

      
  <div className="card shadow-sm mb-4">
   <div className="card-body">
     <h5>{edit ? "Edit Job" : "Post New Job"}</h5>
    <form onSubmit={handleSubmit}>
     <div className="mb-3">
     <input type="text"className="form-control" name="title" placeholder="Job Title"value={formData.title}onChange={handleChange}required/>
              
     </div>
   <div className="mb-3">
    <textarea className="form-control" name="description" placeholder="Job Description" value={formData.description}onChange={handleChange}required/>
    </div>
     <div className="mb-3">
 <input type="text"className="form-control" name="skills" placeholder="Skills (comma separated)" value={formData.skills}onChange={handleChange}/>
                
 </div>
   <div className="mb-3">
 <input type="text" className="form-control" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required/>
     </div>
<div className="mb-3">
 <input type="number" className="form-control" name="salary" placeholder="Salary"value={formData.salary} onChange={handleChange}required/>
</div>
<div className="mb-3">
  <select name="status"className="form-control" value={formData.status}onChange={handleChange} >
                
   <option value="open">Open</option>
  <option value="close">Close</option>
    </select>
  </div>
  <button className="btn btn-secondary" type="submit" disabled={!formData.title || !formData.description} >
           
   {edit ? "Update Job" : "Post Job"}
    </button>
    </form>
    </div>
     </div>

      
      <div className="card shadow-sm">
        <div className="card-body">
          <h5>Your Job Listings</h5>

          
          <div className="mb-3 d-flex gap-2 flex-wrap">
            <select
              className="form-select"
              style={{ maxWidth: "150px" }}
              value={filter.status}
              onChange={(e) =>
                setFilter((prev) => ({ ...prev, status: e.target.value }))
              }
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="close">Closed</option>
            </select>

 <input type="text"  className="form-control"  style={{ maxWidth: "200px" }}  placeholder="Filter by Location"  value={filter.location}
  onChange={(e) =>setFilter((prev) => ({ ...prev, location: e.target.value }))}/>
            
              
   </div>

          {filteredJobs.length === 0 ? (
            <p className="text-muted">No jobs found.</p>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
              {filteredJobs.map((job) => (
                <div key={job.id} className="col">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body d-flex flex-column">
                      <h6 className="card-title">{job.title}</h6>
                      <span
                        className={`badge mb-2 ${
                          job.status === "open"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {job.status.toUpperCase()}
                      </span>
                      <p className="card-text flex-grow-1">{job.description}</p>
                      <p className="mb-1">
                        <strong>Location:</strong> {job.location}
                      </p>
                      <p className="mb-1">
                        <strong>Salary:</strong> ₹{job.salary}
                      </p>
                      <p className="mb-2">
                        <strong>Skills:</strong>{" "}
                        {job.skills
                          ? job.skills
                          : <em>No skills listed</em>}
                      </p>

                      <div className="mt-auto">
 <button className="btn btn-warning btn-sm me-2"onClick={() => handleEdit(job)}> Edit</button>
   <button  className="btn btn-danger btn-sm"onClick={() => handleDelete(job.id)} >Delete </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appliantmanagement
