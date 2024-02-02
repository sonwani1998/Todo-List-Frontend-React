import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';  // Import Axios

const TaskForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Process');

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const apiUrl = 'http://localhost:8080/api/tasks';

    try {
      const response = await axios.post(apiUrl, {
        title,
        description,
        dueDate,
        status,
      });

      
      console.log('Task added successfully');
      alert('Task added successfully');

      
      navigate('/TaskList');
    } catch (error) {
      
      console.error('Failed to add task', error);
      alert('Failed to add task');
    }
  };

  return (
    <div className="container mt-5">
      <center><h2 className="mb-4">Add Task</h2></center>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div><br></br>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div><br></br>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            className="form-control"
            id="dueDate"
            name="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div><br></br>

        <button type="submit" className="btn btn-primary">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
