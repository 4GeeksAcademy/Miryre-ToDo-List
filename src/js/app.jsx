import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mainTask, setMainTask] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      setMainTask([...mainTask, { title, description }]);
      setTitle("");
      setDescription("");
    }
  };

  const deleteHandler = (index) => {
    const updatedTasks = [...mainTask];
    updatedTasks.splice(index, 1);
    setMainTask(updatedTasks);
  };

  const renderTask = mainTask.length === 0 ? (
    <p className="text-center text-muted fs-5">✨ No tasks yet. Start by adding one above.</p>
  ) : (
    <ul className="list-group list-group-flush">
      {mainTask.map((task, i) => (
        <li
          key={i}
          className="list-group-item d-flex justify-content-between align-items-center px-4 py-3"
          style={{ backgroundColor: '#f9f9f9', borderRadius: '8px', marginBottom: '10px' }}
        >
          <div>
            <h5 className="mb-1 fw-bold">{task.title}</h5>
            <p className="mb-0 text-secondary">{task.description}</p>
          </div>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => deleteHandler(i)}
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
            background: 'linear-gradient(to right, #ff758c, #ff7eb3)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          My Todo List
        </h1>
        <p className="text-muted mt-3 fs-5">Plan your day with ease ✨</p>
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
          <button type="submit" className="btn btn-dark btn-lg shadow-sm">
            Add Task
          </button>
        </div>
      </form>

      {/* Task List Card */}
      <div
        className="card shadow rounded-4"
        style={{ backgroundColor: '#ffffffee', border: 'none' }}
      >
        <div className="card-body px-4 py-5">{renderTask}</div>
      </div>
    </div>
  );
};

export default App;

