import { useState } from "react"

const Companyprofile=()=>{
    const[company , setCompany]=useState({
        name:"",
        description:"",
        email:"",
        website:"",
        logo:"null",
    })
    const[postedJobs,setPostedJobs] = useState([])
    const[logoPreview , setLogoPreview] = useState(null)

    const handleChange=(e)=>{
        const{name,value,files} = e.target
        if(name === "logo"){
            const file = files[0]
            setCompany((prev)=>({...prev , logo:file}))

      const reader = new FileReader()
      reader.onload =()=> setLogoPreview(reader.result)
      reader.readAsDataURL(file)
}
else{
          setCompany((prev) => ({ ...prev, [name]: value }))
}
    }
    const handleSubmit=(e)=>{
        e.preventDefault();

        console.log("Company pofile submitted" , company);
        
   

    const newJob={
        id:postedJobs.length+1,
        title: "bvbbv",
      location: "vbn",
      datePosted:new Date().toISOString().split("T")[0],
      views:"ghg",
      applicants:"uuy",
    }
    setPostedJobs([...postedJobs,newJob])
     }    
return(
    <div className="container mt-4  mb-5 shadow-sm">
    <h4 className="text-primary mb-4">Manage Company Profile</h4>
    <div className="card-body">
    <form onSubmit={handleSubmit}>
        <div className="mb-4">
        <input type="text" name="name" placeholder="Company Name"  value={company.name}onChange={handleChange} className="form-control" required/>
        </div>

        <div className="mb-4">
        <textarea  name="description" placeholder="Descriptions" value={company.description} onChange={handleChange} className="form-control" required/>
        </div>

        <div className="mb-4">
        <input type="email" name="email" placeholder="Contact Email" value={company.email}onChange={handleChange

        } className="form-control" required/>
        </div>

      <div className="mb-4">
        <input type="url" name="website" placeholder="Company Website" value={company.website}onChange={handleChange} className="form-control" required/>
        </div>

    <div className="mb-4">
    <input type="file" name="logo" placeholder="Company Logo" accept="image/*" onChange={handleChange} className="form-control" required/>
   {logoPreview && (
    <img src={logoPreview} alt="Logo Preview" className="mt-3" style={{maxHeight:"100px"}}/>
   )}
    </div>





        <div className= " mb-4">
            <button className="btn btn-primary">Save Profile</button>
        </div>
    </form>

    </div>

    <div className="mt-4">
        <h4 className="text-secondary"> Posted Jobs</h4>
        <ul className="list-group">
            {postedJobs.length ===0 ?(
                <li className="list-group-item text-muted">No jobs posted yet.</li>
 ):(
    postedJobs.map((job)=>
    <li key={job.id} className="list-group-item">
                <strong>{job.title}</strong> - {job.location} <br />
                <small>Posted on: {job.datePosted}</small>
                <div className="mt-2">
                    <span className="badge bg-primary me-2">
                        Views :{job.views}
                    </span>

                    <span className="badge bg-success">
                        Applicants :{job.applicants}
                    </span>
                </div>
              </li>)
 )}
        </ul>
    </div>

    </div>
)
}
export default  Companyprofile