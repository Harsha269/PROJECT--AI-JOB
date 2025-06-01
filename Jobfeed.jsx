import { useState } from "react";
import { useNavigate } from "react-router";


const Jobfeed = ()=>{
    const[jobs,setJobs] = useState(()=>{
        const saved = localStorage.getItem("jobs")
        return saved ? JSON.parse(saved):[];
    })
    const navigate = useNavigate();

    const handleApply = (id)=>{
        updateJob(id,"applicationCount")
            alert(`Applied to job with ID: ${id}`)
    }

     const handleView = (id)=>{
        // updateJob(id,"viewCount")
            // alert(`Viewed to job with ID: ${id}`)
            navigate(`/job/${id}`)
    }

     const handleSave = (id)=>{
        updateJob(id,"savedCount")
            alert(`Saved to job with ID: ${id}`)
    }

    const updateJob =(id , key)=>{
        const updated = jobs.map((job)=>
        job.id === id ? {...job ,[ key]:job[key]+ 1}:job
    )
    setJobs(updated)
    localStorage.setItem("jobs",JSON.stringify(updated))

    }

    
   
    return (

    <div className="container mt-4">
     <h3 className="text-muted">Jobseeker Jobfeed</h3>
     {jobs.length === 0 ?(
        <p className="text-muted">No jobs availabe right now.</p>
     ):(
 <div className="row row-cols-1 row-cols-md-2 g-4">
     {jobs.map((job)=>(
     <div className="col" key={job.id}>
     <div className="card shadow-sm h-100"  >
      <div className="card-body">
         <h5>{job.title}</h5>
         <h6>{job.company}</h6>
         <p><strong>Location:</strong>{job.location}</p>
     <p><strong>Experience:</strong>{job.experience}</p>
         <p><strong>Remote :</strong>{job.remote}</p>
      {/* <p><strong>Views:</strong>{job.viewCount}</p>   */}
      {/* <p><strong>Saved:</strong>{job.savedCount}</p>  */}
      {/* <p><strong>Applied:</strong>{job.applicationCount}</p> */}
 <div className="d-flex justify-content-between align-items-center me-3"   >

 <button onClick={() => handleApply(job.id)} className="btn btn-success flex-fill m-3"> <i className="bi bi-send-check me-1"></i>Apply</button>
 <button onClick={() => handleView(job.id)} className="btn btn-primary flex-fill m-3"> <i className="bi bi-eye me-1"></i>View</button>
 <button onClick={() => handleSave(job.id)} className="btn btn-warning text-white flex-fill"> <i className="bi bi-bookmark-star me-1"></i>Save</button>
      </div>
     </div>
     </div> 
     </div>
            ))}
        </div>
     )}
     


        </div>
    )
}
export default Jobfeed