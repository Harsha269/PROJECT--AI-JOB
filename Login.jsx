import { useState } from "react"
import { useNavigate } from "react-router"
import { api } from "../axios";
import { cookie } from "../lib/cookie";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const Login=()=>{
    const[loginData , setLoginData] = useState({
        email:"",
        password:""
    })
    const navigate = useNavigate();
    const handleChange=(e)=>{
        const{name , value} = e.target;
        setLoginData((prevData)=>({
            ...prevData,[name]:value,
        }))

    }
    const handleSubmit= async (e)=>{
        e.preventDefault();
        try{
            const {data} = await api.post("/auth/login" ,  loginData)
            cookie.set(data.token)

            const decoded = jwtDecode(data.token) 
            const role = decoded.role

            toast.success(data.message)
            
            if (role === "jobseeker") {
              navigate("/jobseeker")
           } else if (role === "employer") {
           navigate("/employer")
          } else {
          navigate("/home")
       }

            
                
            
        }catch(error){
            toast.error(error.response?. data.message || error.message)
        }
        
        
    }

    return(
        <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className= "container p-4 shadow-rounded" style={{ maxWidth: "450px" }}>
        <h2 className="mb-4 text-center">Login</h2>
     <form  onSubmit={handleSubmit}className="d-flex flex-column gap-3"  >
     
   
    <input type="email"  name="email" placeholder="Email" value={loginData.email} onChange={handleChange} className="form-control"  required/>
    
    <input type="password"  name="password" placeholder="Password" value={loginData.password} onChange={handleChange}  className="form-control" required />

     <button type="submit" className="btn btn-primary w-100">Login</button>      
    </form></div>
</div>

    )

}
export default Login