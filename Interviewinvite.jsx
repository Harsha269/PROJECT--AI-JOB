import { useEffect, useState } from "react"


const Interviewinvite = ()=>{
    
        const[interviews , setInterviews]=useState([])
        
           useEffect(()=>{
    const saved = JSON.parse(localStorage.getItem("interviews"))  || [];
    setInterviews(saved)      
            } ,  [])
           
return(
 <div className="container mt-4">
 <h4 className="mb-4 text-success">Your Interview Invites</h4>
{interviews.length === 0 ? ( <p className="text-muted">No interview invitations yet.</p>
      ) : (
        <div className="card shadow-sm">   
        <div className="card-header">Upcoming Interviews</div>     
        <div className="card-body">                  
   { interviews.map((item) => (
     <div key={item.id} className="border rounded p-3 mb-3">
     <div>
         <strong>Interview With:</strong> Recruiter<br />
        <strong>Mode:</strong> {item.mode}<br />
        <strong>Date:</strong> {new Date(item.datetime).toLocaleString()}<br />
         <strong>Status:</strong> {item.status}
          <span className={`badge bg-${item.status === "Confirmed" ? "success" : item.status === "Pending" ? "warning text-dark" : "secondary"}`}>
                    {item.status}
                  </span>
        </div>
        {item.notes.length > 0 && (
         <ul className="mt-2 small text-muted">
         {item.notes.map((note, idx) => (
           <li key={idx}><em>{note}</em></li>
                ))}
             </ul>
        )}
             </div>
            ))}
          </div>
          </div>
        )}
      
    </div>
  


    )

}
export default Interviewinvite