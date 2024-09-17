import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './lab.css'
const LabSubmissionCounts = () => {
  const [counts, setCounts] = useState({
    AI: 0,
    VR_AR: 0,
    Humanoid: 0,
    Drones: 0,
    Cyber: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubmissionCounts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/submission-count');
        setCounts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch submission counts');
        setLoading(false);
      }
    };

    fetchSubmissionCounts();
  }, []);

  if (loading) return <p>Loading submission counts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='count'>
      <h2>Lab Submission Counts</h2>
      <ul>
        <li>AI Lab: {counts.AI} submissions</li>
        <li>VR & AR Lab: {counts.VR_AR} submissions</li>
        <li>Humanoid Lab: {counts.Humanoid} submissions</li>
        <li>Drones Lab: {counts.Drones} submissions</li>
        <li>Cyber Lab: {counts.Cyber} submissions</li>
      </ul>
    </div>
  );
};

export default LabSubmissionCounts;
