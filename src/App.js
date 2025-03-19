import{ useState, useEffect } from 'react'

import EveryTask from "./components/EveryTask";

import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineStock } from "react-icons/ai";
import { LiaIndustrySolid } from "react-icons/lia";
import { BsListTask } from "react-icons/bs";
import { CiDollar,CiSquarePlus ,CiBellOn } from "react-icons/ci";
import { BiCodeAlt } from "react-icons/bi";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { SiSimpleanalytics } from "react-icons/si";
import { FaAngleDown } from "react-icons/fa";


import "@fontsource/inter";
import "@fontsource/inter/400.css"; 
import "@fontsource/inter/600.css"; 

import './App.css'

const App = () => {

  const [tasks, setTasks] = useState([])
  
      useEffect(() => {
          const getTasks = async () => {
              const tasksFromServer = await fetch("https://67dabc4e35c87309f52dcaeb.mockapi.io/tasks")
              const data = await tasksFromServer.json()
              console.log(data)
              setTasks(data)
          }
  
          getTasks()
      },[])

  const leftCard = (
    <aside>
        <div className="aside-header">
          <img className="aside-logo" src='https://static.vecteezy.com/system/resources/previews/028/167/122/large_2x/task-manager-icon-vector.jpg' alt='task-manager logo'/>
          <h1 className="aside-head">Task Manager</h1>
        </div>

        <h2>Dashboard</h2>

        <div className="aside-inactive">
          <MdOutlineDashboard className="aside-content-logos" />
          <p>Dashboard</p>
        </div>
        <div className="aside-inactive">
          <AiOutlineStock className="aside-content-logos"  />
          <p>Report</p>
        </div>
        <h2>Records</h2>
        <div className="aside-inactive">
          <LiaIndustrySolid className="aside-content-logos" />
          <p>Company</p>
        </div>
        <div className="aside-inactive aside-active">
          <BsListTask className="aside-content-logos aside-content-active-logo"  />
          <p>Tasks</p>
        </div>
        <h2>Pipelines</h2>
        <div className="aside-inactive">
          <CiDollar className="aside-content-logos"  />
          <p>Opportunities</p>
        </div>
        <div className="aside-inactive">
          <BiCodeAlt className="aside-content-logos"  />
          <p>Deals</p>

        </div>
        <div className="aside-inactive">
          <HiOutlineMenuAlt2 className="aside-content-logos"  />
          <p>Items</p>
        </div>
        <div className="aside-inactive">
          <CiSquarePlus className="aside-content-logos"  />
          <p>New Pipeline</p>
        </div>
        <h2>Applications</h2>
        <div className="aside-inactive">
        <LiaIndustrySolid className="aside-content-logos"  />
        <p>Automations</p>
        </div>
        <div className="aside-inactive">
          <SiSimpleanalytics className="aside-content-logos"  />
          <p>Analytics</p>
        </div>
      </aside>
  )

  return (
    <div className='initial-container'>
      {leftCard}
      <div className="right-container">
        <header>
          <div>
            <CiBellOn className="bell-logo" />
            <p className="profile-logo">JD</p>
            <p className="profile-name">John Dew</p>
          </div>
        </header>
        <div className="tasks-header">
          <div>
            <h1>Tasks</h1>
            <p>Important Task</p>
          </div>
          <button type="button">Create Task</button>
        </div>
        <div className="filters-section">
          <div className="task-card active"> 
            <p>(3) Task Type</p>
            <FaAngleDown className="task-card-down-arrow" />
          </div>
          <div className="task-card active"> 
            <p>Due Date</p>
            <FaAngleDown className="task-card-down-arrow" />
          </div>
          <div className="task-card"> 
            <p>Assigned to</p>
            <FaAngleDown className="task-card-down-arrow" />
          </div>
          <div className="task-card"> 
            <p>Priority</p>
            <FaAngleDown className="task-card-down-arrow" />
          </div>
        </div>
        <div className="tasks-table">
          <table>
            <thead>
              <tr className='table-header'>
                <th><input type="checkbox"/></th>
                <th>To do</th>
                <th>Priority</th>
                <th>Due date</th>
                <th>Associated Record</th>
                <th>Assigned to</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                  tasks[0].map((task) => <EveryTask task={task} key={parseInt(task.id, 10)} />)
              ) : (
                  <tr><td colSpan="6">No tasks found</td></tr>
              )}            
            </tbody>            
          
          </table>
        </div>
      </div>
    </div>
  )
}

export default App