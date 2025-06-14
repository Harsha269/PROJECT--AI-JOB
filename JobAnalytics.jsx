import axios from "axios"
import { useEffect, useState } from "react"

const JobAnalytics =()=>{
    const[matches ,setMatches] = useState([])
    useEffect(()=>{
        const fetchMatchData = async()=>{
            const token = localStorage.getItem("token")
            const res = await axios.get("http://localhost:8082/api/admin/match/analytics", {
                headers: { Authorization: `Bearer ${token}` },
        })
        setMatches(res.data.matches)
    }
    fetchMatchData()
},[])
    return (
        <div>
<h4 className="mb-4">Job Analytics</h4>
<ul>
   { matches.map((match , index)=>(
        <li key={index}>
         job:  {match.job?.title} | Match score :{match.score}
        </li>
    ))}
</ul>
        </div>
    )

}
export default JobAnalytics