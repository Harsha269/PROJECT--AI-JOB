import axios from "axios"
import { useEffect, useState } from "react"

const ManageUsers=()=>{
    const[users , setUsers]= useState([])
    useEffect(()=>{
        fetchUsers()
    },[])
    const fetchUsers = async(id)=>{
        if(!window.confirm("Delete users?"))
        return
        const token = localStorage.gatItem("token")
    const res =    await axios.get("http://localhost:8082/api/admin/users",{
        headers :{Authorization: `Bearer ${token}`},
    })
    setUsers(res.data)
 }
 const handleDelete =  async (id) => {
    if (!window.confirm("Delete user?")) return;
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:8082/api/admin/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    fetchUsers();
  }


    return (
        <div>
            <h4 className="mb-4">Manage Users</h4>
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                    <th>Name </th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user=>(
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                  <td><button className="btn btn-sm btn-danger" onClick={()=>handleDelete(user._id)}>Delete</button></td>          
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )

}
export default ManageUsers