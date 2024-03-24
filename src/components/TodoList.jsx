import React, { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);

  function handleChange(e) {
    setInputValue(e.target.value);
    // Reset error state when user starts typing
    setError(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!inputValue.trim()) {
      setError(true); // Set error state if input is empty
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

  // Calculate counts of ongoing tasks and done tasks
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
          style={{ marginRight: "8px", border: error ? "2px solid red" : "none" }} // Add error style if input is empty
        />
        <button className="add-button" type="submit">Add</button>
      </form>
      {error && <p style={{ color: "red" }}>Please add todo item first.</p>} {/* Display error message if input is empty */}
      
      {/* Render "Ongoing Tasks" list if there are any ongoing tasks */}
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

      {/* Render "Done Tasks" list if there are any done tasks */}
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
