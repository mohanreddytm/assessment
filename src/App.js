import{ useState, useEffect } from 'react'

import { parse, format, set } from "date-fns";

import EveryTask from "./components/EveryTask";

import { RiExpandUpDownFill } from "react-icons/ri";
import { IoChevronForward } from "react-icons/io5";
import { TfiControlSkipForward } from "react-icons/tfi";

import { IoMdClose  } from "react-icons/io";

import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineStock } from "react-icons/ai";
import { LiaIndustrySolid } from "react-icons/lia";
import { BsListTask } from "react-icons/bs";
import { CiDollar,CiSquarePlus ,CiBellOn } from "react-icons/ci";
import { BiCodeAlt } from "react-icons/bi";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { SiCucumber, SiSimpleanalytics } from "react-icons/si";
import { FaAngleDown } from "react-icons/fa";


import "@fontsource/inter";
import "@fontsource/inter/400.css"; 
import "@fontsource/inter/600.css"; 

import './App.css'

const App = () => {

  const [tasks, setTasks] = useState([])

  const [currentPage, setCurrentPage] = useState(1)
  const [tasksCurrent, setTasksCurrent] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [tasksPerPage, setTasksPerPage] = useState(6)
  const [filteredTasks, setFilteredTasks] = useState([])
  const [filterDueDate, setFilterDueDate] = useState(false) 
  const [filterPriority, setFilterPeriority] = useState(false)
  const [filterAssign, setFilterAssign] = useState(false)
  const [filterMain, setFilterMain] = useState("")
  const [showPopUp, setShowPopup] = useState(false)

  const [title, setTile] = useState('')
  const [type, setType] = useState('call')
  const [priority, setPriority] = useState('high')
  const [dueDate, setDueDate] = useState('')
  const [associatedRecord, setAssociatedRecord] = useState('')
  const [assignedTo, setAssignedTo] = useState('')
const [done,setDone] = useState(false)
  const [error, setError] = useState(false)



  useEffect(() => {
    if(filterMain === 'Priority'){
      if(filteredTasks.length >= 1){
        const order = {"High":1, "Medium":2, "Low":3}
        const priorityOrder = [...filteredTasks].sort((a,b) =>   order[a.priority] - order[b.priority])
        setFilteredTasks(priorityOrder)
      }
    }else if(filterMain === "dueDate"){
      if(tasks.length >= 1 ){

        const sortedTasks = [...tasks].sort((a, b) => 
        {
          const parsedDuedateOne = parse(a.dueDate, "dd MMM, yyyy, hh:mma", new Date())
          const parsedDueDateTwo = parse(b.dueDate, "dd MMM, yyyy, hh:mma", new Date())
          return parsedDuedateOne - parsedDueDateTwo
        }
        );
        setFilteredTasks(sortedTasks)
      }
    }else if(filterMain === "assign"){
      if(tasks.length >= 1){
        const sortedTwo = [...tasks].sort((a, b) => a.assignedTo.localeCompare(b.assignedTo));
        setFilteredTasks(sortedTwo)
      }
    }else{
      setFilteredTasks(tasks)
    }
  },[filterMain])

  useEffect(() => {
    console.log("yes")
    const getTasks = async () => {
      const totalPages = Math.ceil(filteredTasks.length / tasksPerPage)

      const indexOfLastTask = currentPage * tasksPerPage
      const indexOfFirstTask = indexOfLastTask - tasksPerPage
      const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask)

      setTasksCurrent(currentTasks)

      setTotalPages(totalPages)
    }

    getTasks()

  }, [currentPage, filteredTasks, tasksPerPage])

  
      useEffect(() => {
          const getTasks = async () => {
              const tasksFromServer = await fetch("https://67dabc4e35c87309f52dcaeb.mockapi.io/tasks")
              let data = await tasksFromServer.json()
              setTasks(data)
              setFilteredTasks(data)
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

  const onClickItemsPerPage = (e) => {
    const itemsPerPage = e.target.value
    setTasksPerPage(itemsPerPage)
  }

  const onClickForward = () => {
    if(currentPage < totalPages){
      setCurrentPage(currentPage + 1)
    }
  }

  const onClickDoubleForward = () => {
    if(currentPage < totalPages - 1){
      setCurrentPage(currentPage + 2)
    }
  }

  const onclickDueDate = () => {
    setFilterMain("dueDate")
    setFilterAssign(false)
    setFilterDueDate(true)
    setFilterPeriority(false)
  }

  const onClickDuedateClose = () => {

    setFilterMain("")
    setFilterDueDate(false)

  }

  const onClickAssignClose = () => {
    setFilterMain("")
    setFilterAssign(false)

  }

  const onClickPriorityClose = () => {
    setFilterMain("")
    setFilterPeriority(false)

  }

  const onClickPriotiyOne = () => {
    setFilterMain("Priority")
    setFilterAssign(false)
    setFilterDueDate(false)
    setFilterPeriority(true)

  }

  const onClickAssignone = () => {
    setFilterMain("assign")
    setFilterAssign(true)
    setFilterDueDate(false)
    setFilterPeriority(false)
  }

  const onClickCreatetask = () => {
    setShowPopup(true)
  }

  const onSubmitFormelement = async(e) => {
    e.preventDefault()
    if(title !== '' && type !== "" && priority !== '' && dueDate !== '' && associatedRecord !== '' && assignedTo !== ''){
      const newTask = {
        title : type + " " + title,
        priority,
        dueDate,
        associatedRecord,
        assignedTo,
        taskType:type,
        completed:false
      }

      setError(false)

      const options = {
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify(newTask)
      }

      await fetch("https://67dabc4e35c87309f52dcaeb.mockapi.io/tasks", options)

      setDone(true)

      setTile('')
      setAssignedTo(''
      )
      setAssociatedRecord('')
      setDueDate('')

    }else{
      setError(true)
      setDone(false)
    }
  }

  const popUpone = () => {
    return(
      <div className='popup-intial-cont'>
    <form onSubmit={onSubmitFormelement} className={`form-element ${showPopUp && "show-form"}`}>
      <h1 className="aside-head">Create Task</h1>
      <p>Task Name<mark>*</mark></p>
      <input value={title} onChange={(e) => setTile(e.target.value)} type='text' placeholder='E.g Call ken' />
      <div className='form-task-combiner'>
        <div>
          <p>Task<mark>*</mark></p>
          <select value={type} onChange={(e) => setType(e.target.value)} className='combainer-sep-1'>
            <option id="call">Call</option>
            <option id="email">Email</option>
            <option id="meeting">Meeting</option>
          </select>
        </div>
        <div>
          <p>Priority<mark>*</mark></p>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}  placeholder='Select'>
            <option id="high">High</option>
            <option id="medium">Medium</option>
            <option id="Low">Low</option>
          </select>
        </div>
      </div>
      <p>Associated Record<mark>*</mark></p>
      <input value={associatedRecord} onChange={(e) => setAssociatedRecord(e.target.value)}  type='text' placeholder='Search Company' />
      <p>Assigned to<mark>*</mark></p>
      <input value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} type='text' placeholder='Type Assigned Name' />
      <p>Due date & time<mark>*</mark></p>
      <input value={dueDate} onChange={(e) => setDueDate(e.target.value)} type="datetime-local" />
      <p>Add Notes</p>
      <textarea rows={4}></textarea>
      <div className='form-button-cont'>
        <button className='close-button-form' onClick={() => setShowPopup(false)}>Cancel</button>
        <button type='submit' className='submie-button-form'>Create Contact</button>
      </div>
      {done && <p style={{color:"green"}}>Task Create succesfully</p> }
      {error&&
      <p style={{color:'red'}}>Please fill all the required feilds</p>}
    </form>
    </div>)
  }
  
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
          <button type="button" onClick={onClickCreatetask}>Create Task</button>
        </div>

          {showPopUp && popUpone()}
        
        <div className="filters-section">
          <div className="task-card active"> 
            <p>(3) Task Type</p>
            <FaAngleDown className="task-card-down-arrow" />
          </div>
          <div className={`task-card ${filterDueDate && "active"}`}> 
            <p onClick={onclickDueDate}>Due Date</p>
            <FaAngleDown className="task-card-down-arrow" />
            {filterDueDate && <IoMdClose onClick={onClickDuedateClose} className='close-one' />}
          </div>
          <div className={`task-card ${filterAssign && "active"}`}> 
            <p onClick={onClickAssignone}>Assigned to</p>
            <FaAngleDown className="task-card-down-arrow" />
            {filterAssign && <IoMdClose onClick={onClickAssignClose} className='close-one' />}

          </div>
          <div className={`task-card ${filterPriority && "active"}`}> 
            <p onClick={onClickPriotiyOne}>Priority</p>
            <FaAngleDown className="task-card-down-arrow" />
            {filterPriority && <IoMdClose onClick={onClickPriorityClose} className='close-one' />}

          </div>
        </div>
        <div className="tasks-table">
          <table>
            <thead>
              <tr className='table-header'>
                <th><input type="checkbox"/></th>
                <th>To do</th>
                <th><div className='inside-task-container'>{"Priority"}<RiExpandUpDownFill className='top-down-icon' /></div></th>
                <th><div className='inside-task-container'>{"Due date"}<RiExpandUpDownFill className='top-down-icon' /></div></th>
                <th><div className='inside-task-container'>{"Associated Record"}<RiExpandUpDownFill className='top-down-icon' /></div></th>
                <th><div className='inside-task-container'>{"Assigned to"}<RiExpandUpDownFill className='top-down-icon' /></div></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tasksCurrent.length > 0 ? (
                  tasksCurrent.map((task) => <EveryTask task={task} key={task.id} />)
              ) : (
                  <tr><td colSpan="6">No tasks found</td></tr>
              )}            
            </tbody>            
          
          </table>
          <div className='iterative-section'>
            <div className='iterative-section-left'>
              <p>Tasks Per Page</p>
              <select value={tasksPerPage} onChange={onClickItemsPerPage}>
                {Array.from({length: 10}, (_, index) => {
                  if(index === 5){
                    return <option key={index + 1} id={index + 1} selected>{index + 1}</option>
                  }
                  return <option key={index + 1} id={index + 1}>{index + 1}</option>
                })}
              </select>
              <p>Go to</p>
              <select value={currentPage} onChange={e => setCurrentPage(parseInt(e.target.value))}>
                {Array.from({ length: totalPages }, (_, index) => {
                  if(index === 0){
                    return <option key={index + 1} id={index + 1} selected>{index + 1}</option>
                  }
                  return <option key={index + 1} id={index + 1}>{index + 1}</option>
                }
                )}
              </select>
            </div>
            <div className='iterative-section-right'>
                {Array.from({ length: totalPages }, (_, index) => {
                  if(index <= 3){
                    if(index === currentPage - 1){
                      return<button className='special-one' key={index + 1} onClick={() => setCurrentPage(index+1)}>{index+1}</button>
                    }
                    return<button key={index + 1} onClick={() => setCurrentPage(index + 1)}>{index+1}</button>
                  }
                  return null
                })}
                
                <button className={`${currentPage > 4 && currentPage < totalPages - 3 ? "special-one":""}`} >{currentPage > 4 && currentPage < totalPages - 3 ? currentPage: "..."}</button>
                {Array.from({ length: totalPages }, (_, index) => {
                  if(index >= totalPages - 3){
                    if(index === currentPage - 1){
                      return<button className='special-one' key={index + 1} onClick={() => setCurrentPage(index+1)}>{index+1}</button>
                    }
                    return<button key={index + 1} onClick={() => setCurrentPage(index+1)}>{index+1}</button>
                  }
                  return null
                })}

                <button className='special-forward-classes' onClick={onClickForward} type='button'><IoChevronForward /></button>
                <button className='special-forward-classes' onClick={onClickDoubleForward} type='button'><TfiControlSkipForward /></button>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default App