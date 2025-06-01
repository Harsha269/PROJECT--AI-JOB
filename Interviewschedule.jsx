import { useEffect, useState } from "react"

const Interviewschedule=()=>{
    const[inteviews , setInterviews] = useState([])
    const[formData , setFormData] = useState({
        candidate:"",
        datetime:"",
        mode:"zoom",
    })
    const[newNotes , setNewNotes] = useState({})

    useEffect(()=>{
      const saved = JSON.parse(localStorage.getItem("interviews"))||[];
      const valid = saved.filter(
        (item)=>item && typeof item === "object" && item.candidate
      )
      setInterviews(valid)
    },[])
    const handleSchedule =async(e)=>{
         e.preventDefault();
         const newInterView={...formData,
        id: Date.now(), 
        status: 'Scheduled',
        notes: [],
         }
        //  setInterviews([...inteviews,newInterView])
        const updated =[...inteviews,newInterView]
        setInterviews(updated)
        localStorage.setItem("interviews",JSON.stringify(updated))
setFormData({candidate:"" , datetime:"",mode:"zoom"})
    }
    
    const handleNotChange=(e)=>{
    const{name , value}= e.target
    setNewNotes((prev)=>({...prev,[name]:value}))
}

const submitNote = (id) => {
const note = newNotes[id]?.trim();
    if (!note) return;

    const updated = inteviews.map((item)=>{
     return  item.id === id 
        ? {...item,notes:[...item.notes,note]}
        :item;
})

    // setInterviews((prev) =>
      // prev.map((item) =>
        // item.id === id ? { ...item, notes: [...item.notes, note] } : item
      // )
    // )

    setInterviews(updated);
    localStorage.setItem("interviews" ,JSON.stringify(updated))
    setNewNotes((prev) => ({ ...prev, [id]: "" }))
  }

  const updateStatus = (id, status) => {
    const updated = inteviews.map((item)=>
      item.id === id ? {...item,status}:item
  )
  setInterviews(updated)
  localStorage.setItem("interviews" ,JSON.stringify(updated))
    // setInterviews((prev) =>
      // prev.map((item) =>
        // item.id === id ? { ...item, status } : item
      // ))
    
  }

    return(
        <div className="container mt-4">
          <h4 className="mb-4 text-primary">Interview Schedule</h4>  
          <div className="card shadow-sm mb-4">
            
        <div className="card-header"> Schedule Interview</div>
            <div className="card-body">
             <form onSubmit={handleSchedule} >
        <div className="mb-3">        
 
<input 
  type="text" 
  className="form-control" 
  name="candidate" 
  placeholder="Candidate Name"  
  value={formData.candidate} 
  onChange={(e) => setFormData({ ...formData, candidate: e.target.value })} 
  required 
/>

</div> 
<div className="mb-3"> 

<input type="datetime-local" className="form-control" name="datetime" placeholder="Date & Time" value={formData.datetime} onChange={(e)=>setFormData({...formData,datetime:e.target.value})} required/>
 </div>
 <div className="mb-3">
<select name="mode" className="form-control mb-3"value={formData.mode}
              onChange={(e) => setFormData({ ...formData, mode: e.target.value })}  >
    <option value="zoom" >Zoom</option>
    <option value="googlemeet">Googlemeet</option>
    <option value="in-person">In-Person</option>
</select>   </div>
<button className="btn btn-outline-danger" > Schedule Inteview</button>  
 </form>   
 </div>
</div>

<div className="card shadow-sm">
    <div className="card-header"> Scheduled Interviews</div>
    <div className="card-body">
        {inteviews.length===0 ? (
            <p className="text-muted"> No interviews scheduled yet.</p>
        ):(inteviews.map((item)=>(
          <div key={item.id} className="border rounded p-3 mb-3">
        <div className="d-flex justify-content-between">
        <div>
        <strong>{item.candidate}</strong><br />
               Date: {new Date(item.datetime).toLocaleString()}<br />
                Mode: {item.mode}<br />
              Status: <strong>{item.status}</strong>

</div>
<div>
   <select value={item.status} className="form-select mb-2" onChange={(e) => updateStatus(item.id, e.target.value)} >
   <option value="Scheduled">Scheduled</option>
    <option value="Completed">Completed</option>
    <option value="Cancelled">Cancelled</option>
     </select>

      <input type="text" name={item.id}className="form-control mb-2"placeholder="Add Note"value={newNotes[item.id] || ""}
       onChange={handleNotChange}/>

       <button className="btn btn-outline-secondary btn-sm" onClick={()=>submitNote(item.id)}>Add Note</button>
       </div>
</div>

{item.notes.length >0 && (
  <ul className="mt-2 small">
    {item.notes.map((note,index)=>(
       <li key={index}>{note}</li>
    ))}
  </ul>

)}
</div>
        ))
     ) }
        
        
       
       </div> 
       </div>
    


 </div>
    )

}
export default Interviewschedule