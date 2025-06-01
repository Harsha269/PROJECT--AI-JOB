import { useEffect, useState } from "react"
import {Dropdown} from "react-bootstrap"



// const Notification =({notifications})=>{
    const Notification = ({ notifications = [] }) => {

    const[unreadCount , setUnreadCount] = useState(0);


    useEffect(()=>{
        const count = notifications.filter(notif =>! notif.read).length;
        setUnreadCount(count);
    },[notifications])

    const getIconByType = (type, message)=>{
      switch(type){
        case "application" :
          return <span className="me-2 text-primary" ><FontAwesomeIcon icon="fa-solid fa-folder" /></span>;

          case "interview" :
          return <span className="me-2 text-success" ><FontAwesomeIcon icon="fa-solid fa-calendar" /></span>;

          case "message" :
          return <span className="me-2 text-info" ><FontAwesomeIcon icon="fa-solid fa-envelope-open" /></span>;

          case "status" :
          return message.toLowerCase().includes("rejected")
 ?<span  className="me-2 text-danger"></span>
 :<span className="me-2 text-success"></span>;
 default :
 return null;

            }
    }

    return(
       <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          Notifications{" "}
            {unreadCount > 0 && <span className="badge bg-danger">{unreadCount}</span> }
        </Dropdown.Toggle>

        <Dropdown.Menu className="dropdown-menu-end" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {notifications.length === 0 ? (
  <Dropdown.ItemText>No Notifications</Dropdown.ItemText>
) : (
  notifications.map((notif, index) => (
    <Dropdown.Item
      key={index}
      className={!notif.read ? "fw-bold" : ""}
      onClick={() => console.log("Handle click or mark as read")}>


        <div className="d-flex align-items-start">
          {getIconByType(notif.type, notif.message)}
          <div>

          
    <div>  {notif.message}</div>
      <div className="text-muted small">{notif.time}</div>
      </div>
      </div>
    </Dropdown.Item>
  ))
)}
        </Dropdown.Menu>

       </Dropdown>
    
        )
    }

export default Notification