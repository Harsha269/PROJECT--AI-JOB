import { useEffect, useState } from "react";


const Joblistings = () => {

    const[jobs ,setJobs] = useState(()=>{
    const saved = localStorage.getItem("jobs")
    return saved ? JSON.parse(saved):[]

})

const[formData , setFormdata] = useState({
    title:"",
    company:"",
    location:"",
    experience:"",
    remote:""
})
 
const[editingId , setEditingId] = useState(null)
useEffect(()=>{
    localStorage.setItem("jobs" ,JSON.stringify(jobs))
},[jobs])

const handleChange = (e)=>{
    setFormdata({...formData,[e.target.name]:e.target.value})
}
 
const handleSubmit =(e)=>{
      e.preventDefault();
      if(editingId){
       const updated = jobs.map((job) =>
        job.id === editingId ? { ...formData, id: editingId } : job
      )
      setJobs(updated)
      setEditingId(null)
      } else
      {
        const newJob = {
            id: Date.now(),
           ... formData,
           viewCount:0,
           applicationCount:0,
           savedCount:0,
        }
        setJobs([...jobs,newJob])
      }
      setFormdata({title:"",company:"",location:"",experience:"",remote:""})
}

const handleEdit = (job) => {
    setFormdata(job);
    setEditingId(job.id);
  }

  const handleDelete = (id) => {
    const updated = jobs.filter((job) => job.id !== id);
    setJobs(updated);
  }
    

    





 return (
<div className="container mt-4" >
 <h2>{editingId ? "Edit Job" : "Post a Job"}</h2>

 <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">

 {["title","company","location" , "experience","remote"].map((field )=>(

  <div className="col-md-6" >
 {/* <label className="form-label ">{field}</label> */}
  <input key={field}  type="text" name={field}  className="form-control" value={formData[field]} onChange={handleChange} placeholder={`Enter ${field}`} required/>
     </div>

 ))}

 <div className="col-12">
    <button type="submit" className="btn btn-primary">{editingId ? "update job" : "post job"}</button>
 </div>
 </form>

 <h6 className="m-4">Manage Job Listing</h6>
 {jobs.length === 0 ? (
    <p className="text-muted">No jobs posted yet.</p>
 ):(
    <div className="row row-cols-1 row-cols-md-2 g-4">
        {jobs.map((job)=>(
         <div className="col" key={job.id}>
        <div className="card shadow-sm h-100" >
            <div className="card-body"  >
                <h5 >{job.title}</h5>
                <h4 >{job.company}</h4>
                <p><strong>Location</strong>{job.location}</p>
                <p><strong>Experience:</strong>{job.experience}</p>

                <p><strong>Remote:</strong>{job.remote}</p>
                <hr/>
                <p><strong>Views:</strong>{job.viewCount}</p>
                <p><strong>Saved:</strong>{job.savedCount}</p>
                <p><strong>Applied:</strong>{job.applicationCount}</p>
                <div className="d-flex gap-2 mt-3">
                    <button className="btn btn-warning btn-sm" onClick={()=>handleEdit(job)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={()=>handleDelete(job.id)}>Delete</button>
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

export default Joblistings;
