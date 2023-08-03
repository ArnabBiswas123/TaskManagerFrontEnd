import React from 'react'
import { TaskState } from '../context/taskProvider';
import { useState } from 'react';
export default function Todo(props) {
  const { fetchTask,setFetchTask } = TaskState();
  const [editing,setEditing]=useState(false)
  const [deleted,setDeleted]=useState(false)
  const [text,setText]=useState(props.todo.data)


  const id=props.todo._id;
 const toggleTodo=async()=>{
    try{
       await fetch(`https://mern-taskmanager-b77n.onrender.com/todo/${id}`)
       setFetchTask(!fetchTask)
    }catch(error){

    }
 }


 const deleteHandler=async()=>{
  try{
    setDeleted(true)
    await fetch(`https://mern-taskmanager-b77n.onrender.com/todo/${id}`,{
      method: 'DELETE'
    })
    setFetchTask(!fetchTask)
 }catch(error){

 }
 }

 const onsubmitHandler=async (e)=>{
  e.preventDefault();
  try{
    await fetch(`https://mern-taskmanager-b77n.onrender.com/todo/${id}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
            },
      body: JSON.stringify({ data:text })
    })
    setFetchTask(!fetchTask)
    setEditing(false)
  }catch(error){

    console.log(error)
  }
 }



  return (
    <li className='task' onClick={toggleTodo} style={{
      display:deleted?'none':'',
      textDecoration: props.todo.done ? 'line-through' : '',
      color: props.todo.done ? 'black' : '#34495e'
  }}>
    <span style={{display:editing?'none':''}}>{props.todo.data}</span>

   <form
    style={{ display: editing ? 'inline' : 'none' }}
    onSubmit={onsubmitHandler}
   >
    <input type='text'
          value={text}
          className="edit-todo"
          onChange={(e)=>{setText(e.target.value)}}
    />
    


   </form>



    <span className='icon'
    onClick={deleteHandler}
    ><i className="fas fa-trash" /></span>
    <span className='icon'
    onClick={()=>{setEditing(!editing)}}
    ><i className="fas fa-pen" /></span>
    </li>
  )
}
