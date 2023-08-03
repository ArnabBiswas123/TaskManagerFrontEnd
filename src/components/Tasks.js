import React from 'react'
import { useEffect,useState } from 'react'
import {TaskState} from '../context/taskProvider';
import Todo from './Todo';

export default function Tasks() {
  const [alltodos,setAllTodos]=useState([]);
  const [filteredtodos,setfilteredTodos]=useState([]);
  const [allTasksSelected,setallTasksSelected]=useState(false);
  const [activetasksselected,setactivetasksselected]=useState(false);
  const { fetchTask,setFetchTask } = TaskState();

  const getAllTasks=async()=>{
    try {
      const response = await fetch("https://mern-taskmanager-b77n.onrender.com/tasks")
      const json = await response.json();
      
      

      setAllTodos(json);
      setfilteredTodos(json);
    // console.log(json);
    }
      catch(error){
          console.log(error)
      }
  }

 useEffect(()=>{
 getAllTasks()
 },[fetchTask])

 const onallTaskhandler=()=>{
    setactivetasksselected(false)
   setallTasksSelected(true)
   setfilteredTodos(alltodos)
 }


 const onactiveTaskhandler=()=>{
  setallTasksSelected(false)
  setactivetasksselected(true)
  const ActiveTasks=alltodos.filter(item=>!item.done);
  setfilteredTodos(ActiveTasks)
 }



  return (
    <article>
      <div>
        <button  className={allTasksSelected?'button selected' : 'button'}    onClick={onallTaskhandler} >AllTasks</button>
        <button onClick={onactiveTaskhandler}   className={activetasksselected?'button selected' : 'button'}  >ActiveTasks</button>
      </div>
      <ul>
        {
          filteredtodos.map((item)=>{
           return( <li key={item._id}>
              <Todo
              key={item._id}
              todo={item}
              />
            </li>)
})
        }
      </ul>
    </article>
  )
}
