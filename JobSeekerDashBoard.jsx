import { NavLink, Outlet} from "react-router"

const JobSeekerDashBoard=()=>{
    return(
    <div className="min-vh-100 d-flex" style={{ backgroundColor: "#f5f7fa" }}>
    <div className="bg-white shadow-sm p-4"  style={{ width: "260px", minHeight: "100vh", borderRight: "1px solid #dee2e6" }}>
     <div className="mb-4">
     <h4 className="text-primary fw-semibold">JOBSEEKER</h4><hr/>
</div>
<ul className="nav flex-column gap-2">
 <li className="nav-item"   >
 <NavLink  to="profile" className={({ isActive }) =>`nav-link px-3 py-2 rounded ${isActive ? "bg-primary text-white" : "text-dark"}`} >
    Profile</NavLink>  </li>

     

 
      
    <li className="nav-item"   >
 <NavLink   to="save" className={({ isActive }) =>`nav-link px-3 py-2 rounded ${isActive ? "bg-primary text-white" : "text-dark"}`} >
    Saved Jobs</NavLink>  </li> 
              

<li className="nav-item"   >
 <NavLink   to="resume" className={({ isActive }) =>`nav-link px-3 py-2 rounded ${isActive ? "bg-primary text-white" : "text-dark"}`} >
    Resume Builder</NavLink>  </li>    
              
<li className="nav-item"   >
 <NavLink   to="apply" className={({ isActive }) =>`nav-link px-3 py-2 rounded ${isActive ? "bg-primary text-white" : "text-dark"}`} >
    Applied Jobs</NavLink>  </li>

 

<li className="nav-item"   >
 <NavLink   to="feed" className={({ isActive }) =>`nav-link px-3 py-2 rounded ${isActive ? "bg-primary text-white" : "text-dark"}`} >
    Job Feed</NavLink>  </li>

    <li className="nav-item"   >
 <NavLink   to="invite" className={({ isActive }) =>`nav-link px-3 py-2 rounded ${isActive ? "bg-primary text-white" : "text-dark"}`} >
    Interview Invite</NavLink>  </li>         


 <li className="nav-item"   >
 <NavLink   to="chat" className={({ isActive }) =>`nav-link px-3 py-2 rounded ${isActive ? "bg-primary text-white" : "text-dark"}`} >
    Jobseeker Chat</NavLink>  </li>   

    <li className="nav-item"   >
 <NavLink   to="track" className={({ isActive }) =>`nav-link px-3 py-2 rounded ${isActive ? "bg-primary text-white" : "text-dark"}`} >
    Application Tracking</NavLink>  </li>    


    <li className="nav-item"   >
 <NavLink   to="notify" className={({ isActive }) =>`nav-link px-3 py-2 rounded ${isActive ? "bg-primary text-white" : "text-dark"}`} >
    Notifications </NavLink>  </li>       
   


</ul>
      </div>

       <div className="p-4 flex-grow-1">
        
        
        <h5 className="text-secondary">Welcome to the Job Seeker Dashboard</h5>
        <Outlet/>
      </div>
        </div>
        
    )

}
export default JobSeekerDashBoard