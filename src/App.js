import './App.css';

import Header from './components/Header';
import TaskForm from './components/TaskForm';
import Tasks from './components/Tasks';
function App() {
  return (
    <div>
     <Header/>
     <TaskForm/>
     <Tasks/>
    </div>
  );
}

export default App;
