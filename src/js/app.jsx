import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await fetch(
          "https://playground.4geeks.com/todo/users/elysa_dev"
        );
        const data = await response.json();
        setMainTask(data.todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    return () => {
      getTodos();
    };
  }, []); // Optional array of dependencies

  // Add new task
  const postTodo = async (taskLabel) => {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/todo/todos/elysa_dev",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            label: taskLabel,
            is_done: false,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add task");
      }
    } catch (error) {
      console.error("Error posting task:", error);
    }
  };

  // Delete task by ID
  const deleteHandler = async (taskId) => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/todo/todos/${taskId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsLoading(true);
    await postTodo(`${title.trim()} - ${description.trim()}`);
    setTitle("");
    setDescription("");
    setIsLoading(false);
  };

  // Render task list
  const renderTask =
    mainTask.length === 0 ? (
      <p className="text-center text-muted fs-5">
        No tasks yet. Start by adding one above.
      </p>
    ) : (
      <ul className="list-group list-group-flush">
        {mainTask.map((task) => (
          <li
            key={task.id}
            className="list-group-item d-flex justify-content-between align-items-center px-4 py-3"
            style={{
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              marginBottom: "10px",
            }}
          >
            <div>
              <h5 className="mb-1 fw-bold">{task.label}</h5>
            </div>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => deleteHandler(task.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    );

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1
          className="display-4 text-white py-4 rounded"
          style={{
            background: "linear-gradient(to right, #ff758c, #ff7eb3)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          My Todo List
        </h1>
        <p className="text-muted mt-3 fs-5">Plan your day with ease</p>
      </div>

      {/* Form */}
      <form
        onSubmit={submitHandler}
        className="row gy-3 gx-4 align-items-end mb-5 justify-content-center"
      >
        <div className="col-md-4">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control shadow-sm"
            placeholder="e.g., Grocery shopping"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="col-md-5">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control shadow-sm"
            placeholder="e.g., Buy milk, eggs, and flour"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="col-md-3 d-grid">
          <button
            type="submit"
            className="btn btn-dark btn-lg shadow-sm"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Task"}
          </button>
        </div>
      </form>

      {/* Task List */}
      <div
        className="card shadow rounded-4"
        style={{ backgroundColor: "#ffffffee", border: "none" }}
      >
        <div className="card-body px-4 py-5">{renderTask}</div>
      </div>
    </div>
  );
};

export default App;
