import { useEffect, useState } from "react"

const Jobanalytic =()=>{
    const[jobs , setJobs] = useState([
        {id:"" ,
         title:"", 
         savedCount :"" ,
         applicationCount:"",
         viewCount:"",


        }
    ])
    const[loading ,setLoading]= useState(true)
    useEffect(()=>{
        setTimeout(()=>{
        const fetchedJobs =[];
        setJobs(fetchedJobs)
        setLoading(false)
    },5000 );
},[])
    


    if(loading){

    return (
        <div className="container mt-4">
         <h3   >Job Analytics</h3>
         <p className="text-muted">No job analytics available.</p>
 </div>
    )
}

 if (jobs.length === 0) {
    return (
      <div className="container mt-4">
        <h3>Job Analytics</h3>
        <p className="text-muted">No job analytics available.</p>
      </div>
    )
  }


 return (
    <div className="container mt-4">
        <h3 className="text-muted">Job Analytics /Insights </h3>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
           { jobs.map((job)=>
            <div key={job.id} className="col">
        <div className="card shadow-sm h-100">
        <div className="card-body">
      <h3 className="card-title">{job.title}</h3>
 <p> <strong>Saved Count:</strong> {job.savedCount || 0}</p>    
  <p> <strong>Application:</strong> {job.applicationCount || 0}</p>   
   <p> <strong>Views:</strong> {job.viewCount || 0}</p>  
                    </div>
                </div>
            </div>
            )}
        </div>

    </div>
 )

}
 export default Jobanalytic