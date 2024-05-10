import Timer from "./timer.jsx";
import "./App.css";
import ToDoManagement from "./components/toDoManagement.jsx";

function App() {
  return (
    
    <div>
      <div>
        <Timer />
      </div>

      <br />

      <div className="todo-list">
        <h3 className="todo-header">Todo List</h3>
        <ToDoManagement />
      </div>
    </div>
  );
}

export default App;
