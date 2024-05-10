import { useState, useEffect } from "react";
import ListItemWithBorder from "./listItemWithBorder.jsx";

const API_URL="https://gist.githubusercontent.com/benna100/391eee7a119b50bd2c5960ab51622532/raw";

function AddNewToDo() {

  const [todos, setTodos] = useState([]);
  const [inputNewTodo, setInputNewTodo] = useState("");
  const [inputDeadline, setInputDeadline] = useState("");
  const [editModeId, setEditModeId] = useState(null);
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    fetch(
      API_URL
      )
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => (error.message));
  }, []);


  const handleAddTodo = (e) => {
    e.preventDefault();
    if (inputNewTodo.trim() !== "" && inputDeadline !== "") {
      setTodos([
        ...todos,
        {
          id: Math.random(),
          description: inputNewTodo.trim(),
          deadline: inputDeadline,
          checked: false,
        },
      ]);
      setInputNewTodo("");
      setInputDeadline("");
    } else {
      alert("Please enter a task and deadline");
    }
  };

  const handleChecked = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditClick = (id, description) => {
    setEditModeId(id);
    setEditDescription(description);
  };

  const handleUpdateEdited = () => {
    if (editDescription.trim() !== "") {
      const updatedTodos = todos.map((todo) =>
        todo.id === editModeId
          ? { ...todo, description: editDescription }
          : todo
      );
      setTodos(updatedTodos);
      setEditModeId(null);
      setEditDescription("");
    } else {
      alert("Description cannot be empty");
    }
  };

  const handleCancelEdit = () => {
    setEditModeId(null);
    setEditDescription("");
  };

  const handleChangeTask = (e) => {
    setEditDescription(e.target.value);
  };

  return (
    <div>
      <form>
        <label>
          <span>Todo Description: </span>
          <input
            type="text"
            value={inputNewTodo}
            placeholder="Description"
            onChange={(e) => setInputNewTodo(e.target.value)}
          />
        </label>
        <br />
        <label>
          <span>Deadline: </span>
          <input
            type="date"
            value={inputDeadline}
            onChange={(e) => setInputDeadline(e.target.value)}
          />
        </label>
        <button className="button" onClick={handleAddTodo}>
          Add
        </button>

        <ul style={{ paddingLeft: "30px" }}>
          {todos.map((todo) => (
            <ListItemWithBorder key={todo.id}>
              <input
                type="checkbox"
                checked={todo.checked}
                onChange={() => handleChecked(todo.id)}
              />

              {editModeId === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editDescription}
                    onChange={handleChangeTask}
                  />
                  <button className="button" onClick={handleUpdateEdited}>
                    Update
                  </button>
                </>
              ) : (
                <span
                  style={{
                    marginRight: "10px",
                    textDecoration: todo.checked ? "line-through" : "none",
                  }}
                >
                  {todo.description} | {todo.deadline}
                </span>
              )}

              {!editModeId && (
                <button
                  className="button"
                  onClick={() => handleEditClick(todo.id, todo.description)}
                >
                  Edit
                </button>
              )}

              {editModeId === todo.id && (
                <button className="button" onClick={handleCancelEdit}>
                  Cancel
                </button>
              )}

              <button
                className="button"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                Delete
              </button>
            </ListItemWithBorder>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default AddNewToDo;
