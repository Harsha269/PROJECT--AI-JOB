import { useState } from "react";
 
const Employernotify=()=>{

    const [type, setType] = useState("message");
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit =async (e)=>{
    e.preventDefault();
  

  const notification = {
    recipient,
    type,
    message,
  }

  
  try {
      const res = await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notification),
      })

    if (!res.ok) throw new Error("Failed to send");

      setSuccess("Notification sent successfully!");
      setError("");
      setRecipient("");
      setMessage("");
    } catch (err) {
      setError("Error sending notification.");
      setSuccess("");
    }
  }
  return (
    <div className="mt-4">
      <h3>Send Notification to Job Seeker </h3>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label>Recipient (job seeker Id or email)</label>
     
   <input type="text" className="form-control" value={recipient} onChange={(e) => setRecipient(e.target.value)} required/>
            
          
            </div>

      

        <div className="mb-3">
          <label>Notification Type</label>
          <select className="form-select" value={type} onChange={(e)=>setType (e.target.value)}>
            <option value="message">Message</option>
             <option value="interview">Interview</option>
              <option value="application">Application</option>
               <option value="status">Status</option>
          </select>
        </div>

        <div className="mb-3">
          {/* <label className="form-label">Message</label> */}
          <textarea rows={3} placeholder="Enter your message here"style={{ width: "100%", height: "120px" }} value={message}onChange={(e)=>setMessage(e.target.value)}required></textarea>
             </div>
        

        
        <button className="btn btn-secondary">Sent Notifications</button>
        {success && (
          <div className="alert alert-success mt-3" role="alert">{success}</div>

        )}
        
        {error && (
          <div className="alert alert-danger mt-3" role="alert">{error}</div>
        )}
      
        
      </form>
        </div>
      
    

  )


} 
export default Employernotify