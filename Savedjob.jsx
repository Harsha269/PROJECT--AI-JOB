import { useState,useEffect } from "react"

const Savedjob=()=>{
    const[savedjobs,setSavedjobs]=useState([])
    const[loading,setLoading] = useState(true)
      

  
     useEffect(() => {
    
    setTimeout(() => {
      
      const fetchedJobs = [
      {        id:"",
        title:"",
        company:"",
        location:"",
        saveDate:"",
      }
      ]; 
      setSavedjobs(fetchedJobs);
      setLoading(false);
    }, 500);
  }, []);

  return(
    <div className="container mt-4">
      <h3 className="mb-4">Saved Jobs</h3>   
      {loading ?(<p className="text-muted">Loading saved jobs...</p>
  ):savedjobs.length ===0 || savedjobs.every((job)=>
    !job.title && !job.company && !job.location && !job.saveDate
)?
  (<p className="text-muted">You haven't saved any jobs yet.</p>

  ):(
    <div className="row">
      {savedjobs.filter((job)=>
      job.title || job.company || job.location || job.saveDate)
      
  .map((job,index) => (
<div className="col-md-6 mb-3" key={job._id || index}>
<div className="card shadow-sm">
<div className="card-body">
<h5 className="card-title">{job.title}</h5>
<h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
<p className="mb-1"><strong>Location:</strong> {job.location}</p>
<p className="mb-0"><strong>Saved on:</strong> {job.saveDate}</p>
</div>
</div>
</div>
  ))}

     </div>
        
    )}
    </div>

    
  )

}
export default Savedjob