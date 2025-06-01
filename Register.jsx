import { useState } from "react";
import{api} from "../axios";
import {toast} from "react-toastify"
import{ useNavigate} from "react-router"



const Register = () => {
  const [regData, setRegData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role : "jobseeker",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(regData.password, regData.confirmPassword);
    
    if (regData.password.trim() != regData.confirmPassword.trim()) {
      return toast.error("Passwords do not match");
       }
       

    try{
      const data = await api.post("/auth/signup",{
        name:regData.name,
        email:regData.email,
        password:regData.password,
        confirmPassword:regData.confirmPassword,
        role:regData.role,

      })
      toast.success("User created successfuly");
      navigate("/log")
    }catch(error){
      console.log(error);
      
      toast.error(error.response?. data.message || error.message)
    }
  
  }

  return (




<div className="d-flex justify-content-center align-items-center min-vh-100">
 <div className="container p-4 shadow-rounded" style={{ maxWidth: "450px" }}>
  <h2 className="mb-4 text-center">Register</h2>
  <form onSubmit={handleSubmit}className="d-flex flex-column gap-3">
 <select name="role" value={regData.role} onChange={handleChange} className="form-control" required>
  <option value="" disabled>Select Role</option>
  
  <option value="jobseeker">Job Seeker</option>
  <option value="employer">Employer</option>
  </select>   
 
<input type="text" name="name" placeholder="Name" value={regData.name}onChange={handleChange}className="form-control" required  />    

<input type="email" name="email" placeholder="Email"  value={regData.email}onChange={handleChange}  className="form-control"   required  />       
 


<input  type="password" name="password"  placeholder="Password"value={regData.password} onChange={handleChange} className="form-control"required />



<input type="password"  name="confirmPassword" placeholder="Confirm Password" value={regData.confirmPassword} onChange={handleChange}  className="form-control"     required   />


<button type="submit" className="btn btn-primary w-100">  Register </button>
  </form>
    </div>
    </div>
  );
};

export default Register;
