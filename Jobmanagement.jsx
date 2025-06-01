import { useState } from "react"

const Jobmanagement=()=>{
    const[jobs , setjobs]=useState([])
    const[formData , setFormData] = useState({
        title:"",
        description:"",
        skills:"",
        location:"",
        salary:"",
        status:"open"
 })
 const[edit,setEdit] = useState(null)

const handleChange=(e)=>{
    const{name , value}= e.target
    setFormData((prev)=>({...prev,[name]:value}))
}

const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!formData.title || !formData.description)
        return
    if(edit!==null){
        setjobs(prev=>
            prev.map(job=>job.id===edit?{...job,...formData}:job)
        )
        setEdit(null);
         }
         else{
            setjobs(prev=>[{...formData,id:Date.now()},...prev,])
         }
         setFormData({
            title:"",
            description:"",
            skills:"",
            location:"",
            salary:"",
            status:"open",
         })
}
const handleEdit=(job)=>{
    setFormData(job);
    setEdit(job.id)
}
const handleDelete=(id)=>{
    if(window.confirm("Are you sure to delete this job?")){
        setjobs(prev =>prev.filter(job=>job.id !==id))
    }
}


    return(
 <div className="container mt-4">
 <h4 className="mb-4 text-primary">Job Management</h4>
 <div className="card shadow-sm mb-4">
<div className="card-body">
<h5>{edit ? "Edit Job" : "Post New Job"}</h5>   
<form onSubmit={handleSubmit}>
    <div className="mb-3">
 <input type="text" className="form-control" name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} required/>
 </div>
 <div className="mb-3">
 <textarea className="form-control" name="description" placeholder="Job Desciptions" value={formData.description} onChange={handleChange} required/>
 </div>
 <div className="mb-3">
<input type="text" className="form-control" name="location" placeholder="Location"value={formData.location} onChange={handleChange} required/>
</div>
<div className="mb-3">
 <input type="number" className="form-control" name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} required/>
 </div>
 <div className="mb-3">
<select name="status" className="form-control mb-3" value={formData.status} onChange={handleChange} >
    <option value="open" >Open</option>
    <option value="close">Close</option>
</select></div>
<button className="btn btn-secondary" type="submit">
{edit? "update job" : "posted job"}</button>
</form>
</div>
</div>

<div className="card shadow-sm">
 <div className="card-body">
    <h5>Your Joblistings</h5>
    {jobs.length===0 ? (
        <p className="text-muted">No jobs posted yet.</p>
    ):(
        <ul className="list-group">
            {jobs.map((job)=>(
         <li  key={job.id}className="list-group-item"   >
            <div className="d-flex justify-content-between">
                <div>
                    <h6 className="mb-1">{job.title}</h6>
                    <small className="text-muted">
                        {job.location} | {job.status.toUpperCase()}</small>
                       <p className="mb-1">{job.description}</p>
                      <small>Skills: {job.skills}</small> 
                </div>
                <div>
        <button className="btn btn-warning btn-sm me-2" onClick={()=>handleEdit(job)}>Edit</button>
     <button className="btn btn-danger btn-sm"  onClick={()=>handleDelete(job.id)}>Delete</button>

              
                </div>
            </div> 
         </li>       

            ))}
         
        </ul>
    )}
 </div>
 </div>

</div>
    )

}
export default Jobmanagement