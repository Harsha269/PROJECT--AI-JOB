
import { useState, useEffect } from "react";

const Applicationtracking =()=>{


    const [applications, setApplications] = useState([]);
    const statusFlow =["Applied" ,"Shortlisted" ,"Interview" , "Selected"]      

  const sampleApplications = [{
    id:"",
    jobTitle:"",
    company:"",
    location:"",
    currentStage:"",
  }]

  useEffect(()=>{
    setApplications(sampleApplications);

  },[])
  
          

     const advanceStage =(id)=>{
      setApplications((prev)=>
      prev.map((app)=>{
        const index = statusFlow.indexOf(currentStage)
        return app.id === id && index< statusFlow.length -1
        ?{...app ,currentStage:statusFlow[index+1]}:app

      }))

     }

const renderProgress = (currentStage)=>{
  const currentIndex = statusFlow.indexOf(currentStage)
  return statusFlow.map((stage , i)=>{
    let className = "bg-secondary";
    if(i<currentIndex)className="bg-success"
    else if(i===currentIndex)className ="bg-primary"

    return (
      <div key={stage} className={`progress-bar ${className}`}  style={{ width: `${100 / statusFlow.length}%` }}>
           {i === currentIndex ? stage : ""}
      </div>
    )
  })
}
return(
  <div className="container mt-4">
    <h4 className="mb-4 text-success">Application Tracking</h4>
    {applications.length === 0 ?(
      <p className="text-muted">No Aplication found.</p>
    ):(
      <div className="row row-cols-1 row-cols-md-2 g-3">
        {applications.map((app,index)=>(
          <div key={index} className="col">
            <div className="card shadow-sm h-100">
              <div className="card-body">
               <h5 className="card-title">{app.jobTitle }</h5>
                 <p className="mb-1"><strong>Company:</strong> {app.company }</p>
                <p className="mb-1"><strong>Location:</strong> {app.location }</p>  

                <div className="mb-3">
                  <strong>Status</strong>
                  <div className="progress mt-1" style={{ height: "24px" }}>
                    {renderProgress(app.currentStage)}
                  </div>
                </div>
                {app.currentStage !== "Selected" && app.currentStage && (
                  <button className="btn btn-outline-primary btn-sm" onClick={()=>advanceStage(app.id)}>Next Stage</button>
                )}
              </div>
              </div>
              </div>
        ))}
      </div>
    )}
  </div>
)



}
export default Applicationtracking