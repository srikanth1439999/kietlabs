

import React from 'react';
import Form from "./from";
import LabSubmissionCounts from "./lab";
import './home.css';  // Import the CSS file

const Home = () => {
  return (
   
    <div className="home-container">
         
        
      <div className="form-section">
        <Form />
      </div>
      <div className="counts-section">
        <LabSubmissionCounts />
      </div>
    </div>
  );
};

export default Home;
