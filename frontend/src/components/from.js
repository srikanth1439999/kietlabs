import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './from.css'; // Import the CSS file

const Form = () => {
  const [formData, setFormData] = useState({
    rollNo: '',
    name: '',
    branch: '',
    year: '',
    semester: '',
    lab: '',
    pythonRating: 0,
    aiMlRating: 0,
    mobileNo: '',
    email: '',
  });

  const [submissionCounts, setSubmissionCounts] = useState({});
  const [maxSubmissionsReached, setMaxSubmissionsReached] = useState(false);

  // Fetch submission count for all labs when the component mounts
  useEffect(() => {
    const fetchSubmissionCounts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/submission-count');
        setSubmissionCounts(response.data);
      } catch (error) {
        console.error('Error fetching submission counts:', error);
      }
    };

    fetchSubmissionCounts();
  }, []);

  // Check if max submission limit for the selected lab is reached
  useEffect(() => {
    if (formData.lab && submissionCounts[formData.lab]) {
      if (submissionCounts[formData.lab] >= 50) {
        setMaxSubmissionsReached(true);
      } else {
        setMaxSubmissionsReached(false);
      }
    }
  }, [formData.lab, submissionCounts]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (maxSubmissionsReached) {
      alert(`Submission limit reached for ${formData.lab}. Please try another lab.`);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/submit', formData);
      alert('Submission successful!');
      console.log('Submission successful:', response.data);
      window.location.reload(); // Refresh the page after successful submission
    } catch (error) {
      alert('Error submitting the form. Please try again.');
      console.error('Error submitting the form:', error.response?.data);
    }
  };

  return (
    <div className="form-card">
      <form onSubmit={handleSubmit}>
        {maxSubmissionsReached ? (
          <p>Submission limit of 50 reached for the selected lab. Please choose another lab.</p>
        ) : (
          <>
            <label>
              Roll No
              <input name="rollNo" placeholder="Roll No" onChange={handleChange} required />
            </label>

            <label>
              Name
              <input name="name" placeholder="Name" onChange={handleChange} required />
            </label>

            <label>
              Branch
              <select name="branch" onChange={handleChange} required>
                <option value="">Select Branch</option>
                <option value="Cai">CAI</option>
                <option value="CSD">CSD</option>
                <option value="CSM">CSM</option>
                <option value="CSC">CSC</option>
                <option value="AID">AID</option>
              </select>
            </label>

            <label>
              Year
              <select name="year" onChange={handleChange} required>
                <option value="">Select Year</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </label>

            <label>
              Semester
              <select name="semester" onChange={handleChange} required>
                <option value="">Select Semester</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </label>

            <label>
              Lab
              <select name="lab" onChange={handleChange} required>
                <option value="">Select Lab</option>
                <option value="AI">AI</option>
                <option value="VR_AR">VR & AR</option>
                <option value="Humanoid">Humanoid</option>
                <option value="Drones">Drones</option>
                <option value="Cyber">Cyber</option>
              </select>
            </label>

            <label>
              Python Rating
              <input
                name="pythonRating"
                type="number"
                min="1"
                max="10"
                placeholder="Rate yourself in Python"
                onChange={handleChange}
                required
              />
            </label>

            <label>
              AI/ML Rating
              <input
                name="aiMlRating"
                type="number"
                min="1"
                max="10"
                placeholder="Rate yourself in AI/ML"
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Mobile No
              <input name="mobileNo" placeholder="Mobile No" onChange={handleChange} required />
            </label>

            <label>
              Email
              <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            </label>

            <button type="submit" disabled={maxSubmissionsReached}>Submit</button>
          </>
        )}
      </form>
    </div>
  );
};

export default Form;
