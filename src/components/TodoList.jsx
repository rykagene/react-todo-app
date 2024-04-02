import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [deletedTodo, setDeletedTodo] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

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
    if (editIndex !== null) {
      const newTodos = [...todos];
      newTodos[editIndex] = { ...newTodos[editIndex], text: inputValue };
      setTodos(newTodos);
      setEditIndex(null);
      setInputValue("");
    } else {
      setTodos([...todos, { text: inputValue, done: false }]);
      setInputValue("");
    }
  }

  function handleDone(index) {
    const newTodos = [...todos];
    newTodos[index] = { ...newTodos[index], done: !newTodos[index].done };
    setTodos(newTodos);
  }

  function handleDelete(index) {
    const deletedTodo = todos[index];
    setTodos(todos.filter((todo, i) => i !== index));
    setDeletedTodo(deletedTodo);
    setSnackbarOpen(true);
  }

  function handleUndoDelete() {
    if (deletedTodo) {
      setTodos([...todos, deletedTodo]);
    }
    setDeletedTodo(null);
    setSnackbarOpen(false);
  }

  function handleEdit(index) {
    setEditIndex(index);
    setInputValue(todos[index].text);
  }

  const ongoingTasksCount = todos.filter((todo) => !todo.done).length;
  const doneTasksCount = todos.filter((todo) => todo.done).length;

  const theme = createTheme({
    palette: {
      primary: {
        main: "#191970",
      },
      editButton: {
        main: "#4caf50", 
      },
      deleteButton: {
        main: "#ffcccb", 
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          maxWidth: "600px",
          margin: "auto",
          padding: "16px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h2" style={{ marginBottom: "16px" }}>
          Todo List App
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", marginBottom: "16px" }}
        >
          <TextField
            id="outlined-basic"
            label="Add todo item"
            variant="outlined"
            value={inputValue}
            onChange={handleChange}
            error={error}
            helperText={error ? "Please add a todo item" : ""}
            style={{ flex: 1, marginRight: "8px", marginBottom: "8px" }}
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!inputValue.trim()}
            style={{ marginBottom: "8px", "&:hover": { backgroundColor: "#0e1630" } }}
            color="primary"
            startIcon={
              editIndex !== null ? (
                <EditIcon style={{ verticalAlign: "middle" }} />
              ) : null
            }
          >
            {editIndex !== null ? "" : "Add"}
          </Button>
        </form>

        {ongoingTasksCount > 0 && (
          <div>
            <Typography variant="h4" gutterBottom>
              Ongoing Tasks ({ongoingTasksCount})
            </Typography>
            {todos.map((todo, index) => {
              return !todo.done ? (
                <Paper
                  key={index}
                  variant="outlined"
                  elevation={3}
                  style={{
                    marginBottom: "8px",
                    padding: "8px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    checked={todo.done}
                    onChange={() => handleDone(index)}
                    style={{ marginRight: "8px" }}
                  />
                  {editIndex !== index ? (
                    <Typography
                      style={{
                        flex: 1,
                        textDecoration: todo.done ? "line-through" : "none",
                        color: todo.done ? "#aaa" : "inherit", 
                      }}
                    >
                      {todo.text}
                    </Typography>
                  ) : (
                    <TextField
                      id={`edit-input-${index}`}
                      label="Edit todo item"
                      variant="outlined"
                      value={inputValue}
                      onChange={handleChange}
                      style={{ flex: 1, marginRight: "8px" }}
                    />
                  )}
                  {!editIndex && (
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEdit(index)}
                      style={{ display: editIndex === null ? "block" : "none" }}
                      color="editButton"
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                  {!editIndex && (
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(index)}
                      style={{ display: editIndex === null ? "block" : "none" }}
                      color="deleteButton"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                  {editIndex === index && (
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      disabled={!inputValue.trim()}
                      style={{ marginLeft: "8px" }}
                    >
                      Save
                    </Button>
                  )}
                </Paper>
              ) : null;
            })}
          </div>
        )}

        {doneTasksCount > 0 && (
          <div>
            <Typography variant="h4" gutterBottom>
              Done Tasks ({doneTasksCount})
            </Typography>
            {todos.map((todo, index) => {
              return todo.done ? (
                <Paper
                  key={index}
                  variant="outlined"
                  elevation={3}
                  style={{
                    marginBottom: "8px",
                    padding: "8px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    checked={todo.done}
                    onChange={() => handleDone(index)}
                    style={{ marginRight: "8px" }}
                  />
                  <Typography
                    style={{
                      flex: 1,
                      textDecoration: todo.done ? "line-through" : "none",
                      color: todo.done ? "#aaa" : "inherit", // Lighter gray
                    }}
                  >
                    {todo.text}
                  </Typography>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(index)}
                    color="deleteButton"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Paper>
              ) : null;
            })}
          </div>
        )}

        {ongoingTasksCount === 0 && doneTasksCount === 0 && (
          <Typography variant="body1" style={{ marginTop: "16px" }}>
            No tasks yet. Add some tasks to get started!
          </Typography>
        )}

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
        >
          <MuiAlert
            onClose={() => setSnackbarOpen(false)}
            severity="success"
            action={
              <Button color="inherit" size="small" onClick={handleUndoDelete}>
                Undo
              </Button>
            }
          >
            Task deleted
          </MuiAlert>
        </Snackbar>
      </div>
    </ThemeProvider>
  );
}

export default TodoList;
