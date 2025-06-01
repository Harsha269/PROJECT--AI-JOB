import { useState } from "react"

const Jobprofile =()=>{

    const[profile ,  setProfile] = useState({
      name:"",
      email:"",
      phone:"",
      skills:"",
    })
    const[resume , setResume] =useState(null);
    const [parsedSkills, setParsedSkills] = useState([]);
    
    


    const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  }

  const handleResumeChange=(e)=>{
    const file =e.target.files[0]
    setResume(file)

    const simulatedParsedSkills = ["Javascript" , "React" ,"Node.js" ,"MongoDB","HTML" ,"css"]
    setParsedSkills(simulatedParsedSkills)
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    const formData = new FormData();
    formData.append("name",profile.name);
    formData.append("email",profile.email)
    formData.append("phone",profile.phone);
    formData.append("skills",profile.skills)
    if(resume){
      formData.append("resume",resume)
    }
    console.log("Form data send")
      window.alert("Profile submitted successfully!");

  }
    return(
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Job Seeker Profile</h2> 
      <form  onSubmit={handleSubmit} className="d-flex flex-column gap-3" >
      <input type="text" onChange={handleChange} value={profile.name} name="name"  placeholder="Full Name" className="form-control" required/>
      <input type="email" onChange={handleChange} value={profile.email} name="email" placeholder="Email" className="form-control" required/>
      <input type="text" onChange={handleChange}value={profile.phone} name="phone" placeholder="Phone" className="form-control" required/>
      <input type="file"onChange={handleResumeChange} accept=".pdf,.doc,.docx" className="form-control" required/>
      <textarea onChange={handleChange} name="skills" value={profile.skills}  placeholder="Skills(Comma-separated)" className="form-control"/>
      
        <button className="btn btn-success w-100">Save Profile</button>

        </form>  
        {parsedSkills.length > 0 && (
          <div className="mt-5">
            <h4 >Parsed Skills</h4>
            <ul className="list-group">
              {parsedSkills.map((skill, index)=>(
                <li  key={index}className="list-group-item">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
    )

}
export default Jobprofile