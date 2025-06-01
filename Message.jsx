import { useState } from "react"

const Message=()=>{
    const[message,setMessage]=useState([])
    const[formData, setFormData]=useState({
        to:"",
        subject:"",
        content:"",
    })
const[editMessageId,setEditMessageId] =useState(null)
const[selectedMessage ,setSelectedMessage] =useState(null)
const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
   if(!formData.to || !formData.subject || !formData.content) 
    return;
const newMessage={
    id:editMessageId,
    to: formData.to,
      subject: formData.subject,
      content: formData.content,
      date: new Date().toISOString().split("T")[0],
}
if(editMessageId){
    setMessage((prev)=>
    prev.map((msg)
))
setEditMessageId(null);
    } else {
      
      setMessage((prev) => [newMessage, ...prev]);
    }
  setFormData({to:"",subject:"",content:""})  
  selectedMessage(null)
}
 const handleEdit = (message) => {
    setEditMessageId(message.id);
    setFormData({
      to: message.to,
      subject: message.subject,
      content: message.content,
    })
    setSelectedMessage(null);
  }
  
const handleDelete  = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this message?");
    if (confirmDelete) {
      setMessage((prev) => prev.filter((msg) => msg.id !== id));
      setSelectedMessage(null);
    }
  }
 const handleView = (message) => {
    setSelectedMessage(message)
    setEditMessageId(null)
    setFormData({ to: "", subject: "", content: "" })
  }
  }
    return(
        <div className="container mt-4">
            <h4 className="mb-4">Job seeker Message</h4>
            <div className="row">
             <div className="col-md-6 mb-4"   >
             <div className="card shadow-sm"   >
             <div className="card-body"   >
              <h4 className="card-title"  >{editMessageId ? "Update Message" : "New Message"}</h4>
              <form onSubmit={handleSubmit}>
              <input type="text" name="to" placeholder="To (Recruiter/HR)" value={formData.to} onChange={handleChange} className="form-control mb-2" required/>
              <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} className="form-control mb-2" required/>
              <input type="textarea" name="content" placeholder="Your content" value={formData.content}onChange={handleChange} className="form-control mb-2" required/>
              </form>
             </div>
             </div>
             </div>
    <div className="col-md-6"     >
    <div className="card shadow-sm"    >
    <div className="card-body"    >
    <h4 className="card-title">Your Messages</h4>   
    {message.length===0 ?(
     <p className="text-muted"   >No messages yet</p>
    ):(
     <ul className="list-group"   >
        {message.map((msg)=>(
 <li key={msg.id} className="list-group-item d-flex justify-content-between align-items-start" > 
 <div onClick={()=>handleView(msg)}>
<strong>{msg.to}</strong> <br />
 <small>{msg.subject}</small> <br />
 <small className="text-muted">{msg.date}</small> 
 </div>
 <div>
    <button className="btn btn-warning me-2 " onClick={()=>handleEdit(msg)}>Edit</button>
    <button className="btn btn-danger me-2 " onClick={()=>handleDelete(msg.id)}>Delete</button>
 </div>
</li>
      )
    )}
        
</ul>
)}
</div>
</div>
{selectedMessage &&(
    <div className="card shadow-sm mt-3">
     <div className="card-body"   >
     <h5>{selectedMessage.subject}</h5>   
      <p><strong>To:</strong> {selectedMessage.to} </p>
     <p>{selectedMessage.content}</p>
     <p className="text-muted"> <small>{selectedMessage.date}</small></p>
                
                 
     </div>
    </div>
)}
        </div>    

            </div>
        </div>

    )


export default Message