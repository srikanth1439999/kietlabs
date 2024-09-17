import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/home';

import SubmissionsList from './components/submissions';


function App() {
  return (
    <Router>
      <div className="App">

        {/* Navigation Links */}
        <nav>
          <ul>
         
            <li>
              <button>
              <Link to="/submissions">Submissions List</Link>
              </button>
            </li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={
            <div className="home-layout">
              <div className="form-section">
                <Home/>
              </div>
             
            </div>
          } />
          <Route path="/submissions" element={<SubmissionsList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
