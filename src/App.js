import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo.trim(), complete: false }]);
      setNewTodo("");
    }
  };

  const deleteTodo = index => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleComplete = index => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, complete: !todo.complete } : todo
      )
    );
  };

  const filteredTodos = todos.filter(todo =>
    filter === "all" ? true : filter === "complete" ? todo.complete : !todo.complete
  );

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        placeholder="Enter new todo"
      />
      <button onClick={addTodo}>Add</button>
      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("complete")}>Complete</button>
        <button onClick={() => setFilter("incomplete")}>Incomplete</button>
      </div>
      <ul>
        {filteredTodos.map((todo, index) => (
          <li key={index} className={todo.complete ? "complete" : ""}>
            <span>{todo.text}</span>
            <div>
              <button onClick={() => toggleComplete(index)}>
                {todo.complete ? "Undo" : "Complete"}
              </button>
              <button onClick={() => deleteTodo(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
