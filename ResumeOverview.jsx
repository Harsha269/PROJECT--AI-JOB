import { useState , useEffect } from "react"

const ResumeOverview = ()=>{
    const [resumes , setResumes] = useState([])
    useEffect(() => {
        const fetchResumes = async () => {
          try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:8082/api/admin/resumes", {
              headers: { Authorization: `Bearer ${token}` },
            });
            setResumes(res.data);
          } catch (error) {
            console.error("Failed to fetch resumes", error)
          }
        }
    
        fetchResumes();
      }, [])
    return (
        <div className="container mt-4">
            <h3 className="mb-3">Resume Overview</h3>
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                       
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Skills</th>
                        <th>Experience</th>
                        </tr></thead>
                        <tbody>
                        
                        {resumes.map((resume) => (
            <tr key={resume._id}>
              <td>{resume.fullName}</td>
              <td>{resume.email}</td>
              <td>{resume.skills?.join(", ")}</td>
              <td>{resume.experience?.map(exp => `${exp.role} at ${exp.company}`).join("; ")}</td>
            </tr>
                   
                   
                        ))}
                
            </tbody>
            </table>

        </div>
    )

}
export default ResumeOverview