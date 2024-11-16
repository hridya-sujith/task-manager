import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Addtask(){
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState('High');
  const[taskStatus,settaskStatus] =useState('');
  const handleStatusChange = (e) => {
    settaskStatus(e.target.value);
  };
  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/home"); 
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim) {
      const newTask = {
        id: "Task" + " - " + taskName,
        name: taskName,
        priority: priority,
        status: taskStatus,
        
      };
  const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    localStorage.setItem('tasks', JSON.stringify([...existingTasks, newTask]));
      setTaskName('');
      setPriority('');
      settaskStatus('');
      setPriority('');
      navigate('/home');
      
    }
  };
  return(
    <div class="body-container"> 
    <div class="Page-bread-crumb">
      <ul class="breadcrumb">
            <li class='"'><Link className="inactivePage" to="/home">Home /</Link></li>
            <li class='"'><Link className="activePage" to="/">Add Task</Link></li>
      </ul>
    </div>
<section class="page-body">
    <h3>Add Task</h3>
    <form class='addTAskForm' onSubmit={handleSubmit}>
    <div class='formDiv'>
      <label for="taskaName">Task name:</label>
        <input class="taskInput" type="text" id="taskaName" name="taskaName" placeholder='Enter task name' value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
        ></input><br></br>
            
    </div>
    <div class='formDiv'>
        <label htmlFor="priority">Priority:</label>
          <select class="taskInput priority-field" name="priority"  value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

    </div>
  <div class='formDiv'>
      <label htmlFor="taskStatus">Task Status:</label>
        <div class="status-field">
          <input class="status-field-input-1" type="radio" name="Completed" value="Completed"     onChange={handleStatusChange} /> Completed
          <input class="status-field-input" type="radio" name="In Progress" value="In Progress"   onChange={handleStatusChange} /> In Progress
          <input  class="status-field-input"type="radio" name="Pending" value="Pending"    onChange={handleStatusChange} /> Pending
        </div>
  </div>
  <div class='formDiv'>
    <input  class="submit-btn" type="submit" value="Submit"></input>
    <input  class="submit-btn" type="button" value="Cancel" onClick={handleCancel}></input>
  </div>
      
  </form>
</section>
</div>
  )
}