import { useState } from "react"

const ResumeBuilder=({onSubmitResume})=>{
  const[step ,setStep] = useState(1)

    const[resumeData , setResumeData]=useState({
        fullName:"",
        email:"",
        phone:"",
        summary:"",
        education:[],
        experience:[],
        skills:[],
        highlights:[],
})

const [eduInput, setEduInput] = useState("");
  const [expInput, setExpInput] = useState("");
  const [skillsInput, setSkillsInput] = useState("");


const handleChange=(e)=>{
  const{name , value} = e.target
    setResumeData ((prev)=> ({ ...prev, [name]: value }))
}

const addEducation = (e) => {
  e.preventDefault(); 

  if (!eduInput.trim()) return;

  const parts = eduInput.split(",");
  if (parts.length !== 3) {
    alert("Please enter education as: Degree, Institution, Year");
    return;
  }

  const [degree, institution, year] = parts.map((p) => p.trim());

  setResumeData((prev) => ({
    ...prev,
    education: [...prev.education, { degree, institution, year }],
  }));

  setEduInput(""); 
};


   const addExperience = () => {
    if (expInput) {
      const [role, company, years] = expInput.split(",");
      if (role && company && years) {
        setResumeData((prev) => ({
          ...prev,
          experience: [...prev.experience, { role, company, years }],
        }));
        setExpInput("");
      } else {
        alert("Enter experience as: Role,Company,Years");
      }
    }
  }  


  const handleSkillsInput = (e) => {
    setSkillsInput(e.target.value);
  }

  const nextStep = () => {
    if (step === 3) {
      const manualSkills = skillsInput.split(",").map((s) => s.trim());
      const aiSuggestions = ["Teamwork", "Communication", "Time Management"];
      setResumeData((prev) => ({...prev, skills: manualSkills,highlights: aiSuggestions,
        
        }))
    }
    setStep((prev) => prev + 1);
  }

  const prevStep = () => {
    setStep((prev) => prev - 1);
  }





const handleSubmit=(e)=>{
    e.preventDefault()
     console.log("Final Resume Data", resumeData);
    alert("Resume successfully submitted!");
    if (onSubmitResume) onSubmitResume(resumeData);
    
}
    return(
    <div className="container mt-4">
      <h2>Resume Builder</h2>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        {step ===1 && (
          <>
 <input type="text" name="fullName" placeholder="Full Name" value={resumeData.fullName}onChange={handleChange} className="form-control" required/>
 <input type="email" name="email" placeholder="Email" value={resumeData.email}onChange={handleChange} className="form-control" required/>
 <input type="number" name="phone" placeholder="Phone" value={resumeData.phone}onChange={handleChange} className="form-control" required/>
  <textarea name="summary" placeholder="Professional Summary" className="form-control" onChange={handleChange} />       
          </>
        )}
        {step === 2 &&(
         <>
          <div className="d-flex gap-2">
<input type="text" className="form-control" value={eduInput} placeholder="Degree , Institution, Year" onChange={(e) => setEduInput(e.target.value)}  ></input>     
   
   <button className="btn btn-outline-secondary" onClick={addEducation}>Add Education</button>

          </div>
          <ul className="list-group">
            {resumeData.education.map((edu, i) => (
                <li key={i} className="list-group-item">
                  {edu.degree} at {edu.institution} ({edu.year})
                </li>
              ))}

          </ul>


      <div className="d-flex gap-2">
<input type="text" className="form-control" value={expInput} placeholder="Role , Company, Year" onChange={(e) => setExpInput(e.target.value)}  ></input>     
   
   <button className="btn btn-outline-secondary" onClick={addExperience}>Add Experience</button>

          </div>
          <ul className="list-group">
            {resumeData.experience.map((exp, i) => (
                <li key={i} className="list-group-item">
                  {exp.role} at {exp.company} ({exp.years})
                </li>
              ))}

          </ul>
   </>
         
        )}

        {step === 3 &&(
          <>
          <textarea value={skillsInput} placeholder="skills (comma separated)" onChange={handleSkillsInput}/>
          </>
        )}
{step === 4 && (
  <>
  <h5>Review:</h5>
       <pre>{JSON.stringify(resumeData, null, 2)}</pre>
       <button type="submit" className="btn btn-success">Submit Resume</button>
  </>
)}

 <div className="d-flex justify-content-between mt-3">
          {step > 1 && <button type="button" className="btn btn-secondary" onClick={prevStep}>Back</button>}
          {step < 4 && <button type="button" className="btn btn-primary" onClick={nextStep}>Next</button>}
        </div>
        
        
      </form>
    </div>     
    )

}
export default ResumeBuilder