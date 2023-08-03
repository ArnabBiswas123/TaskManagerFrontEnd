import React from 'react'
import { useState } from 'react'
import { TaskState } from '../context/taskProvider';

export default function TaskForm() {
    const [text,setText]=useState("");
    const { fetchTask,setFetchTask } = TaskState();

    const handleSubmit=async (e)=>{
        e.preventDefault();

        try{
            const response = await fetch("https://mern-taskmanager-b77n.onrender.com/tasks", {
              method: 'POST',
                headers: {
                 'Content-Type': 'application/json',
              },
              body: JSON.stringify({ data:text })
            });
            const json = await response.json();
            if(json.success==='no items'){
                console.log('run')
                alert('Please enter some task')
                return;
              }
            // console.log(json);
            setFetchTask(!fetchTask)
            setText("")
    }
    catch(error){
        console.log(error)
    }

}
    const onInputChange=(e)=>{
            setText(e.target.value); 
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <input
                placeholder="Enter new task..."
                className="input"
                onChange={onInputChange}
                value={text}
                />
        </form>
    )
}
