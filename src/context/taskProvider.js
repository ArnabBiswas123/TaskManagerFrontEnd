import { createContext } from "react";
import { useState,useContext } from "react";
const TaskContext = createContext();

const TaskProvider=(({children})=>{
    const [fetchTask, setFetchTask] = useState(false);

    return <TaskContext.Provider value={{fetchTask,setFetchTask}}>
        {children}
    </TaskContext.Provider>
})  

export const TaskState = () => {
    return useContext(TaskContext);
}
export default TaskProvider;