
   import { useEffect, useState } from "react";

const Jobseekerchat = ()=>{

const [employer, setEmployer] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(()=>{
    const allMessages = JSON.parse(localStorage.getItem("message")) || [];
    const filtered = allMessages.filter(
   (m) => (m.from === "employer" && m.to === candidate) || (m.from === candidate && m.to === "employer")
    )  
    setChat(filtered)
   },[employer])


   const updatedMessages =(newMsg)=>{
    const all = JSON.parse(localStorage.getItem("Messages")) || [];
    const updated = [...all,newMsg]
    localStorage.setItem("messages",JSON.stringify(updated))
    setChat((prev)=>[...prev,newMsg])
   }

  const handleSend = () => {
    if (!employer || !message.trim()) return;

    const newMsg = {
       from: "candidate", 
       to: employer ,
       text: message.trim() ,
       timestamp : Date.now()
      };
updatedMessages (newMsg)
setMessage("")
    }



    

    const sendReply =()=> { 
      if(!employer)
        return;
      const reply ={
      from: employer,
      to : "candidate" ,
       text: "Thanks for your message!" ,
       timestamp:Date.now()
       }
   updatedMessages(reply)
  }


  return (
    <div className="container my-4">
      <h4 className="mb-4 text-success">Chat with Employer</h4>

      <div className="mb-3">
<input className="form-control" placeholder="Enter employer name" value={employer} onChange={(e) => setEmployer(e.target.value)}
        />
      </div>

      {employer && (
        <>
  <div className="card mb-3">
   <div className="card-header">
     Chat With <b>{employer}</b>
            </div>
            <div className="card-body" style={{ maxHeight: "200px", overflowY: "auto" }}>
              {chat.map((msg, i) => (
                <div key={i}>
                  <strong>{msg.from}:</strong> {msg.text}
                </div>
              ))}

               </div>
          </div>


          <div className="input-group mb-3">
            <textarea
              className="form-control"
              placeholder="Type Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
    <button className="btn btn-success" onClick={handleSend}> Send  </button>
             
           
    <button className="btn btn-secondary" onClick={sendReply}>  Reply </button>
             
            
          </div>
        </>
      )}
    </div>
  )
}





export default Jobseekerchat