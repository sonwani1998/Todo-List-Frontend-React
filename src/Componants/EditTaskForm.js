import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios

const EditTaskForm = ({ match }) => {
const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'Process',
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/tasks/${match.params.taskId}`
        );
        console.log('Fetched Task Data:', response.data); 
        setTask(response.data);
      } catch (error) {
        console.error('Error fetching task for editing:', error);
      }
    };
  
    fetchTask();
  }, [match.params.taskId]);

  const handleChange = (e) => {
    console.log('Changing', e.target.name, 'to', e.target.value); 
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/api/tasks/${match.params.taskId}`, task);
      console.log('Task updated successfully');
      alert('Task updated successfully');

      
      navigate('/TaskList');
    } catch (error) {
      console.error('Failed to update task', error);
      alert('Failed to update task');
    }
  };

  return (
    <div className="container mt-5">
      <center>
        <h2 className="mb-4">Edit Task</h2>
      </center>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>
        <br />

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <br />

        <div className="form-group">
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            className="form-control"
            id="dueDate"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        <br />

        <button type="submit" className="btn btn-primary">
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTaskForm;
