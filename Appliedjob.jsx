import { useState,useEffect } from "react"

const Appliedjob=()=>{
    const[jobs,setjobs]=useState()
    const[loading, setLoading]=useState(true)

     useEffect(() => {
    
    setTimeout(() => {
      
      const fetchedJobs = [
        {
          _id: "",
          title: "",
          company: "",
          dateApplied: "",
          status: "" 
        }
      ]
      setjobs(fetchedJobs);
      setLoading(false);
    }, 500)
  }, [])

    return(
 <div className="container mt-4">
  <h3 className="mb-4">Applied Jobs</h3>
  {loading ?(<p className="text-muted">Loading applied jobs...</p>
  ):jobs.length ===0 || jobs.every((job)=>
    !job.title && job.company && job.dateApplied && job.status
)?
    (<p className="text-muted">You haven't applied to any jobs yet.</p>

  ):(
    <div className="row">
      {jobs.filter((job)=>job.title || job.company || job.dateApplied || job.status)
      
          .map((job , index) => (
            <div className="col-md-6 mb-3" key={job._id || index}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{job.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
                  <p className="mb-1"><strong>Applied On:</strong> {job.dateApplied}</p>
                  <p className="mb-0"><strong>Status:</strong> {job.status}</p>
                </div>
              </div>
            </div>
  ))}

     </div>
        
    )}
    </div>
    )
}
export default Appliedjob