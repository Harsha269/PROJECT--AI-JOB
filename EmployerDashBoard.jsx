import { NavLink, Outlet} from "react-router"

const EmployerDashBoard=()=>{
    return(
    <div className="min-vh-100 d-flex" style={{ backgroundColor: "#f5f7fa" }}>
    <div className="bg-white shadow-sm p-4"  style={{ width: "260px", minHeight: "100vh", borderRight: "1px solid #dee2e6" }}>
     <div className="mb-4">
     <h4 className="text-primary fw-semibold">EMPLOYER</h4><hr/>
</div>
<ul className="nav flex-column gap-2">

<li className="nav-item"   >
 <NavLink   to="company" className={({ isActive }) =>`nav-link px-3 py-2 rounded ${isActive ? "bg-primary text-white" : "text-dark"}`} >
   Company Profile </NavLink>  </li>   


   <li className="nav-item"   >
 <NavLink   to="listings" className={({ isActive }) =>`nav-link px-3 py-2 rounded ${isActive ? "bg-primary text-white" : "text-dark"}`} >
    Job Listings</NavLink>  </li> 

 <li className="nav-item"   >
 <NavLink  to="job" className={({ isActive }) =>`nav-link px-3 py-2 rounded ${isActive ? "bg-primary text-white" : "text-dark"}`} >
   Job Management </NavLink>  </li>

<li className="nav-item"   >
 <NavLink   to="interview" className={({ isActive }) =>`nav-link px-3 py-2 rounded ${isActive ? "bg-primary text-white" : "text-dark"}`} >
  Interview Scheduling  </NavLink>  </li>    
              

<li className="nav-item"   >
 <NavLink   to="message" className={({ isActive }) =>`nav-link px-3 py-2 rounded ${isActive ? "bg-primary text-white" : "text-dark"}`} >
  Employer Message  </NavLink>  </li>    
              
<li className="nav-item"   >
 <NavLink   to="applicant" className={({ isActive }) =>`nav-link px-3 py-2 rounded ${isActive ? "bg-primary text-white" : "text-dark"}`} >
   Applicant Management </NavLink>  </li>



<li className="nav-item"   >
 <NavLink   to="resume" className={({ isActive }) =>`nav-link px-3 py-2 rounded ${isActive ? "bg-primary text-white" : "text-dark"}`} >
  Resume Parsing  </NavLink>  </li> 

  <li className="nav-item"   >
 <NavLink   to="notification" className={({ isActive }) =>`nav-link px-3 py-2 rounded ${isActive ? "bg-primary text-white" : "text-dark"}`} >
  Employer Notifications  </NavLink>  </li> 

  <li className="nav-item"   >
 <NavLink   to="analytic" className={({ isActive }) =>`nav-link px-3 py-2 rounded ${isActive ? "bg-primary text-white" : "text-dark"}`} >
  Job Analytics  </NavLink>  </li>         
        


</ul>
      </div>

       <div className="p-4 flex-grow-1">
        
        
        <h5 className="text-secondary">Welcome to the Employer Dashboard</h5>
        <Outlet/>
      </div>
        </div>
        
    )

}
export default EmployerDashBoard