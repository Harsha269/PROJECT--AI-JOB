import axios from "axios"
import { useEffect, useState } from "react"

const Managejobs=()=>{
    const[jobs , setJobs]= useState([])
    useEffect(()=>{
        fetchUsers()
    },[])
    const fetchUsers = async(id)=>{
        if(!window.confirm("Delete users?"))
        return
        const token = localStorage.gatItem("token")
    const res =    await axios.get("http://localhost:8082/api/admin/jobs",{
        headers :{Authorization: `Bearer ${token}`},
    })
    setUsers(res.data)
 }
 const handleDelete =  async (id) => {
    if (!window.confirm("Delete user?")) return;
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:8082/api/admin/job/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    fetchUsers();
  }


    return (
        <div>
            <h4 className="mb-4">Manage Jobs</h4>
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                    <th>Title </th>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map(job=>(
                        <tr key={job._id}>
                            <td>{job.title}</td>
                            <td>{job.company}</td>
                            
                            <td>{job.location}</td>
                  <td><button className="btn btn-sm btn-danger" onClick={()=>handleDelete(job._id)}>Delete</button></td>          
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )

}
export default Managejobs