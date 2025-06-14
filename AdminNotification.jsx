import { useState , useEffect } from "react"

const AdminNotification =()=>{
    const [notification , setNotification] = useState([])
    useEffect(() => {
        const fetchNotifications = async () => {
          const token = localStorage.getItem("token");
          const res = await axios.get("http://localhost:8082/api/admin/notification", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setNotification(res.data);
        }
        fetchNotifications()
      }, [])
    return (
        <div>
            <h4 className="mb-4">System Notification</h4>
            <ul>
                {notification.map((n)=>(
                    <li key={n._id}>{n.message}</li>
                ))}
            </ul>

        </div>
    )

}
export default AdminNotification