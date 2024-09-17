import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './submissions.css'
const SubmissionsList = () => {
  const [lab, setLab] = useState(''); // Selected lab filter
  const [submissions, setSubmissions] = useState([]); // List of submissions
  const [filteredSubmissions, setFilteredSubmissions] = useState([]); // Filtered submissions based on lab
  const labs = ['AI', 'VR_AR', 'Humanoid', 'Drones', 'Cyber']; // Lab options

  // Fetch all submissions
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/submissions'); // Assuming you have a route that fetches all submissions
        setSubmissions(res.data);
      } catch (error) {
        console.error('Error fetching submissions', error);
      }
    };
    fetchSubmissions();
  }, []);

  // Filter submissions based on selected lab
  useEffect(() => {
    if (lab) {
      const filtered = submissions.filter(submission => submission.lab === lab);
      setFilteredSubmissions(filtered);
    } else {
      setFilteredSubmissions(submissions);
    }
  }, [lab, submissions]);

  return (
    <div>
      <h1>Submissions</h1>
      
      {/* Lab Filter */}
      <div>
        <label htmlFor="lab-filter">Filter by Lab:</label>
        <select
          id="lab-filter"
          value={lab}
          onChange={(e) => setLab(e.target.value)}
        >
          <option value="">All Labs</option>
          {labs.map((labOption) => (
            <option key={labOption} value={labOption}>
              {labOption}
            </option>
          ))}
        </select>
      </div>
      
      {/* Display Submissions */}
      <ul>
        {filteredSubmissions.length > 0 ? (
          filteredSubmissions.map((submission) => (
            <li key={submission._id}>
              <h3>{submission.name} (Roll No: {submission.rollNo})</h3>
              <p>Branch: {submission.branch}, Year: {submission.year}, Semester: {submission.semester}</p>
              <p>Lab: {submission.lab}</p>
              <p>Python Rating: {submission.pythonRating}, AI/ML Rating: {submission.aiMlRating}</p>
              <p>Contact: {submission.email}, {submission.mobileNo}</p>
            </li>
          ))
        ) : (
          <p>No submissions found for the selected lab.</p>
        )}
      </ul>
    </div>
  );
};

export default SubmissionsList;
