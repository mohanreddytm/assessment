
import { MdOutlineCall, MdOutlineEmail  } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";

import { FaAngleDoubleUp } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";


import './index.css'

const colors = [
    "#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#A833FF",
    "#33FFF3", "#FF8C33", "#8C33FF", "#33FF8C", "#FF3333"
  ];
  

const EveryTask = ({task}) => {


    let icon  = null;
    let classone = null;

    if(task.title.includes("Call")){
        icon = <MdOutlineCall className="icon-class-one" />
    }else if(task.title.includes("Email")){
        icon = <MdOutlineEmail className="icon-class-one" />
    }
    else{
        icon = <IoCalendarOutline className="icon-class-one" />
    }

    if(task.priority === "High"){
        classone = "high-priority"
    }else if(task.priority === "Medium"){
        classone = "medium-priority"
    }
    else{
        classone = "low-priority"
    }

    let associatedHead;
    if(task.associatedRecord.includes("-")){
        associatedHead = task.associatedRecord.split("-").map(e => e[0]).join("")
    }else{
        associatedHead = task.associatedRecord.split(" ").map(e => e[0]).join("")
    }


    associatedHead = associatedHead.slice(0, 2)
    let assignedHead = task.assignedTo.split(" ").map(e => e[0]).join("")
    assignedHead = assignedHead.slice(0, 2)
    const color = colors[Math.floor(Math.random() * colors.length)];
    const anotherColor = colors[Math.floor(Math.random() * colors.length)];


    return (
    <tr className='task-row'>
        <td><input type="checkbox"/></td>
        <td><div className="inside-task-container">{icon}{task.title}</div></td>
        <td><div className={`inside-task-container ${classone}`}><FaAngleDoubleUp className="icon-class-one"  />{task.priority}</div></td>
        <td className={`${classone}`}>{task.dueDate}</td>
        <td><div className="inside-task-container"><h1 style={{ backgroundColor: color }} className="profile-mini-logo">{associatedHead}</h1>{task.associatedRecord}</div></td>
        <td><div className="inside-task-container"><h1 style={{ backgroundColor: anotherColor }} className="profile-mini-logo">{assignedHead}</h1>{task.assignedTo}</div></td>
        <td><BsThreeDotsVertical /></td>
    </tr>
)
}

export default EveryTask