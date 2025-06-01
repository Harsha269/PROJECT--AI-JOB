import{api} from "../axios"
import { toast } from "react-toastify"
import { cookie } from "../lib/cookie"

const Homepage=()=>{
    const handleCheckAuth = async()=>{
        try{
            const {data , status} = await api.get("/auth/check")
            if(status !==200)
                return toast.error(data.message)
            toast.success(data.message)
            }catch(error){
                toast.error(error.response?.data.message || error.message)
            }
    }
    const handleLogout =()=>{
        cookie.remove();
        toast.success("Logged out successfuly")
        window.location.href = "/log";
    }
    return(
       <div className="d-flex justify-content-center m-4" >
        <button className="btn btn-secondary m-3" onClick={handleCheckAuth}>  Is authenticated  </button>
        <button className="btn btn-primary m-3" onClick={handleLogout}>Logout</button>

       
       </div>
    )

}
export default Homepage