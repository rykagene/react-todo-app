import React, { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);

  function handleChange(e) {
    setInputValue(e.target.value);
    setError(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!inputValue.trim()) {
      setError(true); 
      return;
    }
    setTodos([...todos, { text: inputValue, done: false }]);
    setInputValue("");
  }

  function handleDone(index) {
    const newTodos = [...todos];
    newTodos[index] = { ...newTodos[index], done: !newTodos[index].done };
    setTodos(newTodos);
  }

  function handleDelete(index) {
    const newTodos = todos.filter((todo, i) => i !== index);
    setTodos(newTodos);
  }


  const ongoingTasksCount = todos.filter(todo => !todo.done).length;
  const doneTasksCount = todos.filter(todo => todo.done).length;

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h1 style={{ fontWeight: "bold" }}>Todo List App</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center" }}>
        <input className="add-input"
          type="text"
          placeholder="Anything to do today?"
          value={inputValue}
          onChange={handleChange}
          style={{ marginRight: "8px", border: error ? "2px solid red" : "none" }} 
        />
        <button className="add-button" type="submit">Add</button>
      </form>
      {error && <p style={{ color: "red" }}>Please add todo item first.</p>} 
      
      {ongoingTasksCount > 0 && (
        <div>
          <h2>Ongoing Tasks ({ongoingTasksCount})</h2>
          <ul>
            {todos.map((todo, index) => (
              !todo.done && (
                <li key={index}>
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => handleDone(index)}
                  />
                  <span>{todo.text}</span>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </li>
              )
            ))}
          </ul>
        </div>
      )}

      {doneTasksCount > 0 && (
        <div>
          <h2>Done Tasks ({doneTasksCount})</h2>
          <ul>
            {todos.map((todo, index) => (
              todo.done && (
                <li key={index}>
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => handleDone(index)}
                  />
                  <span style={{ textDecoration: "line-through" }}>{todo.text}</span>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </li>
              )
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TodoList;
