
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


import TaskList from './Componants/TaskList';
import TaskForm from './Componants/TaskForm';

function App() {
  return (

    
    
    <Router>
      <div>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            TaskForm
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/TaskList" className="nav-link">
            TaskList
          </Link>
        </li>
      </ul>
    

        <hr />
        <Routes>
          <Route exact path="/" element={<TaskForm/>} />
          <Route path="/TaskList" element={<TaskList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
