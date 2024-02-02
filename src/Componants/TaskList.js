
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskList() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleEdit = (taskId) => {
    navigate('/EditTaskForm/${taskId');
    console.log(`Editing task with ID ${taskId}`);
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${taskId}`);
      
      fetchTasks();
      console.log(`Task with ID ${taskId} deleted successfully`);
    } catch (error) {
      console.error(`Failed to delete task with ID ${taskId}`, error);
    }
  };

  const handleMarkCompleted = async (taskId) => {
    try {
      await axios.put(
        `http://localhost:8080/api/tasks/${taskId}/complete`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      fetchTasks();
      console.log(`Task with ID ${taskId} marked as completed successfully`);
    } catch (error) {
      console.error(`Failed to mark task with ID ${taskId} as completed`, error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []); 

  return (

    
    <div className="container">
      <h2 className="mb-4 text-center">Task List</h2>

      <div className="row">
        {tasks.map((task) => (
          <div key={task.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text">{task.description}</p>
                <p>Due Date: {task.dueDate}</p>
                <p>Status: {task.status}</p>

                <div className="btn-group">
                  <button
                    className="btn btn-warning mr-2"
                    onClick={() => handleEdit(task.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger mr-2"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                  {task.status === 'Process' && (
                    <button
                      className="btn btn-success"
                      onClick={() => handleMarkCompleted(task.id)}
                    >
                      Completed
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
