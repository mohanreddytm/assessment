import{ useState, useEffect } from 'react'

import EveryTask from "./components/EveryTask";

import { RiExpandUpDownFill } from "react-icons/ri";
import { IoChevronForward } from "react-icons/io5";
import { TfiControlSkipForward } from "react-icons/tfi";

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

  useEffect(() => {
    const filterTasks = async () => {
      if(tasks.length >= 1 && filterDueDate){
        console.log("entered")
        const sortedTasks = [...tasks].sort((a, b) => 
          new Date(formatDate(a.dueDate)) - new Date(formatDate(b.dueDate))
        );
        console.log(sortedTasks)
        setFilteredTasks(sortedTasks)
      }else{
        setFilteredTasks(tasks)
      }
    }

    filterTasks()
  },[filterDueDate])

  function formatDate(dateStr) {
    return dateStr.replace(/(\d{2}) (\w{3}), (\d{4}), (.+)/, "$2 $1, $3 $4");
  }



  useEffect(() => {
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
              const data = await tasksFromServer.json()

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
    setFilterDueDate(true)
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
          <button type="button">Create Task</button>
        </div>
        <div className="filters-section">
          <div className="task-card active"> 
            <p>(3) Task Type</p>
            <FaAngleDown className="task-card-down-arrow" />
          </div>
          <div onClick={onclickDueDate} className="task-card"> 
            <p>Due Date</p>
            <FaAngleDown className="task-card-down-arrow" />
          </div>
          <div onClick={onclickDueDate} className="task-card"> 
            <p>Assigned to</p>
            <FaAngleDown className="task-card-down-arrow" />
          </div>
          <div onClick={onclickDueDate} className="task-card"> 
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