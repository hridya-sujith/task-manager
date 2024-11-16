import React,  { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

export default function Home(){
  const [tasks, setTasks] = useState([]);
  const [SearchTask, setSearchTask] = useState(''); 
  
  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);
   // Delete task function
   const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id); 
    setTasks(updatedTasks); 
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); 
  };

   const handleSearch = (event) => {
    setSearchTask(event.target.value); 
  };
  const getStatusIcon =(taskStatus) =>
    {return taskStatus ==="Completed" ? ( <i className="material-icons taskStatusColumn" style={{ color: 'green' }}>check_circle</i>): taskStatus ==="In Progress"? ( <i className="material-icons taskStatusColumn" style={{ color: 'blue' }}>check_circle</i>):taskStatus ==="Pending" ? (<i className="material-icons taskStatusColumn" style={{ color: 'yellow' }}>check_circle</i>) :(<span>NA</span> )}
  
  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(SearchTask.toLowerCase())
  );
  const getPriorityStyle = (priority) => {
    {return priority ==="High" ? ( <div className="priority-tag" style={{ backgroundColor: 'red'}}>{priority}</div>): priority ==="Medium"? ( <div className="priority-tag" style={{ backgroundColor: 'yellow' }}>{priority}</div>):priority ==="Low" ? (<div className="priority-tag" style={{ backgroundColor: 'green' }}>{priority}</div>) :(<span>NA</span> )}
    
  };
  const handleSort = (criteria) => {
    const sortedTasks = [...tasks];
    switch (criteria) {
      case "priority":
        sortedTasks.sort((a, b) => {
          const priorityOrder = { High: 1, Medium: 2, Low: 3 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
      break;
      case "status":
        sortedTasks.sort((a, b) => a.status.localeCompare(b.status)); 
      break;
      case "name":
        sortedTasks.sort((a, b) => a.name.localeCompare(b.name)); 
      break;
      default:
      break;
    }
    setTasks(sortedTasks);
  };
  
  return(
   <div class="body-container"> 
   <div class="Page-bread-crumb">
      <ul class="breadcrumb">
            <li class='"'><Link className="activePage" to="/">Home</Link></li>
        </ul>
   </div>
  <section class="page-body">
      <div className="tableHeader">
      <input type="text" id= "myInput" value={SearchTask} onChange={handleSearch} placeholder="Search for names..." >
      </input>
      <button class="search-btn-icon">
          <i className="material-icons">search</i>
      </button>
     
      <Link to="/addtask">
        <button class="add-task-btn ">Add Task</button>
      </Link>
      </div>
      <table id="myTable">
        <thead>
          <tr class="header">
              <th>Task Id</th>
              <th >Task Name</th>
              <th >Priority</th>
              <th>Completion Status</th>
              <th >
              </th>
          </tr>
        </thead>
        <tbody>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.name}</td>
                  <td>{getPriorityStyle(task.priority)}</td>
                  <td >{getStatusIcon(task.status)}</td>
                  <td>
                    <button onClick={() => deleteTask(task.id)}>
                      <i className="material-icons">delete</i>
                    </button>
                  </td>
                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No tasks available</td>
              </tr>
            )}
    <div class="formDiv">
            <td>Sort By<i class="material-icons sort-icon">arrow_upward</i><i class="material-icons sort-icon">arrow_downward</i>
                <select class="taskInput priority-field"  onChange={(e) => handleSort(e.target.value)}>
                <option value="priority">Priority</option>
                <option value="status">Status</option>
                <option value="name">Task Name</option>
                </select>
            </td>
    </div>
      </tbody>
      </table>
  </section> 
  </div>
  )
}