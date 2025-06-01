import { useEffect, useState } from "react"

const Employermessage=()=>{
    const[candidate , setCandidate] = useState('')
    const[message , setMessage] = useState('')
    const[chat , setChat] = useState([])

    useEffect(()=>{
        const allMessages = JSON.parse(localStorage.getItem("Messages")) || []
        const filtered = allMessages.filter(
            (m)=> (m.from === "Employer" && m.to === "Candidate") || (m.from === "Candidate" && m.to === "Employer")
        )
        setChat(filtered)
    } , [candidate])


    const updatedMessage = (newMsg)=>{
        const all = JSON.parse(localStorage.getItem("messages")) || []
        const updated = [...all,newMsg]
        localStorage.setItem("messages",JSON.stringify(updated));
        setChat((prev)=>[...prev,newMsg])
    }

    const handleSend=()=>{
        if(!candidate || !message.trim())
            return

        const newMsg ={
        from : 'Employer' ,
        to:candidate ,
        text:message.trim(),
        timestamp:Date.now(),
    }
    updatedMessage(newMsg)
    setMessage("")
        
    }

    const sendReply = ()=>{
        if(!candidate)
            return

    const reply = {
        from: "candidate  ",
        to : "Employer",
         text : 'Recieved Thanks!',
         timestamp:Date.now() 
        }  
        updatedMessage(reply) 
    } 
    
    return(
        <div className="container my-4">
            <h4 className="mb-4 text-primary">Employer Messaging</h4>
            {/* <form> */}
        <div className="mb-3"  >
 <input className="form-control" placeholder="Enter candidate name"  value={candidate} onChange={(e)=>setCandidate(e.target.value)} /> 
        
 </div> 
 {candidate && (
    <>
<div className="card mb-3">
<div className="card-header">Chat With <b>Candidate</b></div>
<div className="card-body" style={{ maxHeight: '200px', overflowY: 'auto' }}>
    {chat.map((msg,i)=>(  
 <div key={i} >
     <strong>{msg.from}:</strong> {msg.text}
</div>
) )}

{/* {(chat[candidate]?.length === 0) && <div className="text-muted">No message yet.</div>} */}

</div>
</div>

<div className="input-group mb-3">
 <textarea className="form-control" placeholder="Type Message" value={message} onChange={(e)=>setMessage(e.target.value)}/>


<button className="btn btn-primary"onClick={handleSend} >Send</button>
<button className="btn btn-secondary" onClick={sendReply} >Reply</button>

</div>

    </>
 )}

 </div>
        
    )

}
export default Employermessage